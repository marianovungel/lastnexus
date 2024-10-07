import axios from 'axios';

const segundoLogin = axios.create({
    baseURL: 'https://api.unilab.edu.br/api/'
});

export default segundoLogin;