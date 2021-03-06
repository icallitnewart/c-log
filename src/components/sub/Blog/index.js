import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./Post";
import PostList from "./PostList";
import Tab from "../../common/Tab";

const publicSrc = process.env.PUBLIC_URL;

function Blog({ history, match }) {
	const { no } = match.params;
    let [ loading, setLoading ] = useState(true);
    let [ posts, setPosts ] = useState([]);
	let [ enableClick, setEnableClick ] = useState(true);

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

	const callData = async (type)=> {
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
			
			//로컬스토리지에 저장된 값이 있을 경우
			if(getLocalItems() && getLocalItems().length!==0) {
				//로컬스토리지에 저장된 값을 posts state에 저장
				//로컬스토리지에 저장된 데이터를 타입에 따라 분류하기
				const classifiedItems = getLocalItems().filter((item)=> item.category === type);

				(classifiedItems.length === 0) 
				//처음 로딩시 (버튼 클릭 X)
				? setPosts(getLocalItems())
				//상단의 카테고리 버튼 클릭시 분류한 데이터를 저장
				: setPosts(classifiedItems)	

			} else {	//로컬스토리지에 저장된 값이 없을 경우
				//axios로 불러온 default 데이터를 posts state에 저장
				//axios로 불러온 데이터를 타입에 따라 분류하기
				const classifiedItems = items.filter((item)=> item.category === type);

				//로컬스토리지에 저장된 값을 posts state에 저장
				(classifiedItems.length === 0) 
				//처음 로딩시 (버튼 클릭 X)
				? setPosts(items)
				//상단의 카테고리 버튼 클릭시 분류한 데이터를 저장
				: setPosts(classifiedItems)
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
			}, 500)
		}
    }

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
			<Tab />
            <section className="content">
                <h1>BLOG</h1>
				{(!loading && no)
				? 	// URL: /blog/~ (포스트 내용 보기, 작성, 수정)
					<Post 
						post={posts[posts.length - no]} 
						no={no} 
						history={history} 
					/>
				: 	// URL: /blog (포스트 목록 보기)
					<PostList 
						loading={loading} 
						posts={posts} 
						history={history} 
						no={no} 
						callData={callData} 
					/>
				}
            </section>
        </div>
    </main>
    )
}

export default Blog;