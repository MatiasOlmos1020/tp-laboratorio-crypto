import axios from "axios"

const apiCrypto = axios.create({
    baseURL:"https://criptoya.com/api"
})

export const getCriptoValue = async (cryptoName,fiatValue) => {
    try{
        const response = await apiCrypto.get(`/binance/${cryptoName}/ars/${fiatValue}`);
        return response.data;
    }catch (error){
        return error.response;
    }
};