
import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", value: 30000 },
  { month: "Feb", value: 32000 },
  { month: "Mar", value: 31000 },
  { month: "Apr", value: 35000 },
  { month: "May", value: 40000 },
  { month: "Jun", value: 45000 },
  { month: "Jul", value: 65000 },
  { month: "Aug", value: 70000 },
  { month: "Sep", value: 80000 },
  { month: "Oct", value: 90000 },
];

const AccumulatedValueChart = () => {
  return (
    <Card className="bg-crypto-gray border-crypto-lightgray">
      <CardContent className="h-[300px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34DB9E" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#34DB9E" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2B3139" />
            <XAxis 
              dataKey="month" 
              stroke="#8E9196"
              tickLine={false}
            />
            <YAxis 
              stroke="#8E9196"
              tickLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E2329",
                borderColor: "#2B3139",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#34DB9E"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AccumulatedValueChart;
