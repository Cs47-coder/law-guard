import React, { useState, useRef } from 'react';
import { Send, Mic } from 'lucide-react';

// SpeechRecognition type declarations remain the same
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

declare global {
  interface Window {
    SpeechRecognition: { new (): SpeechRecognition };
    webkitSpeechRecognition: { new (): SpeechRecognition };
  }
}

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);
    recognitionRef.current = recognition;
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
      stopRecording();

      // Reset textarea height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto'; // Reset height before calculating new height
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height to fit content
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white-50">
      <div className="flex gap-4 max-w-4xl mx-auto items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your legal question..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none overflow-auto"
          rows={1} // Initial visible height of 1 row (user can enter more)
          style={{
            maxHeight: 'calc(5 * 1.5rem)', // Limit to 5 rows in height
            minHeight: '2rem', // Minimum height to accommodate at least 1 row
            resize: 'none', // Prevent resizing by the user
          }}
          onInput={handleInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          className={`rounded-lg flex items-center justify-center shrink-0 h-10 text-black ${
            isRecording
              ? 'bg-cyan-600 hover:bg-cyan-700'
              : 'bg-white hover:bg-cyan-50'
          } w-10 md:w-auto md:px-4`}
        >
          <Mic className="w-4 h-4" />
          <span className="hidden md:inline ml-2">
            {isRecording ? 'Stop' : 'Record'}
          </span>
        </button>
        <button
          type="submit"
          className="rounded-lg bg-white text-black hover:bg-cyan-50 transition-all flex items-center justify-center shrink-0 h-10 w-10 md:w-auto md:px-4"
          id="sendd"
        >
          <Send className="w-4 h-4" />
          <span className="hidden md:inline ml-2">Send</span>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
