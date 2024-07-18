import Usuario from "../models/Usuario";

class HomeController {
    async index(req, res){
        const novoUsuario = await Usuario.create(req.body);
        res.json(novoUsuario);
    };
}

export default new HomeController();