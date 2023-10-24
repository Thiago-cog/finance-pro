import axios from "axios";
const BASE_URL = "http://localhost:3002";

class AccountsService {
    async createAccount(token, name, typeaccount, balance, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.post(`${BASE_URL}/accounts/create-accounts`, { name, typeaccount, balance, userId }, config);
            return response.data;
        }catch (error){
            throw error;
        }
    }

    async getAccounts (token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        
        try{
            const response = await axios.get(`${BASE_URL}/accounts/get-accounts/${userId}`, config);
            return response.data;
        }catch (error){
            throw error;
        }
    }
}


export default new AccountsService();