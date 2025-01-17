import { NavLink } from "react-router"
import { useLocation } from 'react-router'
import {verifySession,deleteSession} from '../library/session'
import { useState,useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Cookies from 'js-cookie'

export default function Header(){
    const location = useLocation()
    const isTodoDetailActive = location.pathname.startsWith('/todo/detail/');
    const isAboutClass = (location.pathname==='/about')?'bg-color-1':'';
    const [user,setUser] = useState(null);
    const [token,setToken] = useState(Cookies.get("token"));
    const [isLoading, setIsLoading] = useState(true)
    const presenceCookie = Cookies.get("token")
    if(token!=presenceCookie){
        setToken(presenceCookie);
    }

    async function getUser() {
        setIsLoading(true)
        const userSession = await verifySession()
        setUser(userSession)
        setIsLoading(false)
    }

    async function logout(){
        setIsLoading(true)
        await deleteSession()
        setToken(null)
        setIsLoading(false)
    }

    const classActive = (isActive) => {
        let c = "px-3 py-1 rounded-t-md";
        
        if(isActive){
            if(isAboutClass){
                c = c + " bg-color-1 text-indigo-500"
            }else{
                c = c + " bg-white text-gray-500"
            }
        }
        return c
    }

    useEffect(()=>{
        getUser()
        // console.log("token",token)
    },[token])

    return (
        <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-yellow-50">
            <div className="flex xl:px-20 justify-between">
                <div className="pt-3">
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
                <div className="flex">
                    {isLoading && <span><FontAwesomeIcon icon="fa-solid fa-circle-notch" spin/> Login</span>}
                    {!isLoading && !user && (
                        <div className="mt-auto">
                            <NavLink
                                to="/login"
                                className={({ isActive }) => (classActive(isActive))}
                                >
                                <FontAwesomeIcon icon="fa-solid fa-unlock" /> Login
                            </NavLink>
                        </div>
                    )}
                    {!isLoading && user && (
                        <div className="flex">
                            <div className="px-3 my-auto"><FontAwesomeIcon icon="fa-solid fa-user-tie" /> Hello, {user.username}</div>
                            <button onClick={async()=>{logout()}} className="mx-3 my-auto px-3 border rounded-md hover:bg-red-600"><FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" /> Logout</button>
                        </div>
                    )}
                    
                </div>
            </div>
        </nav>
    )
}