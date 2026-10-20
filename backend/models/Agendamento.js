const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Agendamento = db.define('agendamento',{
    codAgendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },

    tipoServico: {
        type: DataTypes.ENUM('revisao', 'manutençao', 'instalaçao'),
        allowNull: false
    },

    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    },

    idVeiculo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'veiculos',
            key: 'codVeiculo'
        }
    }

},{
    timestamps: false,
    tableName: 'agendamentos'
})

module.exports = Agendamento;