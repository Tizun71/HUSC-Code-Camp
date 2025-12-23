import {
  HumanMessage,
  SystemMessage,
  ToolMessage,
  AIMessage,
} from "@langchain/core/messages";
import { type StructuredTool } from "@langchain/core/tools";
import {
  ASSETS_PROMPT,
  BalanceTool,
  BIFROST_PROMPT,
  IDENTITY_PROMPT,
  NOMINATION_PROMPT,
  SWAP_PROMPT,
} from "@polkadot-agent-kit/llm";
import {
  ChatModelFactory,
  ChatModelOptions,
  ChatModelWithTools,
} from "./models";

import dotenv from "dotenv";

dotenv.config();

export const SYSTEM_PROMPT = `
You are a helpful Polkadot AI Agent.
${ASSETS_PROMPT}
${SWAP_PROMPT}
${NOMINATION_PROMPT}
${IDENTITY_PROMPT}
${BIFROST_PROMPT}

When a user asks to perform an action (transfer, swap, vote, etc.), use the available tools.
If you need more information, ask the user.
Always answer in a concise and helpful manner.
`;

export async function handleAgentRequest(
  message: string,
  llm: ChatModelWithTools,
  tools: BalanceTool[],
  chatHistory: any[] = []
): Promise<string> {
  try {
    const llmWithTools = llm.bindTools(tools);

    const messages = [
      new SystemMessage(SYSTEM_PROMPT),
      ...chatHistory,
      new HumanMessage(message),
    ];

    console.log("🤖 AI thinking...");
    const aiResponse = await llmWithTools.invoke(messages);

    if (aiResponse.tool_calls && aiResponse.tool_calls.length > 0) {
      console.log("🛠️ AI wants to use tools:", aiResponse.tool_calls);

      const toolMessages = [];

      for (const toolCall of aiResponse.tool_calls) {
        const selectedTool = tools.find((t) => t.name === toolCall.name);

        if (selectedTool) {
          console.log(`Running tool: ${selectedTool.name}`);
          try {
            const toolOutput = await selectedTool.invoke(toolCall.args);

            toolMessages.push(
              new ToolMessage({
                tool_call_id: toolCall.id || "",
                content: JSON.stringify(toolOutput),
                name: toolCall.name,
              })
            );
          } catch (error) {
            console.error(`Error running tool ${selectedTool.name}:`, error);
            toolMessages.push(
              new ToolMessage({
                tool_call_id: toolCall.id || "",
                content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
                name: toolCall.name,
              })
            );
          }
        }
      }

      const finalMessages = [...messages, aiResponse, ...toolMessages];
      const finalResponse = await llmWithTools.invoke(finalMessages);

      return finalResponse.content as string;
    }

    return aiResponse.content as string;
  } catch (error) {
    console.error("Error in handleAgentRequest:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
}
