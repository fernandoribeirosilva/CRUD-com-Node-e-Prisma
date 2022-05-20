import { Request, Response } from 'express';
import { UserService } from '../services/UserService';


export const all = async (req: Request, res: Response) => {
   const users = await UserService.all();
   return res.status(200).json({ users });
}

export const create = async (req: Request, res: Response) => {
   const { name, email, age } = req.body;

   if (email && name) {
      // TODO: validar E-mail
      const user = await UserService.findOne({ email });

      if (user) return res.status(200).json({ error: 'Já existe usuário com este email.' });

      const newUser = await UserService.create({ name, email, age: parseInt(age) });

      return res.status(201).json({ user: newUser });

   } else {
      return res.status(200).json({ error: 'Dados não preenchidos.' });
   }

}

export const one = async (req: Request, res: Response) => {
   const { id } = req.params;
   const user = await UserService.findOne({ id: parseInt(id) });

   if (!user) return res.status(200).json({ error: 'Usuário não existe.' });

   return res.status(200).json({ user });

}

export const toggleUser = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { name, age, email } = req.body;

   const user = await UserService.findOne({ id: parseInt(id) });

   if (user) {
      if (!name) return res.status(200).json({ error: `O campo nome é obrigatório` });
      if (!age) return res.status(200).json({ error: `O campo anos é obrigatório` });
      if (!email) return res.status(200).json({ error: `O campo email é obrigatório` });

      const userUpdated = await UserService.update(
         user.id,
         {
            name,
            email,
            age: parseInt(age)
         }
      );

      return res.status(200).json({ user: userUpdated });

   } else {
      return res.status(200).json({ error: 'Usuário não existe.' });
   }
}

export const deleteUser = async (req: Request, res: Response) => {
   const { id } = req.params;
   const user = await UserService.findOne({ id: parseInt(id) });

   if (!user) return res.status(404).json({ error: 'Usuário não existe.' });

   try {
      await UserService.delete(parseInt(id));
   } catch (error) {
      return res.status(404).json({ error: 'Usuário não existe.' });
   }


   return res.status(200).json({ status: true });
}