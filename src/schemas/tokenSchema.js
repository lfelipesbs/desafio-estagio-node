import * as yup from 'yup';

const store = {
    body: yup.object({
        auth: yup.string().required(),
        senha: yup.string().min(6).max(50).required()
    })
}

export default { store };