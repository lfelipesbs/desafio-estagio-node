import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
    static init(sequelize){
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [1, 895],
                        msg: 'Nome deve ter entre 1 e 895 caracteres'
                    }
                }
            },
            nome_usuario: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: 'Nome de usuario ja existe'
                },
                validate: {
                    len: {
                        args: [4, 16],
                        msg: 'Usuario deve ter entre 4 e 16 caracteres'
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: 'Email ja existe'
                },
                validate: {
                    isEmail: {
                        msg: 'Email invalido'
                    }
                }
            },
            senha_hash: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            senha: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 50],
                        msg: 'Senha deve ter entre 6 e 50 caracteres'
                    }
                }
            },
        }, {
            sequelize
        });

        this.addHook('beforeSave', async (user) => {
            if(user.senha){
                user.senha_hash = await bcryptjs.hash(user.senha, 8);
            }
        });

        return this;
    }
}