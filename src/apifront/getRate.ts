import axios from "axios";

export const getRateApi = {
  async getFumenRate(fumenName: string): Promise<number> {
    const response = await axios.get("/api/getRate", {
      params: { name: fumenName },
    });
    return response.data.songRate;
  },
};
