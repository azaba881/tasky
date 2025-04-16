"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskItem } from "@/components/task-item";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Task } from "@/types";

export type TaskListProps = {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
};

export function TaskList({ tasks, onTaskUpdate, onTaskDelete }: TaskListProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Fonction pour vérifier si une date est aujourd'hui
  const isToday = (dateString: string | undefined) => {
    if (!dateString) return false;
    const today = new Date();
    const taskDate = new Date(dateString);
    return (
      today.getDate() === taskDate.getDate() &&
      today.getMonth() === taskDate.getMonth() &&
      today.getFullYear() === taskDate.getFullYear()
    );
  };

  // Filtrer les tâches en fonction du statut sélectionné
  const filteredTasks = tasks.filter(task => {
    if (selectedStatus === "all") return true;
    return task.status === selectedStatus;
  });

  // Filtrer les tâches pour aujourd'hui
  const todayTasks = tasks.filter(task => isToday(task.dueDate || task.date));

  // Filtrer les tâches importantes
  const importantTasks = tasks.filter(task => task.important || task.isImportant);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="not-started">Non commencé</SelectItem>
            <SelectItem value="in-progress">En cours</SelectItem>
            <SelectItem value="completed">Terminé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="today">Aujourd&apos;hui</TabsTrigger>
          <TabsTrigger value="important">Importantes</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-muted-foreground">Aucune tâche disponible</p>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onStatusChange={(status) => onTaskUpdate({ ...task, status })}
                onToggleImportant={() => onTaskUpdate({ ...task, important: !task.important, isImportant: !task.isImportant })}
                onDelete={() => onTaskDelete(task.id.toString())}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="today">
          {todayTasks.length === 0 ? (
            <p className="text-center text-muted-foreground">Aucune tâche pour aujourd&apos;hui</p>
          ) : (
            todayTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onStatusChange={(status) => onTaskUpdate({ ...task, status })}
                onToggleImportant={() => onTaskUpdate({ ...task, important: !task.important, isImportant: !task.isImportant })}
                onDelete={() => onTaskDelete(task.id.toString())}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="important">
          {importantTasks.length === 0 ? (
            <p className="text-center text-muted-foreground">Aucune tâche importante</p>
          ) : (
            importantTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onStatusChange={(status) => onTaskUpdate({ ...task, status })}
                onToggleImportant={() => onTaskUpdate({ ...task, important: !task.important, isImportant: !task.isImportant })}
                onDelete={() => onTaskDelete(task.id.toString())}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}