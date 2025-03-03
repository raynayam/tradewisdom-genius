
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIInsightsProps {
  insights: string[];
}

const AIInsights = ({ insights }: AIInsightsProps) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Sparkles className="h-5 w-5 text-primary mr-2" />
            AI Insights
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-sm flex items-center gap-1">
            View All <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
