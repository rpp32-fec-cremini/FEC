const axios = require('axios');

let getProducts = (endPoint) => {
    let options = {
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions${endPoint}`,
        // url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/553673/answers',
        // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products`,
        headers: {
            'Authorization': process.env.TOKEN

        }
    }
    return axios(options);
};

// getProducts('?product_id=59553')
// .then(question=> {
//     console.log('question', question.data)
//   console.log('data', question.data.results[0].answers);
// //   res.send(JSON.stringify(question.data.results));
// })

module.exports = getProducts;