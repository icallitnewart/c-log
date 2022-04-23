import { useRef, forwardRef, useState } from "react";
import Pagination from "./Pagination";
import Loading from "../../common/Loading";

const PostList = forwardRef(({ loading, posts, history, no, callData }, view) => {
	const list = useRef(null);
	const [ viewType, setViewType ] = useState("list");
    
	//Pagination
	const [ page, setPage ] = useState(1);
	const itemsPerPage = 5;
	let indexStart = page * itemsPerPage - (itemsPerPage - 1) - 1; 
	let indexEnd = page * itemsPerPage - 1;

    const iconTypes = {
        HTML : "fab fa-html5",
        CSS : "fab fa-css3-alt",
        JS : "fab fa-js",
        REACT : "fab fa-react"
    }

    const classifyByCategory = (e)=> {
        //클릭한 카테고리 버튼이 이미 활성화된 상태면 작동 종료
        if(e.currentTarget.classList.contains("on")) return;
        
        //클릭한 카테고리 버튼만 활성화
        const categoryBtns = e.currentTarget.closest("ul").querySelectorAll("li");
        for(let btn of categoryBtns) btn.classList.remove("on");
        e.currentTarget.classList.add("on");

        //카테고리 타입에 따른 데이터 호출
        const category = e.currentTarget.dataset.type;
        callData(category);
    }

    return (
        <div className="wrap">
            <ul className="category">
                <li onClick={classifyByCategory} data-type="HTML"><span>HTML</span></li>
                <li onClick={classifyByCategory} data-type="CSS"><span>CSS</span></li>
                <li onClick={classifyByCategory} data-type="JS"><span>JS</span></li>
                <li onClick={classifyByCategory} data-type="REACT"><span>REACT</span></li>
            </ul>
            <div className="btns">
                <div className="writeBtns">
                    <button onClick={()=> history.push(`/blog/0`)}>Write</button>
                </div>
                <ul className="viewType" ref={view}>
                    <li>
                        <input onClick={()=> setViewType("list")}  type="radio" id="listView" name="viewType" defaultChecked />
                        <label onClick={()=> setViewType("list")} htmlFor="listView">
                            <i className="fas fa-th-list"></i>
                        </label>
                    </li>
                    <li>
                        <input onClick={()=> setViewType("grid")} type="radio" id="gridView" name="viewType" />
                        <label onClick={()=> setViewType("grid")} htmlFor="gridView">
                            <i className="fas fa-th"></i>
                        </label>
                    </li>
                </ul>
            </div>
            { (loading && !no) 
                ? <Loading /> 
                : (
                <>
                    <div className={(viewType === "list") ? "list" : "list gridView"} ref={list}>
                    {
                        posts.map((post, index)=> {
                        if(index>=indexStart && index<=indexEnd) {
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
                                            <span className="date">{post.date}</span>
                                            <span className={(post.isLiked) ? "likes on" : "likes"}><i className="fas fa-heart"></i> {post.likes}</span>
                                        </p>
                                        <p>{post.content}</p>
                                    </div>
                                </div>
                                </article>
                            )
                        }
                        })
                    }
                    </div>
                    
                    <Pagination itemsPerPage={itemsPerPage} totalItems={posts.length} setPage={setPage} currentPage={page} />
                </> 
                )}
        </div>
    )
});

export default PostList;