import React from 'react'
import { useState,useEffect } from 'react'

export default function FormTodoList({title, description, handelFormChange}) {
    

    
    return (
        <div>
            <div>Title: <input className="border-gray-500 border rounded-md px-1" name="title" type="text" value={title} onChange={handelFormChange} /></div>
            <div>
                <div>Description:</div>
                <textarea className="border-gray-500 border rounded-md px-1" name="description" rows="4" cols="50" value={description} onChange={handelFormChange}></textarea> 
            </div>
        </div>
    )
}
