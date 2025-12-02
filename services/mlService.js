const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();
const BASE_URL = process.env.FASTAPI_BASE_URL;

exports.hello = async() => {

    try {
        const response = await axios.get(`${BASE_URL}/hello`);
        return response.data;
    } catch (error) {
        console.log('/hello 호출 실패', error.message);
    }

};

exports.predict = async(data) => {
    try {
        const response = await axios.post(`${BASE_URL}/predict`, data);
        return response.data;
    } catch (error) {
        console.log('/hello 호출 실패', error.message);
    }

};