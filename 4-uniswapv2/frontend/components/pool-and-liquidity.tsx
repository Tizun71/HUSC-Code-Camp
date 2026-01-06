"use client"

import { useState, useEffect } from "react"
import { Plus, Info, Droplets, History } from "lucide-react"

interface Pool {
  id: string
  tokenA: string
  tokenB: string
  fee: string
  liquidity: string
}

export function PoolAndLiquidity() {
  const [pools, setPools] = useState<Pool[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [subTab, setSubTab] = useState<"list" | "create">("list")
  const [newPool, setNewPool] = useState({ tokenA: "ETH", tokenB: "USDC", fee: "0.3%" })

  useEffect(() => {
    const savedPools = localStorage.getItem("sketch-pools")
    if (savedPools) setPools(JSON.parse(savedPools))
  }, [])

  const handleCreatePool = () => {
    const pool: Pool = {
      id: Date.now().toString(),
      ...newPool,
      liquidity: "$0.00", // Initial mock liquidity
    }
    const updatedPools = [...pools, pool]
    setPools(updatedPools)
    localStorage.setItem("sketch-pools", JSON.stringify(updatedPools))
    setIsCreating(false)
    setSubTab("list")
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-4">
      <div className="sketch-card bg-white overflow-hidden mb-8">
        <div className="flex border-b-2 border-black">
          <button
            onClick={() => setSubTab("list")}
            className={`flex-1 py-4 text-xl font-bold italic flex items-center justify-center gap-2 ${subTab === "list" ? "sketch-highlight-yellow" : "bg-white"}`}
          >
            <History size={20} /> Positions
          </button>
          <button
            onClick={() => setSubTab("create")}
            className={`flex-1 py-4 text-xl font-bold italic flex items-center justify-center gap-2 border-l-2 border-black ${subTab === "create" ? "sketch-highlight-pink" : "bg-white"}`}
          >
            <Plus size={20} /> Create Pool
          </button>
        </div>

        <div className="p-8">
          {subTab === "create" ? (
            <div>
              <h3 className="text-2xl font-bold mb-6 italic underline">Draft a New Pool</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="sketch-border p-4 sketch-highlight-blue">
                  <label className="text-xs uppercase font-bold mb-1 block">Token A</label>
                  <input
                    className="w-full text-xl outline-none bg-transparent"
                    value={newPool.tokenA}
                    onChange={(e) => setNewPool({ ...newPool, tokenA: e.target.value })}
                  />
                </div>
                <div className="sketch-border p-4 sketch-highlight-pink">
                  <label className="text-xs uppercase font-bold mb-1 block">Token B</label>
                  <input
                    className="w-full text-xl outline-none bg-transparent"
                    value={newPool.tokenB}
                    onChange={(e) => setNewPool({ ...newPool, tokenB: e.target.value })}
                  />
                </div>
              </div>
              <div className="sketch-border p-4 mb-6">
                <label className="text-xs uppercase font-bold mb-1 block">Fee Tier</label>
                <select
                  className="w-full text-xl outline-none bg-transparent"
                  value={newPool.fee}
                  onChange={(e) => setNewPool({ ...newPool, fee: e.target.value })}
                >
                  <option>0.01%</option>
                  <option>0.05%</option>
                  <option>0.3%</option>
                  <option>1.0%</option>
                </select>
              </div>
              <button
                onClick={handleCreatePool}
                className="w-full sketch-button bg-black text-white py-4 text-xl font-bold"
              >
                Confirm & Save Pool
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold italic underline">Your Liquidity</h3>
                <div className="text-sm italic opacity-60 flex items-center gap-1">
                  <Info size={14} /> Local Storage enabled
                </div>
              </div>

              {pools.length === 0 ? (
                <div className="sketch-border p-12 text-center italic text-xl sketch-highlight-yellow">
                  Your sketchbook is empty. <br /> Start by creating a pool!
                </div>
              ) : (
                pools.map((pool) => (
                  <div
                    key={pool.id}
                    className="sketch-border p-6 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 sketch-highlight-blue border-2 border-black flex items-center justify-center font-bold text-lg">
                          {pool.tokenA[0]}
                        </div>
                        <div className="w-12 h-12 sketch-highlight-pink border-2 border-black -mt-6 ml-4 flex items-center justify-center font-bold text-lg">
                          {pool.tokenB[0]}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-2xl font-bold italic">
                          {pool.tokenA}/{pool.tokenB}
                        </div>
                        <div className="text-sm font-bold opacity-50 uppercase tracking-tighter">{pool.fee} Tier</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold uppercase opacity-50">My Liquidity</div>
                      <div className="text-xl font-bold">{pool.liquidity}</div>
                      <button className="text-sm underline italic hover:text-pink-500">Manage</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="sketch-card p-6 sketch-highlight-blue flex items-start gap-4 italic text-sm">
        <Droplets className="text-blue-500 shrink-0" />
        <div>
          <strong>Note:</strong> In this sketch version, "Create Pool" automatically adds it to your liquidity list via
          localStorage. No real transactions are executed.
        </div>
      </div>
    </div>
  )
}
