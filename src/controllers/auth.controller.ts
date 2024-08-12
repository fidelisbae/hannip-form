import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function kakaoCallback(req: Request, res: Response, next: NextFunction) {
  try {
    const access_token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });

    const encodedToken = encodeURIComponent(access_token);

    return res.redirect(`${process.env.CLIENT_URL}/auth?code=${encodedToken}`);
  } catch (error) {
    next(error);
  }
}

export function naverCallback(req: Request, res: Response, next: NextFunction) {
  try {
    const access_token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });

    const encodedToken = encodeURIComponent(access_token);

    return res.redirect(`${process.env.CLIENT_URL}/auth?code=${encodedToken}`);
  } catch (error) {
    next(error);
  }
}
