import React from 'react';
import { Bot, User, Terminal, CheckCircle2 } from 'lucide-react';
import { Message } from '@/store/types';

interface Props {
  message: Message;
}

export const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';
  const isTool = message.role === 'tool';
  const isModel = message.role === 'model';

  if (isTool) {
    return (
      <div className="flex gap-4 w-full max-w-3xl mx-auto my-4 pl-4">
        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-border">
          <Terminal className="w-4 h-4 text-blue-400" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
              {message.toolName}
            </span>
            <span className="text-xs text-muted-foreground">
              {message.toolResult ? 'Completed' : 'Executing...'}
            </span>
          </div>
          
          {/* Tool Args */}
          {message.toolArgs && (
             <div className="bg-zinc-900/50 rounded-lg p-3 text-xs font-mono text-zinc-300 border border-border/50 overflow-x-auto">
               <div className="opacity-50 mb-1">Input Params:</div>
               {JSON.stringify(message.toolArgs, null, 2)}
             </div>
          )}

          {/* Tool Result */}
          {message.toolResult && (
             <div className="bg-green-950/20 rounded-lg p-3 text-xs font-mono text-green-400 border border-green-900/50 overflow-x-auto flex gap-2 items-start">
               <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
               <pre className="whitespace-pre-wrap">
                 {JSON.stringify(message.toolResult, null, 2)}
               </pre>
             </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-4 w-full max-w-3xl mx-auto my-4 px-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser ? 'bg-primary' : 'bg-zinc-700'}`}>
        {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-zinc-300" />}
      </div>
      
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser 
            ? 'bg-primary text-primary-foreground rounded-tr-none' 
            : 'bg-secondary text-secondary-foreground rounded-tl-none border border-border'
        }`}>
          {message.content}
        </div>
        <span className="text-[10px] text-muted-foreground mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};