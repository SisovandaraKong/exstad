"use client";
import React from "react";

export default function ProgramTimeLine() {
  const timeline = [
    {
      day: 25,
      month: "August",
      title: "Application Period",
      description: "Submit your application and required documents",
      icon: "📝",
    },
    {
      day: 26,
      month: "August",
      title: "Application Review",
      description: "Initial review of submitted applications",
      icon: "🔍",
    },
    {
      day: 2,
      month: "October",
      title: "Writing Test",
      description: "Technical writing assessment",
      icon: "✍️",
    },
    {
      day: 10,
      month: "October",
      title: "Interview Test",
      description: "Face-to-face interview with panel",
      icon: "👥",
    },
    {
      day: 20,
      month: "October",
      title: "Final Result",
      description: "Announcement of selected candidates",
      icon: "🎯",
    },
    {
      day: 1,
      month: "November",
      title: "Orientation",
      description: "Program introduction and onboarding",
      icon: "🎓",
    },
    {
      day: 15,
      month: "November",
      title: "Preliminary Learning",
      description: "Foundation courses and skill assessment",
      icon: "📚",
    },
    {
      day: 1,
      month: "December",
      title: "Course Training",
      description: "Main curriculum and practical sessions",
      icon: "💻",
    },
    {
      day: 15,
      month: "March",
      title: "Final Project",
      description: "Capstone project and presentation",
      icon: "🚀",
    },
    {
      day: 30,
      month: "March",
      title: "Graduation",
      description: "Ceremony and certificate presentation",
      icon: "🏆",
    },
  ];

  // Get today's date
  const today = new Date();
  const todayStr = `${today.getDate()} - ${today.toLocaleString("en-US", {
    month: "long",
  })}`;

  // Function to parse date from day and month and create Date object
  const parseStepDate = (day: number, month: string) => {
    const currentYear = today.getFullYear();

    // Create date object for the current year
    const stepDate = new Date(`${month} ${day}, ${currentYear}`);

    // Reset time to start of day for accurate comparison
    stepDate.setHours(0, 0, 0, 0);

    return stepDate;
  };

  // Function to determine status based on date
  const getStatusByDate = (day: number, month: string) => {
    const stepDate = parseStepDate(day, month);

    // Create today's date at start of day for comparison
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);

    const daysDiff = Math.ceil(
      (stepDate.getTime() - todayStart.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Check if it's exactly today first
    if (daysDiff === 0) {
      return "current"; // Exactly today
    } else if (daysDiff < 0) {
      return "completed"; // Date has passed
    } else if (daysDiff <= 7) {
      // Within 7 days - current
      return "current";
    } else {
      // Future date - upcoming
      return "upcoming";
    }
  };

  // Add dynamic status to each step
  const timelineWithStatus = timeline.map((step) => ({
    ...step,
    status: getStatusByDate(step.day, step.month),
    dateString: `${step.day.toString().padStart(2, "0")} - ${step.month}`,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green ";
      case "current":
        return "bg-accent";
      case "upcoming":
        return "bg-background border-border";
      default:
        return "bg-muted border-border";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green ring-green-100";
      case "current":
        return "bg-accent ring-accent/90 animate-pulse";
      case "upcoming":
        return "bg-background border-2 border-border";
      default:
        return "bg-muted border-2 border-border";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-background to-muted/30 rounded-xl">
      <div className="text-center mb-12">
        <h2 className="font-h2 font-bold text-primary mb-4">
          Program Timeline
        </h2>
        <p className="font-d2 text-muted-foreground max-w-2xl mx-auto">
          Follow your journey through our comprehensive program. Track your
          progress and know what&apos;s coming next.
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          Today: {todayStr}
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green via-accent to-muted rounded-full"></div>

        <div className="space-y-8">
          {timelineWithStatus.map((step, idx) => (
            <div key={idx} className="relative flex items-start group">
              {/* Timeline Dot */}
              <div
                className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${getStatusDotColor(
                  step.status
                )} shadow-lg transition-all duration-300 group-hover:scale-110`}
              >
                <span className="text-2xl">{step.icon}</span>
                {step.status === "completed" && (
                  <div className="absolute inset-0 rounded-full bg-green/20 animate-ping"></div>
                )}
              </div>

              {/* Content Card */}
              <div
                className={`ml-8 flex-1 p-6 rounded-xl border-2 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 ${getStatusColor(
                  step.status
                )}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-h5 font-bold text-foreground">
                        {step.title}
                      </h3>
                      {step.status === "completed" && (
                        <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                          ✓ Completed
                        </span>
                      )}
                      {step.status === "current" && (
                        <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                          • Current
                        </span>
                      )}
                    </div>
                    <p className="font-d4 text-muted-foreground mb-3">
                      {step.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <time className="font-d3 font-bold text-primary block">
                        {step.dateString}
                      </time>
                      <span className="font-d6 text-muted-foreground capitalize">
                        {step.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress indicator for current step */}
                {step.status === "current" && (
                  <div className="mt-4 pt-4 border-t border-accent/20">
                    <div className="flex items-center gap-2 text-sm text-accent-foreground">
                      <div className="w-2 h-2 bg-yellow-800 rounded-full animate-pulse"></div>
                      <span className="font-medium">In Progress</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom completion indicator */}
        <div className="mt-12 text-center p-6 bg-background rounded-xl border border-primary/10">
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <span className="text-2xl">🎉</span>
            <h3 className="font-h6 font-bold">Complete Your Journey</h3>
          </div>
          <p className="font-d5 text-muted-foreground">
            Join thousands of successful graduates who have transformed their
            careers through our program
          </p>
        </div>
      </div>
    </div>
  );
}
