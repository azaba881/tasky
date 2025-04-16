"use client";
import { useState, useEffect } from "react";
import { TaskList } from "@/components/task-list";
import { DashboardStats } from "@/components/dashboard-stats";
import { AddTaskButton } from "@/components/add-task-button";
import { Task } from "@/types";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Chargement des tâches...</div>
      </div>
    );
  }

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== parseInt(taskId))
    );
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <DashboardStats tasks={tasks} />
      </div>
      <div className="mb-8">
        <TaskList
          tasks={tasks}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
        />
      </div>
      <AddTaskButton onAddTask={handleTaskAdded} />
    </div>
  );
}