import express from 'express';

import * as controller from '../controllers/info.controller';
import passport from '../configs/passport';

const router = express.Router();

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), controller.create);
router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.read);
router
  .route('/')
  .delete(passport.authenticate('jwt', { session: false }), controller.remove);

export default router;
