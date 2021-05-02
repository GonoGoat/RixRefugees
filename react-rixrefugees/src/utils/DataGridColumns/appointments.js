const moment = require('moment');

const appointmentsList = 
[
    {
        field : 'id',
        headerName : 'Identifiant du rendez-vous',
        flex : 1,
        type : 'number'
    },
    {
        field : 'appointment',
        headerName : 'Début de rendez-vous',
        flex : 1,
        type : 'date',
        valueFormatter : (params) => moment(params.value).format('DD/MM/YYYY')

    },
    {
        field : 'status_name',
        headerName : 'Statut en cours d\'acquisition',
        flex : 1,
        type : 'string'
    },
    {
        field : 'friends_name',
        headerName : 'Nom de l\'ami concerné',
        flex : 1,
        type : 'string'
    },
]
;

module.exports = {
    appointmentsList : appointmentsList
}