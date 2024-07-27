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
        const user = await userRepository.save({
          email,
          nickname,
          profile_image_url,
        });

        return done(null, user);
      }

      return done(null, existUser);
    } catch (error) {
      done(error);
    }
  },
);
