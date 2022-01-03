import { useEffect, useState, useRef } from "react";
import Loading from "../common/Loading";
import Masonry from 'react-masonry-component';
import axios from "axios";

const body = document.querySelector("body");
const masonryOptions = {
	fitWidth: false, 
	gutter: 0,
	itemSelector: ".item"
}

function Playlist() {
	const key = process.env.REACT_APP_YOUTUBE_KEY;
	const playListId = "PL3LaS8gF6Q5vLmQJCVTd8XESoGGVgwvUl";
	const num = 25;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;

	let [ loading, setLoading ] = useState(false);
	let [ items, setItems ] = useState([]);
	let [ popup, setPopup ] = useState({
		isVisible: false,
		index: null
	});
	
	const vid = useRef(null);

	useEffect(()=> {
		getPlaylist();
	}, []);

	return(
	<main className="playlist">
		<div className="inner">
			<div className="tab">
				<div className="topMark">
					<span>C/</span>
					<span>Playlist</span>
				</div>
				<div className="btns">
					<span>─</span>
					<span>ㅁ</span>
					<span>x</span>
				</div>
				<div className="addressBar">
					<span><i className="fas fa-arrow-left"></i></span>
					<span><i className="fas fa-arrow-right"></i></span>
					<span><i className="fas fa-redo-alt"></i></span>
					<p>https://icallitnewart.github.io/c-log/playlist</p>
				</div>
			</div>
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
		{ (popup.isVisible) ? <Popup /> : null }
	</main>
	)

	function Popup() {
		const targetItem = items[popup.index];
		const vidId = targetItem.snippet.resourceId.videoId;

		useEffect(()=> {
			//vid.current.playVideo();
			body.style.overflow = "hidden";

			return ()=> {
				body.style.overflow = "auto";
			}
		}, []);

		return(
		<div className="popup">
			<div className="inner">
				<div className="tab">
					<span></span>
					<span></span>
					<span onClick={()=> setPopup({
						isVisible: false,
						index: null
					})}>x</span>
				</div>
				<div className="wrap">
					<div className="player">
						<div className="vinyl">
							<div className='record'></div>
						</div>
						<ul className="btns">
							<li className="on"><a href="
							#"><i className="fas fa-play"></i></a></li>
							<li><a href="
							#"><i className="fas fa-pause"></i></a></li>
						</ul>
					</div>
					<div className="video">
						<iframe ref={vid} src={`https://www.youtube.com/embed/${vidId}?autoplay=1&controls=0&enablejsapi=1`} width="100%" height="100%" allowFullScreen></iframe> 
						<p><span>{targetItem.snippet.title}</span></p>
						<p><span>{targetItem.snippet.videoOwnerChannelTitle}</span></p>
					</div>
				</div>
			</div>
		</div>
		)
	}

	async function getPlaylist() {
		if(!loading) setLoading(true);

		await axios
		.get(url)
		.then((data)=> {
			setItems(data.data.items);
			//console.log(data.data.items);
		});

		setLoading(false);
	}
}

export default Playlist;