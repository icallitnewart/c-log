import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Loading from "../../common/Loading";
import Category from "./Category";
import Btns from "./Btns";
import { useScreenSize } from "../../../hooks/useScreenSize.js";

const PostList = ({ loading, posts, history, no, callData }) => {
	const [ viewType, setViewType ] = useState("list");
    const iconTypes = [
        { HTML : "fab fa-html5" },
        { CSS : "fab fa-css3-alt" },
        { JS : "fab fa-js" },
        { REACT : "fab fa-react" }
    ];
    const screenSize = useScreenSize();
    
	//페이지네이션 옵션
	const [ page, setPage ] = useState(1);
	const [ itemsPerPage, setItemsPerPage ] = useState(5);
	let indexStart = page * itemsPerPage - (itemsPerPage - 1) - 1; 
	let indexEnd = page * itemsPerPage - 1;

    useEffect(()=> {
        if(viewType==="list") {
            setItemsPerPage(5);
        }
    }, [viewType]);

    useEffect(()=> {
        if(viewType==="grid" && screenSize) {
            switch(screenSize) {
                case "mobile" : //1
                    setItemsPerPage(4);
                    break;
                case "tablet" : //2
                    setItemsPerPage(6);
                    break;
                case "web" :    //3
                    setItemsPerPage(9);
                    break;
                default :   //4
                    setItemsPerPage(8);
            }
        }
    }, [viewType, screenSize]);

    return (
        <div className="wrap">
            <Category 
                iconTypes={iconTypes}
                callData={callData}
            />
            <Btns 
                history={history}
                setViewType={setViewType}
                loading={loading}
            />
            {(loading && !no) 
            ?   <Loading /> 
            :   <>
                <div className={(viewType === "list") ? "list" : "list gridView"}>
                    {posts.slice(indexStart, indexEnd + 1).map((post, index)=> {
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
                                        <h2><span>{post.title}</span></h2>
                                        <p>
                                            <span className="writer">{post.writer}</span>
                                            <span className="date">{post.date}</span>
                                            <span className={(post.isLiked) ? "likes on" : "likes"}><i className="fas fa-heart"></i> {post.likes}</span>
                                        </p>
                                        <div>{post.content.replace(/(<([^>]+)>|&nbsp;)/ig, " ")}</div>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
                <Pagination 
                    itemsPerPage={itemsPerPage} 
                    totalItems={posts.length} 
                    setPage={setPage} 
                    currentPage={page} 
                />
                </> 
            }
        </div>
    )
};

export default PostList;