import { sql } from '@vercel/postgres';

export async function createTables() {
  try {
    console.log("Tentative de création des tables...");
    await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending',
        due_date TIMESTAMP,
        date TEXT,
        important BOOLEAN DEFAULT false,
        is_important BOOLEAN DEFAULT false,
        user_id TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Tables créées avec succès");
  } catch (error) {
    console.error("Erreur détaillée lors de la création des tables:", error);
    throw new Error(`Erreur lors de la création des tables: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fonction pour obtenir toutes les tâches
export async function getTasks() {
  try {
    console.log("Tentative de récupération des tâches...");
    const result = await sql`
      SELECT * FROM tasks
      ORDER BY created_at DESC;
    `;
    console.log(`${result.rowCount} tâches récupérées`);
    return result.rows;
  } catch (error) {
    console.error("Erreur détaillée lors de la récupération des tâches:", error);
    throw new Error(`Erreur lors de la récupération des tâches: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
    const result = await sql`
      INSERT INTO tasks (
        title,
        description,
        status,
        due_date,
        date,
        important,
        is_important,
        user_id
      )
      VALUES (
        ${title},
        ${description},
        ${status},
        ${dueDate ? new Date(dueDate) : null},
        ${date},
        ${important},
        ${isImportant},
        ${userId}
      )
      RETURNING *;
    `;
    console.log("Tâche créée avec succès:", result.rows[0]);
    return result.rows[0];
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
    const result = await sql`
      UPDATE tasks
      SET
        title = COALESCE(${updates.title}, title),
        description = COALESCE(${updates.description}, description),
        status = COALESCE(${updates.status}, status),
        due_date = COALESCE(${updates.dueDate ? new Date(updates.dueDate) : null}, due_date),
        date = COALESCE(${updates.date}, date),
        important = COALESCE(${updates.important}, important),
        is_important = COALESCE(${updates.isImportant}, is_important),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *;
    `;
    console.log("Tâche mise à jour avec succès:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Erreur détaillée lors de la mise à jour de la tâche:", error);
    throw new Error(`Erreur lors de la mise à jour de la tâche: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fonction pour supprimer une tâche
export async function deleteTask(id: number) {
  try {
    console.log("Tentative de suppression de la tâche:", id);
    const result = await sql`
      DELETE FROM tasks
      WHERE id = ${id}
      RETURNING *;
    `;
    console.log("Tâche supprimée avec succès");
    return result.rows[0];
  } catch (error) {
    console.error("Erreur détaillée lors de la suppression de la tâche:", error);
    throw new Error(`Erreur lors de la suppression de la tâche: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 