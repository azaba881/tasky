"use client";
import { AddTaskButton } from "@/components/add-task-button";
import { DashboardStats } from "@/components/dashboard-stats";
import { TaskList } from "@/components/task-list";
import { useEffect, useState } from "react";
import { Task } from "@/types"; // Importez le type Task

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  type TaskStatus = "not-started" | "in-progress" | "completed";


  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const isValidStatus = (status: string): status is TaskStatus => {
        return ["not-started", "in-progress", "completed"].includes(status);
      };
      try {
        console.log("Fetching tasks..."); // Log de débogage
        const response = await fetch("/api/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        console.log("Tasks fetched:", data); // Log de débogage
        const validatedTasks = data.map((task: Task) => {
          if (!isValidStatus(task.status)) {
            task.status = "not-started"; // Valeur par défaut si le statut est invalide
          }
          return task;
        });
        setTasks(validatedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task to the state
  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Update task status
  const updateTaskStatus = (id: number, status: "not-started" | "in-progress" | "completed") => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  // Toggle task importance
  const markAsImportant = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, important: !task.important } : task))
    );
  };

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardStats />
        </div>

        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Today&apos;s Tasks</h2>
          <TaskList
            tasks={tasks}
            onStatusChange={updateTaskStatus}
            onToggleImportant={markAsImportant}
          />
        </div>
      </div>
      <AddTaskButton onAddTask={addTask} />
    </main>
  );
}