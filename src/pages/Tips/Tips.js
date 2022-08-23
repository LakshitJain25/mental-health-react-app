import React from 'react'
import TipCard from '../../components/TipCard/TipCard'
import './Tips.css'
import tips from './tipsData'
import { motion } from 'framer-motion';
import ParticlesBackground from './../../components/Particles/ParticlesBackground';
const Tips = ({ variants, transition }) => {


    return (
        <motion.div
            initial="out"
            animate="in"
            exit="out"
            variants={variants}
            transition={transition}
            className='tips-mega-container'>
            <div className="yoga-container">
                <ParticlesBackground density={100} />
                <img src={"./images/svgs/yoga.svg"} alt="" />
            </div>
            <div className="tips-container">
                {tips.map((tip, index) => {
                    return (
                        <TipCard key={index} text={tip} index={index} />
                    )
                })}
            </div>
        </motion.div>
    )
}

export default Tips