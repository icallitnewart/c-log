import { useState } from "react";

function Category({ iconTypes, callData }) {
    const [ activeCategory, setActiveCategory ] = useState(null);

    //카테고리 버튼 클릭시
    const classifyByCategory = (e)=> {
        //중복 클릭 방지
        if(e.currentTarget.classList.contains("on")) return;

        //카테고리 타입에 따른 데이터 호출
        const category = e.currentTarget.dataset.type;
        callData(category);
        setActiveCategory(category);
    };

    return (
        <ul className="category">
            {iconTypes.map((item, index)=>
                <li 
                    key={index}
                    onClick={classifyByCategory} 
                    className={activeCategory===Object.keys(item).toString() ? "on" : ""}
                    data-type={Object.keys(item)}
                >
                    <span>{Object.keys(item)}</span>
                </li>
            )}
        </ul>
    )
}

export default Category;