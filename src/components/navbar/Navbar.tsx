import { useState } from "react";
import SmallcaseIcon from "../../assets/icons/Smallcase_Icon.svg";
import SearchBox from "../searchbox/SearchBox";
import style from "./Navbar.module.scss";

export default function Navbar() {
    let [showInfo1, setShowInfo1] = useState(false);
    return (
        <div className={`${style.Header_Container} ${style.Display_Flex}`}>
            <div className={`${style.Header_Container_Navbar_Wrapper} ${style.Display_Flex}`}>
                <div className={`${style.Header_Container_Navbar} ${style.Display_Flex}`}>
                    <img src={SmallcaseIcon} style={{ height: "1.8rem", width: "6.9rem" }} alt="Smallcase Icon" />
                    <div onClick={() => setShowInfo1(true)}>
                        <SearchBox show={showInfo1} onClickOutside={() => { setShowInfo1(false) }} />
                    </div>
                </div>
            </div>
        </div>
    )
}