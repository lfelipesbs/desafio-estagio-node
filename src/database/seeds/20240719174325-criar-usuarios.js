const bcryptjs = require('bcryptjs');

module.exports = {
    up: async (queryInterface) => queryInterface.bulkInsert(
        'users',
        [
            {
                nome: 'Marcelo Melo',
                nome_usuario: 'teco123',
                email: 'teco@gmail.com',
                senha_hash: await bcryptjs.hash('123tecada', 8),
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                nome: 'Joao Pedro',
                nome_usuario: 'pepe123',
                email: 'jp@gmail.com',
                senha_hash: await bcryptjs.hash('123pepezinho', 8),
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                nome: 'Carlos Neto',
                nome_usuario: 'catita123',
                email: 'carlos@gmail.com',
                senha_hash: await bcryptjs.hash('123catita', 8),
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                nome: 'Felipe Coelho',
                nome_usuario: 'coelho123',
                email: 'fcoelho@gmail.com',
                senha_hash: await bcryptjs.hash('123coelhinho', 8),
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                nome: 'Julia Paiva',
                nome_usuario: 'juliap123',
                email: 'juliap@gmail.com',
                senha_hash: await bcryptjs.hash('123jupolonia', 8),
                created_at: new Date(),
                updated_at: new Date()
            },
        ],
        {}
    ),

    down: () => {}
};
