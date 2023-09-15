import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 flex'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between ml-4 mr-auto p-4'>
            <a class="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Finance Pro.</span>
            </a>
        </div>
        <div className='flex items-center md:order-2 mr-8'>
            <button type='button' className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600' id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom"></button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </div>
    </nav>
    // <div className="">
    //   <Outlet />
    // </div>
  );
}

export default App;
