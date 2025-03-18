export type Task = {
  id: number;
  title: string;
  status: "not-started" | "in-progress" | "completed"; // Union de types littéraux
  date: Date;
  important: boolean;
  userId: string; // Optionnel
};