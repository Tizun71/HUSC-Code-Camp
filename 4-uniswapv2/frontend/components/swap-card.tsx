"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ChevronDown } from "lucide-react"

interface Pool {
  id: string
  tokenA: string
  tokenB: string
  fee: string
}

export function SwapCard() {
  const [fromAmount, setFromAmount] = useState("")
  const [pools, setPools] = useState<Pool[]>([])
  const [fromToken, setFromToken] = useState("ETH")
  const [toToken, setToToken] = useState("USDC")
  const [showSelect, setShowSelect] = useState<"from" | "to" | null>(null)

  useEffect(() => {
    const savedPools = localStorage.getItem("sketch-pools")
    if (savedPools) {
      const parsedPools: Pool[] = JSON.parse(savedPools)
      setPools(parsedPools)

      // Default to the first pool if available
      if (parsedPools.length > 0) {
        setFromToken(parsedPools[0].tokenA)
        setToToken(parsedPools[0].tokenB)
      }
    }
  }, [])

  const availableTokens = Array.from(new Set(pools.flatMap((p) => [p.tokenA, p.tokenB])))
  if (availableTokens.length === 0) {
    availableTokens.push("ETH", "USDC") // Fallback
  }

  return (
    <div className="sketch-card p-8 bg-white max-w-md mx-auto mt-20 relative">
      <h2 className="text-2xl font-bold mb-6 italic underline decoration-pink-500">Swap</h2>

      <div className="space-y-4">
        <div className="sketch-border p-4 sketch-highlight-blue">
          <label className="block text-sm mb-2 font-bold uppercase tracking-tighter">Sell</label>
          <div className="flex justify-between items-center">
            <input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="text-3xl bg-transparent outline-none w-1/2 font-bold"
            />
            <button
              onClick={() => setShowSelect("from")}
              className="sketch-button px-3 py-1 font-bold flex items-center gap-1 bg-white"
            >
              {fromToken} <ChevronDown size={14} />
            </button>
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <div
            onClick={() => {
              const temp = fromToken
              setFromToken(toToken)
              setToToken(temp)
            }}
            className="bg-white sketch-border p-2 cursor-pointer hover:bg-black hover:text-white transition-colors"
          >
            <ArrowDown size={20} />
          </div>
        </div>

        <div className="sketch-border p-4 sketch-highlight-pink">
          <label className="block text-sm mb-2 font-bold uppercase tracking-tighter">Buy</label>
          <div className="flex justify-between items-center">
            <input
              type="number"
              placeholder="0.0"
              readOnly
              value={fromAmount ? (Number.parseFloat(fromAmount) * 2500).toFixed(2) : ""}
              className="text-3xl bg-transparent outline-none w-1/2 font-bold"
            />
            <button
              onClick={() => setShowSelect("to")}
              className="sketch-button px-3 py-1 font-bold flex items-center gap-1 bg-white"
            >
              {toToken} <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      <button className="w-full mt-6 sketch-button bg-black text-white py-4 text-xl font-bold hover:bg-white hover:text-black transition-all">
        Swap (Sketching...)
      </button>

      {showSelect && (
        <div className="absolute inset-0 z-20 bg-white p-8 sketch-border m-4 animate-in fade-in zoom-in duration-200">
          <h3 className="text-xl font-bold mb-4 italic">Select a token</h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {availableTokens.map((token) => (
              <button
                key={token}
                onClick={() => {
                  if (showSelect === "from") setFromToken(token)
                  else setToToken(token)
                  setShowSelect(null)
                }}
                className={`w-full text-left p-3 sketch-border hover:sketch-highlight-yellow transition-all font-bold ${
                  (showSelect === "from" ? fromToken : toToken) === token ? "sketch-highlight-yellow" : ""
                }`}
              >
                {token}
              </button>
            ))}
          </div>
          <button onClick={() => setShowSelect(null)} className="mt-4 w-full sketch-button py-2 font-bold">
            Close
          </button>
        </div>
      )}
    </div>
  )
}
