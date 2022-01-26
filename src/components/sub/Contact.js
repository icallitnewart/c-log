import { useEffect, useRef } from "react";

function Join() {
    const box = useRef(null);
    
    const sendMail = (e)=> {
        e.preventDefault();

        if(window.confirm("Would you like to send an email?")) {
            alert("Your mail has been sent!");
        }
    }
    useEffect(()=> {
        box.current.classList.add("on");
    }, []);
    return(
    <main className="contact">
    <div className="inner">
        <div className="tab">
            <div className="topMark">
                <span>C/</span>
                <span>Contact</span>
            </div>
            <div className="btns">
                <span>─</span>
                <span>ㅁ</span>
                <span>x</span>
            </div>
            <div className="addressBar">
                <span><i className="fas fa-arrow-left"></i></span>
                <span><i className="fas fa-arrow-right"></i></span>
                <span><i className="fas fa-redo-alt"></i></span>
                <p>https://icallitnewart.github.io/c-log/contact</p>
            </div>
        </div>
        <section className="content">
            <h1>CONTACT</h1>
            <p className="intro">
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident facere explicabo necessitatibus nemo consequuntur delectus vel placeat cupiditate laborum quisquam?</span>
            </p>
            <div className="wrap" ref={box}>
                <div className="tab"></div>
                <div className="container">
                    <div className="pic">
                        <img src={process.env.PUBLIC_URL+"/img/computer.png"} alt="computer" />
                        <a href='https://www.freepik.com/vectors/vintage' target="_blank">Vintage vector created by macrovector - www.freepik.com</a>
                    </div>
                    <div className="formBox">
                        <h2>Want to leave a message?</h2>
                        <p>*All fields are mandatory.</p>
                        <form action="/" method="post">
                            <fieldset>
                                <legend className="hidden">Contact Form</legend>
                                <table summary="Visitor's name, email, comment">
                                    <caption className="hidden">Contact Mail</caption>
                                    <tbody>
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="name">NAME</label>
                                        </th>
                                        <td>
                                            <input type="text" name="name" id="name" required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="email">EMAIL</label>
                                        </th>
                                        <td>
                                            <input type="text" name="email" id="email" required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="comment">COMMENT</label>
                                        </th>
                                        <td>
                                            <textarea name="comment" id="comment" cols="30" rows="10" required></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input type="reset" value="RESET" />
                                            <input type="submit" value="SUBMIT" onClick={(e)=> sendMail(e)} />
                                        </th>
                                    </tr>
                                    </tbody>
                                </table>
                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    </div>
    </main>
    )
}

export default Join;