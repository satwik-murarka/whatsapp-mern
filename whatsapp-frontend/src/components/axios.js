import axios from 'axios'

const instance = axios.create({
    baseURL: "https://whatsapp-mern-clone-sm.herokuapp.com"
});

export default instance;