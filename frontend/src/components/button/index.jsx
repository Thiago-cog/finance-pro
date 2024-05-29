export default function Button({ functionButton, text, className }) {
    const defaultClassName = "bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-lg font-medium transition duration-150 ease-in-out text-white px-6 py-2 text-sm  focus:outline-none";
    const classNameEnd = className ? className : defaultClassName

    return(
        <button className={classNameEnd} onClick={functionButton}>{text}</button>
    )
}