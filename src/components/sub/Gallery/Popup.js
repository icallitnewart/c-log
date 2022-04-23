import { useEffect } from "react";

function Popup({ images, popup, setPopup }) {
    const body = document.querySelector("body");
    const targetImg = images[popup.index];
    const imgSrc = `https://live.staticflickr.com/${targetImg.server}/${targetImg.id}_${targetImg.secret}_b.jpg`;

    useEffect(()=> {
        body.style.overflow = "hidden";

        return ()=> {
            body.style.overflow = "auto";
        };
    }, []);

    return (
        <aside className="popup">
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
                <div className="imgBox">
                    <h1>{targetImg.title}</h1>
                    <img src={imgSrc} alt={targetImg.title} />
                </div>
            </div>
            </div>
        </aside>
    )
}

export default Popup;