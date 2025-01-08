export default function Checkbox({isCheck, text}) {
    return (
        <>
            {text} {(isCheck)?"is DONE":"is Inprogress"}
        </>
    )
}