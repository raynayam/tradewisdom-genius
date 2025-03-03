
import { useParams, useNavigate } from 'react-router-dom';
import { getTradeById } from '@/lib/data';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash2, ArrowUpRight, ArrowDownRight, Lightbulb } from 'lucide-react';

const TradeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trade = id ? getTradeById(id) : undefined;
  
  if (!trade) {
    return (
      <div className="container mx-auto px-4 pt-20 pb-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Trade not found</h1>
        <Button onClick={() => navigate('/journal')}>Back to Journal</Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDuration = () => {
    const entry = new Date(trade.entryDate);
    const exit = new Date(trade.exitDate);
    const diffMs = exit.getTime() - entry.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${diffMins}m`;
    }
    return `${diffMins}m`;
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate('/journal')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{trade.symbol} Trade</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    trade.pnl >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  } mr-4`}>
                    {trade.pnl >= 0 
                      ? <ArrowUpRight className="h-5 w-5" /> 
                      : <ArrowDownRight className="h-5 w-5" />
                    }
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold flex items-center">
                      {trade.symbol}
                      <Badge variant={trade.position === 'long' ? 'default' : 'destructive'} className="ml-2">
                        {trade.position === 'long' ? 'LONG' : 'SHORT'}
                      </Badge>
                    </h2>
                    <p className="text-muted-foreground text-sm">{trade.setup}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${
                    trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${trade.pnl.toFixed(2)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {trade.pnlPercentage >= 0 ? '+' : ''}{trade.pnlPercentage.toFixed(2)}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Entry Price</p>
                  <p className="text-lg font-medium">${trade.entry.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Exit Price</p>
                  <p className="text-lg font-medium">${trade.exit.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Size</p>
                  <p className="text-lg font-medium">{trade.size} shares</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Entry Time</p>
                  <p className="text-lg font-medium">{formatDate(trade.entryDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Exit Time</p>
                  <p className="text-lg font-medium">{formatDate(trade.exitDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="text-lg font-medium">{getDuration()}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Trade Notes</h3>
                <p className="text-muted-foreground">
                  {trade.notes || "No notes added for this trade."}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <h3 className="font-medium flex items-center mb-4">
                <Lightbulb className="h-4 w-4 text-primary mr-2" />
                AI Analysis
              </h3>
              
              <div className="p-4 border rounded-md bg-primary/5">
                <h4 className="font-medium text-sm mb-2">Trade Pattern Recognition</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  This trade aligns with your typical morning breakout strategy pattern. 
                  Based on your historical performance, similar trades have a 68% success rate.
                </p>
                
                <h4 className="font-medium text-sm mb-2">Suggested Improvements</h4>
                <ul className="text-sm text-muted-foreground space-y-2 ml-5 list-disc">
                  <li>Consider setting a tighter stop loss at the VWAP level to improve risk-reward ratio</li>
                  <li>Your exit was optimal based on historical price action</li>
                  <li>
                    Your emotional state was "
                    <span className="font-medium">{trade.emotionalState}</span>
                    " which correlates with better performance in your trading history
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Trade Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Strategy</p>
                  <p className="font-medium">{trade.strategy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Setup</p>
                  <p className="font-medium">{trade.setup}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Emotional State</p>
                  <p className="font-medium">{trade.emotionalState || "Not recorded"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Market Condition</p>
                  <p className="font-medium">{trade.marketCondition || "Not recorded"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Similar Trades</h3>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-md hover:bg-secondary/50 cursor-pointer transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">AAPL</span>
                    <span className="text-green-600 text-sm">+$312.50</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Aug 28 - Breakout strategy</p>
                </div>
                <div className="p-3 border rounded-md hover:bg-secondary/50 cursor-pointer transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">AAPL</span>
                    <span className="text-red-600 text-sm">-$185.75</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Aug 15 - Breakout strategy</p>
                </div>
                <div className="p-3 border rounded-md hover:bg-secondary/50 cursor-pointer transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">MSFT</span>
                    <span className="text-green-600 text-sm">+$523.00</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Aug 10 - Breakout strategy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TradeDetail;
