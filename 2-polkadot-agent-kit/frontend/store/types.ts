export interface Account {
  address: string;
  name: string;
  source: string;
}

export enum Chain {
  POLKADOT = 'Polkadot',
  KUSAMA = 'Kusama',
  ASTAR = 'Astar',
  MOONBEAM = 'Moonbeam'
}

export interface WalletState {
  isConnected: boolean;
  accounts: Account[];
  activeAccount: Account | null;
  selectedChain: Chain;
  balance: string;
  connect: () => Promise<void>;
  disconnect: () => void;
  setActiveAccount: (account: Account) => void;
  setChain: (chain: Chain) => void;
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'tool';
  content: string;
  toolCallId?: string;
  toolName?: string;
  toolArgs?: any;
  toolResult?: any;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  clearChat: () => void;
}
