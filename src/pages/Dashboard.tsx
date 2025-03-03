
import { mockPerformance, mockTrades, mockStrategies, mockAIInsights } from '@/lib/data';
import PerformanceOverview from '@/components/PerformanceOverview';
import TradesTable from '@/components/TradesTable';
import AIInsights from '@/components/AIInsights';
import StrategyPerformance from '@/components/StrategyPerformance';
import TradeChart from '@/components/TradeChart';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your trading performance and insights
        </p>
      </div>

      <PerformanceOverview performance={mockPerformance} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <TradeChart trades={mockTrades} />
        </div>
        <div>
          <AIInsights insights={mockAIInsights} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Recent Trades</h2>
          </div>
          <TradesTable trades={mockTrades} />
        </div>
        <div>
          <StrategyPerformance strategies={mockStrategies} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
