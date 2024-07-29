import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function kakaoCallback(req: Request, res: Response, next: NextFunction) {
  try {
    const access_token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });

    return res.redirect(
      `${process.env.CLIENT_URL}/auth/callback?code=${access_token}`,
    );
  } catch (error) {
    next(error);
  }
}

export function naverCallback(req: Request, res: Response, next: NextFunction) {
  try {
    const access_token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });

    return res.redirect(
      `${process.env.CLIENT_URL}/auth/callback?code=${access_token}`,
    );
  } catch (error) {
    next(error);
  }
}
