import { useEffect, useRef } from "react";

function Popup({ items, popup, setPopup }) {
    const body = document.querySelector("body");
	const vid = useRef(null);

    const targetItem = items[popup.index];
    const vidId = targetItem.snippet.resourceId.videoId;

    useEffect(()=> {
        //vid.current.playVideo();
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
                        <div className='record'></div>
                    </div>
                    <ul className="btns">
                        <li className="on"><a href="
                        #"><i className="fas fa-play"></i></a></li>
                        <li><a href="
                        #"><i className="fas fa-pause"></i></a></li>
                    </ul>
                </div>
                <div className="video">
                    <iframe ref={vid} src={`https://www.youtube.com/embed/${vidId}?autoplay=1&controls=0`/*&enablejsapi=1*/} width="100%" height="100%" allowFullScreen></iframe> 
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