import { PolkadotAgentKit } from '@polkadot-agent-kit/sdk';

const agent = new PolkadotAgentKit({
  privateKey: "your-private-key-here",
  keyType: "Sr25519", // Options: "Sr25519", "Ed25519", "Ecdsa"
});

await agent.initializeApi();

const balanceTool = agent.getNativeBalanceTool();
const transferTool = agent.transferNativeTool();
const xcmTransferTool = agent.xcmTransferNativeTool();
