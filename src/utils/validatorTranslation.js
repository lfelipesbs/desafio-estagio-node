import { startCase } from 'lodash';
import * as yup from 'yup';

export default class ValidationTranslation {
	static setLocale() {
		const translation = {
			mixed: {
				default: '${label} é inválido.',
				required: '${label} é um campo obrigatório.',
				oneOf: '${label} deve ser um dos seguintes valores: ${values}.',
				notOneOf: '${label} não pode ser um dos seguintes valores: ${values}.',
				notType: '${label} deve ser do tipo ${type}.'
			},
			string: {
				length: '${label} deve ter exatamente ${length} caracteres.',
				min: '${label} deve ter pelo menos ${min} caracteres.',
				max: '${label} deve ter no máximo ${max} caracteres.',
				email: '${label} tem o formato de e-mail inválido.',
				url: '${label} deve ter um formato de URL válida.',
				trim: '${label} não deve conter espaços no início ou no fim.',
				lowercase: '${label} deve estar em maiúsculo.',
				uppercase: '${label} deve estar em minúsculo.'
			},
			number: {
				min: '${label} deve ser no mínimo ${min}.',
				max: '${label} deve ser no máximo ${max}.',
				lessThan: '${label} deve ser menor que ${less}.',
				moreThan: '${label} deve ser maior que ${more}.',
				notEqual: '${label} não pode ser igual à ${notEqual}.',
				positive: '${label} deve ser um número positivo.',
				negative: '${label} deve ser um número negativo.',
				integer: '${label} deve ser um número inteiro.'
			},
			date: {
				min: '${label} deve ser maior que a data ${min}.',
				max: '${label} deve ser menor que a data ${max}.'
			},
			array: {
				min: '${label} deve ter no mínimo ${min} itens.',
				max: '${label} deve ter no máximo ${max} itens.'
			}
		};

		yup.setLocale(translation);
	}

	static setDefaultErrorLabels() {
		const formatError = yup.ValidationError.formatError;

		yup.ValidationError.formatError = function(message, params) {
			if (!params.label) {
				params.label = startCase(String(params.path));
			}

			return formatError.call(this, message, params);
		};
	}
}