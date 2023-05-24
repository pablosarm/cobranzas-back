const express = require('express');
const bodyParser = require('body-parser'); // Importa el body-parser
const routes = require('./routes/routes');
const mongoose = require('mongoose');


const app = express();
const port = 3000;
const mongoUrl = 'mongodb://127.0.0.1:27017/';
const dbName = 'Cobranzas-CC';

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json()); // Usa el body-parser

async function main() {
    try {
        // Use connect method to connect to the server
        await mongoose.connect(mongoUrl+dbName, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado a la base de datos.');

        app.use('/api', routes);

        // Start the server
        app.listen(port, () => {
            console.log(`Servidor en ejecución en http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

main().catch(console.error);
