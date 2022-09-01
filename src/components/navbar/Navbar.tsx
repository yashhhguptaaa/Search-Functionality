import SmallcaseIcon from "../../assets/icons/Smallcase_Icon.svg";
import SearchBox from "../searchbox/SearchBox";
import style from "./Navbar.module.scss";

export default function Navbar() {
    return (
        <div className={`${style.Header_Container} ${style.Display_Flex}`}>
            <div className={`${style.Header_Container_Navbar_Wrapper} ${style.Display_Flex}`}>
                <div className={`${style.Header_Container_Navbar} ${style.Display_Flex}`}>
                    <img src={SmallcaseIcon} style={{ height: "1.8rem", width: "6.9rem" }} alt="Smallcase Icon" />
                    <SearchBox />
                </div>
            </div>
        </div>
    )
}