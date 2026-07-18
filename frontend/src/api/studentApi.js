import axios from "axios";
const BASE_URL = "http://localhost:3000";
export const getStudentBySbd = (sbd) => {
    return axios.get(`${BASE_URL}/students/${sbd}`);
};