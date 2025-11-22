import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingDown, Activity } from "lucide-react";
import { toast } from "sonner";

export default function Goals() {
  const { user, updateProfile } = useAuth();
  const [targetWeight, setTargetWeight] = useState(user?.targetWeightKg?.toString() || "");
  const [dailyStepGoal, setDailyStepGoal] = useState("10000");

  const handleUpdateGoals = () => {
    updateProfile({
      targetWeightKg: Number(targetWeight)
    });
    localStorage.setItem("dailyStepGoal", dailyStepGoal);
    toast.success("Goals updated successfully!");
  };

  const weightProgress = user?.targetWeightKg && user?.weightKg 
    ? ((user.weightKg - user.targetWeightKg) / (user.weightKg) * 100)
    : 0;

  const calorieTarget = user?.weightKg 
    ? Math.round((user.weightKg - (user.targetWeightKg || user.weightKg)) * 7700 / 30)
    : 0;

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Health Goals</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-secondary" />
                Weight Loss Goal
              </CardTitle>
              <CardDescription>Track your weight reduction journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current: {user?.weightKg}kg</span>
                  <span>Target: {user?.targetWeightKg}kg</span>
                </div>
                <Progress value={weightProgress} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetWeight">Update Target Weight (kg)</Label>
                <Input
                  id="targetWeight"
                  type="number"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                />
              </div>

              <div className="p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm font-medium">Daily Calorie Target</p>
                <p className="text-2xl font-bold text-secondary">{calorieTarget} cal</p>
                <p className="text-xs text-muted-foreground mt-1">
                  To reach your goal in 30 days
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Daily Step Goal
              </CardTitle>
              <CardDescription>Set your daily step target</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stepGoal">Daily Step Target</Label>
                <Input
                  id="stepGoal"
                  type="number"
                  value={dailyStepGoal}
                  onChange={(e) => setDailyStepGoal(e.target.value)}
                />
              </div>

              <div className="space-y-2 p-4 bg-primary/10 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Recommended Goal</span>
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-bold text-primary">10,000 steps</p>
                <p className="text-xs text-muted-foreground">
                  Based on WHO recommendations for adults
                </p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Estimated Benefits:</p>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Burns ~300-400 calories per day</li>
                  <li>• Improves cardiovascular health</li>
                  <li>• Reduces stress and anxiety</li>
                  <li>• Better sleep quality</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Button onClick={handleUpdateGoals} size="lg" className="w-full md:w-auto">
            Update Goals
          </Button>
        </div>
      </main>
    </div>
  );
}
