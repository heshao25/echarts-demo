import axios from 'axios'

const instance  = axios.create(config)

let config= {
    baseURL:'http://127.0.0.1:3000/api',
    
    timeout:10000,

}

export default instance
