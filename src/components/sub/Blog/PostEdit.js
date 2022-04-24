import { useEffect, useState, useRef } from "react";

function PostEdit({ 
    postContent, 
    getLocalItems,
    iconTypes, 
    no, 
    setEnableEdit, 
    history 
}) {
    const icon = useRef(null);

    const [ category, setCategory ]  = useState(postContent ? postContent.category : "REACT");
    const initVal = {
        postTitle: postContent ? postContent.title : "",
        postWriter: postContent ? postContent.writer : "",
        postContent: postContent ? postContent.content : ""
    };
    const [ inputs, setInputs ] = useState(initVal);
    const [ error, setError ] = useState(null);
    const [ targetIndex, setTargetIndex ] = useState(null);
    const [ isSubmit, setIsSubmit ] = useState(false);

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

    const handleChange = (e)=> {
        const { value, name } = e.target;
        setInputs({ ...inputs, [name] : value });
    };

    //글 저장 함수
    const savePost = (postIndex)=> {
        const localItems = getLocalItems();

        //기존 글 수정시
        if(postIndex) {
            const getIndex = localItems.length - postIndex;
            const targetPost = localItems[getIndex];
            
            //수정된 글의 value값만 기존 배열에서 바꿔치기 
            targetPost.title = inputs.postTitle;
            targetPost.writer = inputs.postWriter;
            targetPost.content = inputs.postContent;
            targetPost.date = getTimes();
            targetPost.category = icon.current.dataset.type;

            //각 항목의 데이터값을 로컬스토리지 posts에 저장 
            localStorage.setItem('posts', JSON.stringify(localItems));

        } else {    //새로운 글 작성시
            const newPost = {
                title : inputs.postTitle,
                index: localItems.length + 1,
                writer : inputs.postWriter,
                date : getTimes(),
                category : icon.current.dataset.type,
                likes : 0,
                content : inputs.postContent,
            }
            const newArr = [...localItems.reverse(), newPost ];

            //각 항목의 데이터값을 로컬스토리지 posts에 저장 
            localStorage.setItem('posts', JSON.stringify(newArr.reverse()));

        }

            alert("포스트가 등록되었습니다!");
            history.push("/blog"); 
    };

    const checkErr = (value)=> {
        //빈칸 체크
        if(!value.postTitle || !value.postWriter || !value.postContent) {
            return true;
        } else {
            return false;
        } 
    };

    const handleSubmit = (targetIndex)=> {
        setIsSubmit(true);
        setTargetIndex(targetIndex);
        setError(checkErr(inputs));
    };

    useEffect(()=> {
        if(isSubmit) {
            if(error) {
                alert("빈칸을 입력해주세요!");
                return;
            } else {
                savePost(targetIndex);
            }
        }
    }, [error]);

    return (
        <div className="inner edit">
            <div className="selectPic">
                {/* 큰 아이콘 */}
                <div 
                    className={`pic ${category.toLowerCase()}`} 
                    ref={icon} 
                    data-type={category}
                > 
                    {iconTypes.map((type, index)=> {
                        if(Object.keys(type)[0]===category) {
                            return <i className={Object.values(type)} key={index}></i>
                        }
                    })}
                    <span>{category}</span>
                </div>
                <p><span>CATEGORY</span></p>
                {/* 작은 아이콘 */}
                <ul>
                    {iconTypes.map((icon, index)=> {
                        const type = Object.keys(icon)[0];
                        const type2 = type.toLowerCase();
                        return (
                            <li 
                                key={index}
                                className={
                                    category===type
                                        ? `${type2} on` 
                                        : type2
                                } 
                                onClick={()=> setCategory(type)} 
                                data-type={type}
                            >
                                <i className={Object.values(icon)}></i>
                                <span>{type}</span>
                            </li>
                        )
                    })}
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
                            <input 
                                type="text" 
                                name="postTitle" 
                                id="postTitle" 
                                defaultValue={postContent && postContent.title}
                                value={inputs.title} 
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="postWriter">Writer</label>
                        </th>
                        <td>
                            <input 
                                type="text" 
                                name="postWriter" 
                                id="postWriter" 
                                defaultValue={postContent && postContent.writer} 
                                value={inputs.writer} 
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="postContent">Content</label>
                        </th>
                        <td>
                            <textarea 
                                name="postContent" 
                                id="postContent"
                                defaultValue={postContent && postContent.content}  
                                value={inputs.content} 
                                onChange={handleChange}
                            ></textarea>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
            <ul className="btns">
                <li>
                    <button onClick={()=>{
                        (no==="new")
                        ? history.push(`/blog`)
                        : setEnableEdit(false)
                    }}>Cancel</button>
                </li>
                <li>
                    <button onClick={()=>handleSubmit(postContent && postContent.index)}>Save</button>
                </li>
            </ul>
        </div>
    );
}

export default PostEdit;