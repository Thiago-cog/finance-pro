import axios from "axios";
const BASE_URL = "http://localhost:3001";
class AuthService {
    async login(email, password){
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthService();