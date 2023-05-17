import axios from "axios";
import styles from '@/styles/Home.module.css'
import {useEffect, useRef, useState} from "react";

export default function Home() {
    const timer = useRef();
    const [started, setStarted] = useState(false)
    const [areqmine, setAreqmine] = useState(null)
    const [alcotecmain, setAlcotecmain] = useState(null)
    const [alcotecs19pro, setAlcotecs19pro] = useState(null)

    const handleStart = () => {
        setStarted(prev => !prev)
    }

    const getAreqmine = async () => {
        try {
            const response = await axios.get('api/areqmine');
            const data = response.data;
            const audio = new Audio('/massage.mp3');
            audio.loop = false;
            if (data?.['worker_length_online'] < 3) {
                audio.play()
            } else {
                audio.pause();
            }

            setAreqmine(data)
        } catch (e) {
            console.log(e)
        }
    }

    const getAlcotecmain = async () => {
        const response = await axios.get('api/alcotecmain');
        const data = response.data;
        const audio = new Audio('/massage.mp3');
        audio.loop = false;
        if (data?.['worker_length_online'] < 30) {
            audio.play()
        } else {
            audio.pause();
        }

        setAlcotecmain(data)
    }

    const getAlcotecs19pro = async () => {
        const response = await axios.get('api/alcotecs19pro');
        const data = response.data;
        const audio = new Audio('/massage.mp3');
        audio.loop = false;
        if (data?.['worker_length_online'] < 82) {
            audio.play()
        } else {
            audio.pause();
        }

        setAlcotecs19pro(data)
    }

    const fetchData = () => {
        getAreqmine().catch(null)
        getAlcotecmain().catch(null)
        getAlcotecs19pro().catch(null)
    }

    useEffect(() => {
        if (started) {
            fetchData();
            clearInterval(timer.current)
            timer.current = setInterval(() => {
                fetchData();
            }, 5000)
        } else {
            clearInterval(timer.current)
        }
    }, [started])

    return (
        <>
            <main className={styles.main}>
                <button onClick={handleStart} className={styles.button}>{started ? 'Stop' : 'Start'}</button>
                <div className={styles.list}>
                    <div className={styles.card}>
                        <div className={styles.infoLeft}>
                            areqmine{' '}={' '}
                            <code className={styles.code}>{areqmine?.['worker_length_online']}</code>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.infoLeft}>
                            alcotecmain{' '}={' '}
                            <code className={styles.code}>{alcotecmain?.['worker_length_online']}</code>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.infoLeft}>
                            alcotecs19pro{' '}={' '}
                            <code className={styles.code}>{alcotecs19pro?.['worker_length_online']}</code>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
