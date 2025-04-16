"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Trash2 } from "lucide-react";
import { Task } from "@/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type TaskItemProps = {
  task: Task;
  onStatusChange: (status: "not-started" | "in-progress" | "completed") => void;
  onToggleImportant: () => void;
  onDelete: () => void;
};

const statusLabels = {
  "not-started": "Non commencé",
  "in-progress": "En cours",
  "completed": "Terminé",
};

export function TaskItem({ task, onStatusChange, onToggleImportant, onDelete }: TaskItemProps) {
  // Fonction pour basculer l'importance
  const handleToggleImportant = async () => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
          important: !task.important,
          isImportant: !task.isImportant,
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de la mise à jour de l'importance");
      }

      const updatedTask = await response.json();
      onToggleImportant();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'importance:", error);
    }
  };

  // Fonction pour mettre à jour le statut
  const handleStatusChange = async (status: "not-started" | "in-progress" | "completed") => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de la mise à jour du statut");
      }

      const updatedTask = await response.json();
      onStatusChange(status);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
    }
  };

  // Fonction pour supprimer la tâche
  const handleDelete = async () => {
    try {
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
        throw new Error("Échec de la suppression de la tâche");
      }

      onDelete();
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error);
    }
  };

  return (
    <Card className="p-4 mb-2">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-medium">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-muted-foreground">{task.description}</p>
          )}
          <div className="flex items-center gap-2">
            <Badge variant={task.important || task.isImportant ? "default" : "secondary"}>
              {statusLabels[task.status]}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {task.dueDate && format(new Date(task.dueDate), "PPP", { locale: fr })}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select 
            value={task.status} 
            onValueChange={(value) => handleStatusChange(value as "not-started" | "in-progress" | "completed")}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-started">Non commencé</SelectItem>
              <SelectItem value="in-progress">En cours</SelectItem>
              <SelectItem value="completed">Terminé</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleImportant}
            className={task.important || task.isImportant ? "text-yellow-500" : "text-muted-foreground"}
          >
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}