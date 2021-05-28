

var CryptoJS = require('crypto-js')
const EncKey = CryptoJS.MD5(process.env.ENC_KEY)
const EncIV  = CryptoJS.lib.WordArray.create(8)

function encodeString (string){
    const stringEncrypt = CryptoJS.TripleDES.encrypt(string, EncKey, { iv: EncIV }).toString()
    return stringEncrypt;
}

function decodeString(string) {
    const stringDecrypt = CryptoJS.TripleDES.decrypt(string, EncKey, { iv: EncIV }).toString(CryptoJS.enc.Utf8);
    return stringDecrypt;
}

module.exports = {
    decodeString : decodeString,
    encodeString : encodeString
}