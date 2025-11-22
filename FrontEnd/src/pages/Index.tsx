import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Target, Calendar, TrendingUp, Users, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 px-4 text-center bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto">
          <Activity className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Health, <span className="text-primary">Simplified</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Track your fitness journey, manage health goals, and connect with healthcare professionals all in one place.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/register">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Activity className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Step Tracking</CardTitle>
                <CardDescription>
                  Monitor your daily steps and maintain consistency streaks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-secondary mb-2" />
                <CardTitle>Progress Charts</CardTitle>
                <CardDescription>
                  Visualize your progress with weekly, monthly, and yearly charts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Goal Setting</CardTitle>
                <CardDescription>
                  Set and track weight loss and daily step goals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Reminders</CardTitle>
                <CardDescription>
                  Never miss appointments or important health tasks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-secondary mb-2" />
                <CardTitle>Doctor Connect</CardTitle>
                <CardDescription>
                  Connect with healthcare professionals for better guidance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your health data is stored securely and remains private
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Health Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users improving their health every day
          </p>
          <Link to="/register">
            <Button size="lg">Sign Up Now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
