import OpenAI from "openai";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper pour gérer les erreurs
function handleError(error: unknown, message: string) {
  console.error(`${message}:`, error);
  return NextResponse.json({ error: message }, { status: 500 });
}

// GET /api/tasks
export async function GET() {
  try {
    const { userId } = await auth(); // Récupérer l'ID de l'utilisateur connecté

    // Vérifier si l'utilisateur est connecté
    if (!userId) {
      return NextResponse.json({ error: "Utilisateur non connecté" }, { status: 401 });
    }

    // Récupérer les tâches de l'utilisateur connecté
    const tasks = await prisma.task.findMany({
      where: { userId }, // Filtrer par ID de l'utilisateur
      orderBy: { date: "desc" }, // Trier par date (descendant)
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return handleError(error, "Erreur lors de la récupération des tâches");
  }
}

// POST /api/tasks
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, status, important, date, generateSuggestions } = body;
    const { userId } = await auth(); // Récupérer l'ID de l'utilisateur connecté

    // Vérifier si l'utilisateur est connecté
    if (!userId) {
      return NextResponse.json({ error: "Utilisateur non connecté" }, { status: 401 });
    }

    // Vérifier si l'utilisateur existe dans Prisma
    let existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Si l'utilisateur n'existe pas, le créer
    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          id: userId,
          email: "email@example.com", // Remplacez par l'email réel depuis Clerk
        },
      });
    }

    // Si `generateSuggestions` est true, générer des suggestions avec OpenAI
    if (generateSuggestions && title && title.length >= 3) {
      const response = await openai.completions.create({
        model: "text-davinci-003", // Modèle GPT-3.5
        prompt: `Donne-moi des idées de tâches basées sur : "${title}". Donne 3 suggestions.`,
        max_tokens: 50, // Limite de mots pour éviter une réponse trop longue
        temperature: 0.7, // Niveau de créativité
      });

      // Extraire et formater les suggestions
      const suggestions = response.choices[0].text
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      return NextResponse.json({ suggestions }, { status: 200 });
    }

    // Valider les données reçues pour la création de tâche
    if (!title || !status || !date) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    // Créer une nouvelle tâche
    const newTask = await prisma.task.create({
      data: {
        title,
        status,
        important: important || false, // Valeur par défaut si non fournie
        date: new Date(date),
        userId: existingUser.id, // Associer la tâche à l'utilisateur
      },
    });

    // Revalider le cache pour mettre à jour l'affichage
    revalidatePath("/dashboard");

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return handleError(error, "Erreur lors de la création de la tâche");
  }
}

// PUT /api/tasks
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, important } = body;

    // Vérifier si l'ID est fourni
    if (!id) {
      return NextResponse.json({ error: "L’ID de la tâche est manquant" }, { status: 400 });
    }

    // Préparer les données à mettre à jour
    const updateData: { status: string; important?: boolean } = { status };
    if (typeof important === "boolean") {
      updateData.important = important;
    }

    // Mettre à jour la tâche
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return handleError(error, "Erreur lors de la mise à jour de la tâche");
  }
}

// DELETE /api/tasks
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    // Vérifier si l'ID est fourni
    if (!id) {
      return NextResponse.json({ error: "ID de la tâche manquant" }, { status: 400 });
    }

    // Supprimer la tâche
    await prisma.task.delete({ where: { id: Number(id) } });

    // Revalider le cache pour mettre à jour l'affichage
    revalidatePath("/dashboard");

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleError(error, "Erreur lors de la suppression de la tâche");
  }
}