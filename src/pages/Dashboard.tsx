import { mockPerformance, mockTrades, mockStrategies } from '@/lib/data';
import PerformanceOverview from '@/components/PerformanceOverview';
import TradesTable from '@/components/TradesTable';
import StrategyPerformance from '@/components/StrategyPerformance';
import TradeChart from '@/components/TradeChart';
import { TradingCalendar } from '@/components/TradingCalendar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ImportTrades } from '@/components/ImportTrades';
import { useState } from 'react';
import { Trade } from '@/types/trade';

const Dashboard = () => {
  const [trades, setTrades] = useState<Trade[]>(mockTrades);

  const handleImportComplete = (importedTrades: Trade[]) => {
    setTrades((prevTrades) => [...prevTrades, ...importedTrades]);
  };

  // Mock data for calendar
  const dailyPnL = trades.map(trade => ({
    date: new Date(trade.date),
    pnl: trade.pnl
  }));

  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your trading performance and insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ImportTrades onImportComplete={handleImportComplete} />
          <ThemeToggle />
        </div>
      </div>

      <PerformanceOverview performance={mockPerformance} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <TradeChart trades={trades} />
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Trading Calendar</h2>
          <p className="text-sm text-muted-foreground">
            Daily and weekly PnL visualization
          </p>
        </div>
        <TradingCalendar trades={dailyPnL} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Recent Trades</h2>
          </div>
          <TradesTable trades={trades} />
        </div>
        <div>
          <StrategyPerformance strategies={mockStrategies} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
