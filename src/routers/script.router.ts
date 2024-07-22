import express from 'express';

import * as controller from '../controllers/script.controller';
import { ensureAuthenticated } from '../configs/passport';

const router = express.Router();

router.route('/').post(ensureAuthenticated, controller.create);
router.route('/').get(ensureAuthenticated, controller.readAll);
router.route('/:id').get(ensureAuthenticated, controller.readOne);
router.route('/').delete(ensureAuthenticated, controller.remove);

export default router;
