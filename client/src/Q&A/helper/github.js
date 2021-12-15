const axios = require('axios');
const config = require('../../../../githubAPI/config.js');

let getProducts = () => {
    let options = {
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products',
        headers: {
            'Authorization': config.API
        }
    }
    return axios(options);
};
getProducts()
.then(info=> {
    console.log(info.data)
})