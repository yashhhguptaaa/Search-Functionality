import { useState, createContext, useCallback, useRef } from 'react';
import axios from "axios";
const AppDetailsContext = createContext(null);

const AppDetailsProvider: React.FC<React.ReactNode> = ({ children }: any) => {
    const abortController: any = useRef(null);

    // These states are responsible to maintain data in Pagination Operation.
    const [currentPage, setCurrentPage] = useState(1);
    const [noOfRecords, setNoOfRecords] = useState<any[]>([]);

    // These states are responsible to maintain data in Search Bar Operation.
    const [loadMoreRecordNumber, setLoadMoreRecordNumber] = useState(1);
    const [searchList, setSearchList] = useState<any[]>([]);

    // Here, search keyword is stored.
    const [searchKeyword, setSearchKeyword] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const nextPage = () => {
        let tempCurrentPage = currentPage;
        if (tempCurrentPage < totalPages) {
            tempCurrentPage += 1;

            const requestingKey: string = `${searchKeyword}${tempCurrentPage}`;
            if (localStorage.getItem(requestingKey)) {
                const cachedSearchResult: any = JSON.parse(localStorage.getItem(requestingKey) || "");
                setNoOfRecords(cachedSearchResult.records);
                setTotalPages(Math.ceil(cachedSearchResult.totalRecords / 5));
            } else {
                getTickerFromAPi(searchKeyword, tempCurrentPage);
            }
            setCurrentPage(tempCurrentPage);
        }
    }

    const loadMore = () => {
        let tempCurrentPage = loadMoreRecordNumber;
        if (tempCurrentPage < totalPages) {
            tempCurrentPage += 1;

            const requestingKey: string = `${searchKeyword}${tempCurrentPage}`;
            if (localStorage.getItem(requestingKey)) {
                const cachedSearchResult: any = JSON.parse(localStorage.getItem(requestingKey) || "");
                if (tempCurrentPage > 1) {
                    setSearchList([...searchList, ...cachedSearchResult.records])
                }
                else {
                    setSearchList(cachedSearchResult.records);
                }
                setTotalPages(Math.ceil(cachedSearchResult.totalRecords / 5));
            } else {
                getTickerFromAPi(searchKeyword, tempCurrentPage, true);
            }
            setLoadMoreRecordNumber(tempCurrentPage);
        }
    }

    const previousPage = () => {
        let tempCurrentPage = currentPage;
        if (tempCurrentPage > 1) {
            tempCurrentPage -= 1;
            const requestingKey: string = `${searchKeyword}${tempCurrentPage}`;
            if (localStorage.getItem(requestingKey)) {
                const cachedSearchResult: any = JSON.parse(localStorage.getItem(requestingKey) || "");
                setNoOfRecords(cachedSearchResult.records);
                setTotalPages(Math.ceil(cachedSearchResult.totalRecords / 5));
            } else {
                getTickerFromAPi(searchKeyword, tempCurrentPage);
            }
            setCurrentPage(tempCurrentPage);
        }
    }

    const getTickerFromAPi = async (word: string = searchKeyword, searchPageNumber: number = currentPage, loadMoreButtonCheck: boolean = false) => {
        try {
            const requestingKey: string = `${word}${searchPageNumber}`;

            abortController.current = new AbortController();
            const response = await axios.post(
                `https://search-functionality-backend.vercel.app/search_stock/${searchPageNumber}`, {
                keyword: word
            }, {
                signal: abortController.current.signal
            }
            );
            if (response.status === 200) {
                setTotalPages(Math.ceil(response.data.totalRecords / 5));

                if (!loadMoreButtonCheck && searchPageNumber === 1) {
                    setNoOfRecords(response.data.records);
                }

                if (loadMoreButtonCheck && searchPageNumber > 1) {
                    setSearchList([...searchList, ...response.data.records])
                }
                else {
                    setSearchList(response.data.records);
                }
                localStorage.setItem(requestingKey, JSON.stringify(response.data));
            }
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
            inDebounce = setTimeout((e: any) => getTickerFromAPi.call(context, ...args), delay)
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
                isLoading,
                loadMore,
                loadMoreRecordNumber
            }}>
            {children}
        </AppDetailsContext.Provider>
    )
}

export { AppDetailsProvider, AppDetailsContext };