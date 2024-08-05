import TokenService from '../services/TokenService'

require('dotenv').config();

class TokenController{
    async store(req, res){
        try {
            const resp = await TokenService.store({
                data: {
                    auth: req.data.auth,
                    senha: req.data.senha
                }
            })
            return res.json(resp);
        // eslint-disable-next-line no-unused-vars
        } catch (e) {
            return res.json(null);
        }
    }
}

export default new TokenController();
