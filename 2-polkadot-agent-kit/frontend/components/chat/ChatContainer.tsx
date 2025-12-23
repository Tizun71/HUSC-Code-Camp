    import React, { useRef, useEffect, useState } from 'react';

import { Send, Sparkles, AlertCircle } from 'lucide-react';
import { useChatStore, useWalletStore } from '@/store/store';
import { MessageBubble } from './MessageBubble';
import { Button } from '../ui/Button';
import { useAccount } from '@luno-kit/react';
import { useAgent } from '@/hooks/useAgent';
import { Message } from '@/store/types';

export const ChatContainer: React.FC = () => {
  const { messages, isLoading, addMessage, setLoading } = useChatStore();
  const { address: walletAddress } = useAccount();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { chat } = useAgent();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessageToAgent = async (message: string) => {
    try {
      setLoading(true);
      
      // Add user message to chat
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: Date.now(),
      };
      addMessage(userMessage);

      // Call agent API
      const response = await chat(message);

      // Add agent response to chat
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response,
        timestamp: Date.now(),
      };
      addMessage(agentMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: 'Sorry, I encountered an error while processing your request.',
        timestamp: Date.now(),
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const message = input;
    setInput('');
    await sendMessageToAgent(message);
  };

  return (
    <div className="flex flex-col h-full bg-background/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="h-14 border-b border-border flex items-center px-6 bg-card/30">
        <Sparkles className="w-4 h-4 text-primary mr-2" />
        <h2 className="font-semibold text-sm">Agent Assistant</h2>
        <div className="ml-auto flex items-center gap-2">
            {!walletAddress && (
                <span className="text-xs text-amber-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Wallet not connected
                </span>
            )}
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar scroll-smooth" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center rotate-3">
                <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div>
                <h3 className="text-lg font-semibold">How can I help you today?</h3>
                <p className="text-sm max-w-xs mx-auto mt-2">
                  Try "Check my DOT balance", "Swap 5 DOT for USDT", or "Join the builders nomination pool".
                </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-4 w-full max-w-3xl mx-auto my-4 px-2">
             <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-zinc-400 animate-spin" />
             </div>
             <div className="bg-secondary px-4 py-3 rounded-2xl rounded-tl-none border border-border flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms'}} />
                <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms'}} />
                <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms'}} />
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card/30 border-t border-border">
        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={walletAddress ? "Ask the agent to perform a task..." : "Connect wallet to start..."}
            disabled={!walletAddress || isLoading}
            className="w-full bg-secondary/50 border border-border/50 text-foreground rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-muted-foreground/50"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isLoading || !walletAddress}
            className="absolute right-1.5 top-1.5 h-9 w-9 bg-primary/20 text-primary hover:bg-primary hover:text-white transition-all rounded-lg"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <div className="text-center mt-2">
            <p className="text-[10px] text-muted-foreground">
                AI can make mistakes. Please verify tool outputs before signing transactions.
            </p>
        </div>
      </div>
    </div>
  );
};