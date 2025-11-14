"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, FileText, Users, Shield } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search",
      description: "Look up scams by name, description, or keywords",
    },
    {
      icon: FileText,
      title: "Read",
      description: "View detailed reports with AI-generated summaries",
    },
    {
      icon: Users,
      title: "Contribute",
      description: "Share your experiences and help others",
    },
    {
      icon: Shield,
      title: "Stay Safe",
      description: "Learn to recognize and avoid scams",
    },
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
