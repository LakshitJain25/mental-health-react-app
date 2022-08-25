import React, { useEffect, useState } from 'react'
import './Analytics.css'
import { UserData } from './Data';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import ParticlesBackground from './../../components/Particles/ParticlesBackground';
import BarChart from '../BarChart/BarChart';
const Analytics = ({ variants, transition }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('response')) {
            return navigate('/test')
        }
    }, [navigate])

    const [userData, setUserData] = useState(() => {
        return {
            labels: UserData.map((data) => data.title),
            datasets: [
                {
                    label: "Average",
                    data: UserData.map((data) => data.average),
                    borderColor: 'rgb(255, 255, 255)',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',

                },
                {
                    label: "Your Response",
                    data: (!localStorage.getItem('response')) ? null : [
                        parseFloat(JSON.parse(localStorage.getItem('response'))["free_time"]),
                        parseFloat(JSON.parse(localStorage.getItem('response'))["games_OTT_platforms"]),
                        parseFloat(JSON.parse(localStorage.getItem('response'))["social_media"])
                    ],
                    borderColor: 'rgba(0, 255, 2,0.7)',
                    backgroundColor: 'rgba(0, 255, 2, 0.2)',
                }
            ]
        }
    })
    return (
        <motion.div
            initial="out"
            animate="in"
            exit="out"
            variants={variants}
            transition={transition}
            className='analytics-container'>
            <ParticlesBackground density={30} />
            {/* <button onClick={() => console.log(response)}>c</button> */}
            <div className="graphs">
                <BarChart chartData={userData} />
            </div>
            <Link to="/results" style={{ color: "white", textDecoration: "none" }}>
                <div className="results-btn">
                    <span><FontAwesomeIcon icon={faPlay} /></span>
                    <p>Results</p>
                </div>
            </Link>
        </motion.div>
    )
}

export default Analytics