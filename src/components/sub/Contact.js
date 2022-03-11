import { useEffect, useRef, useState } from "react";
import{ init } from '@emailjs/browser';
import emailjs from '@emailjs/browser';
import Tab from "../common/Tab";

function Join() {
    const box = useRef(null);
    //이메일 발신 성공 여부 상태 관리
    const [ success, setSuccess ] = useState(false);

    useEffect(()=> {
        box.current.classList.add("on");
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
            <div className="wrap" ref={box}>
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

function FormBox({ setSuccess }) {
    const form = useRef(null);
    const initVal = {
        name: "",
        email: "",
        comment: ""
    };
    const [ inputs, setInputs ] = useState(initVal);
    const [ errors, setErrors ]  = useState({});
    const [ isSubmit, setIsSubmit ] = useState(false);


    const handleChange = (e)=> {
        const { value, name } = e.target;
        setInputs({...inputs, [name] : value});
    }

    //유효성 검사 함수
    const checkErr = (value)=> {
        let errs = {};
        if(!value.name) {
            errs.name = "이름을 입력해주세요";
        }
        if(!value.email || !/@/.test(value.email)) {
            errs.email = "올바른 이메일 주소를 입력해주세요";
        }
        if(!value.comment || value.comment.length < 10) {
            errs.comment = "글을 10자 이상 남겨주세요";
        }

        return errs;
    };
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        setIsSubmit(true);

        setErrors(checkErr(inputs));
    };

    //메일 발송 함수
    const sendEmail = ()=> {
        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

        emailjs
            .sendForm(serviceId, templateId, form.current)
            .then(
                function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert("Your mail has been sent!");
                    setSuccess(true);
                }, 
                function(error) {
                    alert("Oops! There has been a problem sending your email...");
                    console.log('FAILED...', error);
                }
            );

    };

    useEffect(()=> {
        const errorLen = Object.keys(errors).length;

        if(errorLen === 0 && isSubmit) {
            if(window.confirm("Would you like to send an email?")) {
                sendEmail();
            }
        }
    }, [errors]);

    return (
    <div className="formBox">
        <h2>Want to leave a message?</h2>
        <p>*All fields are mandatory.</p>
        <form ref={form} onSubmit={handleSubmit}>
            <fieldset>
                <legend className="hidden">Contact Form</legend>
                <table summary="Visitor's name, email, comment">
                    <caption className="hidden">Contact Mail</caption>
                    <tbody>
                    <tr>
                        <th scope="row">
                            <label htmlFor="name">NAME</label>
                            {
                                errors.name &&
                                <p className="errs">{errors.name}</p>
                            }
                        </th>
                        <td>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                onChange={handleChange}
                                value={inputs.name}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label htmlFor="email">EMAIL</label>
                            {
                                errors.email &&
                                <p className="errs">{errors.email}</p>
                            }
                        </th>
                        <td>
                            <input 
                                type="text" 
                                name="email" 
                                id="email" 
                                onChange={handleChange}
                                value={inputs.email}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label htmlFor="comment">COMMENT</label>
                            {
                                errors.comment &&
                                <p className="errs">{errors.comment}</p>
                            }
                        </th>
                        <td>
                            <textarea 
                                name="comment" 
                                id="comment"
                                onChange={handleChange}
                                value={inputs.comment}
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <input type="reset" value="RESET" />
                            <input 
                                type="submit" 
                                value="SUBMIT" 
                            />
                        </th>
                    </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    </div>
    )
}

function Success() {
    return (
        <div className="success">
            <h2>Your mail has been sent successfully! </h2>
            <p className="en">📧 It will be replied within 2-3 days and the reply will be delivered to your email address. Thanks for your interest in my blog! </p>
            <p className="ko">📬 2-3일 내에 입력한 이메일 주소로 답장해드립니다. 저의 블로그에 관심 가져주셔서 감사합니다!🙇‍♀️ </p>
        </div>
    )
}

export default Join;