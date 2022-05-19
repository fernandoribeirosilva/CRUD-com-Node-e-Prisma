import { Request, Response } from 'express';
import { PostService } from '../services/PostService';
import { UserService } from '../services/UserService';

export const all = async (req: Request, res: Response) => {
   const posts = await PostService.findAll();
   res.json({ posts });
}

export const one = async (req: Request, res: Response) => {
   const { id } = req.params;
   const post = await PostService.findOne(parseInt(id));

   if (!post) return res.status(200).json({ error: 'Post não encontrado.' });

   res.status(200).json({ post });
}

export const create = async (req: Request, res: Response) => {
   const { title, body, author } = req.body;

   if (title && body && author) {

      const user = await UserService.findOne({
         id: +author
      });

      if (!user) return res.status(200).json({ error: 'Autor não existe.' });

      const post = await PostService.create({ title, body, authorId: user.id });
      return res.status(201).json({ post });

   } else {
      return res.status(200).json({ error: 'Dados não preenchidos' });
   }
}

export const togglePost = async (req: Request, res: Response) => {
   const { id } = req.params;
   const post = await PostService.findOne(+id);

   if (!post) return res.status(200).json({ error: 'Post não existe.' });

   const postUpdate = await PostService.update(
      post.id,
      { published: !post.published }// se post.published estiver true vai false
   );

   return res.status(200).json({ post: postUpdate });
}

export const deletePost = async (req: Request, res: Response) => {
   const { id } = req.params;
   const post = await PostService.findOne(+id);

   if (!post) return res.status(200).json({ error: 'Post não existe.' });

   await PostService.delete(+id);

   return res.status(200).json({ status: true });
}