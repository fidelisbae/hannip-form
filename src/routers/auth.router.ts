import express from 'express';

import * as controller from '../controllers/auth.controller';
import { ensureAuthenticated } from '../configs/kakao.passport';

const router = express.Router();

router.route('/kakao/login').get(controller.kakaoLogin);
router.route('/kakao/callback').get(controller.kakaoCallback);
router.route('/profile').get(ensureAuthenticated, controller.profile);
router.route('/logout').get(controller.logout);

export default router;
