import axios from "axios";
const BASE_URL = "http://localhost:3001/user";
class AuthService {
    async decodeToken(token) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try{
            const response = await axios.get(`${BASE_URL}/decode-token`, config);
            return response.data;
        }catch (error){
            throw error;
        }
    }

    async login(email, password){
        try {
            const response = await axios.post(`${BASE_URL}/login`, { email, password });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async registerUser(email, password, fullname){
        try {
            const response = await axios.put(`${BASE_URL}/register`, { email, password, fullname });
            console.log(response);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthService();