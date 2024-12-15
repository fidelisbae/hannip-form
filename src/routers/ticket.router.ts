import express from 'express';

import * as controller from '../controllers/ticket.controller';
import passport from '../configs/passport';

const router = express.Router();

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), controller.create);
router
  .route('/user')
  .get(passport.authenticate('jwt', { session: false }), controller.readByUser);
router
  .route('/admin')
  .get(
    passport.authenticate('jwt', { session: false }),
    controller.readByAdmin,
  );
router
  .route('/')
  .put(passport.authenticate('jwt', { session: false }), controller.update);

export default router;
