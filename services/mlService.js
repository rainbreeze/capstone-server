const axios = require('axios');
const BASE_URL = process.env.FASTAPI_BASE_URL;

exports.hello = async() => {
    const response = await axios.get(`${BASE_URL}/hello`);
    return response.data;
};

exports.predict = async(data) => {
    const response = await axios.post(`${BASE_URL}/predict`, data);
    return response.data;
};