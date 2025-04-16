"use client";
import { AddTaskButton } from "@/components/add-task-button";
import { DashboardStats } from "@/components/dashboard-stats";
import { TaskList } from "@/components/task-list";
import { Task } from "@/types"; // Importez le type Task
import { useEffect, useState } from "react";

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
        
        // Convertir les tâches pour assurer la compatibilité avec le type Task
        const validatedTasks = data.map((task: any) => {
          // Convertir date en dueDate pour la compatibilité
          const taskWithDueDate = {
            ...task,
            dueDate: task.date, // Copier date vers dueDate
            isImportant: task.important // Copier important vers isImportant
          };
          
          if (!isValidStatus(taskWithDueDate.status)) {
            taskWithDueDate.status = "not-started"; // Valeur par défaut si le statut est invalide
          }
          
          return taskWithDueDate;
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
  const updateTaskStatus = async (id: number, status: "not-started" | "in-progress" | "completed") => {
    try {
      // Mettre à jour dans l'API
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
      
      // Mettre à jour l'état local
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Toggle task importance
  const markAsImportant = async (id: number) => {
    try {
      // Trouver la tâche actuelle pour obtenir son état d'importance
      const task = tasks.find(t => t.id === id);
      if (!task) return;
      
      // Déterminer la nouvelle valeur d'importance
      const newImportantValue = !(task.important || task.isImportant);
      
      // Mettre à jour dans l'API
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, important: newImportantValue }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update task importance");
      }
      
      // Mettre à jour l'état local
      setTasks((prevTasks) =>
        prevTasks.map((task) => 
          task.id === id ? { 
            ...task, 
            important: newImportantValue,
            isImportant: newImportantValue 
          } : task
        )
      );
    } catch (error) {
      console.error("Error updating task importance:", error);
    }
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    try {
      // Supprimer dans l'API
      const response = await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      
      // Mettre à jour l'état local
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardStats tasks={tasks} />
        </div>

        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Tâches du jour</h2>
          <TaskList
            tasks={tasks}
            onTaskUpdate={(task) => {
              // Mettre à jour le statut et l'importance
              updateTaskStatus(task.id, task.status);
              if (task.important !== undefined || task.isImportant !== undefined) {
                markAsImportant(task.id);
              }
            }}
            onTaskDelete={(taskId) => deleteTask(parseInt(taskId))}
          />
        </div>
      </div>
      <AddTaskButton onAddTask={addTask} />
    </main>
  );
}