"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { ChatMessage } from "@/types";
import { X, Send } from "lucide-react";

export function ChatModal() {
  const { chatBookId, closeChat, getBook } = useApp();
  const book = chatBookId ? getBook(chatBookId) : null;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (book) {
      setMessages([
        {
          me: false,
          text: `Hi! Thanks for your interest in "${book.title}" 📚 It's ${book.condition.toLowerCase()} and available. Feel free to ask anything!`,
        },
      ]);
    }
  }, [book]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!chatBookId || !book) return null;

  const getSellerReply = (query: string): string => {
    const q = query.toLowerCase();
    const p = book.price;

    if (/avail|stock|left/.test(q)) {
      return `Yes, it's available! ${
        book.stock <= 1
          ? "Only 1 copy left though — several readers asked today."
          : book.stock + " copies in stock."
      } Want me to hold it for you?`;
    }
    if (/price|negot|discount|best|less|final/.test(q)) {
      return `The listed price is ₹${p}. I can do ₹${Math.max(
        49,
        Math.round(p * 0.92)
      )} for a quick pickup today. Fair? 🤝`;
    }
    if (/meet|pickup|location|deliver|ship|address/.test(q)) {
      return `I'm in ${book.location}. I can ship in 24h (free over ₹500) or meet near a metro station this evening. What works best for you?`;
    }
    if (/condition|mark|highlight|tear|damage/.test(q)) {
      return `Honestly graded as "${book.condition}" — ${
        book.condition === "New" || book.condition === "Like New"
          ? "no markings at all, spine is clean and intact. I can share more photos if needed!"
          : "light wear as described, all pages are present. Binding is firm!"
      }`;
    }
    if (/hi|hello|hey/.test(q)) {
      return `Hello! 👋 Great pick — "${book.title}" is a fantastic book. Ask me anything about its condition, price or delivery!`;
    }
    if (/thank/.test(q)) {
      return "You're most welcome! 😊 Let me know if you'd like to proceed — happy reading!";
    }
    if (/upi|pay|payment/.test(q)) {
      return "You can pay securely right through BookOLX (recommended — buyer protection included) or via UPI on delivery. Totally up to you!";
    }
    const fallbacks = [
      "Got it! Anything else you'd like to check about the book?",
      "Sure thing — happy to help! Would you like me to share more details?",
      "Sounds good! Let me know if you would like me to reserve this copy 👍",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { me: true, text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getSellerReply(text);
      setMessages((prev) => [...prev, { me: false, text: reply }]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-3 md:right-6 z-[60] w-[calc(100vw-1.5rem)] max-w-sm">
      <div
        className="bg-white rounded-3xl shadow-2xl border border-ink/10 overflow-hidden pop-in flex flex-col"
        style={{ height: "min(520px, 72vh)" }}
      >
        {/* Chat Header */}
        <div className="bg-ink text-white p-3.5 flex items-center gap-3 shrink-0">
          <img
            src={book.sellerAvatar}
            className="w-10 h-10 rounded-full border-2 border-sun object-cover"
            alt={book.seller}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(book.seller) +
                "&background=002F34&color=FFCE32";
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-sm truncate">{book.seller}</div>
            <div className="text-[11px] text-green-300 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span>Online • replies in ~5 min</span>
            </div>
          </div>
          <button
            onClick={closeChat}
            className="w-9 h-9 bg-white/10 rounded-xl hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Book Context Strip */}
        <div className="px-3 py-2 bg-cream border-b border-ink/10 flex items-center gap-2.5 shrink-0">
          <img
            src={book.image}
            alt={book.title}
            className="w-9 h-11 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-extrabold truncate text-ink">{book.title}</div>
            <div className="text-[11px] font-bold text-ink/50">
              ₹{book.price} • {book.condition}
            </div>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-paper/60">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.me ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`text-[13px] font-medium px-3.5 py-2.5 rounded-2xl max-w-[82%] leading-relaxed ${
                  m.me
                    ? "bg-ink text-white rounded-br-sm shadow-sm"
                    : "bg-white border border-ink/10 text-ink rounded-bl-sm shadow-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-ink/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center shadow-sm">
                <span className="w-1.5 h-1.5 bg-ink/40 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-ink/40 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 bg-ink/40 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Chips */}
        <div className="px-3 pt-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0 bg-white">
          <button
            type="button"
            onClick={() => handleSend("Is this available?")}
            className="text-[11px] font-extrabold border border-ink/15 rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-ink hover:text-white transition cursor-pointer"
          >
            Is this available?
          </button>
          <button
            type="button"
            onClick={() => handleSend("What is your best price?")}
            className="text-[11px] font-extrabold border border-ink/15 rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-ink hover:text-white transition cursor-pointer"
          >
            Best price?
          </button>
          <button
            type="button"
            onClick={() => handleSend("Can we meet today?")}
            className="text-[11px] font-extrabold border border-ink/15 rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-ink hover:text-white transition cursor-pointer"
          >
            Meet today?
          </button>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputVal);
          }}
          className="p-3 flex gap-2 bg-white shrink-0"
        >
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a message…"
            className="flex-1 bg-paper rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 ring-ink/20 min-w-0"
          />
          <button
            type="submit"
            className="w-11 h-11 bg-ink text-sun rounded-xl shrink-0 hover:bg-inkLight transition flex items-center justify-center cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
