
import { mockTrades } from '@/lib/data';
import TradesTable from '@/components/TradesTable';
import { Button } from '@/components/ui/button';
import { FileText, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Journal = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trading Journal</h1>
          <p className="text-muted-foreground">
            Log and analyze your trades
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => navigate('/trade/new')} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Add Trade
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border shadow-sm p-6">
        <TradesTable trades={mockTrades} />
      </div>
    </div>
  );
};

export default Journal;
