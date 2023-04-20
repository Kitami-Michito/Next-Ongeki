import axios from "axios";

export const getRateApi ={
    async getFumenRate(fumenName: string ): Promise<number> {

        const response = await axios.get("https://nvpfae6628.execute-api.us-east-2.amazonaws.com/dev/rategetemer");
        return response.data.songRate;
    }
}