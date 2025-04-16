
import { Button } from "@/components/ui/button";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import TotalBalance from "@/components/dashboard/TotalBalance";
import BotTable from "@/components/dashboard/BotTable";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <TotalBalance />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <BotTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
