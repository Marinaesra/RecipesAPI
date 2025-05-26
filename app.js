const express = require('express');
require('dotenv').config();
const connectToDatabase = require('./db/connectDB');
const recipesRouter = require('./routers/recipesRouter');
const loginRouter = require ('./routers/loginRouter');


//Crear una aplicacion de Express
const app = express();

connectToDatabase();

//Middleware básico para analizar JSON en las solicitudes
app.use(express.json());
app.use('/api/recipes', recipesRouter);
app.use('/api/auth', loginRouter);


//Configuracion del puerto
app.get('/', (req, res) => {
    res.send('Hola mundo');
});

//Configuracion del puerto
const PORT = 3000;

//Inciar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
