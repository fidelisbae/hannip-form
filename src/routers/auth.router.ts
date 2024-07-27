import express from 'express';

import * as controller from '../controllers/auth.controller';
import passport from '../configs/passport';

const router = express.Router();

router.route('/kakao/login').get(passport.authenticate('kakao'));
router
  .route('/kakao/callback')
  .get(
    passport.authenticate('kakao', { session: false }),
    controller.kakaoCallback,
  );
router.route('/naver/login').get(passport.authenticate('naver'));
router
  .route('/naver/callback')
  .get(
    passport.authenticate('naver', { session: false }),
    controller.naverCallback,
  );

export default router;
