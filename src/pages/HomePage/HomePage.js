import React from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom';
import Button from './../../components/Button/Button';
import ParticlesBackground from '../../components/Particles/ParticlesBackground';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
const HomePage = () => {


    const buttonVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }

    const innerButtonVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1
        }
    }

    return (
        <div className='homepage-container-background'>
            <ParticlesBackground />
            <div className='homepage-container'>
                <h1 className="heading-main">
                    "HAPPINESS CAN BE FOUND EVEN IN THE DARKEST OF TIMES, IF ONE ONLY REMEMBERS TO TURN ON THE LIGHT"
                    <span className='bulb'><FontAwesomeIcon icon={faLightbulb} /></span>
                </h1>
                <motion.div
                    className="buttons"
                    variants={buttonVariants}
                    animate="visible"
                    initial="hidden">
                    <motion.div
                        variants={innerButtonVariants}
                    ><Link to={"test"}><Button text="Self Test" click={null} /></Link></motion.div>
                    <motion.div
                        variants={innerButtonVariants}
                    >
                        <a href="https://github.com/LakshitJain25/mental-health-flask-server/blob/main/notebook/student_mental_health.ipynb" >
                            <Button text="Analytics" click={null} /></a>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    )
}

export default HomePage