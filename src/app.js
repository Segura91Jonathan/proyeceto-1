//aplicacion
const express = require('express');
const app = express();
const path = require('path');//path nos permite concatenar directorios
const morgan = require('morgan');// la cte va a almacenar todo lo que se requiera de morgan
const swal  = require('sweetalert2');

//Seilings  (servidor)

app.set('port', 5000);//crear una variable y le damos el valor de la variable
app.set('views',path.join(__dirname,'views'));//en lugar de poner toda la ruta de la carpeta ponemos __dirname
app.set('view engine', 'ejs');

//MIDDLEWARES( son funciones que se van ejecutando antes de llegar a las rutas)

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));//usamos paquete express pero solo la parte de urlencode convierte mediante formularios a json

//ROUTES(rutas)

app.use(require('./routes/index'));

//Static(archivos estaticos carpeta public)

app.use(express.static(path.join(__dirname,'public')));//es para decirle a public que la carpeta esta dentro de exprees


//404 handler (de forma siimple)

app.use((req, res, next) =>{    //manejador de peticion
    res.status(404).send('404 NOT FOUND');//manda mensaje de estado interno y para el usuario
})

module.exports = app;