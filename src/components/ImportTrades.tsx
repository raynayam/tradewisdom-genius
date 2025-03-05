import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { BrokerType, BrokerIntegrationService } from "@/lib/services/brokerIntegration";
import { CSVImportService, CSVMapping } from "@/lib/services/csvImport";
import { Trade } from "@/types/trade";

interface ImportTradesProps {
  onImportComplete: (trades: Trade[]) => void;
}

export function ImportTrades({ onImportComplete }: ImportTradesProps) {
  const [importMethod, setImportMethod] = useState<"broker" | "csv">("broker");
  const [selectedBroker, setSelectedBroker] = useState<BrokerType>("tradezero");
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleBrokerImport = async () => {
    setIsLoading(true);
    try {
      const brokerService = new BrokerIntegrationService(selectedBroker, {
        apiKey,
        secretKey,
      });

      await brokerService.connect();
      const trades = await brokerService.importTrades(
        new Date(new Date().setMonth(new Date().getMonth() - 1)), // Last month
        new Date()
      );

      onImportComplete(trades);
      toast({
        title: "Success",
        description: `Imported ${trades.length} trades from ${selectedBroker}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import trades. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCSVImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const mapping: CSVMapping = {
        date: "Date",
        symbol: "Symbol",
        type: "Type",
        side: "Side",
        quantity: "Quantity",
        price: "Price",
        fees: "Fees",
        pnl: "P&L",
        strategy: "Strategy",
        notes: "Notes",
        tags: "Tags",
        broker: "Broker",
        commission: "Commission",
      };

      const csvService = new CSVImportService(mapping);
      const trades = await csvService.importFile(file);

      onImportComplete(trades);
      toast({
        title: "Success",
        description: `Imported ${trades.length} trades from CSV`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import CSV file. Please check the file format.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Import Trades</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Trades</DialogTitle>
          <DialogDescription>
            Import your trades from a broker or CSV file
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Import Method</Label>
            <Select
              value={importMethod}
              onValueChange={(value: "broker" | "csv") => setImportMethod(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="broker">Connect Broker</SelectItem>
                <SelectItem value="csv">Upload CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {importMethod === "broker" ? (
            <>
              <div className="grid gap-2">
                <Label>Select Broker</Label>
                <Select
                  value={selectedBroker}
                  onValueChange={(value: BrokerType) => setSelectedBroker(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tradezero">TradeZero</SelectItem>
                    <SelectItem value="interactive_brokers">
                      Interactive Brokers
                    </SelectItem>
                    <SelectItem value="td_ameritrade">TD Ameritrade</SelectItem>
                    <SelectItem value="robinhood">Robinhood</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>API Key</Label>
                <Input
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  type="password"
                />
              </div>
              <div className="grid gap-2">
                <Label>Secret Key</Label>
                <Input
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  type="password"
                />
              </div>
              <Button onClick={handleBrokerImport} disabled={isLoading}>
                {isLoading ? "Importing..." : "Import from Broker"}
              </Button>
            </>
          ) : (
            <div className="grid gap-2">
              <Label>Upload CSV File</Label>
              <Input
                type="file"
                accept=".csv"
                onChange={handleCSVImport}
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                CSV should include: Date, Symbol, Type, Side, Quantity, Price
                columns
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 