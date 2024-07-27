import express from 'express';

import * as controller from '../controllers/auth.controller';
import passport from '../configs/passport';

const router = express.Router();

router.route('/kakao/login').post(passport.authenticate('kakao'));
router
  .route('/kakao/callback')
  .post(
    passport.authenticate('kakao', { session: false }),
    controller.kakaoCallback,
  );
router.route('/naver/login').post(passport.authenticate('naver'));
router
  .route('/naver/callback')
  .get(
    passport.authenticate('naver', { session: false }),
    controller.naverCallback,
  );

export default router;
