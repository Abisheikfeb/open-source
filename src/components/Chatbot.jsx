import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        { contents: [{ parts: [{ text: input }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API Response:", response.data); 

      const botResponse = response.data?.candidates?.[0]?.content?.parts?.map(part => part.text).join(" ") || "I'm not sure about that.";

      setMessages([...newMessages, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setMessages([...newMessages, { sender: "bot", text: "Error! Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 py-5 md:px-9 " >
      <h2 className="text-lg font-semibold text-center mb-2">AI Chatbot</h2>

      <div className=" h-72 overflow-y-auto border mt-5 md:h-96 space-y-3 px-6 rounded-md bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 px-5 rounded-md mt-3 max-w-2xl ${
              msg.sender === "user"
                ? "bg-pink-200 border-2  border-red-500 text-black self-end ml-auto"
                : "bg-gray-300 text-black"
            }`}
          >
            {msg.text || "No response received."}
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">Typing...</div>}
      </div>

      <div className="mt-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-l-md text-black focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

