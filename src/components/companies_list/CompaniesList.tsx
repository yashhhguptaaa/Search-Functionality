import { useContext } from "react";
import style from "./CompaniesList.module.scss";
import Button from "../button/Button";
import { AppDetailsContext } from "../../context";

export default function CompaniesList() {
    const { noOfRecords, currentPage, totalPages, nextPage, previousPage }: any = useContext(AppDetailsContext);
    return (
        <div className={style.Companies_List_Main_Container}>
            {currentPage !== 1 && noOfRecords.length > 0 ? <Button handleFunction={previousPage} type="Previous" /> : null}
            <div>
                <h2 className={style.Investment_Companies_Title}>Investment Companies</h2>
                {
                    noOfRecords?.length ? noOfRecords.map((record: any, index: number) => {
                        return (
                            <div key={index + record.symbol} className={`${style.Indiviual_Company_Details_Wrapper} ${index === noOfRecords.length - 1 ? style.Border_Bottom_Styling : ""}`}>
                                <div className={`${style.Indiviual_Company_Details} ${style.Display_Flex}`}>
                                    <div className={style.Company_Symbol_Outer_Div}><span className={style.Company_Symbol_Text}>{record.symbol}</span></div>
                                    <span className={style.Company_Name_Title}>{record.name}</span>
                                </div>
                            </div>
                        )
                    }) : <div className={style.Indiviual_Company_Details_Wrapper}><i>No Search Result</i></div>
                }
            </div>
            {currentPage !== totalPages && noOfRecords.length > 0 ? <Button handleFunction={nextPage} type="Next" /> : null}
        </div>
    )
}