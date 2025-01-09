import { useParams,useNavigate } from "react-router"
import { Link } from "react-router"
import { useState,useEffect } from "react"
import FormTodoList from "../components/FormTodoList"
import { modelGetOnceByID,modelUpdateByID } from '../model/modelTodoList'

export default function EditTodoList() {
    let navigate = useNavigate();
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [todo, setTodo] = useState({
        title:'',
        description:'',
    })
    
    async function fetchTodoDetail(toDoId) {
        try {
            const data = await modelGetOnceByID(toDoId)
            setTodo(data)
            setIsLoading(false)
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

    function handelFormChange(e){
        setTodo((previousState)=>({
            ...previousState,
            [e.target.name]:e.target.value
        }))
    }

    async function updateTodo(){
        try {
            await modelUpdateByID(todo);
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
            <FormTodoList {...todo} handelFormChange={handelFormChange} isLoading={isLoading} />
            <div>
                <Link to={`/`}>
                    <button className="bg-blue-700 text-yellow-50 rounded-md px-3 py-1">Back to home</button>
                </Link>
                <button className="bg-green-600 text-yellow-50 rounded-md px-3 py-1 ml-3" onClick={async()=>{await updateTodo()}}>Save</button>
            </div>
        </div>
    )
}

