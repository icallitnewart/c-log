import { useEffect, useState } from "react";
import Masonry from 'react-masonry-component';
import axios from "axios";

import Loading from "../../common/Loading";
import Tab from "../../common/Tab";
import Popup from "./Popup";

const masonryOptions = {
	fitWidth: false, 
	gutter: 0,
	itemSelector: ".item"
}

function Playlist() {
	const key = process.env.REACT_APP_YOUTUBE_KEY;
	const playListId = process.env.REACT_APP_YOUTUBE_PLAYLIST;
	const num = 25;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;

	let [ loading, setLoading ] = useState(false);
	let [ items, setItems ] = useState([]);
	let [ popup, setPopup ] = useState({
		isVisible: false,
		index: null
	});
	
	//데이터 호출
	const getPlaylist= async ()=> {
		if(!loading) setLoading(true);

		await axios
		.get(url)
		.catch((error)=> console.error(error))
		.then((data)=> {
			setItems(data.data.items);
		});

		setLoading(false);
	}

	useEffect(()=> {
		getPlaylist();
	}, []);

	return(
	<main className="playlist">
		<div className="inner">
			<Tab />
			<section className="content">
				<h1>PLAYLIST</h1>
				<div className="wrap">
					{ loading ? <Loading />
						: ( 
							<>
							<Masonry
								className={"frame"} 
								elementType={"div"} 
								disableImagesLoaded= {false}
								updateOnEachImageLoad= {false}
								options= {masonryOptions}
							> 
							{
								items.map((item, index)=> {
								return(
									<article className="item" key={index} onClick={()=>setPopup({
										isVisible: true,
										index
									})}>
										<div className="pic">
											<img src={item.snippet.thumbnails.medium.url} alt="" />
											<ul>
												<li><span></span></li>
												<li><span></span></li>
												<li><span></span></li>
											</ul>
										</div>
										<div className="textBox">
											<p>{item.snippet.title}</p>
											<span>{item.snippet.videoOwnerChannelTitle}</span>
										</div>
									</article>
								)
								})
							}
							</Masonry>
							</>
						)
					}
				</div>
			</section>
		</div>
		{ (popup.isVisible) &&
			<Popup 
				items={items} 
				popup={popup}
				setPopup={setPopup} 
			/> 
		}
	</main>
	)
}

export default Playlist;