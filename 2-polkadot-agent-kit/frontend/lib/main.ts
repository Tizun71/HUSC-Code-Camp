import { PolkadotAgentKit } from "@polkadot-agent-kit/sdk";
import { handleAgentRequest } from "./agent/handler";
import { ChatModelFactory } from "./agent/models";
import dotenv from "dotenv";
import { agent } from "./agent/config";

dotenv.config();

async function main() {
  const msg = "Hello can I get my balance of my Polkadot wallet?";
  const openai = ChatModelFactory.create({ provider: "openai" });
  const response = await handleAgentRequest(msg, openai, [agent.getNativeBalanceTool()]);
  console.log("Final Response:", response);
}

main().then(() => {
  console.log("Done");
}).catch((err) => {
  console.error("Error in main:", err);
});