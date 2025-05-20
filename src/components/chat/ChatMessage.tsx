
import React from 'react';
import { Message, MessageType } from '@/contexts/ChatContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ChatMessageProps {
  message: Message;
}

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.2,
    }
  }
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.type === 'assistant';
  const isThinking = message.type === 'thinking';

  const messageClasses = cn(
    "p-4 max-w-[85%] rounded-xl break-words",
    {
      // User message (right side)
      "self-end bg-crypto-yellow text-black rounded-tr-none": message.type === 'user',
      // Assistant message (left side)
      "self-start bg-crypto-gray text-white rounded-tl-none shadow-md": isAssistant,
      // Thinking message
      "self-start bg-crypto-gray/75 text-crypto-text font-mono border border-crypto-lightgray/30": isThinking,
    }
  );

  return (
    <motion.div
      className={cn("flex flex-col", isAssistant || isThinking ? "items-start" : "items-end")}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={messageVariants}
      layout
    >
      <div className={messageClasses}>
        {message.content}
      </div>
      <span className="text-xs text-crypto-text mt-1 px-1">
        {format(message.timestamp, 'HH:mm', { locale: ptBR })}
      </span>
    </motion.div>
  );
};

export default ChatMessage;
