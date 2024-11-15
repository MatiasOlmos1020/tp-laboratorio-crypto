import axios from "axios"

const apiCrypto = axios.create({
    baseURL: "https://criptoya.com/api"
})

export const getCriptoValue = async (cryptoName, fiatValue) => {
    try {
        const response = await apiCrypto.get(`/binance/${cryptoName}/ars/${fiatValue}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const getCryptoValues = async (cryptoNames, fiatValue) => {
    const cryptoValues = {};

    try {
        const responses = await Promise.all(
            cryptoNames.map(async (crypto) => {
                const value = await getCriptoValue(crypto, fiatValue);
                return { crypto, value };
            })
        );
        responses.forEach(({ crypto, value }) => {
            cryptoValues[crypto] = parseFloat(value.price);
        });

        return cryptoValues;
    } catch (error) {
        return error.response;
    }
};