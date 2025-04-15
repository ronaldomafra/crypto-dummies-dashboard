
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Eye, EyeOff, HelpCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BalanceCardProps {
  title: string;
  amount: string;
  subAmount?: string;
  positive?: boolean;
}

const TotalBalance = () => {
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <Card className="bg-crypto-gray border-crypto-lightgray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CardTitle className="text-xl font-semibold mr-2">Total Balance</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>The total value of all your assets</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setHideBalance(!hideBalance)}
          >
            {hideBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center">
              <div className="text-3xl font-semibold">
                {hideBalance ? "••••••" : "94.836.95"}
              </div>
              <Button variant="ghost" className="h-6 ml-2">
                USDT <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </div>
            <div className="mt-4 py-2 px-3 bg-crypto-lightgray rounded-md flex items-center justify-between">
              <div className="flex items-center text-sm">
                <span>Today's PNL</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <Info className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Profit and Loss for today</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className={hideBalance ? "blur-sm" : "text-crypto-positive text-sm font-medium"}>
                + $65,231.76
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              You can go to Bot account Profit and Loss analysis details page from here.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalBalance;
