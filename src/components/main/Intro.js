function Intro() {
    return (
        <div className="title">
            <h1><span>Coding Blog</span></h1>
            <h2><span>초보 개발자의 우당탕탕 코딩 기록지</span></h2>
            <div className="computer">
                <div className="pic">
                    <img src={`${process.env.PUBLIC_URL}/img/computer.png`} alt="computer" />
                    <a href='https://www.freepik.com/vectors/vintage' target="_blank">Vintage vector created by macrovector - www.freepik.com</a>
                </div>
            </div>
        </div>
    )
}

export default Intro;