import { useEffect, useState } from "react";
import PostEdit from "./PostEdit";
import PostView from "./PostView";

function Post({ post, no, history }) {
    const [ postContent, setPostContent ] = useState(post);
    const [ enableEdit, setEnableEdit ] = useState(false);
    
    const iconTypes = [
        { HTML : "fab fa-html5" },
        { CSS : "fab fa-css3-alt" },
        { JS : "fab fa-js" },
        { REACT : "fab fa-react" }
    ];

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

    const obj = {
        postContent,
        iconTypes,
        getLocalItems,
        no,
        setEnableEdit,
        history,
        setPostContent
    };

    useEffect(()=> {
        //새로운 글 작성시 postContent state값 null로 설정
        if(no==="new") setPostContent(null);
    }, []);

    return (
        <div className="wrap postView">
        {postContent
        ?
            !enableEdit 
            ? <PostView {...obj} /> 
            : <PostEdit {...obj} />
        : <PostEdit {...obj} />
        }
        </div>
    )
}

export default Post;