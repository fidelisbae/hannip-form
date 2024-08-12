import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = {
        id: payload.id,
        nickname: payload.id,
      };

      return done(null, user);
    } catch (error) {
      done(error);
    }
  },
);
