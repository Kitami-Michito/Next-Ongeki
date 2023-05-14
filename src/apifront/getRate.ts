import axios from "axios";

export const getRateApi ={
    async getFumenRate(fumenName: string ): Promise<number> {

        const response = await axios.get("http://localhost:3000/api/getRate");
        return response.data.songRate;
    }
}