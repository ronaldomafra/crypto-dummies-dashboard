
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Spot", value: 20, color: "#3498DB" },
  { name: "USD-M", value: 30, color: "#34DB9E" },
  { name: "COIN-M", value: 10, color: "#F0B90B" },
  { name: "Robô de Arbitragem", value: 10, color: "#00E396" },
];

const BalancePieChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={60}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            borderRadius: "8px",
            fontSize: "12px",
            padding: "4px 8px",
            color: "var(--foreground)"
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BalancePieChart;
