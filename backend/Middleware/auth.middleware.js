const CryptoJS = require('crypto-js')
const Key = 'segredo'

function authMiddleware(req,res, next) {
    const token = req.headers['authorization']
    console.log(token)

    if(!token){
        return res.status(401).json({ message: 'Acesso negado! Token não fornecido. '})
    }

    try {
        const bytes = CryptoJS.AES.decrypt(token, Key)
        const dadosDescript = bytes.toString(CryptoJS.enc.Utf8)

        if(!dadosDescript){
            return res.status(401).json({ message: 'Token Inválido!'})
        }

        const payload = JSON.parse(dadosDescript)

        if(Date.now > payload.expiraEm){
            return res.status(401).json({ message: 'Token expirado! Faça o login novamente!'})
        }

        req.usuario = payload
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Falha na autenticação do token!'})
    }
}

module.exports = authMiddleware