import styles from '../styles/Counter.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getSongRate, rateCalculate } from '@/slice/getScoreslice';
import { useAppDispatch } from '@/store/hooks';

export default function FirstPost() {
    const dispatch = useAppDispatch();
    const [score ,setScore] = useState(1010000);
    const [songName, setSongName] = useState('Äventyr');
    const songRate = useSelector((state: RootState) => state.calculate.songRate);
    const playRate  = useSelector((state: RootState) => state.calculate.playRate);
    
    return (
        <div>
            <h1>First Post</h1>
            <div className={styles.row}>
                譜面名入力欄
                 <input
                    type="string"
                    className={styles.textbox}
                    aria-label="setSongName"
                    value={songName}
                    onChange={(e: any) => setSongName(e.target.value)} />
                スコア入力欄
                <input
                    type="number"
                    className={styles.textbox}
                    aria-label="setScore"
                    value={score}
                    onChange={(e: any) => setScore(e.target.value)} />
                <button
                    className={styles.button}
                    onClick={() => dispatch(getSongRate({ songName, difficulty: 'a' }))}
                >
                    楽曲Rate取得
                </button>
                <button
                    className={styles.button}
                    onClick={() => dispatch(rateCalculate({ score, songRate }))}
                >
                    レート計算
                </button>
                <span className={styles.value}>{songRate}</span>
                <span className={styles.value}>{playRate}</span>
            </div>
        </div>
    );
  }