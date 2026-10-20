const express = require('express')
const app = express()

const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')

require('./models/rel')

const authMiddleware = require('./Middleware/auth.middleware')

const authController = require('./controller/auth.controller')
const agendamentoController = require('./controller/agendamento.controller')
const clienteController = require('./controller/cliente.controller')
const veiculoController = require('./controller/veiculo.controller')

// ============================ Middleware ================================

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// ========================================================================

// =============================== Rotas ==================================

// Rotas publicas -->
app.post('/cliente', clienteController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação rodando!' })
})

// Middleware pra proteger as rotas privadas -->
app.use(authMiddleware)

// Rotas privadas -->
app.get('/clientes', clienteController.listar)
app.get('/cliente/buscarNome/:nome', clienteController.consultarNome)
app.get('/cliente/:id', clienteController.consultar)
app.put('/cliente/:id', clienteController.atualizar)
app.delete('/cliente/:id', clienteController.apagar)

app.post('/veiculo', veiculoController.cadastrar)
app.post('/agendamento', agendamentoController.cadastrar)
app.get('/agendamentos', agendamentoController.listar)

// ========================================================================

// =============================== Server =================================

conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Aplicação rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao rodar aplicação!', err)
    })
    
// ========================================================================