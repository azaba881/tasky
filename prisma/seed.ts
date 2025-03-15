// prisma/seed.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Créer un utilisateur par défaut avec un email
  await prisma.user.create({
    data: {
      email: "innocent.net2all@gmail.com",
    },
  })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
