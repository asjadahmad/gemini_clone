import React, { useContext, useEffect, useRef, useState } from 'react';
import './Main.css';
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/Context.jsx";

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const resultRef = useRef(null);
    const suggestions = [
        "What are some must-visit destinations in Europe?",
        "Can you summarize the benefits of React JS for web development?",
        "What are some creative ideas for a weekend getaway?",
        "How does artificial intelligence impact modern businesses?"
    ];

    const [rows, setRows] = useState(1);

    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth <= 600) {
                setRows(2);
            } else {
                setRows(1);
            }
        };

        updateRows();
        window.addEventListener('resize', updateRows);
        return () => window.removeEventListener('resize', updateRows);
    }, []);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [resultData]);

    return (
        <main className="main">
            <nav className="nav">
                <p>Gemini</p>
                {/* <img src={assets.user_icon} alt="" /> */}
            </nav>
            <div className="main-container">

                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, ASJAD</span></p>
                        </div>
                        <div>

                            <p className='suggestion-text'>Some suggestions from our end</p>
                            <div className="cards">
                                {suggestions && suggestions.map((suggestion, i) => {
                                    return <div className="card"
                                        onClick={() => setInput(suggestion)}>
                                        <p>{suggestion}</p>
                                        <img src={assets.arrow_up_right} alt="" />
                                    </div>
                                })}
                                
                            </div>
                        </div>
                    </>
                    :
                    <div className='result' ref={resultRef}>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img className="result-data-icon" src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                    <button className='footer-btn'><img src={assets.gallery_icon} alt="" /></button>
                        <textarea rows={rows} onChange={(e) => setInput(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    onSent();
                                }
                            }}
                            value={input}
                            type="text"
                            placeholder="Enter a prompt here"
                        />
                        <div className="icon-container">
                            
                            {/* <button><img src={assets.mic_icon} alt="" /></button> */}
                            <button className='footer-btn' type="submit" onClick={() => onSent()}><img src={assets.send_icon} alt="" /></button>
                        </div>
                    </div>
                   
                </div>
            </div>
        </main>
    );
}

export default Main;
