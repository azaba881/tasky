"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskItem } from "@/components/task-item"

// Mock data for demonstration
const INITIAL_TASKS = [
  { id: 1, title: "Complete project proposal", status: "in-progress", date: new Date(), important: false },
  { id: 2, title: "Schedule team meeting", status: "not-started", date: new Date(), important: true },
  { id: 3, title: "Review client feedback", status: "completed", date: new Date(), important: false },
  { id: 4, title: "Update documentation", status: "not-started", date: new Date(), important: false },
]

export default function TaskList() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)

  const updateTaskStatus = (id: number, status: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)))
  }

  const markAsImportant = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, important: !task.important } : task)))
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="important">Important</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onStatusChange={(status) => updateTaskStatus(task.id, status)}
            onToggleImportant={() => markAsImportant(task.id)}
          />
        ))}
      </TabsContent>

      <TabsContent value="today" className="space-y-4">
        {tasks
          .filter((task) => {
            const today = new Date()
            const taskDate = new Date(task.date)
            return taskDate.toDateString() === today.toDateString()
          })
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={(status) => updateTaskStatus(task.id, status)}
              onToggleImportant={() => markAsImportant(task.id)}
            />
          ))}
      </TabsContent>

      <TabsContent value="important" className="space-y-4">
        {tasks
          .filter((task) => task.important)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={(status) => updateTaskStatus(task.id, status)}
              onToggleImportant={() => markAsImportant(task.id)}
            />
          ))}
      </TabsContent>
    </Tabs>
  )
}

