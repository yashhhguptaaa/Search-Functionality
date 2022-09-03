import style from "./Button.module.scss";

interface IButtonProps {
    type?: string;
    handleFunction?: any;
}

const ButtonType: any = {
    "Previous": "<",
    "Next": ">"
}

export default function Button({
    type = "Previous",
    handleFunction,
}: IButtonProps) {
    return (
        <div
            className={`${style.Button_Container} ${type === "Previous" ? style.Previous_Button_Container : ""}`}
        >
            <button onClick={() => handleFunction()} className={`${style.Previous_Record_Button}`}>
                <span className={style.Button_Text}>
                    {ButtonType[type]}
                </span>
            </button>
        </div>
    )
}