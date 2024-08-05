import { Router } from 'express';
import tokenController from '../controllers/TokenController';

import SchemaValidator from '../utils/schemaValidator';
import tokenSchema from '../schemas/tokenSchema';

const router = new Router();

router.post('/', SchemaValidator.validate(tokenSchema.store), tokenController.store);

export default router;