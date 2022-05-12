import axios from "axios";
import { useEffect, useState } from "react";

const publicURL = process.env.PUBLIC_URL;

function Prompt() {
    const initVal = {
        type: "",
        ko: "",
        en: ""
    }
    const [ data, setData ] = useState([]);
    const [ txt, setTxt ] = useState(initVal);
    const [ type, setType ] = useState("Home");
    const [ targetItem, setTargetItem ] = useState({}); 
    const [ count, setCount ] = useState({ ko : 0, en : 0});
    const [ cursor, setCursor ] = useState(false);

    const folders = [ "Home", "About", "Blog", "Gallery", "Playlist", "Contact" ];

    //데이터 호출 함수
    const callData = async()=> {
        await axios
        .get(`${publicURL}/db/visual.json`)
        .catch((error)=> console.error(error))
        .then((json)=> {
            const response = json.data.data;
            setData(response);
        });
    };

    //1. 데이터 호출 후 상태 관리
    useEffect(()=> {
        callData();
    }, []);

    //2. 데이터 호출 직후 / 폴더 버튼 클릭시 설정
    useEffect(()=> {
        if(data.length > 0) {
            //type 설정 및 txt, count, cursor 초기화
            setTxt({ ...initVal, type : type });
            setCount({ ko: 0, en: 0 });
            setCursor(false);

            //필요한 데이터만 뽑아서 상태 관리
            const targetData = data.filter((item)=> item.type === type)[0];
            setTargetItem(targetData);
        }
    }, [data, type]);

    //3. 타이핑 이펙트
    useEffect(()=> {
        if(txt.type) {
            //한국어 인트로 시작
            const interval1 = setInterval(()=> {
                setTxt({ ...txt, ko : txt.ko + targetItem.ko[count.ko] });
                setCount({ ...count, ko: count.ko + 1 });
            }, 100);

            //한국어 인트로 끝
            if(count.ko === targetItem.ko.length) {
                clearInterval(interval1);
                
                //영어 인트로 시작
                const interval2 = setInterval(()=> {
                    setTxt({ ...txt, en : txt.en + targetItem.en[count.en] });
                    setCount({ ...count, en: count.en + 1 });
                }, 100);

                //영어 인트로 끝
                if(count.en === targetItem.en.length) {
                    clearInterval(interval2);
                    setCursor(true);
                }

                return ()=> clearInterval(interval2);
            }

            return ()=> clearInterval(interval1);
        }
    }, [txt.type, count, targetItem]);

    return (
        <div className="promptBox">               
            <div className="folderBox">
                <div className="tab"></div>
                <div className="folders">
                    {folders.map((folder, index)=> 
                        <section 
                            key={index} 
                            onClick={()=> setType(folder)}
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
                    <div>
                        <h3>{type.toUpperCase()}</h3>
                        <p className="ko">
                            {txt.ko}
                        </p>
                        <p className="en">
                            {txt.en}
                            <span className={cursor ? "cursor on" : ""}></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Prompt;