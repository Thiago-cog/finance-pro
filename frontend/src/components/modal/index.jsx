function Modal({ isOpen, setOpenToModal }) {
    if(isOpen) {
        return (
            <div className="fixed bg-black bg-opacity-50 inset-0 z-50">
                <div className="fixed top-1/2 left-1/2 rounded-lg p-16 -translate-y-2/4 -translate-x-2/4 bg-white shadow-lg">
                    <h2>Titulo</h2>
                    <p>Descrição</p>
                    <button className="bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-lg font-medium transition duration-150 ease-in-out text-white px-6 py-2 text-sm  focus:outline-none" onClick={() => setOpenToModal(!isOpen)}>Fechar</button>
                </div>
            </div>
        );
    }
}

export default Modal;
