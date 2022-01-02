import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import Masonry from 'react-masonry-component';

const masonryOptions = {
	fitWidth: false, 
	gutter: 0,
	itemSelector: ".item"
}

function Gallery() {
	let [ images, setImages ] = useState([]);
	let [ loading, setLoading ] = useState(true);
	let [ enableClick, setEnableClick ] = useState(true);

	useEffect(()=> {
		getFlickr("fav");
	}, []);

	return(
	<main className="gallery">
		<div className="inner">
			<div className="tab">
				<div className="topMark">
					<span>C/</span>
					<span>GALLERY</span>
				</div>
				<div className="btns">
					<span>─</span>
					<span>ㅁ</span>
					<span>x</span>
				</div>
				<div className="addressBar">
					<span>←</span>
					<span>→</span>
					<p>https://icallitnewart.github.io/c-log/gallery</p>
				</div>
			</div>
			<section className="content">
				<h1>GALLERY</h1>
				<p className="intro">
					<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident facere explicabo necessitatibus nemo consequuntur delectus vel placeat cupiditate laborum quisquam?</span>
				</p>
				<div className="wrap">
					<ul className="category">
						<li className="on"><a href="#" onMouseDown={(e)=>{clicked(e, "down")}} onMouseUp={(e)=> {clicked(e, "up")}} onClick={(e)=> {
							e.preventDefault();
							getFlickr("fav");
						}}>popular</a></li>
						<li><a href="#" onMouseDown={(e)=>{clicked(e, "down")}} onMouseUp={(e)=> {clicked(e, "up")}} onClick={(e)=> {
							e.preventDefault();
							getFlickr("cats");
						}}>cats</a></li>
						<li><a href="#" onMouseDown={(e)=>{clicked(e, "down")}} onMouseUp={(e)=> {clicked(e, "up")}} onClick={(e)=> {
							e.preventDefault();
							getFlickr("dogs");
						}}>dogs</a></li>
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
									<article className="item" key={index}>
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
	</main>
	)

	function clicked(e, mouse) {
		if(mouse==="down") {
			e.preventDefault();
			e.currentTarget.parentElement.classList.add("clicked");
		} 
		else if(mouse==="up") {
			e.currentTarget.parentElement.classList.remove("clicked");
		}
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