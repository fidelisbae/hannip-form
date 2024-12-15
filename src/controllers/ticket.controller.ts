import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const ticketRepository = dataSource.getRepository('Ticket');

    const { question } = req.body;

    const ticket = await ticketRepository.save({
      question,
      user_id: req.user.id,
    });

    return res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
}

export async function readByUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ticketRepository = dataSource.getRepository('Ticket');

    const tickets = await ticketRepository.find({
      where: { user_id: req.user.id },
      order: { created_at: 'DESC' },
    });

    return res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
}

export async function readByAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ticketRepository = dataSource.getRepository('Ticket');
    const userRepository = dataSource.getRepository('User');

    const admin = await userRepository.findOne({
      where: { id: req.user.id },
    });

    if (!admin || admin.is_admin === false) {
      return res.status(401).json({ message: 'Permission denied' });
    }

    const tickets = await ticketRepository.find({
      where: { is_answer: false },
      order: { created_at: 'DESC' },
    });

    return res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const ticketRepository = dataSource.getRepository('Ticket');
    const userRepository = dataSource.getRepository('User');

    const { id, answer } = req.body;

    const admin = await userRepository.findOne({
      where: { id: req.user.id },
    });

    if (!admin || admin.is_admin === false) {
      return res.status(401).json({ message: 'Permission denied' });
    }

    await ticketRepository.update(id, { answer, is_answer: true });

    return res.status(200).json({ message: 'ticket updated' });
  } catch (error) {
    next(error);
  }
}
