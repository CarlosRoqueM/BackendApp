const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

/*
* Importe de Rutas
*/

const usersRoutes = require('./routes/userRoutes');


const port = process.env.PORT || 8000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.disable('x-powered-by');

app.set('port', port);

/*
* LLamado de Rutas
*/

usersRoutes(app);

//Cambiar constantemente porque se actualiza
//server.listen(3000, 'IP' (de la maquina) || 'localhost', function() {

server.listen(8000,'localhost', function() {
    console.log('aplicacion en el ' + port +' Iniciando....')
});

app.get('/', (req, res) => {
    res.send('Ruta raiz backend')
});



//Error Handler
app.use((err, req, res, ) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}

