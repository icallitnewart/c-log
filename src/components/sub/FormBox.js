import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';

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

export default FormBox;