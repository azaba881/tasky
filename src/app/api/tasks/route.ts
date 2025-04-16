import { NextResponse } from "next/server";
import { getTasks, createTask, updateTask, deleteTask } from "@/lib/db";
import { generateText } from "@/app/services/openai";

// GET /api/tasks
export async function GET() {
  try {
    console.log("GET /api/tasks - Début de la requête");
    const tasks = await getTasks();
    console.log("GET /api/tasks - Succès");
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET /api/tasks - Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des tâches" },
      { status: 500 }
    );
  }
}

// POST /api/tasks
export async function POST(request: Request) {
  try {
    console.log("POST /api/tasks - Début de la requête");
    const data = await request.json();
    console.log("POST /api/tasks - Données reçues:", data);

    // Si c'est une requête de génération de suggestions
    if (data.generateSuggestions) {
      const prompt = `Générer 3 suggestions de tâches similaires à : "${data.title}"`;
      const suggestions = await generateText(prompt);
      
      if (suggestions) {
        // Diviser le texte en suggestions individuelles
        const suggestionsList = suggestions
          .split('\n')
          .filter(s => s.trim())
          .map(s => s.trim().replace(/^\d+\.\s*/, ''))
          .slice(0, 3);
        
        return NextResponse.json({ suggestions: suggestionsList });
      } else {
        return NextResponse.json({ suggestions: [] });
      }
    }

    // Sinon, c'est une création de tâche normale
    if (!data.title) {
      console.error("POST /api/tasks - Titre manquant");
      return NextResponse.json(
        { error: "Le titre est requis" },
        { status: 400 }
      );
    }

    const newTask = await createTask(data);
    console.log("POST /api/tasks - Tâche créée:", newTask);
    return NextResponse.json(newTask);
  } catch (error) {
    console.error("POST /api/tasks - Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la tâche" },
      { status: 500 }
    );
  }
}

// PUT /api/tasks
export async function PUT(request: Request) {
  try {
    console.log("PUT /api/tasks - Début de la requête");
    const { id, ...updates } = await request.json();
    console.log("PUT /api/tasks - Données reçues:", { id, updates });

    if (!id) {
      console.error("PUT /api/tasks - ID manquant");
      return NextResponse.json(
        { error: "L'ID est requis" },
        { status: 400 }
      );
    }

    const updatedTask = await updateTask(id, updates);
    console.log("PUT /api/tasks - Tâche mise à jour:", updatedTask);
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("PUT /api/tasks - Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la tâche" },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks
export async function DELETE(request: Request) {
  try {
    console.log("DELETE /api/tasks - Début de la requête");
    const { id } = await request.json();
    console.log("DELETE /api/tasks - ID reçu:", id);

    if (!id) {
      console.error("DELETE /api/tasks - ID manquant");
      return NextResponse.json(
        { error: "L'ID est requis" },
        { status: 400 }
      );
    }

    await deleteTask(id);
    console.log("DELETE /api/tasks - Tâche supprimée");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/tasks - Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la tâche" },
      { status: 500 }
    );
  }
}