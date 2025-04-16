"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Task } from "@/types"

interface CalendarViewProps {
  tasks: Task[];
}

export function CalendarView({ tasks }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Organiser les tâches par date
  const tasksByDate = tasks.reduce((acc, task) => {
    // Utiliser dueDate ou date
    const dateString = task.dueDate || task.date;
    
    // Vérifier si dateString est une chaîne valide
    if (!dateString || typeof dateString !== 'string') {
      return acc;
    }
    
    try {
      const taskDate = new Date(dateString);
      // Vérifier si la date est valide    
      if (isNaN(taskDate.getTime())) {
        return acc;
      }
      
      const dateKey = taskDate.toISOString().split('T')[0];
      
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      
      acc[dateKey].push(task);
    } catch (error) {
      console.error("Erreur lors du traitement de la date:", error);
    }
    
    return acc;
  }, {} as Record<string, Task[]>);

  // Trouver les tâches pour la date sélectionnée
  const selectedDateTasks = selectedDate
    ? tasksByDate[selectedDate.toISOString().split('T')[0]] || []
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
        modifiers={{
          hasTask: (date) => {
            const dateKey = date.toISOString().split('T')[0];
            return !!tasksByDate[dateKey];
          }
        }}
        modifiersStyles={{
          hasTask: { fontWeight: 'bold', color: 'blue' }
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Aucune date sélectionnée"}</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateTasks.length > 0 ? (
            <div className="space-y-4">
              {selectedDateTasks.map((task) => (
                <div key={task.id} className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex flex-col">
                    <span className={`font-medium ${task.status === "completed" ? "line-through text-gray-500" : ""}`}>
                      {task.title}
                    </span>
                    {(task.important || task.isImportant) && (
                      <Badge variant="outline" className="mt-1 bg-yellow-100 text-yellow-800">
                        Important
                      </Badge>
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }
                  >
                    {task.status === "completed"
                      ? "Terminée"
                      : task.status === "in-progress"
                        ? "En cours"
                        : "À faire"}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Aucune tâche pour cette date</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

