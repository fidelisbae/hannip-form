import { Strategy as KakaoStrategy, Profile } from 'passport-kakao';

import { dataSource } from '../configs/typeorm';

export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: `${process.env.SERVER_URL}/auth/kakao/callback`,
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ) => {
    try {
      const userRepository = dataSource.getRepository('User');

      const email = profile._json.kakao_account.email;
      const nickname = profile._json.kakao_account.profile.nickname;
      const profile_image_url =
        profile._json.kakao_account.profile.profile_image_url;

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
      } else {
        const user = {
          id: existUser.id,
          email: existUser.email,
          nickname: existUser.nickname,
        };

        return done(null, user);
      }
    } catch (error) {
      done(error);
    }
  },
);
