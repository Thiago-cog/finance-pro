export default function GridCardTop({ text, value }) {
    return (
        <div className="bg-white rounded-lg py-5 pl-6 flex items-start shadow">
            <div className="pl-3 pr-10 mt-1">
                <h3 className="font-bold font-sans leading-4 text-gray-700 text-lg">{text}</h3>
                <div className="flex items-end mt-4">
                    <h2 className="text-gray-800 text-2xl leading-normal font-bold lg:text-xl">{value}</h2>
                </div>
            </div>
        </div>
    );
}