import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

export default function TimeSeriesChart({
  title,
  data,       
  yLabel = '',
  max = 100,
  color = "#22c55e",
}) {
  const gradientId = `gradient-${title.replace(/\s/g, '-')}`;
  
  return (
    <Card className="transition-all hover:scale-[1.02] hover:shadow-xl border-gray-700/40 bg-gradient-to-br from-gray-900/95 to-gray-950/95 group">
      <CardHeader className="pb-4 p-5 sm:p-6">
        <CardTitle className="text-lg font-bold flex items-center gap-3">
          <div className="h-3 w-3 rounded-full shadow-lg" style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}60` }} />
          <span className="text-white">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 sm:p-6 pt-0">
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 15, left: 5, bottom: 10 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="50%" stopColor={color} stopOpacity={0.1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis 
                dataKey="t" 
                tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 500 }}
                stroke="#4b5563"
                axisLine={{ stroke: "#4b5563", strokeWidth: 1 }}
                tickLine={{ stroke: "#4b5563" }}
              />
              <YAxis 
                domain={[0, max]} 
                tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 500 }}
                stroke="#4b5563"
                axisLine={{ stroke: "#4b5563", strokeWidth: 1 }}
                tickLine={{ stroke: "#4b5563" }}
              />
              <Tooltip
                contentStyle={{ 
                  background: "#1f2937", 
                  border: `1px solid ${color}40`,
                  borderRadius: "0.75rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
                  padding: "12px"
                }}
                labelStyle={{ color: "#d1d5db", fontSize: "13px", fontWeight: 600 }}
                itemStyle={{ color: "#f9fafb", fontSize: "13px", fontWeight: 700 }}
                formatter={(v) => [`${v.toFixed(1)}${yLabel}`, ""]}
              />
              <Area
                type="monotone"
                dataKey="v"
                stroke={color}
                strokeWidth={3}
                fill={`url(#${gradientId})`}
                isAnimationActive={true}
                animationDuration={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
