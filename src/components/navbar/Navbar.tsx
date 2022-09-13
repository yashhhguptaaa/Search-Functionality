import { useState, useContext } from "react";
import SmallcaseIcon from "../../assets/icons/Smallcase_Icon.svg";
import SearchBox from "../searchbox/SearchBox";
import style from "./Navbar.module.scss";
import { AppDetailsContext } from "../../context";

export default function Navbar() {
    let [showInfo1, setShowInfo1] = useState<boolean>(false);
    let setSearchKeyword = () => null,
        optimizedFn = () => null,
        searchList: any = [],
        searchKeyword = "",
        cancelRequest = () => null,
        loadMoreRecordNumber = 0,
        totalPages = 0,
        noOfRecords = [],
        handleFunction = () => null;

    const contextObj: any = useContext(AppDetailsContext);
    if (contextObj) {
        setSearchKeyword = contextObj.setSearchKeyword;
        optimizedFn = contextObj.optimizedFn;
        searchList = contextObj.searchList;
        searchKeyword = contextObj.searchKeyword;
        cancelRequest = contextObj.cancelRequest;
        loadMoreRecordNumber = contextObj.loadMoreRecordNumber;
        totalPages = contextObj.totalPages;
        noOfRecords = contextObj.noOfRecords;
        handleFunction = contextObj.loadMore;
    }

    return (
        <div data-aos="fade-down" data-aos-duration="500" className={`${style.Header_Container} ${style.Display_Flex}`}>
            <div className={`${style.Header_Container_Navbar_Wrapper} ${style.Display_Flex}`}>
                <div className={`${style.Header_Container_Navbar} ${style.Display_Flex}`}>
                    <img src={SmallcaseIcon} className={style.Smallcase_Icon_Image} alt="Smallcase Icon" />
                    <div onClick={() => setShowInfo1(true)}>
                        <SearchBox
                            setSearchKeyword={setSearchKeyword}
                            optimizedFn={optimizedFn}
                            cancelRequest={cancelRequest}
                            searchList={searchList}
                            searchKeyword={searchKeyword}
                            show={showInfo1}
                            onClickOutside={() => { setShowInfo1(false) }}
                            loadMoreRecordNumber={loadMoreRecordNumber}
                            totalPages={totalPages}
                            noOfRecords={noOfRecords}
                            handleFunction={handleFunction}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}