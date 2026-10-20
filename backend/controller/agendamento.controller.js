const Agendamento = require('../models/Agendamento')
const Cliente = require('../models/Cliente')
const Veiculo = require('../models/Veiculo')

const cadastrar = async (req,res) =>{
    const valores = req.body

    if(!valores.data || !valores.hora || !valores.tipoServico || !valores.idCliente || !valores.idCliente){
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {

        const cliente = Cliente.findByPk(valores.idCliente)
        if(!cliente){
            return res.status(404).json({ message: 'Cliente informado não existe'})
        }

        const veiculo = Veiculo.findByPk(valores.idVeiculo)
        if(!veiculo){
            return res.status(404).json({ message: 'Veiculo informado não existe'})
        }

        await Agendamento.create(valores)
        
        res.status(201).json({ message: 'Dados cadastrados com sucesso! '})

    } catch (err) {
        console.log('Erro ao realizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação ciclista!'})
    }
}

const listar = async (req,res) =>{
    try {
        const agendamentos = await Agendamento.findAll({
            order: [['data', 'ASC']],
            include: [
                {
                    model: Cliente,
                    as: 'clienteAgendamento',
                    attributes: ['codCliente', 'nome', 'email', 'telefone']
                },
                {
                    model: Veiculo,
                    as: 'veiculoAgendamento',
                    attributes: ['codVeiculo', 'modelo', 'marca', 'placa']
                }
            ]
        })

        return res.status(200).json(agendamentos)
    } catch (err) {
        console.error('Erro ao listar agenda:', err)
        return res.status(500).json({ message: 'Erro ao listar agenda!' })
    }
}
module.exports = { cadastrar, listar };