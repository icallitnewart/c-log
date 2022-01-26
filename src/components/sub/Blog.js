import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Loading from "../common/Loading";
import Post from "./Post";

const publicSrc = process.env.PUBLIC_URL;

function Blog({ history, match }) {
	const { no } = match.params;
    let [ loading, setLoading ] = useState(true);
    let [ posts, setPosts ] = useState([]);
	let [ enableClick, setEnableClick ] = useState(true);
	const list = useRef(null);
	const view = useRef(null);

    const iconTypes = {
        HTML : "fab fa-html5",
        CSS : "fab fa-css3-alt",
        JS : "fab fa-js",
        REACT : "fab fa-react"
    }

	//로컬스토리지에 저장된 값 가져오기
	const getLocalItems = ()=> {
		let result = localStorage.getItem('posts');
		if(result) { 
			result = JSON.parse(result);
			return result; 
		} else {
			return null;
		}
	};

    useEffect(()=> {
        callData();
    }, []);

	useEffect(()=> {
		//로컬 스토리지에 저장된 posts 값이 없을 경우 axios로 불러온 default 데이터를 로컬스토리지에 저장 
		if(!getLocalItems() || getLocalItems().length===0) {
			localStorage.setItem("posts", JSON.stringify(posts));
		}
	}, [posts]);

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
				{(!loading && no)
				? 	<Post post={posts[posts.length - no]} no={no} history={history} />
				: 	<div className="wrap">
						<div className="btns">
							<div className="writeBtns">
								<button onClick={()=> history.push(`/blog/0`)}>Write</button>
							</div>
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
						</div>
						{ (loading && !no) ? <Loading /> : (
							<>
							<div className="list" ref={list}>
							{
								posts.map((post, index)=> {
								return(
									<article key={index} onClick={()=> history.push(`/blog/${post.index}`)}>
									<div className="wrap">
										<div className={`pic ${post.category.toLowerCase()}`}>
											<i className={iconTypes[post.category]}></i>
											<span>{post.category}</span>
										</div>
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
				}
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
			
			//로컬스토리지에 저장된 값이 있을 경우
			if(getLocalItems() && getLocalItems().length!==0) {
				//로컬스토리지에 저장된 값을 posts state에 저장
				setPosts(getLocalItems());

			} else {	//로컬스토리지에 저장된 값이 없을 경우
				//axios로 불러온 default 데이터를 posts state에 저장
				setPosts(items);
			}
			
		});

		//게시글 보기 및 작성 페이지
		if(no) {
			setLoading(false);
			setEnableClick(true);
		} else {	//게시글 목록

			//로딩 모션 보여주기
			setTimeout(()=> {	//임시로 .5초
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
	
			}, 500)

		}

    }
}

export default Blog;