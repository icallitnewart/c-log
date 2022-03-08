import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

const publicSrc = process.env.PUBLIC_URL;

function PostList() {
    const history = useHistory();
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
        <div className="recent">
            <ul>
            <li><h3>Recent <Link to="/blog">more</Link></h3></li>
            {
            posts.map((post, index)=> {
                if(index<5) {
                    return (
                        <li key={index} onClick={()=> history.push(`/blog/${post.index}`)}>
                            <h4>{post.title}</h4>
                            <p>
                                <span className="writer">{post.writer}</span>
                                <span className="date">{post.date}</span>
                                <span className="likes"><i className="fas fa-heart" aria-hidden="true"></i>{post.likes}</span>
                            </p>
                        </li>
                    )
                }
            })
            }
            </ul>
        </div>
        <div className="popular">
            <ul>
            <li><h3>Popular <Link to="/blog">more</Link></h3></li>
            {
            popularPosts.map((post, index)=> {
                if(index<5) {
                    return (
                        <li key={index} onClick={()=> history.push(`/blog/${post.index}`)}>
                            <h4>{post.title}</h4>
                            <p>
                                <span className="writer">{post.writer}</span>
                                <span className="date">{post.date}</span>
                                <span className="likes"><i className="fas fa-heart" aria-hidden="true"></i>{post.likes}</span>
                            </p>
                        </li>
                    )
                }
            })
            }
            </ul>
        </div>
    </>
    )

    async function callData(type) {
		//데이터 불러오기
		await axios
		.get(`${publicSrc}/db/posts.json`)
		.then((data)=> {
			let items = data.data.data;
			items = items.reverse();
			
			//로컬스토리지에 저장된 값이 있을 경우
			if(getLocalItems() && getLocalItems().length!==0) {
				//로컬스토리지에 저장된 값을 posts state에 저장
				setPosts(getLocalItems());

                //로컬스토리지에서 가져온 데이터의 likes값이 가장 큰 순서로 분류
                const arr = [...getLocalItems()];
                const popularPosts = arr.sort(((a, b)=> b.likes - a.likes));
                setPopularPosts(popularPosts);

			} else {	//로컬스토리지에 저장된 값이 없을 경우
				//axios로 불러온 default 데이터를 posts state에 저장
				setPosts(items);

                //default 데이터의 likes값이 가장 큰 순서로 분류
                const arr = [...items];
                const popularPosts = arr.sort(((a, b)=> b.likes - a.likes));
                setPopularPosts(popularPosts);
			}
		});

    }
}

export default PostList;