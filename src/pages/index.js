import axios from "axios";
import styles from '@/styles/Home.module.css'
import classNames from "classnames";
import {useEffect, useRef, useState} from "react";
import {ClipLoader} from "react-spinners";

export default function Home() {
    const [areqmineCount, setAreqmineCount] = useState(3)
    const [alcotecmainCount, setAlcotecmainCount] = useState(30)
    const [alcotecs19proCount, setAlcotecs19proCount] = useState(82)

    const timer = useRef();
    const [started, setStarted] = useState(false)
    const [loading, setLoading] = useState({
        areqmine: false,
        alcotecmain: false,
        alcotecs19pro: false
    })
    const [error, setError] = useState(null)
    const [seconds, setSeconds] = useState(5)
    const [areqmine, setAreqmine] = useState(null)
    const [alcotecmain, setAlcotecmain] = useState(null)
    const [alcotecs19pro, setAlcotecs19pro] = useState(null)

    const handleStart = () => {
        setStarted(prev => !prev)
    }

    const getAreqmine = async () => {
        if (!loading.areqmine) {
            try {
                setLoading(prev => ({
                    ...prev,
                    areqmine: true
                }))
                const response = await axios.get('api/areqmine');
                const data = response.data;
                const audio = new Audio('/massage.mp3');
                audio.loop = false;
                if (data?.['worker_length_online'] < areqmineCount) {
                    audio.play()
                } else {
                    audio.pause();
                }

                setAreqmine(data)
                setLoading(prev => ({
                    ...prev,
                    areqmine: false
                }))
            } catch (e) {
                console.log(e)
                setLoading(prev => ({
                    ...prev,
                    areqmine: false
                }))
            }
        }
    }

    const getAlcotecmain = async () => {
        if (!loading.alcotecmain) {
            try {
                setLoading(prev => ({
                    ...prev,
                    alcotecmain: true
                }))
                const response = await axios.get('api/alcotecmain');
                const data = response.data;
                const audio = new Audio('/massage.mp3');
                audio.loop = false;
                if (data?.['worker_length_online'] < alcotecmainCount) {
                    audio.play()
                } else {
                    audio.pause();
                }

                setAlcotecmain(data)
                setLoading(prev => ({
                    ...prev,
                    alcotecmain: false
                }))
            } catch (e) {
                console.log(e)
                setLoading(prev => ({
                    ...prev,
                    alcotecmain: false
                }))
            }
        }
    }

    const getAlcotecs19pro = async () => {
        if (!loading.alcotecs19pro) {
            try {
                setLoading(prev => ({
                    ...prev,
                    alcotecs19pro: true
                }))
                const response = await axios.get('api/alcotecs19pro');
                const data = response.data;
                const audio = new Audio('/massage.mp3');
                audio.loop = false;
                if (data?.['worker_length_online'] < alcotecs19proCount) {
                    audio.play()
                } else {
                    audio.pause();
                }

                setAlcotecs19pro(data)
                setLoading(prev => ({
                    ...prev,
                    alcotecs19pro: false
                }))
            } catch (e) {
                console.log(e)
                setLoading(prev => ({
                    ...prev,
                    alcotecs19pro: false
                }))
            }
        }
    }

    const fetchData = () => {
        getAreqmine().catch(null)
        getAlcotecmain().catch(null)
        getAlcotecs19pro().catch(null)
    }

    const onInputHandlers = (e) => {
        const {name, value} = e.target || {}
        if (name === 'areqmineCount') {
            setAreqmineCount(value)
        } else if (name === 'alcotecmainCount') {
            setAlcotecmainCount(value)
        } else if (name === 'alcotecs19proCount') {
            setAlcotecs19proCount(value)
        }
    }

    useEffect(() => {
        if (started) {
            fetchData();
            clearInterval(timer.current)
            timer.current = setInterval(() => {
                fetchData();
            }, seconds * 1000)
        } else {
            clearInterval(timer.current)
        }

        return () => {
            clearInterval(timer.current)
        }
    }, [started])

    return (
        <>
            <main className={styles.main}>
                {error &&
                    <div className={styles.errorCard}>
                        {error}
                    </div>
                }

                <div className={styles.actions}>
                    <button onClick={handleStart} className={styles.button}>{started ? 'Stop' : 'Start'}</button>
                    <input className={styles.input} type="number" disabled={started} value={seconds}
                           onChange={e => setSeconds(+e.currentTarget.value)}/>
                </div>
                <div className={styles.list}>
                    <div className={styles.cardWrapper}>
                        <div
                            className={classNames([styles.card, {[styles.error]: areqmine?.['worker_length_online'] < areqmineCount}])}>
                            <div className={styles.info}>
                                areqmine{' '}={' '}
                                <code className={styles.code}>{areqmine?.['worker_length_online']}</code>
                            </div>
                            <div className={styles.loader}>
                                <ClipLoader color={'#2c78f6'} loading={loading.areqmine} size={24}/>
                            </div>
                        </div>
                        <input
                            disabled={started}
                            type={'number'}
                            name={'areqmineCount'}
                            value={areqmineCount}
                            onChange={onInputHandlers}/>
                    </div>
                    <div className={styles.cardWrapper}>
                        <div
                            className={classNames([styles.card, {[styles.error]: alcotecmain?.['worker_length_online'] < alcotecmainCount}])}>
                            <div className={styles.info}>
                                alcotecmain{' '}={' '}
                                <code className={styles.code}>{alcotecmain?.['worker_length_online']}</code>
                            </div>
                            <div className={styles.loader}>
                                <ClipLoader color={'#2c78f6'} loading={loading.alcotecmain} size={24}/>
                            </div>
                        </div>
                        <input
                            disabled={started}
                            value={alcotecmainCount}
                            type={'number'}
                            name={'alcotecmainCount'}
                            onChange={onInputHandlers}
                        />
                    </div>
                    <div className={styles.cardWrapper}>
                        <div
                            className={classNames([styles.card, {[styles.error]: alcotecs19pro?.['worker_length_online'] < alcotecs19proCount}])}>
                            <div className={styles.info}>
                                alcotecs19pro{' '}={' '}
                                <code className={styles.code}>{alcotecs19pro?.['worker_length_online']}</code>
                            </div>
                            <div className={styles.loader}>
                                <ClipLoader color={'#2c78f6'} loading={loading.alcotecs19pro} size={24}/>
                            </div>
                        </div>
                        <input
                            disabled={started}
                            type={'number'}
                            value={alcotecs19proCount}
                            name={'alcotecs19proCount'}
                            onChange={onInputHandlers}
                        />
                    </div>
                </div>
            </main>
        </>
    )
}
