import { prisma } from './prisma';

export async function createTables() {
  try {
    console.log("Vérification de la connexion à la base de données...");
    // Test de la connexion
    await prisma.$connect();
    console.log("Connexion à la base de données réussie");
    return true;
  } catch (error) {
    console.error("Erreur détaillée lors de la connexion à la base de données:", error);
    throw new Error(`Erreur lors de la connexion à la base de données: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fonction pour obtenir toutes les tâches
export async function getTasks() {
  try {
    console.log("Tentative de récupération des tâches...");
    console.log("URL de la base de données:", process.env.DATABASE_URL);
    
    // Vérifier la connexion à la base de données
    await prisma.$connect();
    console.log("Connexion à la base de données réussie");
    
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    console.log(`${tasks.length} tâches récupérées`);
    return tasks;
  } catch (error) {
    console.error("Erreur détaillée lors de la récupération des tâches:", error);
    throw new Error(`Erreur lors de la récupération des tâches: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    // Fermer la connexion à la base de données
    await prisma.$disconnect();
    console.log("Connexion à la base de données fermée");
  }
}

// Fonction pour créer une nouvelle tâche
export async function createTask({
  title,
  description,
  status = "pending",
  dueDate,
  date,
  important = false,
  isImportant = false,
  userId,
}: {
  title: string;
  description?: string;
  status?: string;
  dueDate?: string;
  date?: string;
  important?: boolean;
  isImportant?: boolean;
  userId?: string;
}) {
  try {
    console.log("Tentative de création d'une nouvelle tâche:", { title, status });
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        date,
        important,
        isImportant,
        userId,
      }
    });
    console.log("Tâche créée avec succès:", task);
    return task;
  } catch (error) {
    console.error("Erreur détaillée lors de la création de la tâche:", error);
    throw new Error(`Erreur lors de la création de la tâche: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fonction pour mettre à jour une tâche
export async function updateTask(
  id: number,
  updates: {
    title?: string;
    description?: string;
    status?: string;
    dueDate?: string;
    date?: string;
    important?: boolean;
    isImportant?: boolean;
  }
) {
  try {
    console.log("Tentative de mise à jour de la tâche:", { id, updates });
    const task = await prisma.task.update({
      where: { id },
      data: {
        title: updates.title,
        description: updates.description,
        status: updates.status,
        dueDate: updates.dueDate ? new Date(updates.dueDate) : undefined,
        date: updates.date,
        important: updates.important,
        isImportant: updates.isImportant,
      }
    });
    console.log("Tâche mise à jour avec succès:", task);
    return task;
  } catch (error) {
    console.error("Erreur détaillée lors de la mise à jour de la tâche:", error);
    throw new Error(`Erreur lors de la mise à jour de la tâche: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fonction pour supprimer une tâche
export async function deleteTask(id: number) {
  try {
    console.log("Tentative de suppression de la tâche:", id);
    const task = await prisma.task.delete({
      where: { id }
    });
    console.log("Tâche supprimée avec succès");
    return task;
  } catch (error) {
    console.error("Erreur détaillée lors de la suppression de la tâche:", error);
    throw new Error(`Erreur lors de la suppression de la tâche: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 