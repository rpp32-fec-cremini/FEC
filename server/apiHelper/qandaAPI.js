const axios = require('axios');
// const config = require('../../.env/config');
// require('dotenv').config();
var token = process.env.TOKEN;

let getProducts = () => {
    let options = {
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=59553',
        headers: {
            'Authorization': token
        }
    }
    return axios(options);
};

module.exports.getProducts = getProducts;
