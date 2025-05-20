
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { motion } from 'framer-motion';
import { CircleCheck, Loader } from 'lucide-react';

const OverlayThoughts: React.FC = () => {
  const { thinkingSteps } = useChat();

  return (
    <motion.div
      className="absolute inset-0 bg-crypto-dark/90 backdrop-blur-[2px] z-10 flex items-center justify-center"
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(2px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-crypto-gray/90 p-6 rounded-xl border border-crypto-lightgray shadow-xl max-w-md w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h3 className="text-lg font-medium text-white mb-4">Jeremias está pensando...</h3>
        
        <div className="space-y-3">
          {thinkingSteps.map((step) => (
            <motion.div
              key={step.id}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {step.completed ? (
                <CircleCheck className="w-5 h-5 text-crypto-positive" />
              ) : (
                <Loader className="w-5 h-5 text-crypto-yellow animate-spin" />
              )}
              <span className={`${step.completed ? 'text-white' : 'text-crypto-text'}`}>
                {step.description}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OverlayThoughts;
