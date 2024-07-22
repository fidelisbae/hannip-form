import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../configs/typeorm';

export async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const userRepository = dataSource.getRepository('User');

    const email = req.user.email;

    const user = await userRepository.findOne({
      where: { email },
      relations: ['scripts', 'ideas'],
    });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const userRepository = dataSource.getRepository('User');

    const email = req.user.email;

    await userRepository.delete({ email });

    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
}
