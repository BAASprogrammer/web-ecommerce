"use client";
import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Bot } from "lucide-react";
import { useAiChat } from "@/hooks/data/useAi";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "¡Hola! Soy **Nexa**, tu asistente de NexaMarket. ¿En qué te puedo ayudar hoy? 🛍️", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const chatMutation = useAiChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setInput("");

    chatMutation.mutate(userMessage, {
      onSuccess: (answer) => {
        setMessages((prev) => [...prev, { text: answer, isUser: false }]);
      },
      onError: () => {
        setMessages((prev) => [
          ...prev,
          { text: "Lo siento, tuve un problema al procesar tu solicitud. Intenta de nuevo.", isUser: false },
        ]);
      },
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          className="w-[370px] flex flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{
            height: "520px",
            background: "#ffffff",
            border: "1px solid rgba(5,150,105,0.15)",
            boxShadow: "0 24px 64px -12px rgba(55,48,163,0.20), 0 4px 24px rgba(0,0,0,0.08)",
            animation: "chatSlideIn 0.25s cubic-bezier(.4,0,.2,1) forwards",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #4F46E5 0%, #EA580C 100%)",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Bot size={20} color="white" />
              </div>
              <div>
                <p style={{ color: "white", fontWeight: 700, fontSize: "0.95rem", margin: 0, lineHeight: 1.2 }}>
                  Nexa Asistente
                </p>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.73rem", margin: 0 }}>
                  {chatMutation.isPending ? "Escribiendo..." : "• En línea"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "8px",
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            >
              <X size={18} color="white" />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: "#F7F4F0",
            }}
          >
            {messages.map((msg, idx) =>
              msg.isUser ? (
                <div
                  key={idx}
                  style={{
                    alignSelf: "flex-end",
                    maxWidth: "82%",
                    background: "linear-gradient(135deg, #4F46E5 0%, #EA580C 100%)",
                    color: "white",
                    borderRadius: "18px 18px 4px 18px",
                    padding: "10px 14px",
                    fontSize: "0.875rem",
                    lineHeight: 1.55,
                    boxShadow: "0 2px 8px rgba(79,70,229,0.28)",
                  }}
                >
                  {msg.text}
                </div>
              ) : (
                <div
                  key={idx}
                  style={{
                    alignSelf: "flex-start",
                    maxWidth: "82%",
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #4F46E5 0%, #EA580C 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Bot size={14} color="white" />
                  </div>
                  <div
                    style={{
                      background: "white",
                      border: "1px solid rgba(79,70,229,0.12)",
                      color: "#1f2937",
                      borderRadius: "18px 18px 18px 4px",
                      padding: "10px 14px",
                      fontSize: "0.875rem",
                      lineHeight: 1.55,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              )
            )}

            {chatMutation.isPending && (
              <div style={{ alignSelf: "flex-start", display: "flex", gap: "8px", alignItems: "flex-end" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #4F46E5 0%, #EA580C 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bot size={14} color="white" />
                </div>
                <div
                  style={{
                    background: "white",
                    border: "1px solid rgba(79,70,229,0.12)",
                    borderRadius: "18px 18px 18px 4px",
                    padding: "12px 16px",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #4F46E5, #EA580C)",
                        animation: `typingBounce 1.2s ease infinite`,
                        animationDelay: `${i * 0.2}s`,
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px 14px",
              background: "white",
              borderTop: "1px solid rgba(5,150,105,0.1)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Pregunta sobre nuestros productos..."
              disabled={chatMutation.isPending}
              style={{
                flex: 1,
                border: "1.5px solid #e5e7eb",
                borderRadius: "12px",
                padding: "10px 14px",
                fontSize: "0.875rem",
                outline: "none",
                fontFamily: "inherit",
                background: "#f9fafb",
                color: "#111827",
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "#4F46E5")}
              onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || chatMutation.isPending}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: input.trim() && !chatMutation.isPending
                  ? "linear-gradient(135deg, #4F46E5 0%, #EA580C 100%)"
                  : "#e5e7eb",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() && !chatMutation.isPending ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                flexShrink: 0,
                boxShadow: input.trim() && !chatMutation.isPending
                  ? "0 4px 12px rgba(234,88,12,0.35)"
                  : "none",
              }}
            >
              <Send size={17} color={input.trim() && !chatMutation.isPending ? "white" : "#9ca3af"} />
            </button>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          background: isOpen
            ? "#3730A3"
            : "linear-gradient(135deg, #4F46E5 0%, #EA580C 100%)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isOpen
            ? "0 8px 24px rgba(55,48,163,0.35)"
            : "0 8px 24px rgba(79,70,229,0.45)",
          transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
          transform: isOpen ? "rotate(90deg) scale(1.05)" : "rotate(0deg) scale(1)",
        }}
        onMouseEnter={e => {
          if (!isOpen) e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = isOpen ? "rotate(90deg) scale(1.05)" : "scale(1)";
        }}
        aria-label="Abrir chatbot"
      >
        {isOpen ? <X size={22} color="white" /> : <Sparkles size={22} color="white" />}
      </button>

      <style>{`
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%           { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
