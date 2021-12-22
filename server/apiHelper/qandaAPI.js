const axios = require('axios');
// const config = require('../../.env/config');
// require('dotenv').config();
// var token = process.env.TOKEN;
// var token = 'hello';
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


console.log('token', process.env.TOKEN)
module.exports.token = process.env.TOKEN;