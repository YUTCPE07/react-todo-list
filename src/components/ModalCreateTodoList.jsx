import React from 'react'
import FormTodoList from './FormTodoList'
import { useState,useEffect } from 'react';

export default function ModalCreateTodoList({isModalOpen,setIsModalOpen,modalSubmit,isLoading}) {
    const [todo, setTodo] = useState({
        title:'',
        description:'',
    })

    function handelFormChange(e){
        setTodo((previousState)=>({
            ...previousState,
            [e.target.name]:e.target.value
        }))
    }
    return ( isModalOpen &&
        <>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <FormTodoList {...todo} handelFormChange={handelFormChange} />
                        </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={()=>{modalSubmit(todo)}} type="button" 
                                disabled={isLoading}
                                className="
                                    inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto
                                    disabled:bg-green-400
                                    ">{isLoading && (<i className="fa-solid fa-circle-notch fa-spin mr-1 mt-0.5"></i>)} Save</button>
                            {
                                !isLoading && (
                                    <button onClick={()=>{setIsModalOpen(false)}} type="button" 
                                        className="
                                            mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto
                                    ">Cancel</button>
                                )
                            }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}