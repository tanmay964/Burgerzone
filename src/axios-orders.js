import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerzone-react.firebaseio.com'
});

export default instance;