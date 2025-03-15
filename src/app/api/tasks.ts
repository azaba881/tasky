// pages/api/tasks.ts

import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === "GET") {
    // Récupérer toutes les tâches pour l'utilisateur avec id=1
    const tasks = await prisma.task.findMany({
      where: {
        userId: 1, // Utilisateur par défaut
      },
    })
    return res.json(tasks)
  }

  if (method === "POST") {
    interface TaskRequestBody {
        title: string;
        status: string;
        important: boolean;
        date: string; // Si tu as besoin de valider que la date est une chaîne de caractères au format attendu
    }
    const { title, status, important, date } : TaskRequestBody = req.body
    // Ajouter une nouvelle tâche
    const newTask = await prisma.task.create({
      data: {
        title,
        status,
        important,
        date: new Date(date),
        userId: 1, // Utilisateur par défaut
      },
    })
    return res.json(newTask)
  }

  if (method === "PUT") {
    const { id, status, important } = req.body
    // Mettre à jour une tâche existante
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status, important },
    })
    return res.json(updatedTask)
  }

  if (method === "DELETE") {
    const { id } = req.body
    // Supprimer une tâche
    await prisma.task.delete({
      where: { id },
    })
    return res.status(204).end()
  }

  res.status(405).end()
}
