import { useWalletStore } from "@/store/store";

export const useLunoKit = () => {
  const { 
    isConnected, 
    accounts, 
    activeAccount, 
    connect, 
    disconnect, 
    setActiveAccount 
  } = useWalletStore();

  return {
    connected: isConnected,
    accounts,
    account: activeAccount,
    connect,
    disconnect,
    selectAccount: setActiveAccount,
    // Mock signing function
    signAndSend: async (tx: any) => {
      console.log("Signing transaction:", tx);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    }
  };
};