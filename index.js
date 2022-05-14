const express = require('express');
const res = require('express/lib/response');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');




// crear servidor Express
const app = express();


//Base de datos
dbConnection();


// CORS
app.use(cors());



// Directorio publico
app.use( express.static('public'));


//lectura y parseo de los bodys
app.use (express.json());


//rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//TODO: CRUD // eventos





// escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});



