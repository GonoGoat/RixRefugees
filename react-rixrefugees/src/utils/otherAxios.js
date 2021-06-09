const axios = require('axios');

const instance = axios.create({
    withCredentials : false
})

module.exports = instance;

