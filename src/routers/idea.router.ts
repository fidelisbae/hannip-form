import express from 'express';

import * as controller from '../controllers/idea.controller';
import { ensureAuthenticated } from '../configs/passport';

const router = express.Router();

router.route('/').post(ensureAuthenticated, controller.create);
router.route('/').get(ensureAuthenticated, controller.read);
router.route('/').delete(ensureAuthenticated, controller.remove);

export default router;
