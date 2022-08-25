import React from 'react'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import './ContactUs.css'
import { motion } from 'framer-motion';
import ParticlesBackground from './../../components/Particles/ParticlesBackground';
const ContactUs = ({ variants, transition }) => {
    const team = [

        {
            name: "Vaibhavi",
            email: "vaibhavikamble2915@gmail.com",
            role: "ML engineer",
            github: "https://www.linkedin.com/in/vaibhavi-kamble-b33364204/",
            linkedin: "https://www.linkedin.com/in/vaibhavi-kamble-b33364204/"
        },
        {
            name: "Vidhi Khubchandani",
            email: "khubchandanividhi613@gmail.com",
            role: "backend developer",
            github: "https://www.linkedin.com/in/vidhi-khubchandani-133646202/",
            linkedin: "https://www.linkedin.com/in/vidhi-khubchandani-133646202/"
        },
        {
            name: "Lakshit Jain",
            email: "lakshitjainprof@gmail.com",
            role: "website developer",
            github: "https://github.com/LakshitJain25",
            linkedin: "https://www.linkedin.com/in/lakshit-jain-2bb2a4220/"
        },
        {
            name: "Anmol Wadhwa",
            email: "anmol.wri@gmail.com",
            role: "website designer",
            github: "https://github.com/anmolwadhwaxx",
            linkedin: "https://www.linkedin.com/in/anmol-wadhwa/"
        },

    ]
    return (
        <motion.div
            initial="out"
            animate="in"
            exit="out"
            variants={variants}
            transition={transition}
            className='profile-container'>
            <ParticlesBackground density={40} />
            <h2 className="profile-heading">Meet Our Team</h2>
            <div className="profile-cards">
                {team.map((member, index) => {
                    return (
                        <ProfileCard data={member} key={index} index={index} />
                    )

                })}
            </div>
        </motion.div>
    )
}

export default ContactUs