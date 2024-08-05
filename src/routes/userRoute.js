import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

import SchemaValidator from '../utils/schemaValidator';
import userSchema from '../schemas/userSchema';

const router = new Router();

router.get('/', userController.index);
// router.get('/:id', userController.show);

router.post('/', SchemaValidator.validate(userSchema.store), userController.store);
router.put('/', SchemaValidator.validate(userSchema.update), loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;