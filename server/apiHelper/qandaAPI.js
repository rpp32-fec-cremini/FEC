const axios = require('axios');
// const config = require('../../.env/config');
require('dotenv').config();
var token = process.env.TOKEN;

let getProducts = () => {
    let options = {
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products',
        headers: {
            'Authorization': token
        }
    }
    return axios(options);
};
getProducts()
.then(info=> {
    console.log(info.data)
})