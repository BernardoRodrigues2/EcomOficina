const Cliente = require('../models/Cliente')
const CryptoJS = require('crypto-js')
const key = 'segredo'

const cadastrar = async (req,res) =>{
    const valores = req.body
    console.log(valores)

    if (!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.endereco || !valores.telefone) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    if (valores.cpf.length !== 11) {
        return res.status(400).json({ message: 'O CPF deve conter exatamente 11 dígitos!' })
    }

    try {
        const cpfCriptografado = CryptoJS.AES.encrypt(valores.cpf, key).toString()
        const senhaCriptografada = CryptoJS.AES.encrypt(valores.senha, key).toString()

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCriptografada,
            cpf: cpfCriptografado,
            endereco: valores.endereco,
            telefone: valores.telefone
        })

        return res.status(201).json({ message: 'Dados cadastrados com sucesso!'})
    } catch (err) {
        console.log('Erro ao realizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

const listar = async (req,res) =>{
    try {
        const cliente = await Cliente.findAll()
        let resultado = []

        cliente.forEach((el)=>{
            let cpfDescriptografado = ''
            try {
                const bytes = CryptoJS.AES.decrypt(el.cpf, key)
                cpfDescriptografado = bytes.toString(CryptoJS.enc.Utf8)
            } catch (err) {
                cpfDescriptografado = 'Erro ao descriptografar'
                console.error(cpfDescriptografado, err)
            }

            resultado.push({
                codCliente: el.codCliente,
                nome: el.nome,
                cpf: cpfDescriptografado,
                endereco: el.endereco,
                telefone: el.telefone,
            })
        })

        return res.status(200).json(resultado)
    } catch (err) {
        console.log('Erro ao realizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

const consultar = async (req,res) =>{
    const id = req.params.id
    try {
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        const bytes = CryptoJS.AES.decrypt(cliente.cpf, key)
        console.log('bytes =' ,bytes)
        const cpfDescriptografado = bytes.toString(CryptoJS.enc.Utf8)
        console.log('Cpf descriptografado = ', cpfDescriptografado)

        return res.status(200).json({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfDescriptografado,
            endereco: cliente.endereco,
            telefone: cliente.telefone,
        })

    } catch (err) {
        console.log('Erro ao realizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

const atualizar = async (req,res) =>{
    const id = req.params.id
    const valores = req.body
    
    try {
        const cliente = await Cliente.findByPk(id)

        if(!cliente){
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        const dadosAtualizados = { ...valores }

        if(valores.cpf){
            if (valores.cpf.lenght !== 11){
                return res.status(400).json({ message: 'O CPF deve conter exatamente 11 dígitos!' })
            }   
            dadosAtualizados.cpf = CryptoJS.AES.encrypt(valores.cpf, key).toString()
        }

        if(valores.senha){
            dadosAtualizados.senha = CryptoJS.AES.encrypt(valores.senha, key).toString()
        }

        await Cliente.update(dadosAtualizados, { where: { codCliente: id }})
        return res.status(200).json({ message: 'Cliente atualizado com sucesso!' })
    } catch (err) {
        console.log('Erro ao realizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

const apagar = async (req,res)=>{
    const id = req.params.id
    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        await Cliente.destroy({ where: { codCliente: id } })
        return res.status(200).json({ message: 'Cliente excluído com sucesso!' })
    } catch (err) {
        console.log('Erro ao realizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

const consultarNome = async (req,res) =>{
    const nome = req.params.nome

    try {
        const cliente = await Cliente.findOne({ where: { nome: nome }})

        if(!cliente){
          return res.status(404).json({ message: 'Ciclista não encontrado!' })
        }

        const bytes = CryptoJS.AES.decrypt(cliente.cpf, key)
        const cpfDescriptografado = bytes.toString(CryptoJS.enc.Utf8)
        
        return res.status(200).json({
            codCliente: cliente.codCiclista,
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfDescriptografado,
            endereco: cliente.endereco,
        })

    } catch (err) {
        console.log('Erro ao realizar operação!',err)
        return res.status(500).json({ message: 'Erro ao realizar operação!'})
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar, consultarNome };