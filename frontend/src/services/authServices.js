import axios from "axios";
// const BASE_URL = "https://finance-pro-auth-api.vercel.app/user";
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
            const response = await axios.post(`${BASE_URL}/register`, { email, password, fullname });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    async updateUser(email, password, fullname, phone, userId, token) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.put(`${BASE_URL}/update-user`, { email, password, fullname, phone, userId }, config);
        return response.data;
    }

    async getEmailByTokenConfirm(token) {
        try {
            const response = await axios.get(`${BASE_URL}/get-email-token?token=${token}`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    } 

    async confirmEmail(token) {
        try {
            const response = await axios.post(`${BASE_URL}/confirm-email-token?token=${token}`);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    async forgotPassword(email) {
        try {
            const response = await axios.post(`${BASE_URL}/forgot-password?email=${email}`);
            return response;
        } catch (error) {
            return error.response;
        }
    }
}

export default new AuthService();