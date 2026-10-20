const conn = require('./db/conn')

const { Agendamento, Cliente, Veiculo } = require('./models/rel')

async function syncDataBase(){
    try {
        await conn.sync({ force: true })
        console.log('Tabelas Sincronizadas')
    } catch (err) {
        console.error('Erro ao sincronizar as tabelas!',err)
    }finally{
        conn.close()
        console.log('Fechando conexão com o banco de dados!')
    }
}

syncDataBase()