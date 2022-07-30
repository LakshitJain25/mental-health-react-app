import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import questions from './questions'
import axios from 'axios'
import './ChatPage.css'
import Typing from './../../components/Typing';
const ChatPage = () => {
    const [messages, setMessages] = useState([{ owner: false, text: questions[0].question }])
    const [botTyping, setBotTyping] = useState(false)
    const inputRef = useRef()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [dataToSend, setDataToSend] = useState({})
    const fields = ["gender", "Age", "course", "year", "CGPA_val", "Marital status"]
    const [end, setEnd] = useState(false)
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

    const submitMessage = async (message) => {
        if (message.length === 0) return

        const newDataToSend = dataToSend
        setDataToSend(newDataToSend)

        if (fields[currentQuestion] === "Age") newDataToSend[fields[currentQuestion]] = message
        else {
            questions[currentQuestion].options.forEach((option) => {
                if (option === message) newDataToSend[option] = 1
                else newDataToSend[option] = 0
            })
        }

        const newMessages = [...messages, { owner: true, text: message }]
        const newQuestion = currentQuestion + 1
        setMessages(newMessages)

        setTimeout(() => { botMessage(newMessages, newQuestion) }, 1000)
    }

    const sendData = async () => {
        const { data } = await axios.post('https://mental-health-flask-server.herokuapp.com/predict', dataToSend)
        const newMessages = messages

        setBotTyping(true)
        setTimeout(() => {
            setBotTyping(false)
            setMessages([...newMessages
                , { owner: false, text: `depression score ${data.depression.toFixed(2) * 100}` }
                , { owner: false, text: `anxiety score ${data.anxiety.toFixed(2) * 100}` }
                , { owner: false, text: `stress score ${data.stress.toFixed(2) * 100}` }])
        }, 1000)
        setEnd(true)

    }

    return (
        <div className='chat-container'>
            <div className="chat-frame">
                <div className="messages-container">
                    {messages.map((msg, index) => {
                        return (
                            <div className={`message-container ${(msg.owner) ? 'owner' : ''}`} key={index}>
                                <p className='message-text'>{msg.text}</p>
                            </div>)
                    })}
                    {botTyping && <div className="message-container">
                        <Typing />
                    </div>}
                </div>
                {currentQuestion < questions.length ? questions[currentQuestion].type === "num" ?
                    <div className="input-container">
                        <input type={"number"} placeholder='18 - 25' ref={inputRef}/>
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
    )
}

export default ChatPage