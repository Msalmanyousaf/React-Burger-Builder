import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-builder-49488-default-rtdb.firebaseio.com/'
});
export default instance;