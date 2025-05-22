
import React, { useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Chat = () => {
  const { messages, clearMessages } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-screen bg-crypto-dark overflow-hidden relative">
      {/* Chat header */}
      <motion.div 
        className="flex justify-between items-center px-6 py-4 border-b border-crypto-lightgray"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-crypto-yellow flex items-center justify-center text-black font-bold">
            J
          </div>
          <h2 className="ml-3 text-xl font-semibold text-white">Jeremias</h2>
        </div>
        <Button 
          variant="ghost" 
          onClick={clearMessages}
          className="text-crypto-text hover:text-white hover:bg-crypto-lightgray"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Limpar Chat
        </Button>
      </motion.div>

      {/* Chat messages */}
      <ScrollArea 
        className="flex-grow px-6 py-6 pb-16" 
        ref={scrollAreaRef}
      >
        <div className="flex flex-col space-y-6 min-h-full mx-auto max-w-4xl">
          {messages.map((message) => (
            <div 
              key={message.id} 
              data-message-id={message.id}
              data-message-type={message.type}
              data-message-timestamp={message.timestamp.toISOString()}
            >
              <ChatMessage message={message} />
            </div>
          ))}
          <div className="h-10"></div> {/* Extra space at bottom */}
        </div>
      </ScrollArea>

      {/* Chat input */}
      <div className="w-full px-6 py-4 border-t border-crypto-lightgray bg-crypto-dark">
        <div className="mx-auto max-w-4xl">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Chat;
