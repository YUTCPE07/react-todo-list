import { NavLink } from "react-router"
import { useLocation } from 'react-router'

export default function Header(){
    const location = useLocation()
    const pathname = location.pathname
    const isTodoDetailActive = pathname.startsWith('/todo/detail/');
    const isAboutClass = (location.pathname==='/about')?'bg-color-1':'';
    // console.log(pathname,isTodoDetailActive)
    const classActive = (isActive) => {
        let c = "px-3 py-1 rounded-t-md";
        
        if(isActive){
            if(isAboutClass){
                c = c + " bg-color-1 text-gray-700"
            }else{
                c = c + " bg-white text-gray-500"
            }
        }
        return c
    }

    return (
        <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-yellow-50 pt-3">
            <div className="flex xl:px-20">
                <NavLink
                    to="/"
                    className={({ isActive }) => (classActive(isActive))}
                    >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => (classActive(isActive))}
                    >
                    About
                </NavLink>
                {
                    isTodoDetailActive && (
                        <NavLink
                            to="/about"
                            className={(classActive(isTodoDetailActive))}
                            >
                            To do detail
                        </NavLink>
                    )
                }
            </div>
        </nav>
    )
}