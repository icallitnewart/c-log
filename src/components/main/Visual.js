const publicURL = process.env.PUBLIC_URL;

function Visual() {
    return(
        <main className="visual">
        <div className="wrap">
            <div className="intro">
                <div className="title">
                    <h1>C-LOG</h1>
                    <h2>초보 개발자의 우당탕탕 코딩 기록지</h2>
                    <div className="pic">temporary</div>
                </div>
                <div className="galleryBox">
                    <img src={`${publicURL}/img/main_gallery.jpg`} alt="" />
                </div>
                <div className="playlistBox">
                    <img src={`${publicURL}/img/main_playlist.jpg`} alt="" />

                </div>
            </div>
            <div className="recent">
                <ul>
                <li><h3>Recent <a href="#">more</a></h3></li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                </ul>
            </div>
            <div className="popular">
                <ul>
                <li><h3>Popular<a href="#">more</a></h3></li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                <li>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, corrupti!</h4>
                    <p><span>lorem ipsum</span><span>2022.01.10</span></p>
                </li>
                </ul>
            </div>
        </div>
            {/* <div className="inner">
                <div className="tab">
                    <div className="topMark">
                        <span>C/</span>
                        <span>WELCOME</span>
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
                        <p>https://icallitnewart.github.io/c-log/</p>
                    </div>
                </div>
                <section className="content">
                    <h1>C-LOG</h1>
                    <p className="intro">
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident facere explicabo necessitatibus nemo consequuntur delectus vel placeat cupiditate laborum quisquam?</span>
                    </p>
                </section>
            </div> */}
        </main>
    )
}

export default Visual;