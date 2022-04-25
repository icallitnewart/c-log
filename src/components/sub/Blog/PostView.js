function PostView({
    postContent, 
    iconTypes, 
    getLocalItems, 
    setEnableEdit, 
    history,
    setPostContent
}) {

    //글 삭제 함수
    const deletePost = (postIndex)=> {
        //확인창 띄우기
        if(!window.confirm("Do you really want to delete the post?")) return;

        const localItems = getLocalItems();
        const removeItem = localItems.filter((item)=> item.index !== postIndex);
        
        //index 초기화 시켜주기
        removeItem.forEach((item, index)=> item.index = removeItem.length - index);

        //각 항목의 데이터값을 로컬스토리지 posts에 저장 
        localStorage.setItem('posts', JSON.stringify(removeItem));

        alert("Your post has been deleted!");

        history.push("/blog");
    };

    //하트 버튼 클릭시
    const clickLikeBtn = (e, postIndex)=> {
        const localItems = getLocalItems();
        const getIndex = localItems.length - postIndex;
        const targetPost = localItems[getIndex];

        //좋아요 수 증가/감소 및 내가 누른 좋아요 true/false값 저장
        if(!postContent.isLiked) {
            targetPost.likes ++;
            targetPost.isLiked = true;
        } else {
            targetPost.likes --;
            targetPost.isLiked = false;
        }

        setPostContent(targetPost);

        //변경된 likes 값을 로컬스토리지 posts에 저장 
        localStorage.setItem('posts', JSON.stringify(localItems));
    }

    return (
        <div className="inner view">
            <div className="titleBox">
                <div className="title">
                    <h2>
                        {postContent.title}
                    </h2>
                    <span className="writer">
                        {postContent.writer}
                    </span>
                    <span className="date">
                        {postContent.date}
                    </span>
                    <span 
                        className={(postContent.isLiked) ? "likes on" : "likes"} 
                        onClick={(e)=>clickLikeBtn(e, postContent.index)}
                    >
                        <i className="fas fa-heart"></i>{postContent.likes}
                    </span>
                </div>
                <div className={`pic ${postContent.category.toLowerCase()}`}>
                    {iconTypes.map((type, index)=> {
                        if(Object.keys(type)[0]===postContent.category) {
                            return <i className={Object.values(type)} key={index}></i>
                        }
                    })}    
                    <span>{postContent.category}</span>
                </div>
            </div>
            <div className="contentBox">
                <p dangerouslySetInnerHTML={ {__html: postContent.content} }></p>
            </div>
            <ul className="btns">
                <li>
                    <button onClick={()=> {history.push('/blog')}}>List</button>
                </li>
                <li>
                    <button onClick={()=>setEnableEdit(true)}>Edit</button>
                </li>
                <li>
                    <button onClick={()=>deletePost(postContent.index)}>Delete</button>
                </li>
            </ul>
        </div>
    );
}

export default PostView;