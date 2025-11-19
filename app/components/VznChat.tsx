import React, { useState } from "react";
import { getVznTextReply, getVznImageReply } from "../lib/vznApi";

interface Message {
  role: "user" | "vzn";
  text: string;
  image?: string;
}

type Props = {
  apiText: string;
  apiImage: string;
  isGroup?: boolean;
};

export default function VznChat({ apiText, apiImage, isGroup }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input) return;
    setLoading(true);
    setMessages((msgs) => [...msgs, { role: "user", text: input }]);
    let reply;
    let image;
    try {
      reply = await getVznTextReply(input, apiText);
      setMessages((msgs) => [...msgs, { role: "vzn", text: reply }]);
      // if prompt requests image, trigger image endpoint (customize based on UX!)
      if (input.toLowerCase().includes("generate image")) {
        image = await getVznImageReply(input, apiImage);
        setMessages((msgs) => [...msgs, { role: "vzn", text: "Image generated:", image }]);
      }
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: "vzn", text: "AI error: " + err.message }]);
    }
    setInput("");
    setLoading(false);
  }

  return (
    <div className="bg-white dark:bg-gray-900 border rounded-lg p-6 max-w-md mx-auto shadow-md">
      <div className="mb-3 font-bold flex gap-2 items-center">
        <img src="/vzn.png" className="w-9 h-9 rounded-full" alt="VZN Avatar" />
        <span className="text-blue-700 dark:text-blue-300">VZN AI Chatbot</span>
      </div>
      <div className="mb-4 h-48 overflow-y-auto flex flex-col gap-2">
        {messages.map((msg, i) =>
          <div key={i} className={`text-sm ${msg.role === 'vzn'
            ? 'text-blue-800 dark:text-blue-200 bg-blue-50 dark:bg-blue-400/20 p-2 rounded'
            : 'text-gray-900 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded p-2'}`}>
            <b>{msg.role === 'vzn' ? 'VZN' : 'You'}:</b> {msg.text}
            {msg.image && (
              <img src={msg.image} alt="VZN Generated" className="mt-2 max-w-full rounded shadow" />
            )}
          </div>
        )}
        {loading && <div>Typing...</div>}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={isGroup ? "Tag @vzn (ask VZN)..." : "DM VZN..."}
        className="border rounded p-2 mb-3 w-full dark:bg-gray-800"
        onKeyDown={e => e.key === "Enter" && sendMessage()}
        disabled={loading}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white rounded px-4 py-1"
        disabled={loading}
      >{loading ? "Sending..." : "Send"}</button>
    </div>
  );
}
