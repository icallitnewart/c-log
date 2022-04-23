import axios from "axios";
import React, { useEffect, useState } from "react";
import Tab from "../common/Tab";

const publicURL = process.env.PUBLIC_URL;

function About() {
    const [ data, setData ] = useState({
        category: null,
        items: []
    });
    const [ activeEffect, setActiveEffect ] = useState(null);
    const category = [ "Intro", "About me", "Blog", "Gallery", "Playlist", "Contact" ];

    //카테고리 버튼 클릭시
    const clickTab =(e)=> {

        //클릭한 카테고리의 내용이 이미 보여지고 있는 상태라면 작동 불가 
        const targetCategory = e.currentTarget.querySelector("span").innerText;
        if(data.category===targetCategory) return;

        //카테고리에 따른 데이터 불러오기
        callData(targetCategory);
    }

    //데이터 호출
    const callData = async(category)=> {
        //모션 이펙트 초기화
        setActiveEffect(null);

        //데이터 호출
        await axios
        .get(`${publicURL}/db/about.json`)
        .then((json)=> {
            const data = json.data.data;

            //해당 카테고리의 데이터만 불러오기
            data.map((el)=> {
                if(el.category===category) {
                    //데이터 정돈
                    let arr = [];
                    el.items.forEach((item)=> {
                        arr.push({ question: item.question });
                        item.answer.map((el)=> arr.push({ answer: el }));
                    });
                    
                    //데이터 state로 저장
                    setData({
                        category: category,
                        items: arr
                    })
                };
            });
        })
    } 

    //첫 로드시 데이터 호출
    useEffect(()=> {
        callData("Intro");
    }, []);

    //말풍선 모션 이펙트 적용
    useEffect(()=> {
        if(!activeEffect) {     //처음 로드시
            setActiveEffect(true);
            //참고: 처음부터 setTimeout을 이용하여 [0]으로 설정하면 모션이 제대로 적용되지 않으므로 처음엔 true로 설정
        } else {
            if(activeEffect===true) {
                const timer = setTimeout(()=> setActiveEffect([0]), 0);

                return ()=> clearTimeout(timer);
            }

            if(activeEffect[activeEffect.length - 1] < data.items.length - 1) {
                const timer = setTimeout(()=> setActiveEffect(prev=> [ ...prev, prev[prev.length - 1] + 1]), 1000);
    
                return ()=> clearTimeout(timer);
            }
        }
    }, [data, activeEffect]);

    return(
    <main className="about">
    	<div className="inner">
            <Tab />
            <section className="content">
                <h1>ABOUT</h1>
                <div className="intro">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident facere explicabo necessitatibus nemo consequuntur delectus vel placeat cupiditate laborum quisquam?</p>
                </div>
                <div className="wrap">
                    <ul className="conversation">
                    {activeEffect && data.items.map((item, index)=> {
                        //말풍선 모션 이펙트 적용 여부
                        const isActive = (!activeEffect || activeEffect === true) ? false : ((activeEffect.indexOf(index) === -1) ? false : true);

                        return (
                            <li 
                                key={index} 
                                className={
                                    isActive 
                                    ? `${Object.keys(item)} on`
                                    : Object.keys(item)
                                }
                            >
                                <div className="pic"></div>
                                <div className="speechBubble">
                                    <div className="inner">
                                    <span>{Object.values(item)}</span>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                    </ul>
                    <ul className="category">
                        {category.map((item, index)=>
                            <li 
                                key={index} 
                                onClick={clickTab} 
                                className={(data.category === item) ? "on" : ""}
                            >
                                <span>{item}</span>
                            </li>
                        )}
                    </ul>
                </div>
            </section>
        </div>
    </main>
    )
}

export default About;