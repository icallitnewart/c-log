import { useEffect, useState } from "react";
import { useScreenSize } from "../../../hooks/useScreenSize";

function Pagination({ itemsPerPage, totalItems, setPage, currentPage }) {
    const pageLen = Math.ceil(totalItems/itemsPerPage);
    const screenSize = useScreenSize();

    const [ pageRange, setPageRange ] = useState([]);
    const [ pageLimit, setPageLimit ] = useState(5);
    const calculatePage = (currentPage % pageLimit === 0) ? Math.floor(currentPage / pageLimit) - 1 : Math.floor(currentPage / pageLimit);
    const lastIndex = (calculatePage + 1) * pageLimit;
    const firstIndex = lastIndex - pageLimit + 1;

    const [ isClicked, setIsClicked ] = useState({ prev: false, next: false });

    useEffect(()=> {
        //페이지 번호 범위 설정
        const pageNumbers = [];
        for(let i=1; i<=pageLen; i++) {
            pageNumbers.push(i);
        }
        setPageRange(pageNumbers);

        //pageLen이 변경될 때 currentPage가 pageLen보다 클 경우 마지막 페이지로 설정
        if(currentPage > pageLen ) setPage(pageLen);
    }, [pageLen]);

    //스크린 사이즈에 따라 pageLimit 변경
    useEffect(()=> {
        (screenSize==="tablet" || screenSize==="mobile") 
        ? setPageLimit(5)
        : setPageLimit(10);
    }, [screenSize]);

    return (
        <div className="pagination">
            <button 
                className={isClicked.prev ? "prevBtn on" : "prevBtn"} 
                onClick={()=> setPage(currentPage - 1)
                }
                onMouseDown={()=> setIsClicked({ ...isClicked, prev : true })}
                onMouseUp={()=> setIsClicked({ ...isClicked, prev : false })}
                disabled={currentPage === 1}
            >
                <i className="fas fa-arrow-left"></i>
            </button>
            <ul>
                {pageRange.slice(firstIndex-1, lastIndex).map((page, index)=> 
                    <li 
                        key={index} 
                        className={(page === currentPage) ? "on" : ""}
                    >
                        <span onClick={()=> setPage(page)}>{page}</span>
                    </li>
                )}
            </ul>
            <button 
                className={isClicked.next ? "nextBtn on" : "nextBtn"} 
                onClick={()=> setPage(currentPage + 1)}
                onMouseDown={()=> setIsClicked({ ...isClicked, next : true })}
                onMouseUp={()=> setIsClicked({ ...isClicked, next : false })}
                disabled={currentPage === pageLen}
            >
                <i className="fas fa-arrow-right"></i>
            </button>
        </div>
    )
}

export default Pagination;