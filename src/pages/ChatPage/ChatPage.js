import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import questions from './questions'
import songs from './songs'
import axios from 'axios'
import './ChatPage.css'
import ReactScrollableFeed from 'react-scrollable-feed'
import Typing from './../../components/Typing/Typing';
import { motion } from 'framer-motion';
import Player from './../../components/Player/Player';
import ParticlesBackground from './../../components/Particles/ParticlesBackground';
import PlayerList from './../../components/Player/PlayerList/PlayerList';

const ChatPage = ({ variants, transition }) => {
    const [messages, setMessages] = useState([{ owner: false, text: questions[0].question }])
    const [botTyping, setBotTyping] = useState(false)
    const inputRef = useRef()
    const messagesEndRef = useRef()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [dataToSend, setDataToSend] = useState({})
    // const fields = ["gender", "Age", "course", "year", "CGPA_val", "Marital status"]
    const [end, setEnd] = useState(false)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1)


    const botMessage = async (newMessages, newQuestion) => {
        setBotTyping(true)
        setTimeout(() => {
            setBotTyping(false)
            if (newQuestion < questions.length) {
                setMessages([...newMessages, { owner: false, text: questions[newQuestion].question }])
                setCurrentQuestion(newQuestion)
            }
            else {
                setMessages([...newMessages, { owner: false, text: "Submit and see your results!" }])
                setCurrentQuestion(newQuestion)
            }
        }, 1000)
    }

    useEffect(() => {
        setNextSongIndex((currentSongIndex + 1) % songs.length)
    }, [currentSongIndex])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView()
    }, [messages, botTyping])

    const submitMessage = async (message) => {
        if (message.length === 0) return

        const newDataToSend = dataToSend
        setDataToSend(newDataToSend)

        // if (fields[currentQuestion] === "Age") newDataToSend[fields[currentQuestion]] = message
        // else {
        //     questions[currentQuestion].options.forEach((option) => {
        //         if (option === message) newDataToSend[option] = 1
        //         else newDataToSend[option] = 0
        //     })
        // }

        const newMessages = [...messages, { owner: true, text: message }]
        const newQuestion = currentQuestion + 1
        setMessages(newMessages)

        setTimeout(() => { botMessage(newMessages, newQuestion) }, 1000)
    }

    const sendData = async () => {
        setBotTyping(true)
        const { data } = await axios.post('https://mental-health-flask-server.herokuapp.com/predict', dataToSend)
        const newMessages = messages
        setTimeout(() => {
            setBotTyping(false)
            setMessages([...newMessages
                , { owner: false, text: `depression score ${parseInt(data.depression.toFixed(2) * 100)}` }
                , { owner: false, text: `anxiety score ${parseInt(data.anxiety.toFixed(2) * 100)}` }
                , { owner: false, text: `stress score ${parseInt(data.stress.toFixed(2) * 100)}` }])
        }, 1000)
        setEnd(true)

    }

    return (
        <motion.div
            className='chat-container'
            initial="out"
            animate="in"
            exit="out"
            variants={variants}
            transition={transition}>
            <ParticlesBackground />
            <div className="music-player-container">
                <Player
                    currentSongIndex={currentSongIndex}
                    setCurrentSongIndex={setCurrentSongIndex}
                    nextSongIndex={nextSongIndex}
                    songs={songs} />
            </div>
            <div className="music-player-list-container">
                <PlayerList
                    currentSongIndex={currentSongIndex}
                    setCurrentSongIndex={setCurrentSongIndex}
                    nextSongIndex={nextSongIndex}
                    songs={songs} />
            </div>

            <div className="chat-frame-container">
                <div className="chat-frame">
                    <div className="messages-container">
                        {messages.map((msg, index) => {
                            return (
                                <div className={`message-mega-container ${(msg.owner) ? 'owner-container' : ''}`} key={index}>
                                    {!msg.owner && <div className="bot-pic"><img src="./bot.gif" alt="" /></div>}
                                    <div className={`message-container ${(msg.owner) ? 'owner' : ''}`} >
                                        <p className='message-text'>{msg.text}</p>
                                    </div>
                                </div>)
                        })}
                        {botTyping && <div className="message-container">
                            <Typing />
                        </div>}
                        <div ref={messagesEndRef}></div>
                    </div>
                    {currentQuestion < questions.length ? questions[currentQuestion].type === "num" ?
                        <div className="input-container">
                            <input type={"number"} placeholder={questions[currentQuestion].placeholder} ref={inputRef} />
                            <button className='send-button' onClick={() => submitMessage(inputRef.current.value)}><FontAwesomeIcon icon={faPaperPlane} /></button>
                        </div> :
                        <div className="mcq-container">
                            {questions[currentQuestion].options.map((option, index) => {
                                return (
                                    <span
                                        key={index}
                                        className="option-container"
                                        onClick={() => {
                                            submitMessage(option)
                                        }}
                                    >{option}</span>
                                )
                            })}
                        </div> :
                        (end === false) && <div className="last-question">
                            <div className="mcq-container">
                                <span className='option-container' onClick={sendData}>Submit</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </motion.div>
    )
}

export default ChatPage