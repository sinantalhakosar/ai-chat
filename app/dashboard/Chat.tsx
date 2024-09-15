"use client";

import { useChat } from "ai/react";
import { ModelType } from "../api/chat/route";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: {
      model: ModelType.GEMINI_1_5_FLASH,
    },
    initialMessages: [
        {
          id: "welcome-message",
          role: "assistant",
          content: `Hello! I'm using the ${ModelType.GEMINI_1_5_FLASH} model. How can I assist you today?`,
        },
      ],
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "Human: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
