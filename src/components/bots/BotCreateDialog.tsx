
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface BotCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Nome do bot é obrigatório"),
  pair: z.string().min(1, "Par de negociação é obrigatório"),
  type: z.string().min(1, "Tipo de bot é obrigatório"),
  exchange: z.string().min(1, "Exchange é obrigatória"),
  status: z.string().default("ativo"),
  profit: z.string().default("+0.00"),
});

const BotCreateDialog = ({ open, onClose, onSubmit }: BotCreateDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      pair: "",
      type: "",
      exchange: "",
      status: "ativo",
      profit: "+0.00",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-crypto-gray border-crypto-lightgray text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Bot</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Bot</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Bot de Arbitragem BTC" 
                      className="bg-crypto-lightgray border-crypto-lightgray"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pair"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Par de Negociação</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: BTC/USDT" 
                      className="bg-crypto-lightgray border-crypto-lightgray"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Bot</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-crypto-lightgray border-crypto-lightgray">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-crypto-gray border-crypto-lightgray">
                      <SelectItem value="Arbitragem">Arbitragem</SelectItem>
                      <SelectItem value="Tendência">Tendência</SelectItem>
                      <SelectItem value="Grid">Grid</SelectItem>
                      <SelectItem value="DCA">DCA</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="exchange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exchange</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-crypto-lightgray border-crypto-lightgray">
                        <SelectValue placeholder="Selecione a exchange" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-crypto-gray border-crypto-lightgray">
                      <SelectItem value="Binance">Binance</SelectItem>
                      <SelectItem value="Bybit">Bybit</SelectItem>
                      <SelectItem value="Kucoin">Kucoin</SelectItem>
                      <SelectItem value="Coinbase">Coinbase</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="border-crypto-lightgray"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-crypto-yellow text-black hover:bg-crypto-yellow/90"
              >
                Criar Bot
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BotCreateDialog;
