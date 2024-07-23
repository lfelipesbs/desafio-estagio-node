class HomeController{
    async index(req, res){
        res.json('HOME');
    }
}

export default new HomeController();