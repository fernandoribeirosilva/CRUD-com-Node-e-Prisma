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