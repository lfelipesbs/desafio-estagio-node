import httpStatus from 'http-status';
import { isUndefined, pickBy } from 'lodash';

import ValidationTranslation from './validatorTranslation';

class SchemaValidator {
	static validate(schema) {
		return (req, res, next) => {
			const {
				error,
				results
			} = SchemaValidator.isValid(schema, req);

			if (error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: 'error',
					type: 'VALIDATION_ERROR',
					message: error?.errors?.[0] || error
				});
			}

			req.data = pickBy(results.data, value => !isUndefined(value));
			req.filter = pickBy(results.filter, value => !isUndefined(value));

			return next();
		};
	}

	static isValid(schemas, req) {
		try {
			const results = {
				filter: {},
				data: {}
			};

			Object.keys(schemas).forEach(key => {
				if (!req[key]) {
					return;
				}

				const schema = schemas[key].noUnknown ? schemas[key].noUnknown() : schemas[key];
				const result = schema.cast(schema.validateSync(req[key]), { stripUnknown: true });

				if (['file', 'body'].includes(key)) {
					const isFile = key === 'file';

					results.data = Object.assign(results.data, isFile ? { file: result } : result);

					return;
				}

				results.filter = Object.assign(results.filter, result);
			});

			return {
				results
			};
		} catch (error) {
			if (process.env.DEBUG) {
				console.log('---- VALIDATION ERROR ----');
				console.log(error.stack);
				console.log('---- VALIDATION ERROR ----');
			}

			return {
				error
			};
		}
	}

	static setLocale() {
		ValidationTranslation.setLocale();
		ValidationTranslation.setDefaultErrorLabels();
	}
}

SchemaValidator.setLocale();

export default SchemaValidator;