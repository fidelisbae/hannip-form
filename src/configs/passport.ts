import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

import { User } from '../entities/user.entity';
import { dataSource } from './typeorm';
import { kakaoStrategy } from '../strategies/kakao.strategy';
import { naverStrategy } from '../strategies/naver.strategy';

passport.serializeUser((user: User, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  const userRepository = dataSource.getRepository('User');
  const user = await userRepository.findOne({ where: { email } });

  done(null, user || null);
});

passport.use(kakaoStrategy);
passport.use(naverStrategy);

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default passport;
