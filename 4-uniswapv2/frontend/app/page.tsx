"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { SwapCard } from "@/components/swap-card"
import { PoolAndLiquidity } from "@/components/pool-and-liquidity"

export default function Home() {
  const [activeTab, setActiveTab] = useState("swap")

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* 
        
        Subtle "sketchy" grid background pattern via CSS
      */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="relative z-10">
        {activeTab === "swap" && <SwapCard />}
        {activeTab === "pool" && <PoolAndLiquidity />}
      </div>

    </main>
  )
}
