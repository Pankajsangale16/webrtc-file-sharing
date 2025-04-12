"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full py-8 backdrop-blur-md bg-white/20 dark:bg-black/20 border-t border-white/30 dark:border-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 animate-fadeInUp">
            <h3 className="text-lg font-semibold text-foreground">WebRTC Share</h3>
            <p className="text-foreground/60 text-sm">
              Fast and secure file sharing using WebRTC technology.
            </p>
          </div>
          <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-foreground/60 hover:text-foreground text-sm transition-colors duration-300">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-lg font-semibold text-foreground">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition-colors duration-300">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition-colors duration-300">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/30 dark:border-black/30">
          <p className="text-center text-foreground/60 text-sm">
            © {new Date().getFullYear()} WebRTC Share. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 