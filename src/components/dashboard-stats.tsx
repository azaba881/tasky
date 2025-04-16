"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Clock, Star } from "lucide-react"
import { Task } from "@/types"
import { useEffect, useState } from "react"

type DashboardStatsProps = {
  tasks: Task[]
}

export function DashboardStats({ tasks }: DashboardStatsProps) {
  // Calculer les statistiques à partir des tâches
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const inProgressTasks = tasks.filter(task => task.status === "in-progress").length;
  const notStartedTasks = tasks.filter(task => task.status === "not-started").length;
  const importantTasks = tasks.filter(task => task.important).length;
  const totalTasks = tasks.length;
  
  // Calculer le taux de complétion
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculer les tâches à faire aujourd'hui
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const tasksForToday = tasks.filter(task => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate >= today && taskDate < tomorrow;
  }).length;

  return (    
    <>    
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tâches terminées</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTasks}</div>
          <p className="text-xs text-muted-foreground">{completionRate}% du total</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tâches en cours</CardTitle>
          <Clock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressTasks}</div>
          <p className="text-xs text-muted-foreground">{totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0}% du total</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tâches importantes</CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{importantTasks}</div>
          <p className="text-xs text-muted-foreground">{totalTasks > 0 ? Math.round((importantTasks / totalTasks) * 100) : 0}% du total</p>
        </CardContent>
      </Card>
    </>
  )
}

