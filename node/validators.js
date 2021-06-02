let check = {

    //===================TEXT====================

    limitedText : function (str,limit) {
        if (str.length === 0) { return false}
        return (str.length <= limit ? true : false)    
    },

    phoneNumber : function (str) {
        return (!str || str.match(/^\+\d{11}$/) ? true : false ) 
    },

    mail : function (str) {
        return (str.match(/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/) && str.length <= 40 ? true : false ) 
    },

    password : function (str) {
        return (str.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/) && str.length <= 30 ? true : false ) 
    },

    notNull : function (str) {
        return (str ? true : false)
    },

    //===================STRING====================

    stringOnly : function (str,notEmpty) {
        if (notEmpty && str.length === 0) { return false}
        let query = (notEmpty ? str.match(/^[a-z]+$/) : str.match(/^[a-z]*/))
        return (query ? true : false )    
    },

    limitedString : function (str, notEmpty, limit) {
        if (notEmpty && str.length === 0) { return false };
        if (str.length > limit) { return false}
        let reg = (notEmpty ? new RegExp(`^[a-z]{1,${limit}}`,"i") : new RegExp(`^[a-z]{0,${limit}}`,"i"));
        let query = str.match(reg);
        return (query ? true : false )    
    },

    //===================INTEGER====================

    noNegativeInt : function (str) {
        if (parseInt(str) < 0) {
            return false;
        }
        return true;
    },

    validFk : function (str) {
        if (parseInt(str) <= 0 || !parseInt(str)) {
            return false;
        }
        return true;
    },

    arrayOfValidFk : function (arr) {
        let compare = arr.map(v => true)
        arr.forEach((val,index) => {
            if (check.validFk(val) === false) {
                compare[index] = false
            }
        })
        return compare.indexOf(false) === -1
    },

    //===================DATE====================

    validDates : function (start,end) {
        if (new Date(start) > new Date(end)) {
            return false;
        }
        return true;
    },

    //===================OBJECT====================

    hasProperties : function (arr, obj) {
        let compare = arr.map(v => true)
        arr.forEach((val,index) => {
            if (obj.hasOwnProperty(val) === -1) {
                compare[index] = false
            }
        })
        return compare.indexOf(false) === -1
    },

    //===================CHECK====================

    checkForm : function (res,array) {
        if (array.indexOf(false) !== -1) {
            return res.status(400).send("Champs erronés. Veuillez utiliser le site web www.rixref.be pour effectuer correctement votre requête.")
        }
        return true;
    },
}

module.exports = check;