import express from 'express';

import * as controller from '../controllers/clova.controller';

const router = express.Router();

router.route('/idea').post(controller.createIdea);

export default router;
