import { useEffect, useState } from "react";
import{ init } from '@emailjs/browser';
import Tab from "../../common/Tab";
import Success from "./Success";
import FormBox from "./FormBox";

function Join() {
    //이메일 발신 성공 여부 상태 관리
    const [ success, setSuccess ] = useState(false);

    useEffect(()=> {
        //emailjs
        init(process.env.REACT_APP_EMAILJS_USER_ID);
    }, []);
    
    return(
    <main className="contact">
        <div className="inner">
            <Tab />
            <section className="content">
                <h1>CONTACT</h1>
                <div className="intro">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident facere explicabo necessitatibus nemo consequuntur delectus vel placeat cupiditate laborum quisquam?</p>
                </div>
                <div className="wrap on">
                    <div className="tab"></div>
                    <div className="container">
                        <div className="pic">
                            <img src={process.env.PUBLIC_URL+"/img/computer.png"} alt="computer" />
                            <a href='https://www.freepik.com/vectors/vintage' target="_blank">Vintage vector created by macrovector - www.freepik.com</a>
                        </div>
                        {
                            success
                            ? <Success />
                            : <FormBox setSuccess={setSuccess} />
                        }
                    </div>
                </div>
            </section>
        </div>
    </main>
    )
}

export default Join;