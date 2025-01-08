import { useParams,useNavigate } from "react-router"
import { Link } from "react-router"
import { useState,useEffect } from "react"
import axios from "axios"
import { func } from "prop-types"

export default function EditTodoList() {
    let navigate = useNavigate();
    const {id} = useParams()
    const [todo, setTodo] = useState({
        title:'',
        description:'',
    })
    
    async function fetchTodoDetail(toDoId) {
        try {
        //   setIsLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/v1/products/${toDoId}`)
            setTodo(res.data)
            // console.log(todo)
        } catch (error) {
          console.log('error',error)
        }
    }

    function handelNameChange(e){
        setTodo((previousState)=>({
            ...previousState,
            title: e.target.value
        }))
    }

    function handelDescriptionChange(e){
        setTodo((previousState)=>({
            ...previousState,
            description: e.target.value
        }))
    }

    function handelFormChangeLong(e){
        setTodo((previousState)=>{
            let r = {...previousState}
            // console.log({[e.target.name]:e.target.value})
            r[e.target.name] = e.target.value
            return r;
        })
    }

    function handelFormChange(e){
        setTodo((previousState)=>({
            ...previousState,
            [e.target.name]:e.target.value
        }))
    }

    async function updateTodo(todoId){
        try {
            const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/v1/products/${todoId}`,{
                title: todo.title,
                description: todo.description,
            })
            alert("success");
            navigate("/");
        } catch (error) {
            console.log('error',error)
        }
    }

    useEffect(()=>{
        fetchTodoDetail(id)
    },[id])
    

    return (
        <div className="p-1">
            <div>edit todo list page id : {id}</div>
            <div>Title: <input className="border-gray-500 border rounded-md px-1" name="title" type="text" value={todo.title} onChange={handelFormChange} /></div>
            <div>
                <div>Description:</div>
                <textarea className="border-gray-500 border rounded-md px-1" name="description" rows="4" cols="50" value={todo.description} onChange={handelFormChange}></textarea> 
            </div>
            <div>
                <Link to={`/`}>
                    <button className="bg-blue-700 text-yellow-50 rounded-md px-3 py-1">Back to home</button>
                </Link>
                <button className="bg-green-600 text-yellow-50 rounded-md px-3 py-1 ml-3" onClick={async()=>{await updateTodo(id)}}>Save</button>
            </div>
        </div>
    )
}

