import { useEffect, useState, useCallback } from "react";
import SearchIcon from "../../assets/icons/Search_Icon.svg";
import style from "./SearchBox.module.scss";
import axios from "axios";

export default function SearchBox() {

    const [searchList, setSearchList] = useState([])

    const getTickerFromAPi = async (word: string) => {
        console.log("word :", word)
        const response = await axios.get(
            `https://ticker-2e1ica8b9.now.sh/keyword/${word}`
        );
        // const ArraysofData = response.data.map((f: any) => [f.symbol + " ," + f.name]);
        const FlatArray = [].concat(...response.data);
        setSearchList(FlatArray);
        console.log({ FlatArray });
        // this.setState({ dataSource: FlatArray });
    };

    function debounce(delay: number) {
        let inDebounce: NodeJS.Timeout | null;
        return function (...args: any) {
            // @ts-ignore: Unreachable code error
            const context: any = this;
            if (inDebounce) clearTimeout(inDebounce);
            inDebounce = setTimeout((e: any) => getTickerFromAPi.call(context, args), delay)
        }
    }

    const optimizedFn = useCallback(debounce(500), []);

    const handleSearch = (event: any) => {
        if (event) {
            console.log("called");
            optimizedFn(event.target.value);
            // this.setState({ search: e }, () => getTickerFromAPi(event.target.value));
        }
    };

    return (
        <div>
            <div className={style.Search_Box_Wrapper}>
                <div className={`${style.Search_Box} ${style.Display_Flex}`}>
                    <img src={SearchIcon} className={style.Search_Icon_CSS} alt="Search Icon" />
                    <input
                        placeholder="Search by name or ticker"
                        className={style.Input_Search_Box}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className={style.DropDown_List_Wrapper}>
                <div className={style.DropDown_List}>
                    {
                        searchList?.length
                            ?
                            searchList.map((company: any) => {
                                return (
                                    <div className={style.DropDown_List_Content}>
                                        <div className={style.Content_Title}>
                                            <span className={style.First_Line_Title}>{company.symbol}</span>
                                            <p className={style.Second_Line_Title}>{company.name.length > 25 ? company.name.substring(0, 25) + "..." : company.name}</p>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            (
                                <div className={style.DropDown_List_Content}>
                                    <div className={style.Content_Title}>
                                        <span className={style.First_Line_Title}>Type 3 or more characters</span>
                                        <p className={style.Second_Line_Title}>to start searching</p>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}