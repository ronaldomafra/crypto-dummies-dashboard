
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { date: "01/01", pnl: 500 },
  { date: "02/01", pnl: 700 },
  { date: "03/01", pnl: 600 },
  { date: "04/01", pnl: 900 },
  { date: "05/01", pnl: 1200 },
  { date: "06/01", pnl: 1100 },
  { date: "07/01", pnl: 1300 },
  { date: "08/01", pnl: 1500 },
  { date: "09/01", pnl: 1400 },
  { date: "10/01", pnl: 1700 },
  { date: "11/01", pnl: 1600 },
  { date: "12/01", pnl: 2000 },
  { date: "13/01", pnl: 2200 },
];

const PNLChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#34DB9E" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#34DB9E" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis 
          dataKey="date" 
          stroke="var(--muted-foreground)"
          tickLine={false}
        />
        <YAxis 
          stroke="var(--muted-foreground)"
          tickLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            borderRadius: "8px",
            fontSize: "12px",
            padding: "4px 8px",
            color: "var(--foreground)"
          }}
          formatter={(value) => [`$${value}`, 'PNL']}
        />
        <Area
          type="monotone"
          dataKey="pnl"
          stroke="#34DB9E"
          fillOpacity={1}
          fill="url(#colorPnl)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PNLChart;
