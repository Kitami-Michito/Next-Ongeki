import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from '../features/counter/counterSlice';
import{clearSearchState, setSongRate, setSong, setPlayRate, getSongRate, rateCalculate} from '../slice/getScoreslice';
import styles from '../styles/Counter.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


export default function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const [score ,setScore] = useState(1010000);

  const incrementValue = Number(incrementAmount) || 0;
  const song = useSelector((state: RootState) => state.calculate.song);
  const songRate = useSelector((state: RootState) => state.calculate.songRate);
  const playRate  = useSelector((state: RootState) => state.calculate.playRate);

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set fumen-level"
          value={playRate}
          onChange={(e) => dispatch(setPlayRate(e.target.value))}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(setSong(playRate))}
        >
          GET譜面定数
        </button>
        <span className={styles.value}>{playRate}</span>
        <span className={styles.value}>{song}</span>
        <button
          className={styles.button}
          onClick={() => dispatch(clearSearchState())}
        >
          削除
        </button> 
      </div>
      <div className={styles.row}>
        スコア入力欄
        <input
          type="number"
          className={styles.textbox}
          aria-label="setScore"
          value={score}
          onChange={(e: any) => setScore(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(getSongRate({songName:'a',difficulty:'a'}))}
        >
          楽曲Rate取得
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(rateCalculate({score,songRate}))}
        >
          レート計算
        </button>
        <span className={styles.value}>{songRate}</span>
        <span className={styles.value}>{playRate}</span>
      </div>
    </div>
  );
}
