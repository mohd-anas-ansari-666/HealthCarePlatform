import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, User, Phone, Droplet } from "lucide-react";

export default function PatientDetails() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundPatient = users.find((u: any) => u.id === patientId);
    setPatient(foundPatient);

    if (foundPatient) {
      const stepsData = JSON.parse(localStorage.getItem("stepsData") || "{}");
      const userSteps = stepsData[patientId] || {};
      
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const data = days.map((day, i) => {
        const date = new Date();
        date.setDate(date.getDate() - date.getDay() + i + 1);
        const dateStr = date.toDateString();
        return { name: day, steps: userSteps[dateStr] || 0 };
      });
      setChartData(data);
    }
  }, [patientId]);

  if (!patient) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Patient not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Patient Details</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold">{patient.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{patient.email}</p>
              </div>
              {patient.phone && (
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Phone
                  </p>
                  <p className="font-semibold">{patient.phone}</p>
                </div>
              )}
              {patient.bloodGroup && (
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Droplet className="h-3 w-3" /> Blood Group
                  </p>
                  <p className="font-semibold">{patient.bloodGroup}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patient.heightCm && (
                <div>
                  <p className="text-sm text-muted-foreground">Height</p>
                  <p className="font-semibold">{patient.heightCm} cm</p>
                </div>
              )}
              {patient.weightKg && (
                <div>
                  <p className="text-sm text-muted-foreground">Current Weight</p>
                  <p className="font-semibold">{patient.weightKg} kg</p>
                </div>
              )}
              {patient.targetWeightKg && (
                <div>
                  <p className="text-sm text-muted-foreground">Target Weight</p>
                  <p className="font-semibold">{patient.targetWeightKg} kg</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Activity Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="font-semibold text-2xl text-accent">{patient.streakCurrent || 0} days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Streak</p>
                <p className="font-semibold">{patient.bestStreak || 0} days</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Weekly Step Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="steps" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
