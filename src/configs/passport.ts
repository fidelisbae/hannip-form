import passport from 'passport';

import { kakaoStrategy } from '../strategies/kakao.strategy';
import { naverStrategy } from '../strategies/naver.strategy';
import { jwtStrategy } from '../strategies/jwt.strategy';

passport.use(kakaoStrategy);
passport.use(naverStrategy);
passport.use(jwtStrategy);

export default passport;
