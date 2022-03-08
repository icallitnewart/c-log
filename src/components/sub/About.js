import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Tab from "../common/Tab";

const publicURL = process.env.PUBLIC_URL;

function About() {
    const dialogue = useRef(null);
    const [ items, setItems ] = useState({
        category: null,
        items: []
    });
    const [ enableClick, setEnableClick ] = useState(false);

    useEffect(()=> {
        callData("Intro");
    }, []);

    return(
    <main className="about">
    	<div className="inner">
            <Tab />
            <section className="content">
                <h1>ABOUT</h1>
                <p className="intro">
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident facere explicabo necessitatibus nemo consequuntur delectus vel placeat cupiditate laborum quisquam?</span>
                </p>
                <div className="wrap">
                    <ul className="conversation" ref={dialogue}>
                    {
                        items.items.map((item, index)=>{
                        return (
                            <React.Fragment key={index}>
                            <li className="question">
                                <div className="pic"></div>
                                <div className="speechBubble">
                                    <div className="inner">
                                    <span>{item.question}</span>
                                    </div>
                                </div>
                            </li>
                            {
                                item.answer.map((el, index)=> {
                                return(
                                    <li key={index} className="answer">
                                        <div className="speechBubble">
                                            <div className="inner"><span>{el}</span>
                                            </div>
                                        </div>
                                        <div className="pic"></div>
                                    </li>
                                )
                                })
                            }
                            </React.Fragment>
                        )
                        })
                    }
                    </ul>
                    <ul className="category">
                        <li onClick={(e)=> clickTab(e)} className="on">
                            <span>Intro</span>
                        </li>
                        <li onClick={(e)=> clickTab(e)}>
                            <span>About me</span>
                        </li>
                        <li onClick={(e)=> clickTab(e)}>
                            <span>Blog</span>
                        </li>
                        <li onClick={(e)=> clickTab(e)}>
                            <span>Gallery</span>
                        </li>
                        <li onClick={(e)=> clickTab(e)}>
                            <span>Playlist</span>
                        </li>
                        <li onClick={(e)=> clickTab(e)}>
                            <span>Contact</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </main>
    )

    //카테고리 버튼 누를시 그에 해당하는 내용 보여주기
    function clickTab(e) {
        //아직 내용이 다 보여지지 않은 (모션이 완료되지 않은) 상태면 작동 불가
        if(!enableClick) return;

        //클릭한 카테고리의 내용이 이미 보여지고 있는 상태라면 작동 불가 
        const targetCategory = e.currentTarget.querySelector("span").innerText;
        if(items.category===targetCategory) return;

        //대화창 대화 모션을 위해 미리 on 제거
        const allItems = dialogue.current.querySelectorAll("li");

        for(let item of allItems) {
            if(item.classList.contains("on")) item.classList.remove("on"); 
        }

        //카테고리에 따른 데이터 불러오기
        callData(targetCategory);


        //카테고리 버튼 활성화
        const allBtns = e.currentTarget.parentElement.children;
        for(let btn of allBtns) btn.classList.remove("on");
        e.currentTarget.classList.add("on");
    }


    //말풍선 모션 효과
    function motionEffect() {
        const targetItems = dialogue.current.querySelectorAll("li");
        const speed = 500;

        //몇 초(speed)에 한번씩 on 클래스 추가하여 차례대로 아이템에 모션 추가
        for(let i = 0; i<targetItems.length; i++) {
            ((i)=>{
                setTimeout(()=> {
                    targetItems[i].classList.add("on");
                    
                    //마지막 아이템까지 다 보여지면 다른 카테고리 버튼 클릭 가능
                    if(i===targetItems.length - 1) setTimeout(()=>{setEnableClick(true)}, speed);
                }, speed * i);
            })(i);
        }
        
    }

    async function callData(category) {
        //모든 내용이 보여지기 전까진 카테고리 버튼 클릭 불가능
        if(enableClick) setEnableClick(false);

        //데이터 호출
        await axios
        .get(`${publicURL}/db/about.json`)
        .then((json)=> {
            const data = json.data.data;

            //해당 카테고리의 데이터만 불러오기
            data.map((el, index)=> {
                if(el.category===category) setItems({
                    category: category,
                    items: el.items
                });
            });
        })

        //모션 효과 추가
        motionEffect();
    } 
}

export default About;