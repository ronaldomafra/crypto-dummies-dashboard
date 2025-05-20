
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Mic, MicOff, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { sendMessage, isThinking } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isThinking) {
      sendMessage(input);
      setInput('');
    }
  };

  const toggleRecording = () => {
    // This would be connected to a real speech-to-text API in a production app
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate recording and getting text after 3 seconds
      setTimeout(() => {
        setInput(prev => prev + " Exemplo de texto convertido da fala");
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-3xl mx-auto">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isThinking}
          className="w-full bg-crypto-lightgray text-white pl-4 pr-10 py-3 rounded-full border-crypto-lightgray focus-visible:ring-crypto-yellow"
        />
        <AnimatePresence mode="wait">
          {isThinking ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Loader className="w-5 h-5 text-crypto-text animate-spin" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      
      <Button
        type="button"
        onClick={toggleRecording}
        variant="ghost"
        size="icon"
        disabled={isThinking}
        className={`rounded-full ${isRecording ? 'bg-crypto-negative text-white' : 'bg-crypto-gray text-crypto-text hover:text-white'}`}
      >
        {isRecording ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </Button>
      
      <Button
        type="submit"
        disabled={!input.trim() || isThinking}
        className="rounded-full bg-crypto-yellow hover:bg-crypto-yellow/90 text-black"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default ChatInput;
