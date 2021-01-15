import axios from 'axios';

const instance= axios.create({
    baseURL:'https://react-my-burger-591cb-default-rtdb.firebaseio.com/'
});
export default instance;