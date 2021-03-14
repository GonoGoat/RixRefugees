const moment = require('moment');

const sessionTasksList = [
    {
        field : 'id',
        headerName : 'Identifiant de la tâche de session',
        flex : 1,
        type : 'number'
    },
    {
        field : 'name',
        headerName : 'Nom de la tâche',
        flex : 1,
        type : 'string'
    },
    {
        field : 'isfromadmin',
        headerName : 'Tâche provenant d\'un coordinateur ?',
        flex : 1,
        type : 'string',
        valueFormatter : (params) => params ? 'Oui' : 'Non'
    },
    {
        field : 'start_date',
        headerName : 'Date de début de la tâche',
        flex : 1,
        type : 'date',
        valueFormatter : (params) => moment(params.value).format('DD/MM/YYYY HH:mm')
    },
    {
        field : 'end_date',
        headerName : 'Date de fin de la tâche',
        flex : 1,
        type : 'date',
        valueFormatter : (params) => moment(params.value).format('DD/MM/YYYY HH:mm')
    },
    {
        field : 'amountofpeople',
        headerName : 'Nombre de bénévoles à assigner',
        flex : 1,
        type : 'number'
    },
]

module.exports = {
    sessionTasksList : sessionTasksList
}