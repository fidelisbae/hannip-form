import express from 'express';

import * as controller from '../controllers/auth';

const router = express.Router();

router.route('/kakao/login').get(controller.kakaoLogin);
router.route('/kakao/callback').get(controller.kakaoCallback);
// router.route('/naver/login').get(controller.naverLogin);
// router.route('/naver/callback').get(controller.naverCallback);
// router.route('/google/login').get(controller.googleLogin);
// router.route('/google/callback').get(controller.googleCallback);
// router.route('/logout').get(controller.logout);

export default router;
