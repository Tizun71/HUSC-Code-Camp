import { PolkadotAgentKit } from '@polkadot-agent-kit/sdk';
import { config as dotenv } from 'dotenv';
dotenv();

export const agent = new PolkadotAgentKit({
  privateKey: process.env.POLKADOT_PRIVATE_KEY || "verb amateur limit double unfair debate combine top local museum make fever",
  keyType: "Sr25519", // Options: "Sr25519", "Ed25519", "Ecdsa"
});

// Connect to the Polkadot network
await agent.initializeApi();