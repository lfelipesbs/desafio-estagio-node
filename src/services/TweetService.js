import Tweet from "../models/Tweet";
import User from "../models/User";
import userService from "../services/UserService";

import dayjs from 'dayjs';

class TweetService {
    async store({ data, filter }){

        const user = await userService.show({ userId: filter.userId });
        if(!user){
            throw new Error('Usuario nao encontrado');
        }

        const novoTweet = await Tweet.create({
            user_id: user.id,
            conteudo: data.conteudo
        });

        const { id, conteudo, created_at } = novoTweet;

        const criado = dayjs(created_at).format('DD/MM/YYYY HH:mm');

        return { id, nome_usuario: user.nome_usuario, conteudo, criado };
    }

    async index(){
        const tweets = await Tweet.findAll({
            include: [{
                model: User,
                attributes: ['nome_usuario'],
            }],
        });

        const fTweets = tweets.map(tweet => {
            const { id, conteudo, created_at, updated_at } = tweet;

            const criado = dayjs(created_at).format('DD/MM/YYYY HH:mm');
            const atualizado = dayjs(updated_at).format('DD/MM/YYYY HH:mm');

            return updated_at.getMinutes() !== created_at.getMinutes() ?
                { id, nome_usuario: User.nome_usuario, conteudo, atualizado } :
                { id, nome_usuario: User.nome_usuario, conteudo, criado }
        });

        fTweets.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

        return(fTweets);
    }

    async show({ tweetId }){
        const tweet = await Tweet.findByPk(tweetId);

        if(!tweet){
            throw new Error('Tweet nao encontrado');
        }

        const { id, nome_usuario, conteudo, created_at, updated_at } = tweet;

        const criado = dayjs(created_at).format('DD/MM/YYYY HH:mm');
        const atualizado = dayjs(updated_at).format('DD/MM/YYYY HH:mm');

        return updated_at.getMinutes() !== created_at.getMinutes() ?
            { id, nome_usuario, conteudo, atualizado } :
            { id, nome_usuario, conteudo, criado }
    }

    async update({ data, filter }){
        const tweet = await Tweet.findByPk(filter.tweetId);
        if(!tweet){
            throw new Error('Tweet nao encontrado ou nao existe');
        }

        const user = await userService.show({ userId: filter.userId });
        if(!user){
            throw new Error('Usuario nao encontrado');
        }

        const novosDados = await tweet.update({ conteudo: data.conteudo });

        const { id, conteudo, updated_at } = novosDados;

        const atualizado = dayjs(updated_at).format('DD/MM/YYYY HH:mm');

        return { id, nome_usuario: user.nome_usuario, conteudo, atualizado };
    }

    async delete({ tweetId }){
        const tweet = await Tweet.findByPk(tweetId);
        if(!tweet){
            throw new Error('Tweet nao existe');
        }
        await tweet.destroy();

        return { msg: 'Tweet apagado com sucesso!'};
    }
}

export default new TweetService();