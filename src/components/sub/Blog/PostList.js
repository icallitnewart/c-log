import { useState } from "react";
import Pagination from "./Pagination";
import Loading from "../../common/Loading";

const PostList = ({ loading, posts, history, no, callData }) => {
	const [ viewType, setViewType ] = useState("list");
    const [ activeCategory, setActiveCategory ] = useState(null);
    const iconTypes = [
        { HTML : "fab fa-html5" },
        { CSS : "fab fa-css3-alt" },
        { JS : "fab fa-js" },
        { REACT : "fab fa-react" }
    ];
    
	//페이지네이션 옵션
	const [ page, setPage ] = useState(1);
	const itemsPerPage = 5;
	let indexStart = page * itemsPerPage - (itemsPerPage - 1) - 1; 
	let indexEnd = page * itemsPerPage - 1;

    //카테고리 버튼 클릭시
    const classifyByCategory = (e)=> {
        //중복 클릭 방지
        if(e.currentTarget.classList.contains("on")) return;

        //카테고리 타입에 따른 데이터 호출
        const category = e.currentTarget.dataset.type;
        callData(category);
        setActiveCategory(category);
    }

    return (
        <div className="wrap">
            <ul className="category">
                {iconTypes.map((item, index)=>
                    <li 
                        key={index}
                        onClick={classifyByCategory} 
                        className={activeCategory===Object.keys(item).toString() ? "on" : ""}
                        data-type={Object.keys(item)}
                    >
                        <span>{Object.keys(item)}</span>
                    </li>
                )}
            </ul>
            <div className="btns">
                <div className="writeBtns">
                    <button onClick={()=> history.push(`/blog/new`)}>Write</button>
                </div>
                <ul className="viewType">
                    <li>
                        <input 
                            onClick={()=> setViewType("list")}  
                            type="radio" 
                            id="listView" 
                            name="viewType" 
                            disabled={loading}
                            defaultChecked 
                        />
                        <label 
                            onClick={()=> setViewType("list")} 
                            htmlFor="listView"
                        > 
                            <span className="hidden">List View</span>
                            <i className="fas fa-th-list"></i>
                        </label>
                    </li>
                    <li>
                        <input 
                            onClick={()=> setViewType("grid")} 
                            type="radio" 
                            id="gridView" 
                            disabled={loading}
                            name="viewType" 
                        />
                        <label 
                            onClick={()=> setViewType("grid")} 
                            htmlFor="gridView"
                        >
                            <span className="hidden">Grid View</span>
                            <i className="fas fa-th"></i>
                        </label>
                    </li>
                </ul>
            </div>
            { (loading && !no) 
                ? <Loading /> 
                : (
                <>
                    <div className={(viewType === "list") ? "list" : "list gridView"}>
                    {
                        posts.slice(indexStart, indexEnd + 1).map((post, index)=> {
                            const category = iconTypes.find((type)=> Object.keys(type).toString
                            () === post.category);
                            
                            return(
                                <article 
                                    key={index} 
                                    onClick={()=> history.push(`/blog/${post.index}`)}
                                >
                                <div className="wrap">
                                    <div className={`pic ${post.category.toLowerCase()}`}>
                                        <i className={Object.values(category)}></i>
                                        <span>{post.category}</span>
                                    </div>
                                    <div className="textBox">
                                        <h2>{post.title}</h2>
                                        <p>
                                            <span className="writer">{post.writer}</span>
                                            <span className="date">{post.date}</span>
                                            <span className={(post.isLiked) ? "likes on" : "likes"}><i className="fas fa-heart"></i> {post.likes}</span>
                                        </p>
                                        <div>{post.content.replace(/(<([^>]+)>)/ig, " ")}</div>
                                    </div>
                                </div>
                                </article>
                            )
                        })
                    }
                    </div>
                    
                    <Pagination 
                        itemsPerPage={itemsPerPage} 
                        totalItems={posts.length} 
                        setPage={setPage} 
                        currentPage={page} 
                    />
                </> 
                )}
        </div>
    )
};

export default PostList;