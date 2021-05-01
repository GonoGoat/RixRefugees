const friendsList = 
[
    {
        field : 'id',
        headerName : 'Identifiant de l\'ami',
        flex : 1,
        type : 'number'
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
    {
        field : 'in_date',
        headerName : 'Date d\'arrivée',
        flex : 1,
        type : 'date'
    },
]
;

module.exports = {
    friendsList : friendsList
}