import axios from "axios";
const BASE_URL = "http://18.236.70.29:3001/user";
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
            return error.response;
        }
    }

    async login(email, password){
        try {
            const response = await axios.post(`${BASE_URL}/login`, { email, password });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    async registerUser(email, password, fullname){
        try {
            const response = await axios.put(`${BASE_URL}/register`, { email, password, fullname });
            return response;
        } catch (error) {
            return error.response;
        }
    }
}

export default new AuthService();