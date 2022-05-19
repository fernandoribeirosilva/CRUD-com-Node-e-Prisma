import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
   await prisma.user.deleteMany({}); // vai deleta todos
   await prisma.post.deleteMany({}); // vai deleta todos

   const user = await prisma.user.create({
      data: {
         email: 'fernandodev@gmail.com',
         name: 'Fernando',
         age: 25
      }
   });

   const post = await prisma.post.create({
      data: {
         title: 'Post de teste criado via seed',
         body: 'Este é um post de teste...',
         authorId: user.id,
      }
   });
}

main();