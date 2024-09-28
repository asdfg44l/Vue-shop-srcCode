import axios from 'axios'

export { instance }

const instance = axios.create({
    baseURL: process.env.VUE_APP_APIPATH,
    headers: {
        Authorization: ""
    },
    withCredentials: true
})