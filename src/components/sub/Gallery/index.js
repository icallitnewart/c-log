import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Loading from "../../common/Loading";
import Tab from "../../common/Tab";
import Masonry from 'react-masonry-component';

const masonryOptions = {
	fitWidth: false, 
	gutter: 0,
	itemSelector: ".item"
}

const body = document.querySelector("body");

function Gallery() {
	let [ images, setImages ] = useState([]);
	let [ loading, setLoading ] = useState(true);
	let [ enableClick, setEnableClick ] = useState(true);
	let [ popup, setPopup ] = useState({
		isVisible: false,
		index: null
	});
	const category = useRef(null);

	useEffect(()=> {
		getFlickr("fav");
	}, []);

	return(
	<main className="gallery">
		<div className="inner">
			<Tab />
			<section className="content">
				<h1>GALLERY</h1>
				<div className="intro">
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident facere explicabo necessitatibus nemo consequuntur delectus vel placeat cupiditate laborum quisquam?</p>
				</div>
				<div className="wrap">
					<ul className="category" ref={category}>
						<li className="on"><a href="#" onMouseDown={(e)=>{clicked(e, "down")}} onClick={(e)=> {
							e.preventDefault();
							clicked(e, "up");
							activation(e);
							getFlickr("fav");
						}}>popular</a></li>
						<li><a href="#" onMouseDown={(e)=>{clicked(e, "down")}} onClick={(e)=> {
							e.preventDefault();
							clicked(e, "up");
							activation(e);
							getFlickr("cats");
						}}>cats</a></li>
						<li><a href="#" onMouseDown={(e)=>{clicked(e, "down")}} onClick={(e)=> {
							e.preventDefault();
							clicked(e, "up");
							activation(e);
							getFlickr("dogs");
						}} onDragEnd={(e)=> 
							clicked(e, "up")}>dogs</a></li>
					</ul>
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
								images.map((img, index)=> {
									let imgSrc = `https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}_m.jpg`;

									return(
									<article className="item" key={index} onClick={()=> setPopup({
										isVisible: true,
										index
									})}>
										<img src={imgSrc} alt={img.title} />
										<div className="desc">
											<p><span>{img.title}</span></p>
											<span>{img.owner}</span>
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
		const targetImg = images[popup.index];
		const imgSrc = `https://live.staticflickr.com/${targetImg.server}/${targetImg.id}_${targetImg.secret}_b.jpg`;

		useEffect(()=> {
			body.style.overflow = "hidden";

			return ()=> {
				body.style.overflow = "auto";
			};
		}, []);

		return (
		<aside className="popup">
			<div className="inner">
			<div className="wrap">
				<div className="tab">
					<span></span>
					<span></span>
					<span onClick={()=> setPopup({
						isVisible: false,
						index: null
					})}>x</span>
				</div>
				<div className="imgBox">
					<h1>{targetImg.title}</h1>
					<img src={imgSrc} alt={targetImg.title} />
				</div>
			</div>
			</div>
		</aside>
		)
	}

	function clicked(e, mouse) {
		if(mouse==="down") {
			e.preventDefault();
			e.currentTarget.parentElement.classList.add("clicked");
			
		} 
		else if(mouse==="up") {
			e.currentTarget.parentElement.classList.remove("clicked");
		}
	}

	function activation(e) {
		const btns = category.current.querySelectorAll("li a");

		for(let btn of btns) {
			btn.parentElement.classList.remove("on");
		}
		e.currentTarget.parentElement.classList.add("on");
	}

	async function getFlickr(type) {
		const baseURL = "https://www.flickr.com/services/rest/?";
		const key = process.env.REACT_APP_FLICKR_KEY;
		const per_page = 50;
		const format = "json";
		let url; 
		let galleryId;
		let method;

		if(!enableClick) return;
		if(!loading) setLoading(true);
		setEnableClick(false);

		if(type==="fav") {
			method = "flickr.interestingness.getList";
			url = `${baseURL}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&privacy_filter=1&gallery_id=${galleryId}`;
		}
		else if(type==="cats") {
			method = "flickr.galleries.getPhotos";
			galleryId = "72157720175639278";
			url = `${baseURL}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&privacy_filter=1&gallery_id=${galleryId}`;
		}

		else if(type==="dogs") {
			method = "flickr.galleries.getPhotos";
			galleryId = "72157720301001299";
			url = `${baseURL}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&privacy_filter=1&gallery_id=${galleryId}`;
		}

		await axios
		.get(url)
		.then((data)=> {
			setImages(data.data.photos.photo);
			//console.log(data.data.photos.photo);
		});

		setLoading(false);
		setEnableClick(true);
	}
}

export default Gallery;