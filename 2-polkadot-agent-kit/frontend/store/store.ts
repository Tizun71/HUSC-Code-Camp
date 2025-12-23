import { create } from 'zustand';
import { WalletState, ChatState, Chain, Account } from './types';

// Mock data for simulation
const MOCK_ACCOUNTS: Account[] = [
  { address: '15oF4...yKwE', name: 'Main Staking', source: 'polkadot-js' },
  { address: '14KjL...9sKa', name: 'DeFi Ops', source: 'talisman' },
  { address: '16GzP...mQ2v', name: 'Cold Storage', source: 'subwallet-js' },
];

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  accounts: [],
  activeAccount: null,
  selectedChain: Chain.POLKADOT,
  balance: '0.00',

  connect: async () => {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 800));
    set({ 
      isConnected: true, 
      accounts: MOCK_ACCOUNTS,
      activeAccount: MOCK_ACCOUNTS[0],
      balance: '1,245.50'
    });
  },

  disconnect: () => {
    set({ 
      isConnected: false, 
      accounts: [], 
      activeAccount: null, 
      balance: '0.00' 
    });
  },

  setActiveAccount: (account) => set({ activeAccount: account }),
  
  setChain: (chain) => {
    // Simulate balance change on chain switch
    const mockBalance = (Math.random() * 1000).toFixed(2);
    set({ selectedChain: chain, balance: mockBalance });
  },
}));

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearChat: () => set({ messages: [] }),
}));