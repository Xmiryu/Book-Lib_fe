import axios from 'axios';

const production = "https://book-lib-be.herokuapp.com/";
const development = "http://localhost:8080";

const url = process.env.NODE_ENV === "production" ? production : development;

axios.defaults.baseURL = `${url}`;

export default axios.create({
    baseURL: `${url}`,
    headers: {
        "Content-Type": "application/json",
    },
});