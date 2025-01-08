import { NavLink } from "react-router";

export default function Header(){

    const classActive = (isActive) => {
        let c = "px-3 py-1 rounded-t-md";
        if(isActive){
            c = c + " bg-white text-gray-500"
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
            </div>
        </nav>
    )
}