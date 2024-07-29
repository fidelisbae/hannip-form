import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const scriptRepository = dataSource.getRepository('Script');

    const { content } = req.body;

    const idea = await scriptRepository.save({
      content,
      user_id: req.user.id,
    });

    return res.status(200).json(idea);
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  try {
    const scriptRepository = dataSource.getRepository('Script');

    const scripts = await scriptRepository.find({
      where: { user_id: req.user.id },
    });

    return res.status(200).json(scripts);
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  try {
    const scriptRepository = dataSource.getRepository('Script');
    const { id } = req.params;

    const script = await scriptRepository.findOne({
      where: { id, user_id: req.user.id },
    });

    return res.status(200).json(script);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const scriptRepository = dataSource.getRepository('Script');
    const { id } = req.body;

    await scriptRepository.delete(id);

    return res.status(200).json({ message: 'script deleted' });
  } catch (error) {
    next(error);
  }
}
