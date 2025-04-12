"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ArrowDownToLine, ArrowUpFromLine, Copy, LinkIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function FileSharing() {
  const { toast } = useToast()
  // Connection states
  const [myPeerId, setMyPeerId] = useState<string>("")
  const [remotePeerId, setRemotePeerId] = useState<string>("")
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected")
  const [error, setError] = useState<string | null>(null)

  // File transfer states
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [receivedFile, setReceivedFile] = useState<{ name: string; size: number; type: string; url: string } | null>(
    null,
  )
  const [transferProgress, setTransferProgress] = useState<number>(0)
  const [isTransferring, setIsTransferring] = useState<boolean>(false)
  const [transferDirection, setTransferDirection] = useState<"sending" | "receiving" | null>(null)

  // Refs
  const peerRef = useRef<any>(null)
  const connectionRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize PeerJS
  useEffect(() => {
    const initPeer = async () => {
      try {
        // Dynamically import PeerJS to avoid SSR issues
        const { default: Peer } = await import("peerjs")

        const newPeer = new Peer()

        newPeer.on("open", (id) => {
          setMyPeerId(id)
          console.log("My peer ID is:", id)
        })

        newPeer.on("connection", (conn) => {
          handleConnection(conn)
        })

        newPeer.on("error", (err) => {
          console.error("Peer error:", err)
          setError(`Connection error: ${err.message}`)
          setConnectionStatus("disconnected")
        })

        peerRef.current = newPeer
      } catch (err) {
        console.error("Failed to initialize PeerJS:", err)
        setError("Failed to initialize connection. Please try again.")
      }
    }

    initPeer()

    // Clean up on unmount
    return () => {
      if (peerRef.current) {
        peerRef.current.destroy()
      }
    }
  }, [])

  // Handle incoming connection
  const handleConnection = (conn: any) => {
    connectionRef.current = conn
    setConnectionStatus("connecting")

    conn.on("open", () => {
      setConnectionStatus("connected")
      setError(null)
    })

    conn.on("data", (data: any) => {
      if (data.type === "file-start") {
        // Prepare to receive file
        setTransferDirection("receiving")
        setIsTransferring(true)
        setTransferProgress(0)
      } else if (data.type === "file-chunk") {
        // Update progress
        setTransferProgress(data.progress)
      } else if (data.type === "file-complete") {
        // File transfer complete
        const { name, size, type, data: fileData } = data.file

        // Convert array buffer to blob
        const blob = new Blob([fileData], { type })
        const url = URL.createObjectURL(blob)

        setReceivedFile({ name, size, type, url })
        setIsTransferring(false)
        setTransferDirection(null)
      }
    })

    conn.on("close", () => {
      setConnectionStatus("disconnected")
      connectionRef.current = null
    })

    conn.on("error", (err: any) => {
      console.error("Connection error:", err)
      setError(`Connection error: ${err.message}`)
      setConnectionStatus("disconnected")
      connectionRef.current = null
    })
  }

  // Connect to a remote peer
  const connectToPeer = () => {
    if (!peerRef.current || !remotePeerId) return

    setError(null)
    setConnectionStatus("connecting")

    try {
      const conn = peerRef.current.connect(remotePeerId)
      handleConnection(conn)
    } catch (err: any) {
      console.error("Failed to connect:", err)
      setError(`Failed to connect: ${err.message}`)
      setConnectionStatus("disconnected")
    }
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Send file to connected peer
  const sendFile = async () => {
    if (!connectionRef.current || !selectedFile) return

    setIsTransferring(true)
    setTransferDirection("sending")
    setTransferProgress(0)

    try {
      // Notify peer about incoming file
      connectionRef.current.send({
        type: "file-start",
        fileInfo: {
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
        },
      })

      // Read file as array buffer
      const buffer = await selectedFile.arrayBuffer()

      // Send file data
      connectionRef.current.send({
        type: "file-chunk",
        progress: 50, // Simplified progress for demo
      })

      // Complete file transfer
      connectionRef.current.send({
        type: "file-complete",
        file: {
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
          data: buffer,
        },
      })

      setTransferProgress(100)
      setTimeout(() => {
        setIsTransferring(false)
        setTransferDirection(null)
      }, 1000)
    } catch (err: any) {
      console.error("File transfer error:", err)
      setError(`File transfer failed: ${err.message}`)
      setIsTransferring(false)
      setTransferDirection(null)
    }
  }

  // Copy peer ID to clipboard
  const copyPeerId = async () => {
    try {
      await navigator.clipboard.writeText(myPeerId)
      toast({
        title: "Copied to clipboard",
        description: "Your peer ID has been copied to the clipboard",
      })
    } catch (err) {
      console.error("Failed to copy:", err)
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Reset received file
  const resetReceivedFile = () => {
    if (receivedFile?.url) {
      URL.revokeObjectURL(receivedFile.url)
    }
    setReceivedFile(null)
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <Card className="w-full glass-card">
      <CardHeader>
        <CardTitle className="text-foreground">File Transfer</CardTitle>
        <CardDescription className="text-foreground/80">Connect with another device to share files</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Connection Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Your ID</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="px-2 py-1 bg-background/50 dark:bg-background/30 rounded text-xs text-foreground">{myPeerId || "Generating..."}</code>
                {myPeerId && (
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyPeerId}>
                    <Copy className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
            <Badge
              variant={connectionStatus === "connected" ? "default" : "outline"}
              className={cn(
                "text-xs",
                connectionStatus === "connected" && "bg-emerald-500 dark:bg-purple-500",
                connectionStatus === "connecting" && "bg-yellow-500",
              )}
            >
              {connectionStatus === "connected"
                ? "Connected"
                : connectionStatus === "connecting"
                  ? "Connecting..."
                  : "Disconnected"}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Enter remote peer ID"
              value={remotePeerId}
              onChange={(e) => setRemotePeerId(e.target.value)}
              disabled={connectionStatus !== "disconnected"}
            />
            <Button
              onClick={connectToPeer}
              disabled={!remotePeerId || connectionStatus !== "disconnected"}
              variant="secondary"
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Connect
            </Button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <Separator />

        {/* File Transfer Section */}
        <div className="space-y-3">
          <p className="text-sm font-medium">File Transfer</p>

          {isTransferring && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm">{transferDirection === "sending" ? "Sending file..." : "Receiving file..."}</p>
                <span className="text-xs text-muted-foreground">{transferProgress}%</span>
              </div>
              <Progress value={transferProgress} className="h-2" />
            </div>
          )}

          {!isTransferring && (
            <>
              {/* Send File UI */}
              {connectionStatus === "connected" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-input"
                    />
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                      {selectedFile ? selectedFile.name : "Select a file"}
                    </Button>
                    {selectedFile && (
                      <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                    )}
                  </div>

                  <Button
                    onClick={sendFile}
                    disabled={!selectedFile || connectionStatus !== "connected"}
                    className="w-full"
                  >
                    <ArrowUpFromLine className="h-4 w-4 mr-2" />
                    Send File
                  </Button>
                </div>
              )}

              {/* Received File UI */}
              {receivedFile && (
                <div className="p-4 border rounded-md bg-gray-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{receivedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(receivedFile.size)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="default" size="sm" asChild className="w-full">
                      <a href={receivedFile.url} download={receivedFile.name}>
                        <ArrowDownToLine className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetReceivedFile}>
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>WebRTC File Sharing</p>
        {connectionStatus === "disconnected" && !myPeerId && (
          <div className="flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            Initializing...
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
