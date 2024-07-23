import Sequelize, { Model } from 'sequelize';

export default class Tweet extends Model {
    static init(sequelize){
        super.init({
            conteudo: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [1, 280],
                        msg: 'Conteudo do tweet deve ter de 1 ate 280 caracteres'
                    }
                }
            }
        },{
            sequelize
        });
        return this;
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id' })
    }
}