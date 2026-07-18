import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
export const getStudentBySbd = (sbd) => {
    return axios.get(`${BASE_URL}/students/${sbd}`);
};