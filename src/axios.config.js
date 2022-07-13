import axios from 'axios';
var dotenv = require('dotenv')
var dotenvExpand = require('dotenv-expand')

var myEnv = dotenv.config()
dotenvExpand.expand(myEnv)


// axios.defaults.baseURL = process.env.BACKEND_URL;

export default axios.create({
    baseURL:process.env.REACT_APP_API_URL
});