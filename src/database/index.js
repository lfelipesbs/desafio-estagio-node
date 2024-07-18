import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Usuario from '../models/Usuario';
import User from '../models/User';

const models = [Usuario, User];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));