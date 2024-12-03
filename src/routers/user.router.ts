import express from 'express';

import * as controller from '../controllers/user.controller';
import passport from '../configs/passport';

const router = express.Router();

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.read);
router
  .route('/')
  .put(passport.authenticate('jwt', { session: false }), controller.update);
router
  .route('/channel')
  .get(
    passport.authenticate('jwt', { session: false }),
    controller.checkChannel,
  );
router
  .route('/')
  .delete(passport.authenticate('jwt', { session: false }), controller.remove);

export default router;
