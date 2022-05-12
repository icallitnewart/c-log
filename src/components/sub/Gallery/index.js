import { useEffect, useState } from "react";
import axios from "axios";
import Masonry from 'react-masonry-component';

import Loading from "../../common/Loading";
import Tab from "../../common/Tab";
import Popup from "./Popup";
import Category from "./Category";

const masonryOptions = {
	fitWidth: false, 
	gutter: 0,
	itemSelector: ".item"
}

function Gallery() {
	const [ images, setImages ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ enableClick, setEnableClick ] = useState(true);
	const [ activeType, setActiveType ] = useState("popular");
	const [ popup, setPopup ] = useState({
		isVisible: false,
		index: null
	});

	//데이터 호출
	const getFlickr = async(type)=> {
		const baseURL = "https://www.flickr.com/services/rest/?";
		const key = process.env.REACT_APP_FLICKR_KEY;
		const per_page = 50;
		const format = "json";
		let url = null; 
		let galleryId = null;
		let method = null;

		if(!enableClick) return;
		if(!loading) setLoading(true);
		setEnableClick(false);

		switch (type) {
			case "cats" :
				method = "flickr.galleries.getPhotos";
				galleryId = "72157720175639278";
				url = `${baseURL}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&privacy_filter=1&gallery_id=${galleryId}`;
				break;
			case "dogs" :
				method = "flickr.galleries.getPhotos";
				galleryId = "72157720301001299";
				url = `${baseURL}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&privacy_filter=1&gallery_id=${galleryId}`;
				break;
			default :
				method = "flickr.interestingness.getList";
				url = `${baseURL}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&privacy_filter=1&gallery_id=${galleryId}`;
		}

		await axios
		.get(url)
		.catch((error)=> console.error(error))
		.then((data)=> {
			setImages(data.data.photos.photo);
		});

		setLoading(false);
		setEnableClick(true);
	};

	useEffect(()=> {
		getFlickr(activeType);
	}, [activeType]);

	return(
	<main className="gallery">
		<div className="inner">
			<Tab />
			<section className="content">
				<h1>GALLERY</h1>
				<div className="wrap">
					<Category 
						activeType={activeType}
						setActiveType={setActiveType}
						getFlickr={getFlickr}
					/>
					{loading 
					? <Loading />
					: 	<>
						<Masonry
							className={"frame"} 
							elementType={"div"} 
							disableImagesLoaded= {false}
							updateOnEachImageLoad= {false}
							options= {masonryOptions}
						> 
						{images.map((img, index)=> {
							let imgSrc = `https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}_m.jpg`;

							return (
								<article 
									className="item" 
									key={index} 
									onClick={()=> setPopup({
										isVisible: true,
										index
									})}
								>
									<img src={imgSrc} alt={img.title} />
									<div className="desc">
										<p><span>{img.title}</span></p>
										<span>{img.owner}</span>
									</div>
								</article>
							)
						})}
						</Masonry>
						</>
					}
				</div>
			</section>
		</div>
		{ (popup.isVisible) && 
			<Popup
				images={images}
				popup={popup}
				setPopup={setPopup}
			/>
		}
	</main>
	)
}

export default Gallery;