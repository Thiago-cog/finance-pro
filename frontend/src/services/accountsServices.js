import axios from "axios";
const BASE_URL = "http://18.236.70.29:3002/account";

class AccountsService {
    async createAccount(token, name, typeaccount, balance, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.post(`${BASE_URL}/create-accounts`, { name, typeaccount, balance, userId }, config);
            return response;
        }catch (error){
            return error.response;
        }
    }

    async getAccounts(token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        
        try{
            const response = await axios.get(`${BASE_URL}/get-accounts/${userId}`, config);
            return response;
        }catch (error){
            return error.response;
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
            return response;
        }catch (error){
            return error.response;
        }
    }

    async getCards(token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.get(`${BASE_URL}/get-card/${userId}`, config);
            return response;
        }catch (error){
            return error.response;
        }
    }
    
    async getAllStatus(token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.get(`${BASE_URL}/get-all-status/${userId}`, config);
            return response;
        }catch (error){
            return error.response;
        }
    }

    async getCategories(token) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.get(`${BASE_URL}/get-categories`, config);
            return response;
        }catch (error){
            return error.response;
        }
    }

    async createMovement(token, movementData) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            let response = {};
            if(movementData.activeTab === 'extract'){
                response = await axios.post(`${BASE_URL}/create-movement-extract`, movementData, config);
            }else {
                response = await axios.post(`${BASE_URL}/create-movement-invoice`, movementData, config);
            }
            return response;
        }catch (error){
            return error.response;
        }
    }

    async getAllMoviments(token, userId) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const response = await axios.get(`${BASE_URL}/get-all-moviments/${userId}`, config);
            return response;
        }catch (error){
            return error.response;
        }
    }
}


export default new AccountsService();