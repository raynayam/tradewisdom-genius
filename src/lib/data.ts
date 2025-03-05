import { Trade } from '@/types/trade';

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
    date: new Date('2024-03-01'),
    type: 'buy',
    side: 'long',
    quantity: 100,
    price: 175.50,
    fees: 1.50,
    pnl: 350,
    strategy: 'Momentum',
    tags: ['tech', 'swing'],
    broker: 'TradeZero',
    commission: 1.50,
  },
  {
    id: '2',
    symbol: 'TSLA',
    date: new Date('2024-03-02'),
    type: 'sell',
    side: 'short',
    quantity: 50,
    price: 180.25,
    fees: 1.50,
    pnl: -250,
    strategy: 'Mean Reversion',
    tags: ['tech', 'day trade'],
    broker: 'TradeZero',
    commission: 1.50,
  },
  {
    id: '3',
    symbol: 'MSFT',
    date: new Date('2024-03-03'),
    type: 'buy',
    side: 'long',
    quantity: 75,
    price: 420.30,
    fees: 1.50,
    pnl: 525,
    strategy: 'Breakout',
    tags: ['tech', 'swing'],
    broker: 'TradeZero',
    commission: 1.50,
  },
  {
    id: '4',
    symbol: 'NVDA',
    date: new Date('2024-03-04'),
    type: 'buy',
    side: 'long',
    quantity: 25,
    price: 890.75,
    fees: 1.50,
    pnl: 1200,
    strategy: 'Momentum',
    tags: ['tech', 'swing'],
    broker: 'TradeZero',
    commission: 1.50,
  },
  {
    id: '5',
    symbol: 'META',
    date: new Date('2024-03-05'),
    type: 'sell',
    side: 'short',
    quantity: 60,
    price: 505.20,
    fees: 1.50,
    pnl: -180,
    strategy: 'Mean Reversion',
    tags: ['tech', 'day trade'],
    broker: 'TradeZero',
    commission: 1.50,
  },
];

export const mockPerformance = {
  totalPnL: 1645,
  winRate: 60,
  profitFactor: 2.1,
  averageWin: 691.67,
  averageLoss: -215,
  largestWin: 1200,
  largestLoss: -250,
  totalTrades: 5,
  winningTrades: 3,
  losingTrades: 2,
};

export const mockStrategies = [
  {
    name: 'Momentum',
    winRate: 75,
    profitFactor: 2.5,
    totalTrades: 2,
    pnl: 1550,
  },
  {
    name: 'Mean Reversion',
    winRate: 40,
    profitFactor: 1.2,
    totalTrades: 2,
    pnl: -430,
  },
  {
    name: 'Breakout',
    winRate: 100,
    profitFactor: 3.0,
    totalTrades: 1,
    pnl: 525,
  },
];

export const mockAIInsights = [
  {
    title: 'Strong Performance in Tech Sector',
    description: 'Your tech trades show a 70% win rate with high profit factor.',
    type: 'success',
  },
  {
    title: 'Risk Management Suggestion',
    description: 'Consider reducing position size on mean reversion trades.',
    type: 'warning',
  },
  {
    title: 'Pattern Detected',
    description: 'Most profitable trades occur during market open.',
    type: 'info',
  },
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
