import { useState, useRef } from "react";
import Editor from "./Editor";

function PostEdit({ 
    postContent, 
    getLocalItems,
    iconTypes, 
    no, 
    setEnableEdit, 
    history 
}) {
    const icon = useRef(null);
    const [ category, setCategory ]  = useState(postContent ? postContent.category : "REACT");

    return (
        <div className="inner edit">
            <div className="selectPic">
                {/* 큰 아이콘 */}
                <div 
                    className={`pic ${category.toLowerCase()}`} 
                    ref={icon} 
                    data-type={category}
                > 
                    {iconTypes.map((type, index)=> {
                        if(Object.keys(type)[0]===category) {
                            return <i className={Object.values(type)} key={index}></i>
                        }
                    })}
                    <span>{category}</span>
                </div>
                <p><span>CATEGORY</span></p>
                {/* 작은 아이콘 */}
                <ul>
                    {iconTypes.map((icon, index)=> {
                        const type = Object.keys(icon)[0];
                        const type2 = type.toLowerCase();
                        return (
                            <li 
                                key={index}
                                className={
                                    category===type
                                        ? `${type2} on` 
                                        : type2
                                } 
                                onClick={()=> setCategory(type)} 
                                data-type={type}
                            >
                                <i className={Object.values(icon)}></i>
                                <span>{type}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Editor 
                postContent={postContent}
                no={no}
                setEnableEdit={setEnableEdit}
                getLocalItems={getLocalItems}
                history={history}
                icon={icon}
            />
        </div>
    );
}

export default PostEdit;