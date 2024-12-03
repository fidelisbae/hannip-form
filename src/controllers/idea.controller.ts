import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const ideaRepository = dataSource.getRepository('Idea');

    const { content } = req.body;

    const idea = await ideaRepository.save({
      content,
      user_id: req.user.id,
    });

    return res.status(200).json(idea);
  } catch (error) {
    next(error);
  }
}

export async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const ideaRepository = dataSource.getRepository('Idea');

    const ideas = await ideaRepository.find({
      where: { user_id: req.user.id },
      order: { created_at: 'DESC' },
    });

    return res.status(200).json(ideas);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const ideaRepository = dataSource.getRepository('Idea');
    const { id } = req.body;

    await ideaRepository.delete(id);

    return res.status(200).json({ message: 'idea deleted' });
  } catch (error) {
    next(error);
  }
}
