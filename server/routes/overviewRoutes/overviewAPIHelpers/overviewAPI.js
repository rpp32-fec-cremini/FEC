const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
const axios = require('axios');
require('dotenv').config();
const token = process.env.TOKEN;


module.exports.getProducts = () => {
  console.log('TOKEN HERE ', token);
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
  .catch(err=> {console.log(err)});
}


module.exports.getSingleProduct = (id) => {
  let options = {
    url: API_URL + `product/:product_id`,
    headers: {
      'Authorization': token
    }
  };

  return axios({
    method: 'GET',
    url: options.url,
    headers: options.headers,
    params: options.params
  })
  .catch(err=> {console.log(err)});
}

module.exports.getStyle = (id) => {
  console.log('THIS IS NOT THE ID YOU\'re looking for', id)
  let options = {
    url: API_URL.concat(`products/${id}/styles/`),
    headers: {
      'Authorization' : token
    }
}

  return axios ({
    method: 'GET',
    url: options.url,
    headers: options.headers
  })
<<<<<<< HEAD
  .catch(err=> {console.log(err)});
=======
  

>>>>>>> ec0fdf2969eca178ef67c7a30e07ff1361dc4531
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
  .catch(err=> {console.log(err)});
}

