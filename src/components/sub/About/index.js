import axios from "axios";
import React, { useEffect, useState } from "react";
import Tab from "../../common/Tab";
import Dialogue from "./Dialogue";
import Category from "./Category";

const publicURL = process.env.PUBLIC_URL;

function About() {
    const [ data, setData ] = useState({
        category: null,
        items: []
    });
    const [ activeEffect, setActiveEffect ] = useState(null);


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
            setActiveEffect([-1]);
        } else {
            let speed = 1000;

            if(activeEffect[activeEffect.length - 1] < data.items.length - 1) {
                //첫 말풍선만 빠르게
                if(activeEffect.length === 1) speed = 50;
                //말풍선 모션 이펙트 주기
                const timer = setTimeout(()=> setActiveEffect(prev=> [ ...prev, prev[prev.length - 1] + 1]), speed);
    
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
                    <div className="wrap">
                        <Dialogue 
                            activeEffect={activeEffect}
                            data={data}
                        />
                        <Category 
                            data={data}
                            callData={callData}
                        />
                    </div>
                </section>
            </div>
        </main>
    )
}

export default About;