import { NavLink } from "react-router";

export default function Header(){

    const classActive = (isActive) => {
        let c = "px-3 py-1";
        if(isActive){
            c = c + " bg-white text-gray-500"
        }
        return c
    }

    return (
        <nav>
            <div className="flex bg-gray-500 text-yellow-50">
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