import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
export const getTop10GroupA = () => {
    return axios.get(`${BASE_URL}/top10/group-a`);
};