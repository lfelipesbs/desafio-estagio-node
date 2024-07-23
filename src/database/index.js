import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Tweet from '../models/Tweet';
import User from '../models/User';

const models = [Tweet, User];
const modelsObject = {
    Tweet,
    User
}

const connection = new Sequelize(databaseConfig);

models.forEach(model => {
    model.init(connection)
});

Tweet.associate(modelsObject)