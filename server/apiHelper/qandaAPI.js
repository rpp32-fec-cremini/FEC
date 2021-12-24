const axios = require('axios');

let getProducts = (endPoint) => {
    let options = {
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions${endPoint}`,
        // url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/553673/answers',
        headers: {
            // 'Authorization': process.env.TOKEN
            'Authorization': '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'
        }
    }
    return axios(options);
};

// getProducts()
// .then(question=> {
//     console.log('question', question.data)
//   // console.log('data', question.data.results[0].answers);
// //   res.send(JSON.stringify(question.data.results));
// })

module.exports = getProducts;