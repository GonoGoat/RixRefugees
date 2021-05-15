//import * as check from "./validators";

module.exports = {
    mail : function (val) { 
        return {
        key : "Email",
        value : check.email(val)
    }},
    password : function (val) { return {
        key : "Mot de passe",
        value : check.password(val)
    }},
    lname : function (val) { return {
        key : "Nom",
        value : check.limitedString(val,20)
    }},
    fname : function (val) { return {
        key : "Prénom",
        value : check.limitedString(val,20)
    }},

    
    //===================CHECK====================

    checkForm : function (array) {
        let errors = array.map(val => {
            if (val !== true) {
                return `${val.key} : ${val.value}`;
            }
        });
        if (errors.length > 0) {
            return errors;
        }
        else {
            return true;
        }
    }
};