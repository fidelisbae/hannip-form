import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../configs/typeorm';

export async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const userRepository = dataSource.getRepository('User');

    const id = req.user.id;

    const user = await userRepository.findOne({
      where: { id },
      relations: ['scripts', 'ideas'],
    });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const userRepository = dataSource.getRepository('User');

    const id = req.user.id;
    const { channel_description, category } = req.body;

    const user = await userRepository.findOne({
      where: { id },
    });

    const updatedUser = await userRepository.save({
      ...user,
      channel_description,
      category,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

export async function checkChannel(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userRepository = dataSource.getRepository('User');

    const id = req.user.id;

    const user = await userRepository.findOne({
      where: { id },
    });

    const isChanelInfoExist = user.channel_description ? true : false;

    return res.status(200).json(isChanelInfoExist);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const userRepository = dataSource.getRepository('User');

    const id = req.user.id;

    await userRepository.delete({ id });

    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
}
