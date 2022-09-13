import { useContext } from "react";
import style from "./CompaniesList.module.scss";
import Button from "../button/Button";
import { AppDetailsContext } from "../../context";

export default function CompaniesList() {
    let noOfRecords: any = [], currentPage: number = 0, totalPages: number = 0, nextPage: Object = () => null, previousPage: Object = () => null;
    const contextObj: any = useContext(AppDetailsContext);
    if (contextObj) {
        noOfRecords = contextObj.noOfRecords;
        currentPage = contextObj.currentPage;
        totalPages = contextObj.totalPages;
        nextPage = contextObj.nextPage;
        previousPage = contextObj.previousPage;
    }
    return (
        <div data-aos="fade-up" data-aos-duration="500" className={style.Companies_List_Main_Container}>
            {currentPage !== 1 && noOfRecords.length > 0 ? <Button handleFunction={previousPage} type="PREVIOUS" /> : null}
            <div>
                <h2 className={style.Investment_Companies_Title}>Investment Companies</h2>
                {
                    noOfRecords?.length ? noOfRecords.map((record: any, index: number) => {
                        return (
                            <div data-aos="fade-up" key={index + record.symbol} className={`${style.Indiviual_Company_Details_Wrapper} ${index === noOfRecords.length - 1 ? style.Border_Bottom_Styling : ""}`}>
                                <div className={`${style.Indiviual_Company_Details} ${style.Display_Flex}`}>
                                    <div className={style.Company_Symbol_Outer_Div}><span className={style.Company_Symbol_Text}>{record.symbol}</span></div>
                                    <span className={style.Company_Name_Title}>{record.name}</span>
                                </div>
                            </div>
                        )
                    }) : <div className={style.Indiviual_Company_Details_Wrapper}><i>No Search Result</i></div>
                }
            </div>
            {currentPage !== totalPages && noOfRecords.length > 0 ? <Button handleFunction={nextPage} type="NEXT" /> : null}
        </div>
    )
}