import axios from "axios";
import { useEffect, useState, useRef } from "react";

const publicURL = process.env.PUBLIC_URL;

function Visual() {
    const initVal = {
        type: "",
        ko: "",
        en: ""
    }
    const [ items, setItems ] = useState(initVal);
    const [ enableClick, setEnableClick ] = useState(true);

    const promptBox = useRef(null);

    useEffect(()=> {
        callData("Home");

    }, []);

    return(
        <main className="visual">
        <div className="wrap">
            <div className="title">
                <h1><span>Coding Blog</span></h1>
                <h2><span>초보 개발자의 우당탕탕 코딩 기록지</span></h2>
                <div className="computer">
                    <div className="pic">
                        <img src={`${process.env.PUBLIC_URL}/img/computer.png`} alt="computer" />
                        <a href='https://www.freepik.com/vectors/vintage'>Vintage vector created by macrovector - www.freepik.com</a>
                    </div>
                </div>
            </div>
            <div className="promptBox">   
                
                <div className="folderBox">
                    <div className="folders">
                        <section onClick={()=>{
                            callData("About");
                            }}>
                            <div className="folder">
                                <i className="fas fa-folder"></i>
                                <i className="fas fa-folder-open"></i>
                            </div>
                            <span>About</span>
                        </section>
                        <section onClick={()=>callData("Blog")}>
                            <div className="folder">
                                <i className="fas fa-folder"></i>
                                <i className="fas fa-folder-open"></i>
                            </div>
                            <span>Blog</span>
                        </section>
                        <section onClick={()=>callData("Gallery")}>
                            <div className="folder">
                                <i className="fas fa-folder"></i>
                                <i className="fas fa-folder-open"></i>
                            </div>
                            <span>Gallery</span>
                        </section>
                        <section onClick={()=>callData("Home")}>
                            <div className="folder">
                                <i className="fas fa-folder"></i>
                                <i className="fas fa-folder-open"></i>
                            </div>
                            <span>Home</span>
                        </section>
                        <section onClick={()=>callData("Playlist")}>
                            <div className="folder">
                                <i className="fas fa-folder"></i>
                                <i className="fas fa-folder-open"></i>
                            </div>
                            <span>Playlist</span>
                        </section>
                        <section onClick={()=>callData("Contact")}>
                            <div className="folder">
                                <i className="fas fa-folder"></i>
                                <i className="fas fa-folder-open"></i>
                            </div>
                            <span>Contact</span>
                        </section>
                        
                    </div>
                </div>
                <div className="prompt">
                    <div className="tab">
                        <p>COMMAND PROMPT</p>
                        <div className="icons">
                        <span>
                            <i className="far fa-window-minimize"></i>
                        </span>
                        <span>
                            <i className="far fa-square"></i>
                        </span>
                        <span>
                            <i className="fas fa-times"></i>
                        </span>
                        </div>
                    </div>
                    <div className="textBox">
                        <div ref={promptBox}>
                        <p className="ko">
                            {items.ko}
                        </p>
                        <p className="en">
                            {items.en}
                        </p>
                        {/* <span className="cursor on"></span> */}
                        </div>
                    </div>
                </div>

            </div>
            <div className="recent">
                <ul>
                <li><h3>Recent <a href="#">more</a></h3></li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                </ul>
            </div>
            <div className="popular">
                <ul>
                <li><h3>Popular<a href="#">more</a></h3></li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                </ul>
            </div>
        </div>
        </main>
    )

    async function callData(type) {
        
        setEnableClick(false);
        if(!enableClick) return;

        await axios
        .get(`${publicURL}/db/visual.json`)
        .then((json)=> {
            const txts = json.data.data;
            const data = txts.filter((txt, index)=> txt.type === type);
            const category = data[0].type;
            const enText = data[0].en.split("");
            const koText = data[0].ko.split("");

            
            let koStr = "";
            let enStr = "";
            const speed = 50;

            for(let i = 0; i<koText.length; i++) {
                (()=>{

                    setTimeout(()=> {
                        koStr += koText[i];

                        setItems({
                            type: category,
                            ko: koStr,
                            en: enStr
                        });

                        if(i===koText.length - 1) {
                            for(let k=0; k<enText.length; k++ ) {
                                (()=> {

                                    setTimeout(()=> {
                
                                        enStr += enText[k];
                                        setItems({
                                            type: category,
                                            ko: koStr,
                                            en: enStr
                                        })

                                        if(k===enText.length - 1) setEnableClick(true);
                                    }, speed * k)
                                })(k);
                            }
                        }
                    }, speed * i);
                    
                })(i);
            }

            //console.log(items);

        });
    }
}

export default Visual;