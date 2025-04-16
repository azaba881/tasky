"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Clock, CheckCircle, Trash, Trash2 } from "lucide-react";
import { Task } from "@/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useLanguage } from "@/hooks/use-language";

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
  const { t } = useLanguage();
  
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
  const handleToggleImportant = () => {
    onToggleImportant();
  };

  // Fonction pour mettre à jour le statut
  const handleStatusChange = (status: "not-started" | "in-progress" | "completed") => {
    onStatusChange(status);
  };

  // Fonction pour supprimer la tâche
  const handleDelete = () => {
    onDelete();
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