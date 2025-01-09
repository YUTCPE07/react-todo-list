import React from 'react'
import { useState,useEffect,useRef } from 'react'

export default function FormTodoList({title, description, handelFormChange ,isLoading}) {
    const inputRef = useRef(null);
    useEffect(()=>{
        const inputElement = inputRef.current;
        inputElement.focus();
    })
    return (
        <div>
            <div>Title: <input 
                ref={inputRef}
                className="border-gray-500 border rounded-md px-1
                :disabled:opacity-75 disabled:cursor-not-allowed
            " name="title" type="text" value={title} onChange={handelFormChange} disabled={isLoading} /></div>
            <div>
                <div>Description:</div>
                <textarea className="border-gray-500 border rounded-md px-1
                    :disabled:opacity-75 disabled:cursor-not-allowed
                " name="description" rows="4" cols="50" value={description} onChange={handelFormChange} disabled={isLoading}></textarea> 
            </div>
        </div>
    )
}
