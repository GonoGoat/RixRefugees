//===================TEXT====================

function limitedText (str,limit) {
    if (str.length === 0) { return "Veuillez écrire au minimum un caractère."}
    return (str.length <= limit ? true : `Veuillez écrire moins de ${limit} caractères.`)    
};

function phoneNumber (str) {
    return (!str || str.match(/^\+\d{11}$/) ? true : "Veuillez écrire votre numéro de téléphone sous le format suivant : +XXXXXXXXXXX." ) 
};

function mail (str) {
    return (str.match(/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/) && str.length <= 40 ? true : "Veuillez entrer une adresse email valide et de moins de 40 caractères" ) 
};

function password (str) {
    return (str.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/) && str.length <= 30 ? true : "Veuillez entrer un mot de passe suffisament fort : entre 8 et 30 caractères avec au moins 1 lettre majuscule, 1 lettre minuscule et 1 caractère spécial." ) 
};

function notNull(str) {
    return (str ? true : "Veuillez insérer une valeur")
}

//===================STRING====================

function stringOnly (str,notEmpty) {
    if (notEmpty && str.length === 0) { return 'Veuillez entrer une valeur.';}
    let query = (notEmpty ? str.match(/^[a-z]+$/) : str.match(/^[a-z]*/))
    return (query ? true : "Veuillez n'insérer que des lettres." )    
};

function limitedString (str, notEmpty, limit) {
    if (notEmpty && str.length === 0) { return 'Veuillez entrer une valeur.';};
    if (str.length > limit) { return `Veuillez n'écrire que maximum ${limit} caractères.`}
    let reg = (notEmpty ? new RegExp(`^[a-z]{1,${limit}}`,"i") : new RegExp(`^[a-z]{0,${limit}}`,"i"));
    let query = str.match(reg);
    return (query ? true : "Veuillez n'insérer que des lettres." )    
};

//===================INTEGER====================

function noNegativeInt (str) {
    if (parseInt(str) < 0) {
        return "Veuillez insérer un nombre positif.";
    }
    return true;
};

function validFk (str) {
    if (parseInt(str) <= 0) {
        return "Veuillez sélectionner une valeur disponible ou alors en créer une dans le menu adéquat.";
    }
    return true;
};

function validDates(start,end) {
    if (new Date(start) > new Date(end)) {
        return "Veuillez entrer des dates adéquates.";
    }
    return true;
}

let check = {
    mail : function (val) { 
        return {
        key : "Email",
        value : mail(val)
    }},
    password : function (val) { return {
        key : "Mot de passe",
        value : password(val)
    }},
    lname : function (val) { return {
        key : "Nom",
        value : limitedString(val,20)
    }},
    fname : function (val) { return {
        key : "Prénom",
        value : limitedString(val,true,20)
    }},
    n_lname : function (val) { return {
        key : "Nom",
        value : limitedString(val,false,20)
    }},
    n_fname : function (val) { return {
        key : "Prénom",
        value : limitedString(val,false,20)
    }},
    name : function (val) { return {
        key : "Nom",
        value : limitedText(val,40)
    }},
    nationality : function (val) { return {
        key : "Nationalité",
        value : notNull(val)
    }},
    phoneNumber: function (val) { return {
        key : "Numéro de téléphone",
        value : phoneNumber(val)
    }},
    status : function (val) { return {
        key : "Status",
        value : validFk(val)
    }},
    friends : function (val) { return {
        key : "Ami",
        value : validFk(val)
    }},
    address : function (val) { return {
        key : "Adresse",
        value : limitedText(val,60)
    }},
    places : function (val) { return {
        key : "Lieu d'hébergement",
        value : validFk(val)
    }},
    avail_dates : function (start,end) { return {
        key : "Dates de disponibilité",
        value : validDates(start,end)
    }},
    bedQuantity : function (val) { return {
        key : "Nombre de lits",
        value : noNegativeInt(val)
    }},
    dates : function (start,end) { return {
        key : "Date de début et fin",
        value : validDates(start,end)
    }},
    users : function (val) { return {
        key : "Coordinateur",
        value : validFk(val)
    }},
    places_avail : function (val) { return {
        key : "Lieu d'hébergement disponible",
        value : validFk(val)
    }},
    amountOfPeople : function (val) { return {
        key : "Nombre de bénévole à assigner",
        value : noNegativeInt(val)
    }},
    tasks : function (val) { return {
        key : "Tâche",
        value : validFk(val)
    }},
    sessions : function (val) { return {
        key : "Session",
        value : validFk(val)
    }},


    //===================CHECK====================

    checkForm : function (array) {
        let errors = [];
        array.forEach(val => {
            if (val.value !== true) {
                errors.push(`${val.key} : ${val.value}`);
            }
        });
        if (errors.length > 0) {
            return errors;
        }
        else {
            return true;
        }
    }
}

export default check;