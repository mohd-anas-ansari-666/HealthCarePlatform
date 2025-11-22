import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Progress() {
  const { user } = useAuth();
  
  const getChartData = (period: 'week' | 'month' | 'year') => {
    const stepsData = JSON.parse(localStorage.getItem("stepsData") || "{}");
    const userSteps = stepsData[user?.id || ""] || {};
    
    if (period === 'week') {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days.map((day, i) => {
        const date = new Date();
        date.setDate(date.getDate() - date.getDay() + i + 1);
        const dateStr = date.toDateString();
        return { name: day, steps: userSteps[dateStr] || 0 };
      });
    }
    
    if (period === 'month') {
      const data = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();
        data.push({ name: date.getDate().toString(), steps: userSteps[dateStr] || 0 });
      }
      return data;
    }
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, i) => {
      let total = 0;
      let count = 0;
      Object.keys(userSteps).forEach(dateStr => {
        const date = new Date(dateStr);
        if (date.getMonth() === i && date.getFullYear() === new Date().getFullYear()) {
          total += userSteps[dateStr];
          count++;
        }
      });
      return { name: month, steps: count > 0 ? Math.round(total / count) : 0 };
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Progress Tracking</h1>
        
        <Tabs defaultValue="week" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">Weekly</TabsTrigger>
            <TabsTrigger value="month">Monthly</TabsTrigger>
            <TabsTrigger value="year">Yearly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="week">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Step Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getChartData('week')}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="steps" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="month">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Step Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getChartData('month')}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="steps" stroke="hsl(var(--secondary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="year">
            <Card>
              <CardHeader>
                <CardTitle>Yearly Average Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getChartData('year')}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="steps" fill="hsl(var(--accent))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
