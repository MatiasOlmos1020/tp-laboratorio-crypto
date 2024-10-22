import axios from "axios";

export const createTransaction = (data) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/portfolios`, data)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        })
};