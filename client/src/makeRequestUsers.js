import axios from "axios";

export const makeRequestUsers = axios.create({
    baseURL: process.env.REACT_APP_UPLOAD_URL,
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
    },
});