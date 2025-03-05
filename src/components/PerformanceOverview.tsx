import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Performance } from "@/types/trade";
import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from "lucide-react";

interface PerformanceOverviewProps {
  performance: Performance;
}

const PerformanceOverview = ({ performance }: PerformanceOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      <MetricCard
        title="Win Rate"
        value={`${performance.winRate}%`}
        description={`${performance.profitableTrades}/${performance.totalTrades} trades`}
        icon={<TrendingUp className="h-6 w-6 text-secondary" />}
        trend={performance.winRate > 50 ? "positive" : "negative"}
      />
      <MetricCard
        title="Profit Factor"
        value={performance.profitFactor.toFixed(2)}
        description={`Gross profit / gross loss`}
        icon={<BarChart2 className="h-6 w-6 text-primary" />}
        trend={performance.profitFactor > 1 ? "positive" : "negative"}
      />
      <MetricCard
        title="Avg Win"
        value={`$${performance.averageWin.toFixed(2)}`}
        description={`vs $${performance.averageLoss.toFixed(2)} avg loss`}
        icon={<DollarSign className="h-6 w-6 text-secondary" />}
        trend={performance.averageWin > performance.averageLoss ? "positive" : "negative"}
      />
      <MetricCard
        title="Largest Loss"
        value={`$${Math.abs(performance.largestLoss).toFixed(2)}`}
        description={`vs $${performance.largestWin.toFixed(2)} largest win`}
        icon={<TrendingDown className="h-6 w-6 text-destructive" />}
        trend="neutral"
      />
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: "positive" | "negative" | "neutral";
}

const MetricCard = ({ title, value, description, icon, trend }: MetricCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
        {trend !== "neutral" && (
          <div className={`mt-2 inline-flex items-center text-xs ${
            trend === "positive" ? "text-secondary" : "text-destructive"
          }`}>
            {trend === "positive" ? (
              <>
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>Good</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3 w-3 mr-1" />
                <span>Needs improvement</span>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
