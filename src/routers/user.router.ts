import express from 'express';

import * as controller from '../controllers/user.controller';
import { ensureAuthenticated } from '../configs/passport';

const router = express.Router();

router.route('/').get(ensureAuthenticated, controller.read);
router.route('/').delete(ensureAuthenticated, controller.remove);

export default router;
