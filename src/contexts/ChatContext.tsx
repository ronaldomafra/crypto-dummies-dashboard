import React, { createContext, useContext, useState, useEffect } from 'react';

// Message types
export type MessageType = 'user' | 'assistant' | 'thinking';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

// Thinking process steps
export interface ThinkingStep {
  id: string;
  description: string;
  completed: boolean;
}

interface ChatContextType {
  messages: Message[];
  isThinking: boolean;
  thinkingSteps: ThinkingStep[];
  sendMessage: (content: string) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState<ThinkingStep[]>([]);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: 'Olá, eu sou o Jeremias! Como posso ajudar você hoje com suas negociações?',
          type: 'assistant',
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const generateThinkingSteps = () => {
    return [
      { id: '1', description: 'Analisando requisitos...', completed: false },
      { id: '2', description: 'Processando dados de mercado...', completed: false },
      { id: '3', description: 'Gerando recomendações...', completed: false },
      { id: '4', description: 'Finalizando resposta...', completed: false },
    ];
  };

  const simulateThinking = async (steps: ThinkingStep[]) => {
    setIsThinking(true);
    const updatedSteps = [...steps];
    
    for (let i = 0; i < steps.length; i++) {
      // Update current step to completed
      updatedSteps[i] = { ...updatedSteps[i], completed: true };
      setThinkingSteps([...updatedSteps]);
      
      // Wait for a random time between 700-1500ms
      await new Promise(resolve => setTimeout(resolve, 700 + Math.random() * 800));
    }
    
    // Keep the overlay for a moment after all steps complete
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsThinking(false);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Create and show thinking steps
    const steps = generateThinkingSteps();
    setThinkingSteps(steps);
    
    // Simulate thinking process
    await simulateThinking(steps);
    
    // Generate assistant response based on user input
    let response: string;
    
    if (content.toLowerCase().includes('mercado') || content.toLowerCase().includes('bitcoin')) {
      response = "O mercado de criptomoedas está volátil como sempre! O Bitcoin está mostrando sinais de recuperação após a recente correção. Recomendo observar os níveis de suporte em $48,000 e resistência em $52,000 antes de tomar decisões.";
    } else if (content.toLowerCase().includes('ajuda') || content.toLowerCase().includes('help')) {
      response = "Posso ajudar com análises de mercado, recomendações de negociação, configuração de bots, e muito mais. Basta me dizer o que você precisa!";
    } else if (content.toLowerCase().includes('bot') || content.toLowerCase().includes('automação')) {
      response = "Nossos bots de trading são configurados para maximizar ganhos enquanto minimizam riscos. Você pode ajustar parâmetros como stop-loss, take-profit e intervalos de negociação em qualquer momento.";
    } else {
      response = "Entendi sua mensagem. Posso fornecer mais informações sobre estratégias de trading, análise técnica, ou configuração de bots. O que você gostaria de saber em mais detalhes?";
    }
    
    // Add assistant response
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      type: 'assistant',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };

  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        content: 'Olá, eu sou o Jeremias! Como posso ajudar você hoje com suas negociações?',
        type: 'assistant',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isThinking,
        thinkingSteps,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
