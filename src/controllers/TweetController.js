import tweetService from "../services/TweetService";

class TweetController {
    async store(req, res){
        try{
            const resp = await tweetService.store({
                data: {
                    conteudo: req.data.conteudo
                },
                filter: {
                    userId: req.userId
                }
            });
            return res.json(resp);
        }catch(e){
            return res.status(400).json({ e });
        }
    };

    async index(req, res){
        try {
            return res.json(await tweetService.index());
        // eslint-disable-next-line no-unused-vars
        }catch(e){
            return res.json(null);
        }
    }

    async show(req, res){
        try{
            const resp = await tweetService.show({ tweetId: req.filter.id });

            return res.json(resp);
        // eslint-disable-next-line no-unused-vars
        }catch(e){
            return res.json(null);
        }
    }

    async update(req, res){
        try{
            const resp = await tweetService.update({
                data: {
                    conteudo: req.data.conteudo
                },
                filter: {
                    tweetId: req.filter.id,
                    userId: req.userId
                }
            });
            return res.json(resp);
        }catch(e){
            return res.status(400).json({
                errors: e.errors ? e.errors.map(err => err.message) : [e.message]
            });
        }
    }

    async delete(req, res){
        try{
            const resp = await tweetService.delete({ tweetId: req.filter.id });
            return res.json(resp);
        }catch(e){
            return res.status(400).json({
                errors: e.errors ? e.errors.map(err => err.message) : [e.message]
            });
        }
    }
}

export default new TweetController();