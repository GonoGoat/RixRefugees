//===================TEXT====================

function limitedText (str,limit) {
    return (str.length <= limit ? true : `Veuillez écrire moins de ${limit} caractères.`)    
};

function phoneNumber (str) {
    return (str.match(/^\+\d{11}$/) ? true : "Veuillez écrire votre numéro de téléphone sous le format suivant : +XXXXXXXXXXX." ) 
};

function mail (str) {
    return (str.match(/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/) && str.length <= 40 ? true : "Veuillez entrer une adresse email valide et de moins de 40 caractères" ) 
};

function password (str) {
    console.log(str)
    return (str.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/) && str.length <= 30 ? true : "Veuillez entrer un mot de passe suffisament fort : entre 8 et 30 caractères avec au moins 1 lettre majuscule, 1 lettre minuscule et 1 caractère spécial." ) 
};

//===================STRING====================

function stringOnly (str,notEmpty) {
    if (notEmpty && str.length === 0) { return 'Veuillez entrer une valeur.';}
    let query = (notEmpty ? str.match(/^[a-z]+$/) : str.match(/^[a-z]*/))
    return (query ? true : "Veuillez n'insérer que des lettres." )    
};

function limitedString (str, notEmpty, limit) {
    if (notEmpty && str.length === 0) { return 'Veuillez entrer une valeur.';};
    if (str.length > limit) { return `Veuillez n'écrire que maximum ${limit} caractères.`}
    let reg = (notEmpty ? new RegExp(`^[a-z]{1,${limit}}`) : new RegExp(`^[a-z]{0,${limit}}`));
    let query = str.match(reg);
    return (query ? true : "Veuillez n'insérer que des lettres." )    
};

//===================INTEGER====================

function intOnly (str) {
    return (str.match(/^\d+$/) ? true : "Veuillez n'insérer que des chiffres." )   
};

function noNullOrNegativeInt (str) {
    if (! str.match(/^\d+$/)) {
        return "Veuillez n'insérer que des chiffres.";
    }
    if (parseInt(str) > 0) {
        return "Veuillez sélectionner une réponse valide."
    }
    return true;
};

let check  = {
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
        value : limitedString(val,true,20)
    }},
    fname : function (val) { return {
        key : "Prénom",
        value : limitedString(val,true,20)
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