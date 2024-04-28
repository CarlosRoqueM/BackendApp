require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

/*
* Importe de Rutas
*/

const usersRoutes = require('./routes/userRoutes');


const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.use(passport.initialize());

app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

/*
* LLamado de Rutas
*/

usersRoutes(app);

//Cambiar constantemente porque se actualiza
// en caso se quiera usar un ip 
// server.listen(3000, 'IP' (de la maquina) || 'localhost', function() {
//Cambiar el puerto ante cualquier error o verificar la contraseña

server.listen(3000, process.env.IP_MAQUINA || 'localhost', function() {
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

