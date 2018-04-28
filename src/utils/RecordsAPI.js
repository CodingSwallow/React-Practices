import axios from 'axios';
const api = process.env.REACT_APP_RECORDS_API_URL || "https://5ae3f89a34b5970014d2ee67.mockapi.io";
export const getAll = () =>
    axios.get(`${api}/api/v1/records`)