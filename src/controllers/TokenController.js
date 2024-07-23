import User from '../models/User';
import jwt from 'jsonwebtoken';
require('dotenv').config();

class TokenController{
    async store(req, res){
        const { email = '', senha = '' } = req.body;

        if(!email || !senha){
            return res.status(401).json({
                errors: ['Email ou senha invalidas']
            });
        }

        const user = await User.findOne({ where: { email }})

        if(!user){
            return res.status(401).json({
                errors: ['Usuario nao existe']
            });
        }

        if(!(await user.senhaIsValid(senha))){
            return res.status(401).json({
                errors: ['Senha invalida']
            });
        }

        const { id } = user;
        const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION
        });

        return res.json({ token });
    }
}

export default new TokenController();