
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import TotalBalance from "@/components/dashboard/TotalBalance";
import BotTable from "@/components/dashboard/BotTable";
import BalancePieChart from "@/components/dashboard/BalancePieChart";
import CoinsList from "@/components/dashboard/CoinsList";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-background">
          <TotalBalance />
          <BalancePieChart />
          <BotTable />
          <CoinsList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
