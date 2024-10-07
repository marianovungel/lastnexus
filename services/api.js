import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://unilabtemserver-env.eba-wsnv2ibv.us-east-1.elasticbeanstalk.com/',
    // baseURL: 'https://backunilabtem.herokuapp.com/',
    // baseURL: 'http://localhost:8000/'
    baseURL: 'https://tem-w1vm.onrender.com',
});

export default api;