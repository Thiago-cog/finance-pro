import axios from "axios";
const BASE_URL = "https://brapi.dev/api";
const token = "fsg3B6QgZs5DfEn86UYdgE";

class InvestmentsService {
    async getPriceByNameQuote(){

    }

    async getQuote(){
        try{
            const response = await axios.get(`${BASE_URL}/quote/KLBN11?token=${token}`);
            return response.data.results[0];
        }catch (error){
            return error.response;
        }
    }

    async getListQuote() {
        try{
            const response = await axios.get(`${BASE_URL}/quote/list?token=${token}&sortBy=market_cap_basic&sortOrder=desc&type=stock&limit=15`);
            return response.data.stocks;
        }catch (error){
            return error.response;
        }
    }
}

export default new InvestmentsService();