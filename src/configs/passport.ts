import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

import { dataSource } from './typeorm';
import { kakaoStrategy } from '../strategies/kakao.strategy';
import { naverStrategy } from '../strategies/naver.strategy';
import { RequestUser } from '../types/request';

passport.serializeUser((user: RequestUser, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  const userRepository = dataSource.getRepository('User');
  const user = (await userRepository.findOne({
    where: { email },
  })) as RequestUser;

  done(null, user);
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
