function Btns({ history, setViewType, loading }) {
    return (
        <div className="btns">
            <div className="writeBtns">
                <button onClick={()=> history.push(`/blog/new`)}>Write</button>
            </div>
            <ul className="viewType">
                <li>
                    <input 
                        onClick={()=> setViewType("list")}  
                        type="radio" 
                        id="listView" 
                        name="viewType" 
                        disabled={loading}
                        defaultChecked 
                    />
                    <label 
                        onClick={()=> setViewType("list")} 
                        htmlFor="listView"
                    > 
                        <span className="hidden">List View</span>
                        <i className="fas fa-th-list"></i>
                    </label>
                </li>
                <li>
                    <input 
                        onClick={()=> setViewType("grid")} 
                        type="radio" 
                        id="gridView" 
                        disabled={loading}
                        name="viewType" 
                    />
                    <label 
                        onClick={()=> setViewType("grid")} 
                        htmlFor="gridView"
                    >
                        <span className="hidden">Grid View</span>
                        <i className="fas fa-th"></i>
                    </label>
                </li>
            </ul>
        </div>

    )
}

export default Btns;