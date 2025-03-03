
import { mockTrades, mockPerformance, mockStrategies } from '@/lib/data';
import TradeChart from '@/components/TradeChart';
import PerformanceOverview from '@/components/PerformanceOverview';
import StrategyPerformance from '@/components/StrategyPerformance';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartPie, BarChart3 } from 'lucide-react';

const Analytics = () => {
  // Calculate trade breakdown by result
  const winningTrades = mockTrades.filter(trade => trade.pnl > 0);
  const losingTrades = mockTrades.filter(trade => trade.pnl < 0);
  const pieChartData = [
    { name: 'Winning', value: winningTrades.length, color: '#22c55e' },
    { name: 'Losing', value: losingTrades.length, color: '#ef4444' },
  ];

  // Calculate trade breakdown by symbol
  const tradesBySymbol = mockTrades.reduce((acc, trade) => {
    if (!acc[trade.symbol]) {
      acc[trade.symbol] = {
        symbol: trade.symbol,
        count: 0,
        totalPnl: 0,
        winning: 0,
        losing: 0,
      };
    }
    
    acc[trade.symbol].count += 1;
    acc[trade.symbol].totalPnl += trade.pnl;
    
    if (trade.pnl > 0) {
      acc[trade.symbol].winning += 1;
    } else {
      acc[trade.symbol].losing += 1;
    }
    
    return acc;
  }, {} as Record<string, { symbol: string; count: number; totalPnl: number; winning: number; losing: number }>);

  const symbolData = Object.values(tradesBySymbol).sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed analysis of your trading performance
        </p>
      </div>

      <PerformanceOverview performance={mockPerformance} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ChartPie className="h-5 w-5 text-primary mr-2" />
              Win/Loss Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value} trades`, 'Count']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 text-primary mr-2" />
              Symbol Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={symbolData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="symbol" 
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
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'P&L']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Bar 
                    dataKey="totalPnl" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <TradeChart trades={mockTrades} />
        </div>
        <div>
          <StrategyPerformance strategies={mockStrategies} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
