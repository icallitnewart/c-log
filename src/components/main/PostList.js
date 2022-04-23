import { useEffect, useState } from 'react';
import axios from "axios";
import List from "./List";

const publicSrc = process.env.PUBLIC_URL;

function PostList() {
    let [ posts, setPosts ] = useState([]);
    let [ popularPosts, setPopularPosts ] = useState([]);
    
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
    
    const callData = async ()=> {
		//데이터 불러오기
		await axios
		.get(`${publicSrc}/db/posts.json`)
		.then((data)=> {
			let items = data.data.data;
			items = items.reverse();
            let arr = [];
			
			//로컬스토리지에 저장된 값이 있을 경우
			if(getLocalItems() && getLocalItems().length!==0) {
				//로컬스토리지에 저장된 값을 posts state에 저장
				setPosts(getLocalItems());
                arr = [...getLocalItems()];
			} else {	//로컬스토리지에 저장된 값이 없을 경우
				//axios로 불러온 default 데이터를 posts state에 저장
				setPosts(items);
                arr = [...items];
			}

            //가져온 데이터의 likes값이 가장 큰 순서로 분류
            const popularPosts = arr.sort(((a, b)=> b.likes - a.likes));
            setPopularPosts(popularPosts);
		});
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

    return (
        <>
            <List type="recent" data={posts} />
            <List type="popular" data={popularPosts} />
        </>
    )

}

export default PostList;