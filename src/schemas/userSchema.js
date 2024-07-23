import * as yup from 'yup';

const store = {
    body: yup.object({
        nome: yup.string().min(1).max(895).required(),
        nome_usuario: yup.string().min(4).max(16).required().label('Nome de usuário'),
        email: yup.string().email().required(),
        senha: yup.string().min(6).max(50).required()
    }).noUnknown()
}

const update = {
    body: yup.object({
        nome: yup.string().min(1).max(895).nullable(),
        nome_usuario: yup.string().min(4).max(16).nullable().label('Nome de usuário'),
        email: yup.string().email().nullable(),
        senha: yup.string().min(6).max(50).nullable()
    }).noUnknown()
}

export default {
    store,
    update
}