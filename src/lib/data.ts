
export interface Trade {
  id: string;
  symbol: string;
  entry: number;
  exit: number;
  position: 'long' | 'short';
  size: number;
  entryDate: string;
  exitDate: string;
  pnl: number;
  pnlPercentage: number;
  strategy: string;
  setup: string;
  emotionalState?: string;
  marketCondition?: string;
  notes?: string;
}

export interface Performance {
  winRate: number;
  profitFactor: number;
  averageWin: number;
  averageLoss: number;
  largestWin: number;
  largestLoss: number;
  totalTrades: number;
  profitableTrades: number;
  unprofitableTrades: number;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  winRate: number;
  profitFactor: number;
  trades: number;
}

export const mockTrades: Trade[] = [
  {
    id: '1',
    symbol: 'AAPL',
    entry: 174.32,
    exit: 178.96,
    position: 'long',
    size: 100,
    entryDate: '2023-09-12T09:30:00',
    exitDate: '2023-09-12T14:15:00',
    pnl: 464,
    pnlPercentage: 2.66,
    strategy: 'Breakout',
    setup: 'Daily resistance break',
    emotionalState: 'Confident',
    marketCondition: 'Bullish',
    notes: 'Strong volume on breakout, held through lunch consolidation'
  },
  {
    id: '2',
    symbol: 'TSLA',
    entry: 243.08,
    exit: 238.45,
    position: 'long',
    size: 50,
    entryDate: '2023-09-13T10:15:00',
    exitDate: '2023-09-13T11:30:00',
    pnl: -231.5,
    pnlPercentage: -1.91,
    strategy: 'Trend Following',
    setup: 'VWAP bounce',
    emotionalState: 'Hesitant',
    marketCondition: 'Choppy',
    notes: 'Entered too early, should have waited for confirmation'
  },
  {
    id: '3',
    symbol: 'MSFT',
    entry: 338.11,
    exit: 344.29,
    position: 'long',
    size: 75,
    entryDate: '2023-09-14T13:45:00',
    exitDate: '2023-09-15T10:30:00',
    pnl: 463.5,
    pnlPercentage: 1.83,
    strategy: 'Swing',
    setup: 'Earnings momentum',
    emotionalState: 'Calm',
    marketCondition: 'Bullish',
    notes: 'Overnight hold paid off, news catalyst worked well'
  },
  {
    id: '4',
    symbol: 'AMZN',
    entry: 145.89,
    exit: 142.11,
    position: 'long',
    size: 120,
    entryDate: '2023-09-15T09:45:00',
    exitDate: '2023-09-15T15:55:00',
    pnl: -453.6,
    pnlPercentage: -2.59,
    strategy: 'Breakout',
    setup: 'Failed breakout',
    emotionalState: 'Frustrated',
    marketCondition: 'Bearish',
    notes: 'Market turned against trend, should have cut losses earlier'
  },
  {
    id: '5',
    symbol: 'NVDA',
    entry: 485.09,
    exit: 501.63,
    position: 'long',
    size: 40,
    entryDate: '2023-09-16T11:20:00',
    exitDate: '2023-09-16T15:45:00',
    pnl: 661.6,
    pnlPercentage: 3.41,
    strategy: 'Momentum',
    setup: 'Sector rotation',
    emotionalState: 'Focused',
    marketCondition: 'Bullish',
    notes: 'Semiconductor sector strong, followed institutional buying'
  }
];

export const mockPerformance: Performance = {
  winRate: 60,
  profitFactor: 1.76,
  averageWin: 529.7,
  averageLoss: 342.55,
  largestWin: 661.6,
  largestLoss: 453.6,
  totalTrades: 5,
  profitableTrades: 3,
  unprofitableTrades: 2
};

export const mockStrategies: Strategy[] = [
  {
    id: '1',
    name: 'Breakout',
    description: 'Trading price movements through key levels with volume confirmation',
    winRate: 50,
    profitFactor: 1.02,
    trades: 2
  },
  {
    id: '2',
    name: 'Trend Following',
    description: 'Following established market trends using technical indicators',
    winRate: 0,
    profitFactor: 0,
    trades: 1
  },
  {
    id: '3',
    name: 'Swing',
    description: 'Multi-day holds based on fundamental and technical factors',
    winRate: 100,
    profitFactor: 2.00,
    trades: 1
  },
  {
    id: '4',
    name: 'Momentum',
    description: 'Trading with the force of price movement and market sentiment',
    winRate: 100,
    profitFactor: 2.00,
    trades: 1
  }
];

export const mockAIInsights = [
  "Your win rate increases by 35% when trading during the first 2 hours of market open",
  "Consider reducing position size on TSLA trades, which account for 65% of your losses",
  "Your 'Breakout' strategy performs best in bullish market conditions",
  "Trades entered with 'Confident' emotional state have 2.3x better returns",
  "Recommended: Wait for volume confirmation on breakouts to improve win rate"
];

export const getTradeById = (id: string): Trade | undefined => {
  return mockTrades.find(trade => trade.id === id);
};

export const getStrategySummary = (strategyName: string) => {
  const strategyTrades = mockTrades.filter(trade => trade.strategy === strategyName);
  const winningTrades = strategyTrades.filter(trade => trade.pnl > 0);
  const losingTrades = strategyTrades.filter(trade => trade.pnl < 0);
  
  const totalPnl = strategyTrades.reduce((sum, trade) => sum + trade.pnl, 0);
  const winRate = strategyTrades.length ? (winningTrades.length / strategyTrades.length) * 100 : 0;
  
  return {
    totalTrades: strategyTrades.length,
    winningTrades: winningTrades.length,
    losingTrades: losingTrades.length,
    winRate,
    totalPnl,
    averagePnl: strategyTrades.length ? totalPnl / strategyTrades.length : 0
  };
};
