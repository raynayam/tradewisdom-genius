import { useState } from "react";
import { Trade } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search, FileText, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TradesTableProps {
  trades: Trade[];
}

const TradesTable = ({ trades }: TradesTableProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<keyof Trade>("exitDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (column: keyof Trade) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("desc");
    }
  };

  const filteredTrades = trades.filter((trade) => 
    trade.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trade.strategy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTrades = [...filteredTrades].sort((a, b) => {
    if (sortBy === "exitDate" || sortBy === "entryDate") {
      return sortDirection === "asc"
        ? new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
        : new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime();
    }
    
    if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
      return sortDirection === "asc"
        ? (a[sortBy] as number) - (b[sortBy] as number)
        : (b[sortBy] as number) - (a[sortBy] as number);
    }
    
    return sortDirection === "asc"
      ? String(a[sortBy]).localeCompare(String(b[sortBy]))
      : String(b[sortBy]).localeCompare(String(a[sortBy]));
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trades..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="sm:w-auto w-full flex items-center gap-2"
          onClick={() => navigate("/trade/new")}
        >
          <FileText className="h-4 w-4" />
          Add Trade
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort("symbol")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Symbol
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort("exitDate")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Date
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Strategy</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort("position")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Side
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort("pnl")}
                  className="flex items-center gap-1 p-0 h-auto font-medium ml-auto"
                >
                  P&L
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTrades.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No trades found
                </TableCell>
              </TableRow>
            ) : (
              sortedTrades.map((trade) => (
                <TableRow key={trade.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/trade/${trade.id}`)}>
                  <TableCell className="font-medium">{trade.symbol}</TableCell>
                  <TableCell>{formatDate(trade.exitDate)}</TableCell>
                  <TableCell className="hidden md:table-cell">{trade.strategy}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      trade.position === "long" 
                        ? "bg-secondary/20 text-secondary-foreground" 
                        : "bg-primary/20 text-primary-foreground"
                    }`}>
                      {trade.position === "long" ? "Long" : "Short"}
                    </span>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    trade.pnl >= 0 ? "text-secondary" : "text-destructive"
                  }`}>
                    ${trade.pnl.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TradesTable;
