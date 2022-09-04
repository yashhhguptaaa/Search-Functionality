import { useState, createContext, useCallback, useRef } from 'react';
import axios from "axios";
const AppDetailsContext = createContext(null);

const AppDetailsProvider: React.FC<React.ReactNode> = ({ children }: any) => {
    const abortController: any = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [noOfRecords, setNoOfRecords] = useState<any[]>([]);
    const [searchList, setSearchList] = useState<any[]>([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const totalNoOfRecords: any = searchList;
    const totalPages = Math.ceil(searchList.length / 5);
    const [isLoading, setIsLoading] = useState(true);

    const nextPage = () => {
        let tempCurrentPage = currentPage;
        if (tempCurrentPage < totalPages) {
            tempCurrentPage += 1;
            setCurrentPage(tempCurrentPage);

            if ((tempCurrentPage - 1) * 5 + 5 <= searchList.length) {
                setNoOfRecords(searchList.slice((tempCurrentPage - 1) * 5, (tempCurrentPage - 1) * 5 + 5))
            } else {
                setNoOfRecords(searchList.slice((tempCurrentPage - 1) * 5, searchList.length))
            }
        }
    }

    const previousPage = () => {
        let tempCurrentPage = currentPage;
        if (tempCurrentPage > 1) {
            tempCurrentPage -= 1;
            setCurrentPage(tempCurrentPage);

            if ((tempCurrentPage - 1) * 5 + 5 <= totalNoOfRecords.length) {
                setNoOfRecords(totalNoOfRecords.slice((tempCurrentPage - 1) * 5, (tempCurrentPage - 1) * 5 + 5))
            } else {
                setNoOfRecords(totalNoOfRecords.slice((tempCurrentPage - 1) * 5, totalNoOfRecords.length))
            }
        }
    }

    const getTickerFromAPi = async (word: string) => {
        try {
            abortController.current = new AbortController();
            const response = await axios.get(
                `https://ticker-2e1ica8b9.now.sh/keyword/${word}`, {
                signal: abortController.current.signal
            }
            );
            const FlatArray = [].concat(...response.data);
            setSearchList(FlatArray);
            if (5 <= FlatArray.length) {
                setNoOfRecords(FlatArray.slice(0, 5))
            } else {
                setNoOfRecords(FlatArray.slice(0, FlatArray.length))
            }
            setCurrentPage(1);
        } catch (error: any) {
            if (error.name === "CanceledError") {
                console.log("Previous fetch request canceled");
            }
        }
    };

    const cancelRequest = () => abortController.current && abortController.current.abort();

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

    setTimeout(() => setIsLoading(false), 1000);

    return (
        <AppDetailsContext.Provider
            // @ts-ignore: Unreachable code error
            value={{
                currentPage,
                nextPage,
                previousPage,
                noOfRecords,
                totalPages,
                optimizedFn,
                cancelRequest,
                searchList,
                setSearchKeyword,
                searchKeyword,
                isLoading
            }}>
            {children}
        </AppDetailsContext.Provider>
    )
}

export { AppDetailsProvider, AppDetailsContext };