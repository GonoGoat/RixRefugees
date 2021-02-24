const moment = require('moment');

const sessionList = [
    {
        field : 'id',
        headerName : 'Identifiant de la session',
        flex : 1,
        type : 'number'
    },
    {
        field : 'start_date',
        headerName : 'Date de début',
        flex : 1,
        type : 'date',
        valueFormatter : (params) => moment(params.value).format('DD/MM/YYYY')
    },
    {
        field : 'end_date',
        headerName : 'Date de fin',
        flex : 1,
        type : 'date',
        valueFormatter : (params) => moment(params.value).format('DD/MM/YYYY')
    },
    {
        field : 'username',
        headerName : 'Coordinateur responsable',
        flex : 1,
        type : 'string'
    },
    {
        field : 'name',
        headerName : 'Nom du lieu',
        flex : 1,
        type : 'string'
    },
]

module.exports = {
    sessionList : sessionList
}