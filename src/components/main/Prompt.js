import axios from "axios";
import { useEffect, useState, useRef } from "react";

const publicURL = process.env.PUBLIC_URL;

function Prompt() {
    const initVal = {
        type: "",
        ko: "",
        en: ""
    }
    const [ items, setItems ] = useState(initVal);
    const [ enableClick, setEnableClick ] = useState(true);
    const promptBox = useRef(null);

    const folders = [ "Home", "About", "Blog", "Gallery", "Playlist", "Contact" ];

    useEffect(()=> {
        callPromptData("Home");
    }, []);

    return (
        <div className="promptBox">               
            <div className="folderBox">
                <div className="tab"></div>
                <div className="folders">
                    {folders.map((folder, index)=> 
                        <section 
                            key={index} 
                            onClick={()=>{
                                callPromptData(folder);
                            }}
                        >
                            <div className="folder">
                                <i className="fas fa-folder"></i>
                                <i className="fas fa-folder-open"></i>
                            </div>
                            <span>{folder}</span>
                        </section>
                    )}
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
    )

    async function callPromptData(type) {
        
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

export default Prompt;