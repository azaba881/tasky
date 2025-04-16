export type Task = {
  id: number;
  title: string;
  description?: string;
  status: "not-started" | "in-progress" | "completed"; // Union de types littéraux
  dueDate: string; // Date au format ISO string
  date?: string; // Date alternative
  important: boolean;
  isImportant?: boolean; // Pour la compatibilité avec le code existant
  userId?: string; // Optionnel
};