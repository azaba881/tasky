"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Clock, CheckCircle, Trash } from "lucide-react";
import { Task } from "@/types";

type TaskItemProps = {
  task: Task;
  onStatusChange: (status: "not-started" | "in-progress" | "completed") => void;
  onToggleImportant: () => void;
};

export function TaskItem({ task, onStatusChange, onToggleImportant }: TaskItemProps) {
  const statusColors = {
    completed: "bg-green-300 text-green-800",
    "in-progress": "bg-blue-300 text-blue-800",
    "not-started": "bg-gray-300 text-gray-800",
  };

  const statusIcons = {
    completed: <CheckCircle className="h-4 w-4" />,
    "in-progress": <Clock className="h-4 w-4" />,
    "not-started": <Clock className="h-4 w-4 text-red-600" />,
  };

  // Fonction pour basculer l'importance
  const handleToggleImportant = async () => {
    try {
      // Appeler l'API pour mettre à jour la tâche
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
          important: !task.important, // Inverser l'état actuel
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task importance");
      }

      // Mettre à jour l'état local
      onToggleImportant();
    } catch (error) {
      console.error("Error toggling task importance:", error);
    }
  };

  // Fonction pour mettre à jour le statut
  const handleStatusChange = async (status: "not-started" | "in-progress" | "completed") => {
    try {
      // Appeler l'API pour mettre à jour la tâche
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
          status, // Nouveau statut
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      // Mettre à jour l'état local
      onStatusChange(status);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  const handleDeleteTask = async () => {
    try {
      // Appeler l'API pour mettre à jour la tâche
      const response = await fetch("/api/tasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
        }),  
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  return (
    <>
      <Card className="transform transition-all hover:scale-[1.01] hover:shadow-lg">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleImportant} // Utiliser handleToggleImportant
              className={task.important ? "text-yellow-500" : "text-gray-300"}
            >
              <Star className="h-5 w-5" fill={task.important ? "currentColor" : "none"} />
              <span className="sr-only">Toggle important</span>
            </Button>

            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-muted-foreground">{new Date(task.date).toLocaleDateString()}</p>
            </div>
          </div>
            <div>
              <Button onClick={handleDeleteTask} className="bg-red-600 hover:bg-red-400 rounded-full">
                <Trash className="h-4 w-4 text-white hover:text-black cursor-pointer" />
                <span className="sr-only">Supprimer</span>
              </Button>
            </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className={`flex items-center gap-1 ${statusColors[task.status as keyof typeof statusColors]}`}
            >
              {statusIcons[task.status as keyof typeof statusIcons]}
              {task.status === "in-progress"
                ? "In Progress"
                : task.status === "not-started"
                  ? "Not Started"
                  : "Completed"}
            </Badge>

            <Select value={task.status} onValueChange={handleStatusChange}> {/* Utiliser handleStatusChange */}
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </>
  );
}