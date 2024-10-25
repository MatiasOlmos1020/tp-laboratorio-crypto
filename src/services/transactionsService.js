
import { apiClient } from "@/client";

export const createTransaction = async (data) => {
    try{
        const response = await apiClient.post(`/transactions`,data);
        return response.data;
    }catch (error){
        return error.response;
    }
};

export const getAllUserTransactions = async (userId) => {
    try{
        const response = await apiClient.get(`/transactions?q={"user_id":"${userId}"}`);
        return response.data;
    }catch (error){
        return error.response;
    }
}