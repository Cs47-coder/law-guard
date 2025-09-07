import { useState, useRef, useEffect } from 'react';
import ChatInput from '../components/ChatInput';
import { post } from '../utils/fetchHelpers';
import { Bot, User, Scale } from 'lucide-react'; // Import icons

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 15) return 'Good afternoon';
  if (hour < 19) return 'Good evening';
  if (hour < 23) return 'How was the Day';
  return "Hello"
};

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<
    { isBot: boolean; message: string }[]
  >([]);
  const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!isFirstMessageSent) {
      setMessages([{ isBot: false, message }]);
      setIsFirstMessageSent(true);
    } else {
      setMessages((prev) => [...prev, { isBot: false, message }]);
    }

    try {
      const result = await post('/ask', { question: message, lang: 'en' });

      setMessages((prev) => [
        ...prev,
        {
          isBot: true,
          message:
            result.data.answer ||
            "I'm sorry, I couldn't understand your question. Please try again.",
        },
      ]);
    } catch (error) {
      console.error('Error sending question to backend:', error);
      setMessages((prev) => [
        ...prev,
        {
          isBot: true,
          message:
            'There was an error processing your request. Please try again later.',
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-full overflow-hidden bg-blue-50">
      {/* Top Bar - Small screen only */}
      <div className="w-full bg-cyan-50 text-black font-semibold text-lg px-4 py-3 shadow-md fixed top-0 z-20 md:hidden ">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Scale className="w-6 h-6 text-black" />
            Law Guard AI
          </h1>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-2 py-4 pt-20 md:pt-4">
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 px-2">
          {/* Welcome Message */}
          {!isFirstMessageSent && (
            <div className="text-center text-base font-bold text-gray-800 py-4">
              {getGreeting()}...?<br />
              I'm your AI legal assistant. How can I help you today?
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start ${
                msg.isBot ? 'justify-start' : 'justify-end'
              }`}
            >
              {msg.isBot && (
                <Bot className="w-5 h-5 text-black mr-2 mt-[6px] bg-cyan-50" />
              )}
              <div className="max-w-[80%] md:max-w-[60%] bg-white px-4 py-3 rounded-xl shadow-md text-sm text-black">
                {msg.message}
              </div>
              {!msg.isBot && (
                <User className="w-8 h-8 text-black ml-2 mt-[6px] bg-cyan-50" />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="w-full px-2 py-3 bg-blue-50 z-10">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
