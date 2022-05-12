function Dialogue({ activeEffect, data }) {
    return (
        <ul className="conversation">
            {activeEffect && data.items.map((item, index)=> {
                //말풍선 모션 이펙트 적용 여부
                const isActive =  (activeEffect.indexOf(index) === -1) ? false : true;
                const isQuestion = Object.keys(item)[0]==="question" ? true : false;

                return (
                    <li 
                        key={data.category + index} 
                        className={
                            isActive 
                            ? `${Object.keys(item)} on`
                            : Object.keys(item)
                        }
                    >
                        <div className="pic">
                            <img src={`https://icallitnewart.github.io/c-log/img/${isQuestion ? "your" : "my"}profile.png`} alt={isQuestion ? "상대방 프로필 이미지" : "나의 프로필 이미지"} />
                        </div>
                        <div className="speechBubble">
                            <div className="inner">
                            <span>{Object.values(item)}</span>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default Dialogue;