import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
    const teste = 'teste';
    console.log(teste);
    return res.json({ message: 'Helo World'});
});

export default routes;