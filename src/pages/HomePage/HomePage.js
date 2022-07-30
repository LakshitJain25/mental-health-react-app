import React from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom';
const HomePage = () => {
    return (
        <div className='homepage-container'>
            <div className="info-side">
                <h1 className='heading'>HAPPIFY</h1>
                <p className="subtitle">A platform for the indian demographic catering to the emotional needs of students</p>
                <div className="buttons">
                    <Link to="/test"><button className='info-btn'>Self Test</button></Link>
                    <a href="https://github.com/LakshitJain25/mental-health-flask-server/blob/main/notebook/student_mental_health.ipynb" ><button className='info-btn'>Analytics</button></a>
                </div>
            </div>
            <div className="image-side">
                <img src="images/homepage/3.svg" alt="" />
            </div>
        </div>
    )
}

export default HomePage