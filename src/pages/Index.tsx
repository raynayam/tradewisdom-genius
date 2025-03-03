
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, BookOpen, Gauge, Zap, Lock, RefreshCw, PieChart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 md:pt-40 md:pb-32 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            TradeLogAI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            The intelligent trading journal that helps you analyze your trades, uncover patterns, and improve your strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/journal')}>
              View Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed for traders who want to turn data into actionable insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen />}
              title="Smart Journaling"
              description="Automatically import trades from 100+ brokerages or log them manually with detailed analytics."
            />
            <FeatureCard
              icon={<Zap />}
              title="AI-Powered Insights"
              description="Our AI analyzes your trading patterns to provide actionable recommendations for improvement."
            />
            <FeatureCard
              icon={<BarChart2 />}
              title="Advanced Analytics"
              description="Visualize your performance with comprehensive charts and metrics to track your progress."
            />
            <FeatureCard
              icon={<PieChart />}
              title="Strategy Analysis"
              description="Compare different strategies to understand which ones perform best in various market conditions."
            />
            <FeatureCard
              icon={<RefreshCw />}
              title="Emotion Tracking"
              description="Log your emotional state during trades to identify how psychology affects your decision-making."
            />
            <FeatureCard
              icon={<Lock />}
              title="Trade Simulations"
              description="Backtest your strategies and run 'what-if' scenarios to improve future trading decisions."
            />
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Traders</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what traders are saying about TradeLogAI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="TradeLogAI helped me identify that my win rate drops 40% when trading tech stocks pre-earnings. This insight alone increased my monthly profits by 25%."
              author="Michael R."
              role="Day Trader"
            />
            <TestimonialCard
              quote="Being able to visualize my emotional states alongside my trades was a game-changer. I now understand when I'm most likely to make mistakes."
              author="Jennifer T."
              role="Swing Trader"
            />
            <TestimonialCard
              quote="The AI insights highlighted patterns I never would have noticed on my own. My win rate went from 48% to 63% in just three months."
              author="David L."
              role="Options Trader"
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to improve your trading?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of traders who use TradeLogAI to analyze their performance and make better trading decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-semibold text-lg">TradeLogAI</span>
              <p className="text-sm text-muted-foreground">
                © 2023 TradeLogAI. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-card border rounded-lg p-6 transition-all duration-200 hover:shadow-md hover:border-primary/20">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard = ({ quote, author, role }: TestimonialCardProps) => {
  return (
    <div className="bg-card border rounded-lg p-6 transition-all duration-200 hover:shadow-md">
      <div className="mb-4 text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
      </div>
      <p className="mb-4 text-foreground">{quote}</p>
      <div>
        <p className="font-medium">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export default Index;
