import axios from "axios";

const apiClient = axios.create({
    baseURL:process.env.VUE_APP_LABO_3_API_URL,
    headers: {
        'x-apikey': `${process.env.VUE_APP_APIKEY}`
    }
})

export const createTransaction = async (data) => {
    try{
        console.log(data);
        const response = await apiClient.post('/transactions',data);
        return response.data;
    }catch (error){
        console.log(data);
        console.error('error en la creacion de la transaccion: ', error);
        return error.response;
    }
};