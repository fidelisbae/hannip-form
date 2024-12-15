import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const infoRepository = dataSource.getRepository('Info');
    const userRepository = dataSource.getRepository('User');

    const { title, content } = req.body;

    const admin = await userRepository.findOne({
      where: { id: req.user.id },
    });

    if (!admin || admin.is_admin === false) {
      return res.status(401).json({ message: 'Permission denied' });
    }

    const info = await infoRepository.save({
      title,
      content,
    });

    return res.status(200).json(info);
  } catch (error) {
    next(error);
  }
}

export async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const infoRepository = dataSource.getRepository('Info');

    const infos = await infoRepository.find({
      order: { created_at: 'DESC' },
    });

    return res.status(200).json(infos);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const infoRepository = dataSource.getRepository('Info');
    const userRepository = dataSource.getRepository('User');

    const { id } = req.body;

    const admin = await userRepository.findOne({
      where: { id: req.user.id },
    });

    if (!admin || admin.is_admin === false) {
      return res.status(401).json({ message: 'Permission denied' });
    }

    await infoRepository.delete(id);

    return res.status(200).json({ message: 'info deleted' });
  } catch (error) {
    next(error);
  }
}
