"use client";

import { useState, useEffect } from "react";
import { CalendarView } from "@/components/calendar-view";
import { Task } from "@/types";
import { AddTaskButton } from "@/components/add-task-button";

export default function CalendarPage() {
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

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Calendrier des tâches</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Chargement des données...</p>
          </div>
        ) : (
          <div className="bg-card rounded-lg shadow-md p-6">
            <CalendarView tasks={tasks} />
          </div>
        )}
      </div>
      <AddTaskButton onAddTask={addTask} />
    </main>
  );
}

