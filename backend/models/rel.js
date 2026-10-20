const Cliente  = require('./Cliente')
const Agendamento = require('./Agendamento')
const Veiculo  = require('./Veiculo')

Cliente.hasMany(Agendamento,{
    foreignKey: 'idCliente',
    as: 'agendamentoCliente',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'clienteAgendamento',
    allowNull: false
})

Veiculo.hasMany(Agendamento,{
    foreignKey: 'idVeiculo',
    as: 'agendamentoVeiculo',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Veiculo,{
    foreignKey: 'idVeiculo',
    as: 'veiculoAgendamento',
    allowNull: false
})

Cliente.hasMany(Veiculo,{
    foreignKey: 'idCliente',
    as: 'veiculoCliente',
    onDelete: 'CASCADE'
})

Veiculo.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'clienteVeiculo',
    allowNull: false
})

module.exports = { Veiculo, Agendamento, Cliente };