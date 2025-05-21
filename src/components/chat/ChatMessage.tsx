
import React from 'react';
import { Message } from '@/contexts/ChatContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CircleCheck, Loader } from 'lucide-react';
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

  const messageClasses = cn(
    "max-w-[85%] break-words",
    {
      // User message (right side) - Improved font styling for questions
      "self-end text-black font-medium": message.type === 'user',
      // Assistant message (left side) - Distinctive font styling for responses
      "self-start text-white font-normal": isAssistant,
      // Thinking message - Monospace for thinking process
      "self-start text-crypto-text font-mono text-sm": isThinking,
    }
  );

  if (isThinking) {
    const thinkingSteps = message.content.split('\n').filter(step => step.trim() !== '');
    
    return (
      <motion.div
        className={cn("flex flex-col items-start")}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={messageVariants}
        layout
      >
        <Accordion type="single" collapsible className="w-full max-w-[85%]" defaultValue="thinking">
          <AccordionItem value="thinking" className="border-none">
            <div className={cn(
              "backdrop-blur-sm rounded-xl rounded-tl-none p-4",
              "flex flex-col"
            )}>
              <AccordionTrigger className="py-0 text-crypto-text font-mono">
                Jeremias está pensando...
              </AccordionTrigger>
              <AccordionContent className="pt-3 pb-0">
                <div className="space-y-2 text-crypto-text font-mono">
                  {thinkingSteps.map((step, i) => {
                    // Determine if this step is completed based on the following conditions:
                    // - If it's not the last step in the array, it's completed
                    // - If it's the last step AND there are assistant messages after this one, it's completed
                    const isLastStep = i === thinkingSteps.length - 1;
                    const isCompleted = !isLastStep || hasResponseAfterThinking(message);
                    
                    return (
                      <div key={i} className="flex items-start gap-3">
                        {isCompleted ? (
                          <CircleCheck className="w-5 h-5 text-crypto-positive flex-shrink-0 mt-0.5" />
                        ) : (
                          <Loader className="w-5 h-5 text-crypto-yellow animate-spin flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex flex-col">
                          <span className={`${isCompleted ? 'text-white' : 'text-crypto-text'}`}>
                            {step}
                          </span>
                          {isCompleted && (
                            <span className="text-xs text-crypto-text mt-0.5">
                              {getStepDescription(step)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
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

// Helper function to check if there is an assistant message after this thinking message
// This helps determine if the thinking process is complete
function hasResponseAfterThinking(thinkingMessage: Message): boolean {
  // We can check if there's a message in the DOM with a timestamp after this one
  // and type 'assistant'
  const allMessages = document.querySelectorAll('[data-message-type]');
  let foundThinking = false;
  
  for (const element of allMessages) {
    const messageType = element.getAttribute('data-message-type');
    
    // Once we find our thinking message, start looking for following assistant messages
    if (messageType === 'thinking' && 
        element.getAttribute('data-message-id') === thinkingMessage.id) {
      foundThinking = true;
      continue;
    }
    
    // If we already found our thinking message and now found an assistant message,
    // it means the thinking is complete
    if (foundThinking && messageType === 'assistant') {
      return true;
    }
  }
  
  return false;
}

// Helper function to get descriptions for each step
function getStepDescription(stepName: string): string {
  const descriptions: Record<string, string> = {
    'Analisando requisitos...': 'Processando seu pedido e identificando as necessidades',
    'Processando dados de mercado...': 'Consultando dados atualizados de corretoras',
    'Gerando recomendações...': 'Criando sugestões baseadas nos padrões de mercado',
    'Finalizando resposta...': 'Organizando informações para uma resposta clara'
  };
  
  return descriptions[stepName] || 'Processando...';
}

export default ChatMessage;
