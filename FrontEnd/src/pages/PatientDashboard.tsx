import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Activity, Target, Flame, Calendar, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function PatientDashboard() {
  const { user, updateProfile } = useAuth();
  const [todaySteps, setTodaySteps] = useState(0);
  const [stepsInput, setStepsInput] = useState("");
  const dailyGoal = 10000;

  useEffect(() => {
    const today = new Date().toDateString();
    const stepsData = JSON.parse(localStorage.getItem("stepsData") || "{}");
    const userSteps = stepsData[user?.id || ""] || {};
    setTodaySteps(userSteps[today] || 0);
  }, [user]);

  const addSteps = () => {
    if (!stepsInput || !user) return;
    
    const steps = Number(stepsInput);
    const today = new Date().toDateString();
    const stepsData = JSON.parse(localStorage.getItem("stepsData") || "{}");
    
    if (!stepsData[user.id]) stepsData[user.id] = {};
    const newTotal = (stepsData[user.id][today] || 0) + steps;
    stepsData[user.id][today] = newTotal;
    
    localStorage.setItem("stepsData", JSON.stringify(stepsData));
    setTodaySteps(newTotal);
    setStepsInput("");
    
    if (newTotal >= dailyGoal && (stepsData[user.id][today] - steps) < dailyGoal) {
      const newStreak = user.streakCurrent + 1;
      updateProfile({ 
        streakCurrent: newStreak,
        bestStreak: Math.max(newStreak, user.bestStreak)
      });
      toast.success("🎉 Goal achieved! Streak updated!");
    } else {
      toast.success(`Added ${steps} steps!`);
    }
  };

  const progressPercent = Math.min((todaySteps / dailyGoal) * 100, 100);
  const weightProgress = user?.targetWeightKg && user?.weightKg 
    ? ((user.weightKg - user.targetWeightKg) / user.weightKg * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Steps</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaySteps.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Goal: {dailyGoal.toLocaleString()}</p>
              <Progress value={progressPercent} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Flame className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.streakCurrent} days</div>
              <p className="text-xs text-muted-foreground">Best: {user?.bestStreak} days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Weight Goal</CardTitle>
              <Target className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.weightKg}kg</div>
              <p className="text-xs text-muted-foreground">Target: {user?.targetWeightKg}kg</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weightProgress}%</div>
              <p className="text-xs text-muted-foreground">Weight reduction</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Add Today's Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter steps..."
                  value={stepsInput}
                  onChange={(e) => setStepsInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSteps()}
                />
                <Button onClick={addSteps}>Add Steps</Button>
              </div>
              <div className="mt-4 space-y-2">
                <Link to="/progress">
                  <Button variant="outline" className="w-full">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Progress Charts
                  </Button>
                </Link>
                <Link to="/goals">
                  <Button variant="outline" className="w-full">
                    <Target className="mr-2 h-4 w-4" />
                    Manage Goals
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/reminders">
                <Button variant="secondary" className="w-full">View Reminders</Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="w-full">Update Profile</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
