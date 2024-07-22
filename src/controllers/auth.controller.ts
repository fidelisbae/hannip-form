import { Request, Response, NextFunction } from 'express';

import passport from '../configs/kakao.passport';

export async function kakaoLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    passport.authenticate('kakao')(req, res, next);
  } catch (error) {
    next(error);
  }
}

export function kakaoCallback(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('kakao', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Login failed' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Successfully login' });
    });
  })(req, res, next);
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });

    return res.status(200).json({ message: 'Successfully logout' });
  } catch (error) {
    next(error);
  }
}

export async function profile(req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
}