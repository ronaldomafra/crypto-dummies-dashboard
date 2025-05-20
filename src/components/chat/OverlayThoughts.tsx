
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { motion } from 'framer-motion';
import { CircleCheck, Loader } from 'lucide-react';

const OverlayThoughts: React.FC = () => {
  const { thinkingSteps, isThinking } = useChat();

  if (!isThinking && thinkingSteps.length === 0) return null;

  return (
    <motion.div
      className="absolute bottom-20 right-6 z-10 flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-crypto-gray/80 backdrop-blur-sm p-4 rounded-xl border border-crypto-lightgray/30 shadow-xl max-w-md w-full"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h3 className="text-base font-medium text-white mb-3">Jeremias está pensando...</h3>
        
        <div className="space-y-2.5">
          {thinkingSteps.map((step) => (
            <motion.div
              key={step.id}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {step.completed ? (
                <CircleCheck className="w-5 h-5 text-crypto-positive flex-shrink-0 mt-0.5" />
              ) : (
                <Loader className="w-5 h-5 text-crypto-yellow animate-spin flex-shrink-0 mt-0.5" />
              )}
              <div className="flex flex-col">
                <span className={`${step.completed ? 'text-white' : 'text-crypto-text'}`}>
                  {step.description}
                </span>
                {step.completed && (
                  <span className="text-xs text-crypto-text mt-0.5">
                    {getStepDescription(step.description)}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

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

export default OverlayThoughts;
