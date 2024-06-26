import express from "express";

const appExpress = express();
const port = 3000;
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error ao acessar')
}

const logMiddleware = (req, res , next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}

appExpress.use(logMiddleware);

appExpress.get('/error', (req, res, next) => {
    const err = new Error('erro intencional para teste');
    next(err);
})

appExpress.use(errorMiddleware);

appExpress.get('/animal', (req, res) => {
    res.send('Gato')
})
appExpress.get( '/', (req, res) => {
    res.send('Olá')
})

appExpress.listen(port, () => {
    console.log("Ok");
})