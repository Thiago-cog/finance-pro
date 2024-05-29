export default function TableRankStock() {
    return (
        <>
            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto rounded-lg w-2/4 mr-4">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 mb-2 border-b">Rank de ativos</p>
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="h-6 w-full text-sm leading-none text-gray-800">
                            <th className="font-semibold text-left pl-4 text-base">Ativo</th>
                            <th className="font-semibold text-left pl-12 text-base">Quantidade</th>
                            <th className="font-semibold text-left pl-12 text-base">Total</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                            <td className="pl-4 cursor-pointer">
                                <div className="flex items-center">
                                    <p>1°</p>
                                    <div className="w-10 h-10">
                                        <img className="w-full h-full rounded-full" />
                                    </div>
                                    <div className="pl-4">
                                        <p className="font-medium">PETR4</p>
                                        <p className="text-xs leading-3 text-gray-600 pt-2">Petróleo Brasileiro S.A. - Petrobras</p>
                                    </div>
                                </div>
                            </td>
                            <td className="pl-12">
                                <p className="font-medium leading-none text-gray-800 text-base">62</p>
                            </td>
                            <td className="pl-12">
                                <p className="font-medium text-base">R$ 2441.56 </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}