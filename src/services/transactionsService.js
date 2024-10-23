import axios from "axios";

const apiClient = axios.create({
    baseURL:process.env.VUE_APP_LABO_3_API_URL,
    headers: {
        'x-apikey': `${process.env.VUE_APP_APIKEY}`
    }
})

export const createTransaction = async (data) => {
    try{
        const response = await apiClient.post(`/transactions`,data);
        return response.data;
    }catch (error){
        return error.response;
    }
};