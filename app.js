const express = require('express');
require('dotenv').config();
const connectToDatabase = require('./db/connectDB');
const recipesRouter = require('./routers/recipesRouter');


//Crear una aplicacion de Express
const app = express();

//Middleware básico para analizar JSON en las solicitudes
app.use(express.json());
app.use('/api/recipes', recipesRouter);

connectToDatabase();

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
