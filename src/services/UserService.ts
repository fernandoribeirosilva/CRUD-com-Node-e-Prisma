import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type findOneDataProp = {
   id?: number,
   email?: string
}

type createDataProp = {
   email: string,
   name: string,
   age?: number
}

type updateDataProp = {
   email?: string,
   name?: string,
   age?: number
}

export const UserService = {

   all: async () => {
      return await prisma.user.findMany({});
   },

   findOne: async (data: findOneDataProp) => {
      return await prisma.user.findUnique({
         where: data
      });
   },

   create: async (data: createDataProp) => {
      return await prisma.user.create({
         data: {
            email: data.email,
            name: data.name,
            age: data.age ?? 0
         }
      })
   },

   update: async (id: number, data: updateDataProp) => {
      return await prisma.user.update({ where: { id }, data });
   },

   delete: async (id: number) => {
      return await prisma.user.delete({ where: { id } });
   },

} 