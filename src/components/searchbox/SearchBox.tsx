import { useEffect, useRef } from "react";
import SearchIcon from "../../assets/icons/Search_Icon.svg";
import style from "./SearchBox.module.scss";
import Button from "../button/Button"

interface ISearchBoxProps {
    setSearchKeyword?: any;
    optimizedFn?: any;
    cancelRequest?: any;
    searchList?: any;
    searchKeyword?: string;
    onClickOutside?: any;
    show?: boolean;
    loadMoreRecordNumber?: number;
    totalPages?: number;
    noOfRecords?: any;
    handleFunction?: Object;
}

export default function SearchBox({
    setSearchKeyword,
    optimizedFn,
    cancelRequest,
    searchList,
    searchKeyword = "",
    onClickOutside,
    show,
    loadMoreRecordNumber,
    totalPages,
    noOfRecords,
    handleFunction
}: ISearchBoxProps) {
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            // @ts-ignore: Unreachable code error
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    const handleSearch = (event: any) => {
        if (event.target.value.length >= 3) {
            cancelRequest();
            setSearchKeyword(event.target.value);
            optimizedFn(event.target.value, 1);
        }
    };

    return (
        <div ref={ref}>
            <div className={`${style.Search_Box_Wrapper} ${show ? style.Focused_Container : ""}`}>
                <div className={`${style.Search_Box} ${style.Display_Flex}`}>
                    <img src={SearchIcon} className={style.Search_Icon_CSS} alt="Search Icon" />
                    <input
                        placeholder="Search by name or ticker"
                        className={style.Input_Search_Box}
                        type="text"
                        onChange={handleSearch}
                    />
                </div>
            </div>
            {show && (<div className={style.DropDown_List_Wrapper}>
                <div data-aos="fade-up" className={style.DropDown_List}>
                    {
                        searchList?.length
                            ?
                            (<div>
                                {searchList.map((company: any, index: number) => {
                                    return (
                                        <div key={index + company.symbol + company.name} className={style.DropDown_List_Content}>
                                            <div className={style.Content_Title}>
                                                <span className={style.First_Line_Title}>{company.symbol}</span>
                                                <p className={style.Second_Line_Title}>{company.name.length > 25 ? company.name.substring(0, 24) + "..." : company.name}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                                {loadMoreRecordNumber !== totalPages && noOfRecords.length > 0 ? <Button handleFunction={handleFunction} type="LOADMORE" /> : null}
                            </div>
                            )
                            :
                            searchKeyword.length < 4
                                ?
                                (
                                    <div className={style.DropDown_List_Content}>
                                        <div className={style.Content_Title}>
                                            <span className={style.First_Line_Title}>Type 3 or more characters</span>
                                            <p className={style.Second_Line_Title}>to start searching</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={style.DropDown_List_Content}>
                                        <div className={style.Content_Title}>
                                            <span className={style.First_Line_Title}>No Company Exists</span>
                                            <p className={style.Second_Line_Title}>with your search query</p>
                                        </div>
                                    </div>
                                )
                    }
                </div>
            </div>)}
        </div>
    )
}