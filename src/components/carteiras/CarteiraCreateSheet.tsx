
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";

interface CarteiraCreateSheetProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const formSchema = z.object({
  nome: z.string().min(2, "Nome da carteira é obrigatório"),
  exchange: z.string().min(1, "Exchange é obrigatória"),
  saldo: z.string().default("0 USDT"),
  moedas: z.array(z.string()).default([]),
});

const CarteiraCreateSheet = ({ open, onClose, onSubmit }: CarteiraCreateSheetProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      exchange: "",
      saldo: "0 USDT",
      moedas: [],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      ...data,
      imagem: previewImage || "/placeholder.svg",
    });
    form.reset();
    setPreviewImage(null);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="bg-crypto-gray border-crypto-lightgray text-white sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>Criar Nova Carteira</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-6">
            <div className="flex justify-center mb-6">
              <div 
                className="w-full h-48 bg-crypto-lightgray border-2 border-dashed border-crypto-lightgray rounded-md flex flex-col items-center justify-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-md" />
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-crypto-text mb-2" />
                    <p className="text-sm text-crypto-text">Clique para carregar imagem</p>
                    <p className="text-xs text-crypto-text mt-1">Recomendado: 800x400px</p>
                  </div>
                )}
                <input 
                  type="file"
                  ref={fileInputRef}
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Carteira</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Carteira Binance Principal" 
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
                      <SelectItem value="Outra">Outra</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="pt-4">
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
                Criar Carteira
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CarteiraCreateSheet;
