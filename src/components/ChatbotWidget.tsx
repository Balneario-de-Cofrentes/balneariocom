"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";

const API_URL = "https://balneario-bot-production.juan-764.workers.dev";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex h-16 items-center gap-3 rounded-full border-2 border-lime bg-lime px-6 font-body font-semibold text-navy shadow-lg transition-all hover:scale-105 hover:shadow-lime/30"
        style={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <MessageSquare size={22} />
        <span className="hidden sm:inline">Balnearibot</span>
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-sm font-bold text-lime">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] animate-in fade-in slide-in-from-bottom-8 duration-300 sm:w-[500px]">
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone/20 bg-gradient-to-r from-navy to-navy/90 px-5 py-4">
              <div>
                <h3 className="text-lg font-display font-semibold text-white">
                  🏥 Balneario de Cofrentes
                </h3>
                <p className="text-sm font-body text-white/80">Asistente Virtual</p>
              </div>
              <button
                onClick={toggleChat}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Cerrar chat"
              >
                <X size={18} />
              </button>
            </div>

            <iframe
              src={`${API_URL}/chat-widget`}
              className="h-[500px] w-full border-0"
              title="Chatbot Balneario"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="clipboard-write; microphone"
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-in-from-bottom-8 {
          from {
            transform: translateY(32px);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
