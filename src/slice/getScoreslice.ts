import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store/store';
import { ScoreCalculateLog } from '../logic/calculate';

export interface ScoreLate {
  value: number;
  playRate: number;
  songRate: number;
  score: number;
  song: string;
  difficulty: string;
  status: 'idle' | 'loading' | 'failed';
}

//楽曲のレート検索(現時点では返却は固定値)
const initialState: ScoreLate = {
  value: 0,
  songRate: 0,
  playRate: 0,
  score: 0,
  song: "aa",   
  difficulty: "MASTER",
  status: 'idle',
};
export const getSongRate = createAsyncThunk<
//戻り値
{
  songRate:number
},
//引数
{
  songName: string;
  difficulty: string;
},
{
  rejectValue:{
    errMsg: string;
  };
}
>('getSongRate', async(args,thunkApi) =>{
  try {
    const response = await ScoreCalculateLog.getSongRate(args.songName);
    return {songRate: response}
  }catch{
    return thunkApi.rejectWithValue({
      errMsg: "エラー文章",
    });
  }
}
);

//レーティング計算
export const rateCalculate =createAsyncThunk<
//戻り値
{
  playRate: number;
},
//引数
{
  score : number;
  songRate: number;
},
{
  rejectValue:{
    errMsg:string;
  };
}
>('rateCalculate', async(args,thunkApi) =>{
  try{
    const response = await ScoreCalculateLog.rateCalculate(args.score,args.songRate);
    return {playRate: response};
  }catch{
    return thunkApi.rejectWithValue({
      errMsg: "エラー文章",
    });
  }
});


export const calculate = createSlice({
  name: 'calculate' ,
  initialState,
  reducers:{
    clearSearchState(state){
      state.value = 0;
      state.songRate = 0;
      state.score = 0;
      state.song = "";
      state.difficulty = "MASTER";
    },
    setSongRate(state,action){
      state.songRate = action.payload;
    },
    setSong(state,action){
      state.songRate = action.payload;
    },
    setPlayRate(state,action){
      state.playRate =action.payload;
    }
  },
  extraReducers:(builder) => {
    builder.addCase(getSongRate.fulfilled,(state ,action) => {
      state.songRate = action.payload.songRate;
    });
    builder.addCase(rateCalculate.fulfilled,(state, action) =>{
      state.playRate = action.payload.playRate;
    });
  }
})
export const{clearSearchState, setSongRate, setSong, setPlayRate} =calculate.actions;

export default calculate.reducer;