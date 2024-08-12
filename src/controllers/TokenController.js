import httpStatus from 'http-status';
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

            return res.json({
                token: resp
            });
        } catch (e) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: 'error',
                type: 'VALIDATION_ERROR',
                message: e.message || 'error'
            });
        }
    }
}

export default new TokenController();
