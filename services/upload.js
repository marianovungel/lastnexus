import axios from 'axios'; 

const upload = axios.create({
    baseURL: 'https://back-dks9.onrender.com/',
    // baseURL: 'https://uploadimgu.herokuapp.com/',
});


export default upload;