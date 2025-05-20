
import React, { useState } from 'react';
import { Message, MessageType } from '@/contexts/ChatContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
  const [isExpanded, setIsExpanded] = useState(false);

  const messageClasses = cn(
    "p-4 max-w-[85%] rounded-xl break-words",
    {
      // User message (right side)
      "self-end bg-crypto-yellow text-black rounded-tr-none": message.type === 'user',
      // Assistant message (left side)
      "self-start bg-crypto-gray text-white rounded-tl-none": isAssistant,
      // Thinking message
      "self-start bg-crypto-gray/75 backdrop-blur-sm text-crypto-text font-mono border border-crypto-lightgray/30": isThinking,
    }
  );

  if (isThinking) {
    return (
      <motion.div
        className={cn("flex flex-col items-start")}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={messageVariants}
        layout
      >
        <Accordion type="single" collapsible className="w-full max-w-[85%]">
          <AccordionItem value="thinking" className="border-none">
            <div className={cn(
              "bg-crypto-gray/75 backdrop-blur-sm border border-crypto-lightgray/30 rounded-xl rounded-tl-none p-4",
              "flex flex-col"
            )}>
              <AccordionTrigger className="py-0 text-crypto-text font-mono">
                Jeremias está pensando...
              </AccordionTrigger>
              <AccordionContent className="pt-3 pb-0">
                <div className="space-y-2 text-crypto-text font-mono">
                  {message.content.split('\n').map((line, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <div>{line}</div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
        <span className="text-xs text-crypto-text mt-1 px-1">
          {format(message.timestamp, 'HH:mm', { locale: ptBR })}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("flex flex-col", isAssistant ? "items-start" : "items-end")}
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
