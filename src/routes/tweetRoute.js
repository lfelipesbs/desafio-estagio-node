import { Router } from 'express';
import tweetController from '../controllers/TweetController';
import loginRequired from '../middlewares/loginRequired';

import SchemaValidator from '../utils/schemaValidator';
import tweetSchema from '../schemas/tweetSchema';

const router = new Router();

router.get('/', loginRequired, tweetController.index);
router.get('/:id', SchemaValidator.validate(tweetSchema.show), loginRequired, tweetController.show);

router.post('/', SchemaValidator.validate(tweetSchema.store), loginRequired, tweetController.store);
router.put('/:id', SchemaValidator.validate(tweetSchema.update), loginRequired, tweetController.update);
router.delete('/:id', SchemaValidator.validate(tweetSchema.deleta), loginRequired, tweetController.delete);

export default router;