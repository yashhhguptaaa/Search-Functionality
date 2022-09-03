import LoaderGIF from "../../assets/gifs/loader.gif";
import style from "./Loader.module.scss";

export default function Loader() {
    return (<div>
        <img src={LoaderGIF} className={style.LoaderGIF_Styling} alt="Smallcase Loader GIF" />
    </div>)
}