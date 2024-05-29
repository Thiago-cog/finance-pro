export default function GridCardDetails({ text, value }) {
    return (
        <div className="rounded-lg m-4 border-2 h-28">
            <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                {text}
            </p>
            <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                {value}
            </p>
        </div>
    );
}