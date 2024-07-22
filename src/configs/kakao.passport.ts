import passport from 'passport';
import { Strategy as KakaoStrategy, Profile } from 'passport-kakao';
import { Request, Response, NextFunction } from 'express';

import { User } from '../entities/user.entity';
import { dataSource } from './typeorm';

passport.serializeUser((user: User, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  const userRepository = dataSource.getRepository('User');
  const user = await userRepository.findOne({ where: { email } });

  done(null, user || null);
});

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: 'http://localhost:3000/auth/kakao/callback',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void,
    ) => {
      const userRepository = dataSource.getRepository('User');

      const email = profile._json.kakao_account.email;
      const nickname = profile._json.kakao_account.profile.nickname;

      const existUser = await userRepository.findOne({
        where: { email },
      });

      if (!existUser) {
        const user = await userRepository.save({
          email,
          nickname,
        });

        return done(null, user);
      }

      return done(null, existUser);
    },
  ),
);

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
