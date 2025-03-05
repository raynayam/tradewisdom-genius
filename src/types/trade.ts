export interface Trade {
  id: string;
  symbol: string;
  position: 'long' | 'short';
  date: Date;  // Changed from string to Date
  entryDate: Date;  // Changed from string to Date
  exitDate: Date;  // Changed from string to Date
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  pnl: number;
  strategy: string;
  broker: string;
  notes?: string;
  tags?: string[];
  fees?: number;      // Adding optional fees field
  commission?: number; // Adding optional commission field
  createdAt?: Date;  // Changed from string to Date
  updatedAt?: Date;  // Changed from string to Date
}

export interface TradeInsert extends Omit<Trade, 'id'> {
  id?: string;
}

export interface TradeUpdate extends Partial<Trade> {
  id: string;
}

export interface Performance {
  winRate: number;
  profitableTrades: number;
  totalTrades: number;
  profitFactor: number;
  averageWin: number;
  averageLoss: number;
  largestWin: number;
  largestLoss: number;
}

export interface Strategy {
  id: string;
  name: string;
  trades: number;
  winRate: number;
  profitFactor: number;
} 