
import { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trade } from '@/lib/data';
import { BarChart2 } from 'lucide-react';

interface TradeChartProps {
  trades: Trade[];
}

const TradeChart = ({ trades }: TradeChartProps) => {
  const chartData = useMemo(() => {
    // Sort trades by exit date
    const sortedTrades = [...trades].sort((a, b) => 
      new Date(a.exitDate).getTime() - new Date(b.exitDate).getTime()
    );

    // Calculate running P&L
    let runningPnl = 0;
    return sortedTrades.map(trade => {
      runningPnl += trade.pnl;
      return {
        date: new Date(trade.exitDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        pnl: runningPnl,
        trade: trade.symbol,
      };
    });
  }, [trades]);

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <BarChart2 className="h-5 w-5 text-primary mr-2" />
          P&L Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'P&L']}
                labelFormatter={(label) => label}
              />
              <Area
                type="monotone"
                dataKey="pnl"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 1, r: 4 }}
                fillOpacity={1}
                fill="url(#colorPnl)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeChart;
