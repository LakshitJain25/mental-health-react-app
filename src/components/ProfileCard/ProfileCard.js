import React from 'react'
import './ProfileCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { motion } from 'framer-motion';
import ParticlesBackground from './../Particles/ParticlesBackground';
const ProfileCard = ({ data, index }) => {
    const variants = {
        hidden: {
            y: -10,
            opacity: 0
        },
        visible: {
            transition: {
                delay: 0.7 + (0.4 * index)
            },
            y: 0,
            opacity: 1
        }
    }
    return (
        <motion.div className='profile-card' variants={variants} initial="hidden" animate="visible">
            <h3 className='profile-name'>{data.name}</h3>
            <span className="profile-email">{data.email}</span>
            <span className="role">{data.role}</span>
            <div className="icons">
                <a className="github-icon" href={data.github}><FontAwesomeIcon icon={faGithub} /></a>
                <a className="linkedin-icon" href={data.linkedin}><FontAwesomeIcon icon={faLinkedin} /></a>
            </div>
        </motion.div>
    )
}

export default ProfileCard