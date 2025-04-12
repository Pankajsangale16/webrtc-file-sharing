"use client";

import FileSharing from "@/components/file-sharing"

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Main content */}
      <br></br>
      <div className="relative z-10 w-[90%] max-w-2xl mx-auto px-4 py-8">
        <div className="glass-card p-8 rounded-3xl text-foreground transition-all duration-300">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center drop-shadow-md tracking-wide mb-6 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            🚀 WebRTC File Sharing
          </h1>
          <p className="text-center text-foreground/80 mb-8">
            Fast, secure, and peer-to-peer file sharing
          </p>
          <FileSharing />
        </div>
      </div>
    </main>
  );
}
