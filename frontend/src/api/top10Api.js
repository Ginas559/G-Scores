import axios from "axios";
const BASE_URL = "http://localhost:3000";
export const getTop10GroupA = () => {
    return axios.get(`${BASE_URL}/top10/group-a`);
};