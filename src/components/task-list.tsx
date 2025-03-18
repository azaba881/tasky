"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskItem } from "@/components/task-item";
import { Task } from "@/types"; // Importez le type Task

type TaskListProps = {
  tasks: Task[];
  onStatusChange: (id: number, status: "not-started" | "in-progress" | "completed") => void;
  onToggleImportant: (id: number) => void;
};

export function TaskList({ tasks, onStatusChange, onToggleImportant }: TaskListProps) {
  // Get today's date for filtering
  const today = new Date();

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="important">Important</TabsTrigger>
      </TabsList>

      {/* All Tasks Tab */}
      <TabsContent value="all" className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onStatusChange={(status) => onStatusChange(task.id, status)}
            onToggleImportant={() => onToggleImportant(task.id)}
          />
        ))}
      </TabsContent>

      {/* Today's Tasks Tab */}
      <TabsContent value="today" className="space-y-4">
        {tasks
          .filter((task) => {
            const taskDate = new Date(task.date);
            return taskDate.toDateString() === today.toDateString();
          })
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={(status) => onStatusChange(task.id, status)}
              onToggleImportant={() => onToggleImportant(task.id)}
            />
          ))}
      </TabsContent>

      {/* Important Tasks Tab */}
      <TabsContent value="important" className="space-y-4">
        {tasks
          .filter((task) => task.important)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={(status) => onStatusChange(task.id, status)}
              onToggleImportant={() => onToggleImportant(task.id)}
            />
          ))}
      </TabsContent>
    </Tabs>
  );
}