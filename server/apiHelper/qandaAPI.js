const axios = require('axios');

let getProducts = (endPoint) => {
    let options = {
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions${endPoint}`,
        headers: {
            'Authorization': process.env.TOKEN
        }
    }
    return axios(options);
};

const postQuestion = (data) => {
    var product_id = parseInt(data.product_id);
    const params = {
        body: data.question,
        name: data.nickName,
        email: data.email,
        product_id: product_id,
    };
    return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions', params, {
        headers: {
            'Authorization': process.env.TOKEN
        }
    })
};

const postAnswer = (data, questionId) => {
    var questionId = questionId;
    const params = {
        body: data.question,
        name: data.nickName,
        email: data.email,
        photos: data.file
    };
    return axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions${questionId}`, params, {
        headers: {
            'Authorization': process.env.TOKEN
        }
    })
};

const questionHelpfulandReport = (endPoint) => {
    let options = {
        method: 'PUT',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions${endPoint}`,
        headers: {
            'Authorization': process.env.TOKEN
        }
    }
    return axios(options);
};

const answerHelpfulandReport = (endPoint) => {
    let options = {
        method: 'PUT',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers${endPoint}`,
        headers: {
            'Authorization': process.env.TOKEN
        }
    }
    return axios(options);
};

module.exports = {
    getProducts,
    postQuestion,
    postAnswer,
    questionHelpfulandReport,
    answerHelpfulandReport,
}