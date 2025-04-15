
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save } from "lucide-react";

const formSchema = z.object({
  baseUrl: z.string().min(1, "URL base é obrigatória"),
  apiKey: z.string().min(1, "API Key é obrigatória"),
  secretKey: z.string().min(1, "Secret Key é obrigatória"),
});

interface ExchangeConfigProps {
  exchangeId: string;
  exchangeName: string;
  onSave: (data: z.infer<typeof formSchema>) => void;
}

const ExchangeConfig = ({ exchangeId, exchangeName, onSave }: ExchangeConfigProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseUrl: "",
      apiKey: "",
      secretKey: "",
    }
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSave({
      ...data,
      exchangeId,
    });
    form.reset();
  };

  return (
    <Card className="bg-crypto-gray border-crypto-lightgray">
      <CardHeader>
        <CardTitle>Configuração de {exchangeName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="baseUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Base</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://api.exchange.com" 
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
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Sua API Key" 
                      className="bg-crypto-lightgray border-crypto-lightgray"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="secretKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secret Key</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Sua Secret Key" 
                      className="bg-crypto-lightgray border-crypto-lightgray"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-crypto-yellow text-black hover:bg-crypto-yellow/90"
            >
              <Save className="mr-2 h-4 w-4" />
              Salvar Configuração
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ExchangeConfig;
