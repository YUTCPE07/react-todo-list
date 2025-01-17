import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect,useCallback } from 'react'
import { useParams,useNavigate } from "react-router"
import {createSession,verifySession} from '../library/session.js'
import {getUserByLogin} from '../model/modelUser.jsx'

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

export default function LoginPage() {
    
    const [formLogin,setFormLogin] = useState({
        'username': ADMIN_USERNAME,
        'password': ADMIN_PASSWORD,
    });
    const [messageError,setMessageError] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()
    
    async function checkLogin() {
        try {
            setIsLoading(true)
            let user = await verifySession();
            if(user){
                navigate("/")
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    

    async function submit(){
        try {
            setIsLoading(true)
            const user = await getUserByLogin(formLogin.username,formLogin.password)
            await createSession(user)
            navigate("/")
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setMessageError(error.message)
        }
    }
    
    function handelFormChange(e){
        setFormLogin((previousState)=>({
            ...previousState,
            [e.target.name]:e.target.value
        }))
    }

    useEffect(()=>{
        checkLogin()
    },[])

    return (
        <div className='container mx-auto'>
            <div className='text-center my-24 text-gray-600'>
                <h1 className='text-5xl'><FontAwesomeIcon icon="fa-solid fa-unlock" /> Login</h1>
                <div className='w-full xl:w-2/6 mx-auto'>
                    <div className='mt-5'>
                        <label className='w-1/4'>Username : </label>
                        <input className={`bg-white border border-purple-700 rounded-md px-3 py-1 w-3/4 ${(isLoading)?'bg-gray-100':''}`} 
                            value={formLogin.username} onChange={handelFormChange} name="username" type="text" max="5" disabled={isLoading} />
                    </div>
                    <div className='mt-5 mb-4'>
                        <label className='w-1/4'>Password : </label>
                        <input className={`bg-white border border-purple-700 rounded-md px-3 py-1 w-3/4 ${(isLoading)?'bg-gray-100':''}`}
                            value={formLogin.password} onChange={handelFormChange} name="password" type="password" max="10" disabled={isLoading} />
                    </div>
                    {(messageError)&&<div className='text-red-600 text-sm font-light'>*{messageError}</div>}
                    <button type="button" onClick={()=>{submit()}} className={`bg-purple-500 px-3 py-1 text-xl shadow-md text-yellow-50 hover:opacity-75 rounded-md mt-1 ${(isLoading)?'opacity-75':''}`} disabled={isLoading}>
                        <div className='inline mr-1'>
                            {isLoading && <FontAwesomeIcon icon="fa-solid fa-circle-notch" spin/>}
                            {!isLoading && <FontAwesomeIcon icon="fa-solid fa-key" />}
                        </div>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
