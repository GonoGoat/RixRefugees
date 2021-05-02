const friendsList = 
[
    {
        field : 'id',
        headerName : 'Identifiant de l\'ami',
        flex : 1,
        type : 'number'
    },
    {
        field : 'in_date',
        headerName : 'Date d\'arrivée',
        flex : 1,
        type : 'date',
        valueFormatter : (params) => moment(params.value).format('DD/MM/YYYY')
    },
    {
        field : 'fname',
        headerName : 'Prénom de l\'ami',
        flex : 1,
        type : 'string'
    },
    {
        field : 'lname',
        headerName : 'Nom de l\'ami',
        flex : 1,
        type : 'string'
    },
]
;

module.exports = {
    friendsList : friendsList
}