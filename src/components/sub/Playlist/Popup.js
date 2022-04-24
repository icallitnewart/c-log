import { useEffect, useState, useRef } from "react";

function Popup({ items, popup, setPopup }) {
    const body = document.querySelector("body");
    const [ play, setPlay ] = useState(null);

    const targetItem = items[popup.index];
    const vidId = targetItem.snippet.resourceId.videoId;
    const url = `https://www.youtube.com/embed/${vidId}?controls=0`;

    useEffect(()=> {
        body.style.overflow = "hidden";

        return ()=> {
            body.style.overflow = "auto";
        }
    }, []);

    return(
    <div className="popup">
        <div className="inner">
        <div className="wrap">
            <div className="tab">
                <span></span>
                <span></span>
                <span onClick={()=> setPopup({
                    isVisible: false,
                    index: null
                })}>x</span>
            </div>
            <div className="container">
                <div className="player">
                    <div className="vinyl">
                        <div className="record"></div>
                    </div>
                    <ul className="btns">
                        <li className={play ? "on" : ""}>
                            <a 
                                href="#"
                                onClick={(e)=> {
                                    e.preventDefault();
                                    setPlay(true);
                                }}
                                aria-label="Play"
                            >
                                <i className="fas fa-play"></i>
                            </a>
                        </li>
                        <li className={play===false ? "on" : ""}>
                            <a 
                                href="#"
                                onClick={(e)=> {
                                    e.preventDefault();
                                    setPlay(false);
                                }}
                                aria-label="Pause"
                            >
                                <i className="fas fa-pause"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="video">
                    <iframe 
                        src={play ? `${url}
                        &autoplay=1&mute=1` : url} 
                        width="100%" 
                        height="100%" allowFullScreen
                    ></iframe> 
                    <p>
                        <span>
                        <span className="highlight">{targetItem.snippet.title}</span>
                        </span>
                        <span>
                        <span className="highlight">{targetItem.snippet.title}</span>
                        </span>
                    </p>
                    <p><span>{targetItem.snippet.videoOwnerChannelTitle}</span></p>
                </div>
            </div>
        </div>
        </div>
    </div>
    )
}

export default Popup;