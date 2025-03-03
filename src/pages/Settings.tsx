
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Settings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Account settings saved");
    }, 1000);
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Preferences saved");
    }, 1000);
  };

  const handleDisconnectBroker = () => {
    toast.success("Broker disconnected successfully");
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and app preferences
        </p>
      </div>

      <div className="max-w-4xl">
        <Tabs defaultValue="account" className="animate-fade-in">
          <TabsList className="mb-6">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveAccount} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Alex Johnson" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="alex@example.com" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>App Preferences</CardTitle>
                <CardDescription>Customize the app to your liking</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSavePreferences} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications" className="block mb-1">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive emails about your trades and performance</p>
                      </div>
                      <Switch id="emailNotifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications" className="block mb-1">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications in the app</p>
                      </div>
                      <Switch id="pushNotifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoSync" className="block mb-1">Auto-Sync with Brokers</Label>
                        <p className="text-sm text-muted-foreground">Automatically import trades from your brokers</p>
                      </div>
                      <Switch id="autoSync" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="darkMode" className="block mb-1">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                      </div>
                      <Switch id="darkMode" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Save Preferences'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Broker Integrations</CardTitle>
                <CardDescription>Connect and manage your broker accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-medium">TD Ameritrade</h3>
                    <p className="text-sm text-muted-foreground">Connected on Sep 10, 2023</p>
                  </div>
                  <Button variant="destructive" size="sm" onClick={handleDisconnectBroker} className="mt-3 sm:mt-0">
                    Disconnect
                  </Button>
                </div>
                
                <div className="p-4 border rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-medium">Interactive Brokers</h3>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 sm:mt-0">
                    Connect
                  </Button>
                </div>
                
                <div className="p-4 border rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-medium">Robinhood</h3>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 sm:mt-0">
                    Connect
                  </Button>
                </div>
                
                <div className="p-4 border rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-medium">Webull</h3>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 sm:mt-0">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Manage your subscription plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 border rounded-md mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Free Plan</h3>
                      <p className="text-muted-foreground">Basic features with limited data storage</p>
                    </div>
                    <Badge variant="outline" className="mt-2 sm:mt-0">Current Plan</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                      <span>Manual trade journaling</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                      <span>Basic performance analytics</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                      <span>Store up to 100 trades</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Upgrade to Premium</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-2 hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle>Pro Plan</CardTitle>
                        <p className="text-2xl font-bold">$19.99<span className="text-muted-foreground text-sm font-normal">/month</span></p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                            <span>All Free features</span>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                            <span>AI-powered trade analysis</span>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                            <span>Broker integrations</span>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                            <span>Unlimited trades</span>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                            <span>Advanced analytics</span>
                          </div>
                        </div>
                        <Button className="w-full">Subscribe</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Annual Pro</CardTitle>
                        <p className="text-2xl font-bold">$199.99<span className="text-muted-foreground text-sm font-normal">/year</span></p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                            <span>16% discount vs monthly plan</span>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                            <span>All Pro Plan features</span>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                            <span>Priority customer support</span>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                            <span>Early access to new features</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">Subscribe</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const Badge = ({ children, variant = "default", className = "" }: { 
  children: React.ReactNode; 
  variant?: "default" | "outline"; 
  className?: string; 
}) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-primary text-primary"
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Check = (props: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

export default Settings;
