"use client"

import Image from "next/image"
import { useState } from "react"
import { Wallet } from "lucide-react"

export function Navbar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const [connected, setConnected] = useState(false)

  const toggleWallet = () => setConnected(!connected)

  return (
    <nav className="flex items-center justify-between p-6 border-b-2 border-black max-w-5xl mx-auto w-full bg-white">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-md border-2 border-black bg-white">
          <Image src="/og-logo.png" alt="Uniswap V2" fill sizes="48px" className="object-contain" priority />
        </div>
        <span className="text-3xl font-bold italic underline decoration-wavy leading-none">Uniswap V2</span>
      </div>

      <div className="flex gap-8 text-xl">
        {["Swap", "Pool"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`cursor-pointer hover:underline decoration-double px-2 py-1 ${activeTab === tab.toLowerCase() ? "font-bold underline sketch-marker" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <button onClick={toggleWallet} className="sketch-button px-4 py-2 flex items-center gap-2 bg-white">
        <Wallet size={18} />
        {connected ? "0x1234...abcd" : "Connect Wallet"}
      </button>
    </nav>
  )
}
