export interface Trade {
  id: string;
  symbol: string;
  date: Date;
  type: 'buy' | 'sell';
  side: 'long' | 'short';
  quantity: number;
  price: number;
  fees: number;
  pnl: number;
  strategy?: string;
  notes?: string;
  tags?: string[];
  broker?: string;
  commission?: number;
  execution?: {
    time: Date;
    venue: string;
    orderId: string;
  };
  risk?: {
    stopLoss?: number;
    takeProfit?: number;
    riskAmount?: number;
    riskRatio?: number;
  };
} 