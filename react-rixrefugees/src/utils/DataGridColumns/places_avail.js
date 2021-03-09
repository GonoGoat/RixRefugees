const moment = require('moment');

const places_availList = 
[
    {
        field : 'id',
        headerName : 'Identifiant de la période de disponibilité',
        flex : 1,
        type : 'number'
    },
    {
        field : 'name',
        headerName : 'Nom du lieu',
        flex : 1,
        type : 'string'
    },
    {
        field : 'start_avail',
        headerName : 'Début de disponibilité',
        flex : 1,
        type : 'dateTime',
        valueFormatter : (params) => moment(params.value).format('DD/MM/YYYY HH:mm')

    },
    {
        field : 'end_avail',
        headerName : 'Fin de disponibilité',
        flex : 1,
        type : 'dateTime',
        valueFormatter : (params) => moment(params.value).format('DD/MM/YYYY HH:mm')
    },
    {
        field : 'bed_quantity',
        headerName : 'Nombre de lits disponibles',
        flex : 1,
        type : 'number'
    }
]
;

module.exports = {
    pavailList : places_availList
}