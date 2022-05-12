function Category({ activeType, setActiveType, getFlickr }) {
	const types = [ "popular", "cats", "dogs" ];

    return (
        <ul className="category">
            {types.map((type, index)=>
                <li key={index}
                    className={activeType === type ? "on clicked" : ""}>
                    <a href="#" 
                        onClick={(e)=> {
                            e.preventDefault();
                            getFlickr(type);
                            setActiveType(type);
                    }}>{type}</a>
                </li>
            )}
        </ul>
    )
}

export default Category;