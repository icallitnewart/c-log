import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Loading from "../common/Loading";

const publicSrc = process.env.PUBLIC_URL;

function Blog() {
    let [ loading, setLoading ] = useState(true);
    let [ posts, setPosts ] = useState([]);
	let [ enableClick, setEnableClick ] = useState(true);
	const list = useRef(null);
	const view = useRef(null);

    useEffect(()=> {
        callData();
    }, []);

    return(
    <main className="blog">
    	<div className="inner">
            <div className="tab">
                <div className="topMark">
                    <span>C/</span>
                    <span>BLOG</span>
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
                    <p>https://icallitnewart.github.io/c-log/blog</p>
                </div>
            </div>
            <section className="content">
                <h1>BLOG</h1>
                <p className="intro">
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident facere explicabo necessitatibus nemo consequuntur delectus vel placeat cupiditate laborum quisquam?</span>
                </p>
                <div className="wrap">
                    <ul className="viewType" ref={view}>
						<li>
							<input onClick={()=> callData("list")}  type="radio" id="listView" name="viewType" defaultChecked />
							<label onClick={()=> callData("list")} htmlFor="listView">
								<i className="fas fa-th-list"></i>
							</label>
						</li>
						<li>
							<input onClick={()=> callData("grid")} type="radio" id="gridView" name="viewType" />
							<label onClick={()=> callData("grid")} htmlFor="gridView">
								<i className="fas fa-th"></i>
							</label>
						</li>
					</ul>
					
					{ (loading) ? <Loading /> : (
						<>
						<div className="list" ref={list}>
						{
							posts.map((post, index)=> {
							return(
								<article key={index}>
								<div className="wrap">
									<div className="pic"></div>
									<div className="textBox">
										<h2>{post.title}</h2>
										<p>
											<span className="writer">{post.writer}</span>
											<span>{post.date}</span>
										</p>
										<p>{post.content}</p>
									</div>
								</div>
								</article>
							)
							})
						}
						</div>
						<div className="pagination">
							<a href="#" className="prevBtn"><i className="fas fa-arrow-left"></i></a>
							<ul>
								<li className="on"><a href="#">1</a></li>
								<li><a href="#">2</a></li>
								<li><a href="#">3</a></li>
								<li><a href="#">4</a></li>
								<li><a href="#">5</a></li>
								<li><a href="#">6</a></li>
								<li><a href="#">7</a></li>
								<li><a href="#">8</a></li>
								<li><a href="#">9</a></li>
								<li><a href="#">10</a></li>
							</ul>
							<a href="#" className="nextBtn"><i className="fas fa-arrow-right"></i></a>
						</div>
						</>
					)}
                </div>
            </section>
        </div>
    </main>
    )

    async function callData(viewType) {
		const viewBtns = view.current.querySelectorAll("input[type=radio]");

		//로딩되는 동안 중복 클릭방지
		if(!enableClick) return;
		setEnableClick(false);

		//로딩바 띄우기
		if(!loading) setLoading(true);

		//데이터 불러오기
        await axios
        .get(`${publicSrc}/db/posts.json`)
        .then((data)=> {
			let items = data.data.data;
			items = items.reverse();

			//데이터 불러오는 동안 버튼 비활성화
			for(let btn of viewBtns) {
				btn.disabled = true;
			}
            setPosts(items);
        });
		

		setTimeout(()=> {	//임시로 1초
			//로딩바 제거 및 클릭 가능하게 만들기
			setLoading(false);
			setEnableClick(true);
			//버튼 활성화
			for(let btn of viewBtns) {
				btn.disabled = false;
			}
	
			//리스트뷰나 그리드뷰 버튼 클릭시 스타일 변경
			if(viewType==="list" && list) {
				if(list.current.classList.contains("gridView")) list.current.classList.remove("gridView");
			}
			else if(viewType==="grid" && list) {
				list.current.classList.add("gridView");
			}
		}, 1000)
    }
}

export default Blog;