import { useWalletStore } from "@/store/store";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import {
  Activity,
  ChevronDown,
  Copy,
  ExternalLink,
  LogOut,
  Wallet,
} from "lucide-react";
import { Chain } from "@/store/types";
import { ConnectButton } from "@luno-kit/ui";
import { useEffect } from "react";
import { useAccount } from "@luno-kit/react";

export const WalletPanel: React.FC = () => {
  const { address: walletAddress } = useAccount();
  const { selectedChain, setChain, balance } = useWalletStore();
  const [isChainOpen, setIsChainOpen] = useState(false);

  if (!walletAddress) {
    return (
      <Card className="w-full bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Connect Wallet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Connect your Polkadot wallet via LunoKit to enable AI agent
            transactions.
          </p>
          <ConnectButton />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Account Info */}
      <Card className="bg-card/50">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <ConnectButton />
          </div>
        </CardHeader>
      </Card>

      {/* Quick Actions / History Placeholder */}
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="text-xs gap-2">
          <ExternalLink className="w-3 h-3" /> Explorer
        </Button>
        <Button variant="outline" className="text-xs gap-2">
          <Activity className="w-3 h-3" /> Activity
        </Button>
      </div>
    </div>
  );
};
