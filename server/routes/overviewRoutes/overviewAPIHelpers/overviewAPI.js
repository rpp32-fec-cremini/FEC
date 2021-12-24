const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
const axios = require('axios');
require('dotenv').config();
const token = process.env.TOKEN;


module.exports.getProducts = () => {
  let options = {
    url: API_URL + 'products',
    headers: {
      Authorization: token
    }
  };

  return axios({
    method: 'GET',
    url: options.url,
    headers: options.headers
  })
}

module.exports.getSingleProduct = (id) => {
  let options = {
    url: API_URL + `product/:product_id`,
    headers: {
      'Authorization': token
    },
    params: {
      product_id: id
    }
  };

  return axios({
    method: 'GET',
    url: options.url,
    headers: options.headers,
    params: options.params
  })
}

module.exports.getStyle = (id) => {
  console.log('THIS IS NOT THE ID YOU\'re looking for', id)
  let options = {
    url: API_URL + `products/${id}/styles/`,
    headers: {
      'Authorization' : token
    }/* params: {
    product_id: id
  } */
}

  return axios ({
    method: 'GET',
    url: options.url,
    headers: options.headers
  })

}

module.exports.getMeta = (id) => {
  let options = {
    url: API_URL + 'review/meta/:product_id',
    headers: {
      'Authorization': token
    },
    params: {
      product_id: id
    }
  }

  return axios ({
    method: 'GET',
    url: options.url,
    headers: options.headers
  })
}
