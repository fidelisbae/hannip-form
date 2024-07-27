import { Strategy as NaverStrategy } from 'passport-naver';

import { dataSource } from '../configs/typeorm';

export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/naver/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const userRepository = dataSource.getRepository('User');

      const email = profile.emails[0].value;
      const nickname = profile.displayName;
      const profile_image_url = profile._json.profile_image;

      const existUser = await userRepository.findOne({
        where: { email },
      });

      if (!existUser) {
        const newUser = await userRepository.save({
          email,
          nickname,
          profile_image_url,
        });

        const user = {
          id: newUser.id,
          email: newUser.email,
          nickname: newUser.nickname,
        };

        return done(null, user);
      }

      const user = {
        id: existUser.id,
        email: existUser.email,
        nickname: existUser.nickname,
      };

      return done(null, user);
    } catch (error) {
      done(error);
    }
  },
);
