//===================TEXT====================

function limitedText(str,limit) {
    return (toString(str).length <= limit ? true : `Veuillez écrire moins de ${limit} caractères.`)    
}

//===================STRING====================

function stringOnly(str,notEmpty) {
    let query = (notEmpty ? toString(str).match(/^[a-z]+$/) : toString(str).match(/^[a-z]*/))
    return (query ? true : "Veuillez n'insérer que des lettres." )    
}

function limitedString(str, notEmpty, limit) {
    let reg = (notEmpty ? new RegExp(`^[a-z]{1,${limit}}`) : new RegExp(`^[a-z]{0,${limit}}`))
    let query = toString(str).match(reg);
    return (query ? true : "Veuillez n'insérer que des lettres." )    
}

//===================INTEGER====================

function intOnly(str) {
    return (toString(str).match(/^\d+$/) ? true : "Veuillez n'insérer que des chiffres." )   
}

function noNullOrNegativeInt(str) {
    if (! toString(str).match(/^\d+$/)) {
        return "Veuillez n'insérer que des chiffres.";
    }
    if (parseInt(str) > 0) {
        return "Veuillez sélectionner une réponse valide."
    }
    return true;
}