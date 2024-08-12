import userService from "../services/UserService";

class UserController {
    async store(req, res){
        try {
            const resp = await userService.store({ data: req.data })

            return res.json(resp);
        // eslint-disable-next-line no-unused-vars
        }catch(e){
            return res.json({
                errors: 'Credenciais invalidas'
            });
        }
    }

    async index(req, res){
        try {
            return res.json(await userService.index());
        // eslint-disable-next-line no-unused-vars
        }catch(e){
            return res.json(null);
        }
    }

    async show(req, res){
        try{
            const resp = await userService.show({ userId: req.filter.id })

            return res.json(resp);
        // eslint-disable-next-line no-unused-vars
        }catch(e){
            return res.json(null);
        }
    }

    async update(req, res){
        try{
            const resp = await userService.update({
                data: req.data,
                filter: {
                    userId: req.userId
                }
            })
            return res.json(resp);
        }catch(e){
            return res.status(400).json({
                errors: e.errors ? e.errors.map(err => err.message) : [e.message]
            });
        }
    }

    async delete(req, res){
        try{
            const resp = await userService.delete({ userId: req.userId })
            return res.json(resp);
        }catch(e){
            return res.status(400).json({
                errors: e.errors.map(err => err.message)
            });
        }
    }
}

export default new UserController();