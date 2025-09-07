import React from 'react';
import { Bot, User, Scale } from 'lucide-react';

interface ChatMessageProps {
  isBot: boolean;
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isBot, message }) => {
  return (
    <div className="">
      {/* Top Bar for Small Screens */}
      <div className="fixed top-0 left-0 w-full bg-cyan-50 text-black text-center py-3 font-bold sm:hidden z-10 items-center">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Scale className="w-6 h-6 text-black" />
          Law Guard AI
        </h1>
      </div>

      {/* Chat Messages (with padding to prevent overlap) */}
      <div className="pt-12 sm:pt-0 bg-white-50"> {/* Adds padding on small screens */}
        <div className={`flex items-center ${isBot ? 'bg-white-50' : 'bg-white-50'}`}>
          <div className={`flex items-center w-full ${isBot ? 'justify-start' : 'justify-end'}`}>
            {isBot ? (
              <>
                {/* Bot Icon Container */}
                <div className="flex-shrink-0 px-4 py-6">
                  <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-black" />
                  </div>
                </div>
                {/* Bot Message Container */}
                <div className="py-6 pr-4">
                  <div className="inline-block rounded-lg px-4 py-2 break-words bg-white border border-gray-100">
                    <p className="leading-relaxed whitespace-pre-wrap text-left">{message}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* User Message Container */}
                <div className="py-6 pl-4">
                  <div className="break-all inline-block rounded-lg px-4 py-2 bg-gradient-to-br from-blue-100 to-blue-50 text-black max-w-full h-auto">
                    <p className="leading-relaxed whitespace-pre-wrap text-right overflow-wrap">{message}</p>
                  </div>
                </div>
                {/* User Icon Container */}
                <div className="flex-shrink-0 px-4 py-6">
                  <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-black" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
