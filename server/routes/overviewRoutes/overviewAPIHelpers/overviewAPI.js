const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
const axios = require('axios');
require('dotenv').config();
const token = process.env.TOKEN;


module.exports.getProducts = () => {
  let options = {
    url: API_URL + 'products',
    headers: {
      'Authorization': token
    }
  };

  return axios({
    method: 'GET',
    url: options.url,
    headers: options.headers
  })
}

module.exports.getSingleProduct = () => {
  let options = {
    url: API_URL + 'product/:product_id',
    headers: {
      'Authorization': token
    }
  };

  return axios({
    method: 'GET',
    url: options.url,
    headers: options.headers
  })
}

modules.exports.getStyle = () => {
  let options = {
    url: API_URL + 'product/:product_id/styles',
    headers: {
      'Authorization' : token
    }
  };

  return axios ({
    method: 'GET',
    url: options.url,
    headers: options.headers
  })

}

modules.exports.getMeta = () => {
  let options = {
    url: API_URL + 'review/meta',
    headers: {
      'Authorization': token
    }
  }

  return axios ({
    method: 'GET',
    url: options.url,
    headers: options.headers
  })
}
