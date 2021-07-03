import axios from 'axios';

const production = "https://book-lib-be.herokuapp.com/";
const local = "http://localhost:8080";
const url = production;
axios.defaults.baseURL = `${url}`;

export default axios.create({
    baseURL: `${url}`,
    headers: {
        "Content-Type": "application/json",
    },
});