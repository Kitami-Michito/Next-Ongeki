import { getRateApi } from "../apifront/getRate";

export const ScoreCalculateLog = {
    // 楽曲レート取得(DBから取得したい)
    async getSongRate(songName : string): Promise<number>{
        return getRateApi.getFumenRate(songName);
    },
    //楽曲レート取得(DBから取得したい)
    async getSongLateFromDB(): Promise<number>{
        return 14.1;
    },
    //楽曲レート計算
    async rateCalculate(score: number, songRate: number): Promise<number> {
        if(score >=1007500){
            return songRate+2;
        }else if(score >=1000000){
            return songRate+1.5+(score - 1000000)/15000;
        }else if(score >=990000){
            return songRate+1+(score - 1000000)/20000;
        }else if(score >=970000){
            return songRate+(score - 970000)/20000;
        }else if(score >=900000){
            return songRate - (970000 - score)/17500;
        }
        //スコア90万以下の場合0を返す
        return 0;
    }
}