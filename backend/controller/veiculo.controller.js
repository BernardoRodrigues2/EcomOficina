const Veiculo = require('../models/Veiculo')
const CryptoJS = require('crypto-js')
const key = 'segredo'

const Cliente = require('../models/Cliente')

const cadastrar = async (req,res) =>{
    const valores = req.body

    if(!valores.modelo || !valores.marca || !valores.placa || !valores.codRastreio || !valores.idCliente){
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        const cliente = Cliente.findByPk(valores.idCliente)
        if(!cliente){
            return res.status(404).json({ message: 'Cliente informado não existe'})
        }
        
        const codRastreioCripto = CryptoJS.AES.encrypt(valores.codRastreio, key).toString()

        await Veiculo.create({
            modelo: valores.modelo,
            marca: valores.marca,
            placa: valores.placa,
            codRastreio: codRastreioCripto,
            idCliente: valores.idCliente
        })
        
        res.status(201).json({ message: 'Dados cadastrados com sucesso! '})

    } catch (err) {
        console.log('Erro ao realizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação ciclista!'})
    }
}

module.exports = { cadastrar };