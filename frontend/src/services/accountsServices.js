import axios from "axios";
const BASE_URL = "http://localhost:3002/account";

class AccountsService {
    async createAccount(token, name, typeaccount, balance, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.post(`${BASE_URL}/create-accounts`, { name, typeaccount, balance, userId }, config);
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
            const response = await axios.get(`${BASE_URL}/get-accounts/${userId}`, config);
            return response.data;
        }catch (error){
            throw error;
        }
    }

    async createCard(token, accountsId, numberCard, dueDay, limitCard, value) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.post(`${BASE_URL}/create-card`, { accountsId, numberCard, dueDay, limitCard, value }, config);
            return response.data;
        }catch (error){
            throw error;
        }
    }

    async getCards (token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        
        try{
            const response = await axios.get(`${BASE_URL}/get-card/${userId}`, config);
            return response.data;
        }catch (error){
            throw error;
        }
    }
}


export default new AccountsService();