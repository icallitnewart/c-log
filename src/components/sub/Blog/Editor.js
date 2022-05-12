import { useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor({ 
    postContent, 
    no, 
    setEnableEdit, 
    getLocalItems, 
    history, 
    icon 
}) {
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

    const handleChange = (e, data)=> {
        if(data !== undefined) {
            setInputs({ ...inputs, "postContent" : data });
        } else {
            const { value, name } = e.target;
            setInputs({ ...inputs, [name] : value });
        }
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
        <>
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
                    <td className="ckeditor">
                        <CKEditor
                            editor={ ClassicEditor }
                            data={postContent && postContent.content}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "500px",
                                        editor.editing.view.document.getRoot()
                                    );
                                    writer.setStyle(
                                        "background",
                                        "#dee9f8",
                                        editor.editing.view.document.getRoot()
                                    );
                                    writer.setStyle(
                                        "border",
                                        "none",
                                        editor.editing.view.document.getRoot()
                                    );
                                    writer.setStyle(
                                        "border-top",
                                        "1px solid #333 !important",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                handleChange(null, data);
                            }}
                            config={{
                                toolbar : {
                                    items: [ 'heading', 'bold', 'italic', '|', 'undo', 'redo', '|', 'numberedList', 'bulletedList'],
                                    shouldNotGroupWhenFull: true
                                }
                            }}
                        />
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
        </>
    )
}

export default Editor;