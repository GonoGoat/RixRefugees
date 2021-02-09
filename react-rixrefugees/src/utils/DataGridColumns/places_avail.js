const places_availabilitiesList = 
[
    {
        field : 'id',
        headerName : 'Identifiant du lieu disponible',
        flex : 1
    },
    {
        field : 'name',
        headerName : 'Nom du lieu',
        flex : 1
    },
    {
        field : 'start_avail',
        headerName : 'Début de disponibilité',
        flex : 1
    },
    {
        field : 'end_avail',
        headerName : 'Fin de disponibilité',
        flex : 1
    },
    {
        field : 'bed_quantity',
        headerName : 'Nombre de lit disponible',
        flex : 1
    }
]
;

module.exports = {
    pavailList : places_availabilitiesList
}