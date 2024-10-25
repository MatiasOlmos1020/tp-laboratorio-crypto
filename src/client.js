import axios from "axios";


export const apiClient = axios.create({
    baseURL:process.env.VUE_APP_LABO_3_API_URL,
    headers: {
        'x-apikey': `${process.env.VUE_APP_APIKEY}`
    }
})
