"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { AddTaskButton } from "@/components/add-task-button";

export default function SummaryPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les tâches au chargement du composant
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/tasks", {  
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error("Échec du chargement des tâches");
        }
        
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Erreur lors du chargement des tâches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Ajouter une nouvelle tâche
  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Calculer les statistiques
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const inProgressTasks = tasks.filter(task => task.status === "in-progress").length;
  const notStartedTasks = tasks.filter(task => task.status === "not-started").length;
  const importantTasks = tasks.filter(task => task.important || task.isImportant).length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Données pour le graphique en camembert
  const statusData = [
    { name: "Terminées", value: completedTasks },
    { name: "En cours", value: inProgressTasks },
    { name: "Non commencées", value: notStartedTasks },
  ];
  
  const COLORS = ["#10B981", "#3B82F6", "#9CA3AF"];

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Résumé des tâches</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Chargement des données...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            
            {/* Carte de répartition des statuts */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Répartition des statuts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Carte des tâches importantes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Progression des taches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tâches importantes</span>
                    <span className="text-sm font-medium">{importantTasks}</span>
                  </div>
                  <Progress 
                    value={totalTasks > 0 ? Math.round((importantTasks / totalTasks) * 100) : 0} 
                    className="h-2" 
                  />
                  <div className="text-sm text-muted-foreground">
                    {importantTasks} tâches importantes sur {totalTasks} tâches au total
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tâches terminées</span>
                    <span className="text-sm font-medium">{completionRate}%</span>
                  </div>
                  <Progress value={completionRate} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    {completedTasks} sur {totalTasks} tâches terminées
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <AddTaskButton onAddTask={addTask} />
    </main>
  );
}

