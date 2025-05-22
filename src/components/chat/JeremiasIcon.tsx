
import React from 'react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Chat from '@/pages/Chat';

interface JeremiasIconProps {
  className?: string;
}

const JeremiasIcon: React.FC<JeremiasIconProps> = ({ className }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={cn(
          "fixed bottom-6 right-6 bg-crypto-yellow text-black p-2 rounded-full flex items-center justify-center shadow-lg hover:bg-crypto-yellow/90 transition-all group z-50",
          "hover:scale-105",
          className
        )}>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 border-2 border-black">
              <AvatarImage src="/lovable-uploads/3911a3b3-2e6b-4f47-90c2-3c46abf0bdde.png" alt="Jeremias" />
              <AvatarFallback className="bg-crypto-yellow text-black font-bold">J</AvatarFallback>
            </Avatar>
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap">
              Jeremias
            </span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] p-0 border border-crypto-lightgray">
        <DialogTitle className="sr-only">Chat com Jeremias</DialogTitle>
        <Chat isModal={true} />
      </DialogContent>
    </Dialog>
  );
};

export default JeremiasIcon;
