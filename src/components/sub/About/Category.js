function Category({ data, callData }) {
    const category = [ "Intro", "About me", "Blog", "Gallery", "Playlist", "Contact" ];
    
    //카테고리 버튼 클릭시
    const clickTab =(e)=> {

        //클릭한 카테고리의 내용이 이미 보여지고 있는 상태라면 작동 불가 
        const targetCategory = e.currentTarget.querySelector("span").innerText;
        if(data.category===targetCategory) return;

        //카테고리에 따른 데이터 불러오기
        callData(targetCategory);
    };

    return (
        <ul className="category">
            {category.map((item, index)=>
                <li 
                    key={index} 
                    onClick={clickTab} 
                    className={(data.category === item) ? "on" : ""}
                >
                    <span>{item}</span>
                </li>
            )}
        </ul>
    )
}

export default Category;