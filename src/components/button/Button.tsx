import style from "./Button.module.scss";

interface IButtonProps {
    type?: string;
    handleFunction?: any;
}

const ButtonType: any = {
    "PREVIOUS": "<",
    "NEXT": ">",
    "LOADMORE": "Load more"
}

export default function Button({
    type = "PREVIOUS",
    handleFunction,
}: IButtonProps) {
    return (
        <div
            className={`${style.Button_Container} ${type === "PREVIOUS" ? style.Previous_Button_Container : ""}`}
        >
            {
                (type === "PREVIOUS" || type === "NEXT") ? (
                    <button
                        onClick={() => {
                            handleFunction();
                        }}
                        className={`${style.Previous_Record_Button}`}>
                        <span className={style.Button_Text}>
                            {ButtonType[type]}
                        </span>
                    </button>
                )
                    :
                    type === "LOADMORE" ?
                        (
                            <button
                                onClick={() => {
                                    handleFunction();
                                }}
                                className={`${style.Load_More_Record_Button}`}>
                                <span >
                                    {ButtonType[type]}
                                </span>
                            </button>
                        )
                        : null
            }

        </div>
    )
}