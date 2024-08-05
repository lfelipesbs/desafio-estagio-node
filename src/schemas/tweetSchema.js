import * as yup from 'yup';

const store = {
    body: yup.object({
        conteudo: yup.string().min(1).max(280).required().label('Tweet')
    })
}

const show = {
    params: yup.object({
        id: yup.number().required()
    })
}

const update = {
    body: yup.object({
        conteudo: yup.string().min(1).max(280).required().label('Tweet')
    }),
    params: yup.object({
        id: yup.number().required()
    })
}

const deleta = {
    params: yup.object({
        id: yup.number().required()
    })
}

export default {
    store,
    show,
    update,
    deleta
}