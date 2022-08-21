import React from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom';
import Button from './../../components/Button/Button';
import ParticlesBackground from '../../components/Particles/ParticlesBackground';
const HomePage = () => {
    return (
        <div className='homepage-container-background'>
            <ParticlesBackground />
            <div className='homepage-container'>
                <h1 className="heading-main">
                    "HAPPINESS CAN BE FOUND EVEN IN THE DARKEST OF TIMES, IF ONE ONLY REMEMBERS TO TURN ON THE LIGHT"
                </h1>
                <div className="buttons">
                    <Link to={"test"}><Button text="Self Test" click={null} /></Link>
                    <a href="https://github.com/LakshitJain25/mental-health-flask-server/blob/main/notebook/student_mental_health.ipynb" >
                        <Button text="Analytics" click={null} /></a>
                </div>
            </div>
        </div>
    )
}

export default HomePage