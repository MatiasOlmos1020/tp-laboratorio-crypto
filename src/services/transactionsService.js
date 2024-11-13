
import { apiClient } from "@/client";

export const createTransaction = async (data) => {
    try{
        const response = await apiClient.post(`/transactions`,data);
        return response.data;
    }catch (error){
        return error.response;
    }
};

export const editTransaction = async (data,id) => {
    try{
        
        console.log(data);
        const response = await apiClient.patch(`/transactions/${id}`,data);
        return response.data;
    }catch (error){
        return error.response;
    }
};

export const getTransactionById = async (id) => {
    try {
        const response = await apiClient.get(`/transactions/${id}`);

        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const getAllUserTransactions = async (userId) => {
    try{
        const response = await apiClient.get(`/transactions?q={"user_id":"${userId}"}`);
        return response.data;
    }catch (error){
        return error.response;
    }
}

export const deleteTransaction = async(id) => {
    try {
        const response = await apiClient.delete(`/transactions/${id}`)
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}