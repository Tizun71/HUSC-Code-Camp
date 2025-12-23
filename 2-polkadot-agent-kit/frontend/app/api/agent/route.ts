import { NextRequest, NextResponse } from "next/server";
import { handleAgentRequest } from "@/lib/agent/handler";
import { ChatModelFactory } from "@/lib/agent/models";

export async function POST(req: NextRequest) {
  try {
    const { message, chatHistory } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Create chat model
    const llm = ChatModelFactory.create({ provider: "openai" });

    // Handle agent request with tools (empty array for now)
    const response = await handleAgentRequest(
      message,
      llm,
      [], // TODO: Add tools here
      chatHistory || []
    );

    console.log("Agent response:", response);

    return NextResponse.json({
      response,
      success: true,
    });
  } catch (error) {
    console.error("Error in agent route:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
