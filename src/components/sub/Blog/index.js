import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Post from "./Post";
import PostList from "./PostList";
import Tab from "../../common/Tab";

const publicSrc = process.env.PUBLIC_URL;

function Blog({ history, match }) {
	const { no } = match.params;
    let [ loading, setLoading ] = useState(true);
    let [ posts, setPosts ] = useState([]);
	let [ enableClick, setEnableClick ] = useState(true);
	const view = useRef();

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
			<Tab />
            <section className="content">
                <h1>BLOG</h1>
                <div className="intro">
                    <p>코딩 공부를 기록한 블로그 페이지입니다. 로컬스토리지로 구현한 CRUD 기능, 좋아요 버튼 클릭, 페이지 번호 이동, 게시글 목록 보기 타입 변경 등이 지원됩니다.</p>
                </div>
				{(!loading && no)
				? 	<Post post={posts[posts.length - no]} no={no} history={history} />
				: 	<PostList loading={loading} posts={posts} history={history} no={no} ref={view} callData={callData} />
				}
            </section>
        </div>
    </main>
    )

    async function callData(type) {
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
	
				//버튼 활성화
				for(let btn of viewBtns) {
					btn.disabled = false;
				}
	
			}, 500)

		}

    }
}

export default Blog;