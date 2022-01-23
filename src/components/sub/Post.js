import { useEffect, useState, useRef } from "react";

function Post({ post, no, history }) {
    const inputTitle = useRef(null);
    const inputWriter = useRef(null);
    const inputContent = useRef(null);
    const icon = useRef(null);
    const [ postContent, setPostContent ] = useState(post);
    const [ enableEdit, setEnableEdit ] = useState(false);
    
    const iconTypes = {
        HTML : "fab fa-html5",
        CSS : "fab fa-css3-alt",
        JS : "fab fa-js",
        REACT : "fab fa-react"
    }

    //로컬스토리지 posts 값 불러오기
    const getLocalItems = ()=> {
		let result = localStorage.getItem('posts');
		if(result) { 
			result = JSON.parse(result);
			return result; 
		} else {
			return null;
		}
	};

    //날짜 시간 구하는 함수
    const getTimes = ()=> {
        const addZero = (num)=> num = (num < 10) ? `0${num}` : num;
        const today = new Date();
        const year = today.getFullYear();
        const month = addZero((today.getMonth() + 1));
        const day = addZero(today.getDate());
        const hour = addZero(today.getHours());
        const minute = addZero(today.getMinutes());
        
        return `${year}/${month}/${day} ${hour}:${minute}`;
    };


    //글 저장 함수
    const savePost = (postIndex)=> {
        const localItems = getLocalItems();

        //빈칸 체크
        if(!inputTitle.current.value || !inputWriter.current.value ||!inputContent.current.value) { 
            alert("Please fill in the blank.");
            return;
        } 

        //기존 글 수정시
        if(postIndex) {
            const getIndex = localItems.length - postIndex;
            const targetPost = localItems[getIndex];
            
            //수정된 글의 value값만 기존 배열에서 바꿔치기 
            targetPost.title = inputTitle.current.value;
            targetPost.writer = inputWriter.current.value;
            targetPost.content = inputContent.current.value;
            targetPost.date = getTimes();
            targetPost.category = icon.current.dataset.type;

            //각 항목의 데이터값을 로컬스토리지 posts에 저장 
            localStorage.setItem('posts', JSON.stringify(localItems));

        } else {    //새로운 글 작성시
            const newPost = {
                title : inputTitle.current.value,
                index: localItems.length + 1,
                writer : inputWriter.current.value,
                date : getTimes(),
                category : icon.current.dataset.type,
                content : inputContent.current.value,
            }
            const newArr = [...localItems.reverse(), newPost ];

            //각 항목의 데이터값을 로컬스토리지 posts에 저장 
            localStorage.setItem('posts', JSON.stringify(newArr.reverse()));

        }

            alert("Your post has been saved!");
            history.push("/blog"); 
    };

    //글 삭제 함수
    const deletePost = (postIndex)=> {
        //확인창 띄우기
        if(!window.confirm("Do you really want to delete the post?")) return;

        const localItems = getLocalItems();
        const removeItem = localItems.filter((item, index)=> item.index !== postIndex);
        
        //index 초기화 시켜주기
        removeItem.forEach((item, index)=> item.index = removeItem.length - index);

        //각 항목의 데이터값을 로컬스토리지 posts에 저장 
        localStorage.setItem('posts', JSON.stringify(removeItem));

        alert("Your post has been deleted!");

        history.push("/blog");
    };

    const selectIcon = (e)=> {
        const icons = e.currentTarget.closest("ul").querySelectorAll("li");
        const type = e.currentTarget.dataset.type;

        //클릭한 아이콘만 테두리 스타일 활성화
        for(let icon of icons) icon.classList.remove("on");
        e.currentTarget.classList.add("on");

        //선택된 아이콘 적용
        icon.current.className = `pic ${type.toLowerCase()}`;
        icon.current.querySelector("i").className = iconTypes[type]; 
        icon.current.querySelector("span").textContent = type;
        icon.current.dataset.type = type;

    }

    useEffect(()=> {
        //새로운 글 작성시 postContent state값 null로 설정
        if(no==="0") setPostContent(null);
    }, []);

    return (
        <div className="wrap postView">
        {   
            (postContent)
            ?
                ((!enableEdit) ? <PostView /> : <PostEdit />) 
            :
                <PostEdit />
        }
        </div>
    )

    function PostEdit() {
        return (
            <div className="inner edit">
                <div className="selectPic">
                    <div className={(postContent) ? `pic ${post.category.toLowerCase()}` : "pic react"} ref={icon} data-type={(postContent) ? post.category : "REACT"}>
                        <i className={(postContent) ? iconTypes[post.category] : iconTypes.REACT}></i>
                        <span>{(postContent) ? post.category : "REACT"}</span>
                    </div>
                    <p><span>CATEGORY</span></p>
                    <ul>
                        <li className={(postContent && post.category === "HTML") ? "html on" : "html"} onClick={selectIcon} data-type="HTML">
                            <i className="fab fa-html5"></i>
                            <span>HTML</span>
                        </li>
                        <li className={(postContent && post.category === "CSS") ? "css on" : "css"} onClick={selectIcon} data-type="CSS">
                            <i className="fab fa-css3-alt"></i>
                            <span>CSS</span>
                        </li>
                        <li className={(postContent && post.category === "JS") ? "js on" : "js"} onClick={selectIcon} data-type="JS">
                            <i className="fab fa-js"></i>
                            <span>JS</span>
                        </li>
                        <li className={(postContent) ? ((post.category === "REACT") ? "react on" : "react") : "react on"} onClick={selectIcon} data-type="REACT">
                            <i className="fab fa-react"></i>
                            <span>REACT</span>
                        </li>
                    </ul>
                </div>
                <div className="editor">
                    <table>
                        <tbody>
                        <tr>
                            <th>
                                <label htmlFor="postTitle">Title</label>
                            </th>
                            <td>
                                <input type="text" name="postTitle" id="postTitle" defaultValue={postContent && post.title} ref={inputTitle} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor="postWriter">Writer</label>
                            </th>
                            <td>
                                <input type="text" name="postWriter" id="postWriter" defaultValue={postContent && post.writer} ref={inputWriter} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor="postContent">Content</label>
                            </th>
                            <td>
                                <textarea name="postContent" id="postContent"
                                defaultValue={postContent && post.content}  ref={inputContent}></textarea>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <ul className="btns">
                    <li>
                        <button onClick={()=>{
                            (no==="0")
                            ? history.push(`/blog`)
                            : setEnableEdit(false)
                        }}>Cancel</button>
                    </li>
                    <li>
                        <button onClick={()=>savePost(postContent && post.index)}>Save</button>
                    </li>
                </ul>
            </div>
        );
    }

    function PostView() {
        return (
            <div className="inner view">
                <div className="titleBox">
                    <div className="title">
                        <h2>{post.title}</h2>
                        <span>{post.writer}</span>
                        <span>{post.date}</span>
                    </div>
                    <div className={`pic ${post.category.toLowerCase()}`}>
                        <i className={iconTypes[post.category].toLowerCase()}></i>
                        <span>{post.category}</span>
                    </div>
                </div>
                <div className="contentBox">
                    <p>{post.content}</p>
                </div>
                <ul className="btns">
                    <li><button onClick={()=> {history.push('/blog')}}>List</button></li>
                    <li><button onClick={()=>setEnableEdit(true)}>Edit</button></li>
                    <li><button onClick={()=>deletePost(post.index)}>Delete</button></li>
                </ul>
            </div>
        );
    }
}

export default Post;