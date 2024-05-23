import { useEffect, useState } from "react";


function Index() {
    const [isOpenActions, setisOpenActions] = useState(false);

    return (
        <>
            <div className="w-full sm:px-6">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-t-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Ativos</p>
                        <div>
                            <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                                <p className="text-sm font-medium leading-none text-white">New Project</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-100 cursor-pointer flex justify-between items-center border-2" onClick={() => setisOpenActions(!isOpenActions)}>
                    <div className="text-lg">
                        <p>Ações: 3 Ativos</p>
                    </div>
                    <div className="text-lg">
                        <p>Valor Total: R$</p>
                    </div>
                    <div className="text-lg">
                        <p>Variação: subindo 10%</p>
                    </div>
                    <div className="text-lg">
                        <p>Porcentagem na carteira: 80%</p>
                    </div>
                    <button className="text-gray-500">
                        {isOpenActions ? '▲' : '▼'}
                    </button>
                </div>
                {
                    isOpenActions && (

                        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto rounded-b-lg">
                            <table className="w-full whitespace-nowrap">
                                <thead>
                                    <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                        <th className="font-normal text-left pl-4">Project</th>
                                        <th className="font-normal text-left pl-12">Progress</th>
                                        <th className="font-normal text-left pl-12">Tasks</th>
                                        <th className="font-normal text-left pl-20">Budget</th>
                                        <th className="font-normal text-left pl-20">Deadline</th>
                                        <th className="font-normal text-left pl-16">Members</th>
                                    </tr>
                                </thead>
                                <tbody className="w-full">
                                    <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                        <td className="pl-4 cursor-pointer">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10">
                                                    <img className="w-full h-full" src="https://cdn.tuk.dev/assets/templates/olympus/projects.png" />
                                                </div>
                                                <div className="pl-4">
                                                    <p className="font-medium">UX Design &amp; Visual Strategy</p>
                                                    <p className="text-xs leading-3 text-gray-600 pt-2">Herman Group</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pl-12">
                                            <p className="text-sm font-medium leading-none text-gray-800">72%</p>
                                            <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                                                <div className="w-20 h-3 bg-green-progress rounded-full" />
                                            </div>
                                        </td>
                                        <td className="pl-12">
                                            <p className="font-medium">32/47</p>
                                            <p className="text-xs leading-3 text-gray-600 mt-2">5 tasks pending</p>
                                        </td>
                                        <td className="pl-20">
                                            <p className="font-medium">$13,000</p>
                                            <p className="text-xs leading-3 text-gray-600 mt-2">$4,200 left</p>
                                        </td>
                                        <td className="pl-20">
                                            <p className="font-medium">22.12.21</p>
                                            <p className="text-xs leading-3 text-gray-600 mt-2">34 days</p>
                                        </td>
                                        <td className="pl-16">
                                            <div className="flex items-center">
                                                <img className="shadow-md w-8 h-8 rounded-full" src="https://cdn.tuk.dev/assets/templates/olympus/projects(8).png" />
                                                <img className="shadow-md w-8 h-8 rounded-full -ml-2" src="https://cdn.tuk.dev/assets/templates/olympus/projects(9).png" />
                                                <img className="shadow-md w-8 h-8 rounded-full -ml-2" src="https://cdn.tuk.dev/assets/templates/olympus/projects(10).png" />
                                                <img className="shadow-md w-8 h-8 rounded-full -ml-2" src="https://cdn.tuk.dev/assets/templates/olympus/projects(11).png" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Index;