const express = require('express');
const app = express();
const cors = require('cors');

// Apenas isso, direto e reto! O buraco negro foi fechado.
app.use(cors());
app.use(express.json());

const routes = require('./routes/routes');
app.use('/api', routes);

// Obtendo os parametros passados pela linha de comando
var userArgs = process.argv.slice(2);
var mongoURL = process.env.MONGO_URI || userArgs[0];

//Configurando a conexao com o Banco de Dados
var mongoose = require('mongoose');
mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', (error) => {
  console.log(error)
})
db.once('connected', () => {
  console.log('Database Connected');
})

const PORT = process.env.PORT || 3000;
// O segredo do Render está em adicionar o "0.0.0.0"
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando liso na porta ${PORT}`);
});