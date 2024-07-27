import express from 'express';

import * as controller from '../controllers/script.controller';
import passport from '../configs/passport';

const router = express.Router();

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), controller.create);
router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), controller.readAll);
router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.readOne);
router
  .route('/')
  .delete(passport.authenticate('jwt', { session: false }), controller.remove);

export default router;
