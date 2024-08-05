import { Op } from 'sequelize';
import User from '../models/User';
import jwt from 'jsonwebtoken';

class TokenService{
    async store({ data }){
        const { auth = '', senha = '' } = data;

        if(!auth || !senha){
            throw new Error('Credenciais invalidas');
        }
        
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: auth},
                    { nome_usuario: auth}
                ]
            },
            attributes: ['id', 'email', 'senha_hash']
        });

        if(!user){
            throw new Error('Ususario nao existe')
        }

        if(!(await user.senhaIsValid(senha))){
            throw new Error('Senha invalida')
        }

        const { id, email } = user;
        const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION
        });

        return token;
    }
}

export default new TokenService();