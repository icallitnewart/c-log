import { Link, useHistory } from 'react-router-dom';

function List({ type, data }) {
    const history = useHistory();

    return (
        <div className={type}>
            <ul>
                <li>
                    <h3>{type} <Link to="/blog">more</Link></h3>
                </li>
                {data.slice(0, 5).map((post, index)=> 
                    <li key={index} onClick={()=> history.push(`/blog/${post.index}`)}>
                        <h4>{post.title}</h4>
                        <p>
                            <span className="writer">{post.writer}</span>
                            <span className="date">{post.date}</span>
                            <span className="likes"><i className="fas fa-heart" aria-hidden="true"></i>{post.likes}</span>
                        </p>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default List;