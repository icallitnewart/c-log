import { useEffect, useState, useLayoutEffect } from "react";

function Pagination({ itemsPerPage, totalItems, setPage, currentPage }) {
    //총 페이지 번호 셋팅
    const pageNumbers = [];
    const pageLen = Math.ceil(totalItems/itemsPerPage);
    for(let i=1; i<=pageLen; i++) {
        pageNumbers.push(i);
    }

    //보여지는 페이지 범위 설정
    const [ pageRange, setPageRange ] = useState([]);
    const minPageCount = 5, maxPageCount = 10;
    const isTabletSize = window.matchMedia('screen and (max-width: 899px)').matches;
    const [ pageCount, setPageCount ] = useState(isTabletSize ? minPageCount : maxPageCount);

    //페이지 화살표 버튼 클릭시
    const changePage = (targetIndex)=> {
        //첫 페이지 - 1, 마지막 페이지 + 1로 이동 시도시 동작 종료
        if(targetIndex === pageNumbers[0] - 1 || 
            targetIndex === pageNumbers[pageNumbers.length - 1] + 1
        ) return;

        //타겟 페이지 번호가 보여지는 페이지 번호에 해당되지 않을 경우 페이지 번호 범위 재설정
        if(!pageRange.includes(targetIndex)) {
            const range = pageNumbers.filter((num)=> 
                (targetIndex > currentPage) ?
                    //next 버튼 클릭시
                    num>=targetIndex && num<=targetIndex + pageCount - 1
                :   //prev 버튼 클릭시
                    num<=targetIndex && num>=targetIndex - pageCount + 1
            );
            setPageRange(range);
        }
        
        //페이지 변경
        setPage(targetIndex);
    };

    //화면 resize시 페이지 범위 재설정 함수
    const changePageCount = ()=> {
        (window.matchMedia('screen and (max-width: 899px)').matches) 
        ? setPageCount(minPageCount) 
        : setPageCount(maxPageCount);
    };

    useEffect(()=> {
        //처음에 보여지는 페이지 번호 범위 설정
        const range = pageNumbers.filter((num)=> num <= pageCount);
        setPageRange(range);

        //화면 resize시 스크린 사이즈에 따라 보여지는 페이지 번호 개수 재설정
        window.addEventListener("resize", changePageCount);
        return ()=> window.removeEventListener("resize", changePageCount);
    }, []);

    //화면 resize로 인해 페이지 범위 변경이 필요한 경우
    useLayoutEffect(()=> {
        //페이지 번호 범위 재설정
        const startPage = currentPage - ((currentPage % pageCount === 0) ? pageCount : (currentPage % pageCount));
        const range = pageNumbers.filter((num)=> num > startPage && num <= startPage + pageCount);
        setPageRange(range);
    }, [pageCount]);

    return (
        <div className="pagination">
            <span 
                className="prevBtn" 
                onClick={()=> changePage(currentPage - 1)}
            >
                <i className="fas fa-arrow-left"></i>
            </span>
            <ul>
                {pageRange.map((page, index)=> 
                    <li 
                        key={index} 
                        className={(page === currentPage) ? "on" : ""}
                    >
                        <span onClick={()=> setPage(page)}>{page}</span>
                    </li>
                )}
            </ul>
            <span 
                className="nextBtn" 
                onClick={()=> changePage(currentPage + 1)}
            >
                <i className="fas fa-arrow-right"></i>
            </span>
        </div>
    )
}

export default Pagination;