'use client';
import React from 'react';

import { CircleDotDashed } from 'lucide-react';
import { WalletPanel } from '@/components/wallet/WalletPanel';
import { ChatContainer } from '@/components/chat/ChatContainer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden h-16 border-b border-border flex items-center px-4 bg-card">
         <CircleDotDashed className="w-6 h-6 text-primary mr-2" />
         <h1 className="font-bold text-lg">Polkadot Agent</h1>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-80 border-r border-border bg-card/20 p-6 space-y-8 h-screen overflow-y-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
             <CircleDotDashed className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">Polkadot Agent</span>
        </div>

        <WalletPanel />

        <div className="mt-auto pt-8 border-t border-border/50">
           <div className="text-xs font-semibold text-muted-foreground mb-3">AVAILABLE TOOLS</div>
           <div className="grid grid-cols-2 gap-2">
              {['Swap', 'Staking', 'Pools', 'Bonding', 'Governance', 'Transfer'].map(tool => (
                  <div key={tool} className="text-xs bg-secondary/50 p-2 rounded text-center text-zinc-400 border border-transparent hover:border-border cursor-default transition-all">
                      {tool}
                  </div>
              ))}
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-[calc(100vh-64px)] md:h-screen p-2 md:p-6 relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
        <ChatContainer />
      </main>

      {/* Mobile Wallet Drawer would go here in a real app */}
    </div>
  );
};

export default App;