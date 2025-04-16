"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/date-picker";
import { Task } from "@/types"; // Importez le type Task
import { useAuth } from "@clerk/nextjs";

type AddTaskButtonProps = {
  onAddTask: (newTask: Task) => void;
};

export function AddTaskButton({ onAddTask }: AddTaskButtonProps) {
  const { userId } = useAuth(); // Récupérer l'ID de l'utilisateur connecté
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);

  // Générer des suggestions automatiquement
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (taskTitle.length > 3) {
      setError(null);
      setIsGeneratingSuggestions(true);

      // Ajouter un délai pour éviter trop de requêtes
      timeoutId = setTimeout(async () => {
        try {
          const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              title: taskTitle,
              generateSuggestions: true 
            }),
          });

          if (!response.ok) {
            throw new Error("Échec de la génération des suggestions.");
          }

          const data = await response.json();
          setSuggestions(data.suggestions || []);
        } catch (error) {
          console.error("Erreur lors de la génération des suggestions :", error);
          setError("Erreur lors de la génération des suggestions.");
        } finally {
          setIsGeneratingSuggestions(false);
        }
      }, 500); // Attendre 500ms après la dernière frappe
    } else {
      setSuggestions([]);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [taskTitle]);

  // Soumettre la tâche
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskTitle || taskTitle.length < 3) {
      setError("Le titre doit contenir au moins 3 caractères.");
      return;
    }

    if (!date) {
      setError("Veuillez sélectionner une date.");
      return;
    }

    const capitalizedTitle = taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: capitalizedTitle,
          date: date.toISOString(),
          status: "not-started",
          important: false,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Échec de la création de la tâche. Statut : ${response.status}`);
      }

      const newTask = await response.json();
      onAddTask(newTask);

      // Réinitialiser le formulaire
      setTaskTitle("");
      setDate(new Date());
      setOpen(false);
      setSuggestions([]);
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la création de la tâche :", error);
      setError("Erreur lors de la création de la tâche.");
    }
  };

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Ajouter une tâche</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Titre de la tâche</Label>
              <Input
                id="task-title"
                value={taskTitle}
                onChange={(e) => {
                  setTaskTitle(e.target.value);
                  setError(null);
                }}
                placeholder="Entrez votre tâche"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {isGeneratingSuggestions && (
                <p className="text-sm text-gray-500">Génération des suggestions...</p>
              )}
            </div>

            {/* Suggestions de tâches */}
            {suggestions.length > 0 && (
              <div className="space-y-2">
                <Label>Suggestions</Label>
                <select
                  className="w-full p-2 border rounded"
                  onChange={(e) => setTaskTitle(e.target.value)}
                >
                  <option value="">Sélectionnez une suggestion</option>
                  {suggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion}>
                      {suggestion}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Dernier délai</Label>
              <DatePicker date={date} setDate={setDate} />
              {!date && <p className="text-red-500 text-sm">Veuillez choisir une date.</p>}
            </div>

            <Button type="submit" className="w-full">
              Ajouter une tâche
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}