import { useState, useContext } from "react";
import SmallcaseIcon from "../../assets/icons/Smallcase_Icon.svg";
import SearchBox from "../searchbox/SearchBox";
import style from "./Navbar.module.scss";
import { AppDetailsContext } from "../../context";

export default function Navbar() {
    let [showInfo1, setShowInfo1] = useState<boolean>(false);
    const { setSearchKeyword, optimizedFn, searchList, searchKeyword }: any = useContext(AppDetailsContext);
    return (
        <div data-aos="fade-down" data-aos-duration="500" className={`${style.Header_Container} ${style.Display_Flex}`}>
            <div className={`${style.Header_Container_Navbar_Wrapper} ${style.Display_Flex}`}>
                <div className={`${style.Header_Container_Navbar} ${style.Display_Flex}`}>
                    <img src={SmallcaseIcon} className={style.Smallcase_Icon_Image} alt="Smallcase Icon" />
                    <div onClick={() => setShowInfo1(true)}>
                        <SearchBox setSearchKeyword={setSearchKeyword} optimizedFn={optimizedFn} searchList={searchList} searchKeyword={searchKeyword} show={showInfo1} onClickOutside={() => { setShowInfo1(false) }} />
                    </div>
                </div>
            </div>
        </div>
    )
}