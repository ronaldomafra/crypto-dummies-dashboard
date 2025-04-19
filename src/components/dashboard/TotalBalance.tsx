
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, HelpCircle, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WalletBalances from "./WalletBalances";
import BalancePieChart from "./BalancePieChart";
import AccumulatedValueChart from "./AccumulatedValueChart";

const TotalBalance = () => {
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full overflow-x-hidden">
      {/* Left Column - Balance Information */}
      <Card className="bg-crypto-gray border-crypto-lightgray">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-medium">Total Balance</h2>
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

            <div className="flex items-center gap-2">
              <div className="text-xl sm:text-3xl font-bold">
                {hideBalance ? "••••••" : "94,836.95"}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setHideBalance(!hideBalance)}
              >
                {hideBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <span className="text-sm text-muted-foreground">USDT</span>
            </div>

            <div className="py-2 px-3 bg-crypto-lightgray rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <div className="flex items-center gap-2">
                <span className="text-sm">Today's PNL</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Profit and Loss for today</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-crypto-positive text-sm font-medium">
                + $65,231.76
              </div>
            </div>

            <WalletBalances />
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Charts */}
      <Card className="bg-crypto-gray border-crypto-lightgray">
        <CardContent className="space-y-6 p-4 sm:p-6">
          {/* Asset Distribution Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Asset Distribution</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Asset Distribution</DialogTitle>
                  </DialogHeader>
                  <div className="h-[500px]">
                    <BalancePieChart />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <BalancePieChart />
          </div>

          {/* Accumulated Value Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Accumulated Value</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Accumulated Value</DialogTitle>
                  </DialogHeader>
                  <div className="h-[500px]">
                    <AccumulatedValueChart />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <AccumulatedValueChart />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalBalance;
