import axios from "axios";
const BASE_URL = "http://localhost:3001";

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
}


export default new AccountsService();