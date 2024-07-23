import User from "../models/User";

class UserService {
    async store({ data }) {
        const novoUser = await User.create(data);
        const { id, nome, nome_usuario, email } = novoUser;

        return { id, nome, nome_usuario, email};
    }

    async index() {
        const users = await User.findAll({
            attributes: ['id', 'nome', 'nome_usuario', 'email'],
            order: [
                ['id', 'ASC']
            ]
        });

        return users;
    }

    async show({ userId }) {
        const user = await User.findByPk(userId);

        if(!user){
            throw new Error('Usuario nao encontrado');
        }

        const { id, nome, nome_usuario, email } = user;

        return { id, nome, nome_usuario, email };
    }

    async update({ data, filter }){
        const user = await User.findByPk(filter.userId);
        if(!user){
            throw new Error('Usuario nao existe');
        }

        const novosDados =  await user.update(data);
        const { id, nome, nome_usuario, email } = novosDados;

        return { id, nome, nome_usuario, email };
    }

    async delete({ userId }){
        const user = await User.findByPk(userId);
        if(!user){
            throw new Error('Usuario nao existe');
        }
        await user.destroy();

        return { msg: 'Usuario apagado com sucesso.' }
    }
}

export default new UserService();