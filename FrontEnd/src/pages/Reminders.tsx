import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
}

export default function Reminders() {
  const { user } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    type: "doctor_visit"
  });

  useEffect(() => {
    const stored = localStorage.getItem(`reminders_${user?.id}`);
    if (stored) setReminders(JSON.parse(stored));
  }, [user]);

  const saveReminders = (newReminders: Reminder[]) => {
    localStorage.setItem(`reminders_${user?.id}`, JSON.stringify(newReminders));
    setReminders(newReminders);
  };

  const addReminder = () => {
    if (!formData.title || !formData.date || !formData.time) {
      toast.error("Please fill all fields");
      return;
    }

    const newReminder: Reminder = {
      id: Date.now().toString(),
      ...formData
    };

    saveReminders([...reminders, newReminder]);
    setFormData({ title: "", date: "", time: "", type: "doctor_visit" });
    setShowForm(false);
    toast.success("Reminder added!");
  };

  const deleteReminder = (id: string) => {
    saveReminders(reminders.filter(r => r.id !== id));
    toast.success("Reminder deleted");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Reminders</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Reminder
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>New Reminder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Doctor appointment"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor_visit">Doctor Visit</SelectItem>
                      <SelectItem value="blood_test">Blood Test</SelectItem>
                      <SelectItem value="medication">Medication</SelectItem>
                      <SelectItem value="exercise">Exercise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={addReminder}>Save Reminder</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reminders.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="py-8 text-center text-muted-foreground">
                No reminders yet. Click "Add Reminder" to create one.
              </CardContent>
            </Card>
          ) : (
            reminders.map((reminder) => (
              <Card key={reminder.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{reminder.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(reminder.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {reminder.time}
                    </div>
                    <div className="pt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {reminder.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => deleteReminder(reminder.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
