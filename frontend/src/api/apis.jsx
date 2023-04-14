import axios from 'axios'


const getApi = async (url) => {
    const result = await axios.get(`http://localhost:3001${url}`);
    return result
}

const postApi = async (url, obj, timeout) => {
    const result = await axios.post(`http://localhost:3001${url}`, obj, timeout);
    return result
}

const putApi = async (url, obj) => {
    const result = await axios.put(`http://localhost:3001${url}`, obj);
    return result
}

export { getApi, postApi, putApi }