import axios from "axios";
const BASE_URL = "http://localhost:3001";
class AuthService {
    async registerUser(email, password, fullname){
        try {
            const response = await axios.post(`${BASE_URL}/users/create`, { email, password, fullname });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthService();