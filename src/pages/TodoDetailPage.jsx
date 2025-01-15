import { useState,useEffect } from 'react'
import { modelGetOnceByID } from '../model/modelTodoList'
import { useParams,useNavigate } from "react-router"
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from '../components/Loading'

export default function TodoDetailPage() {
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [todo, setTodo] = useState({
        title:'',
        description:'',
    })
    const fethDetail = async() => {
        try {
            const data = await modelGetOnceByID(id)
            setTodo(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fethDetail()
    },[])


    return ( 
        (isLoading && (<Loading />)) ||
        (!isLoading && (
            <>
                <div className='xl:px-96'>
                    <h1 className='text-4xl drop-shadow-2xl mt-10 mb-5'>{todo.title}</h1>
                    <div>{todo.description}</div>
                    <div>
                        <Link to="/">
                            <div className='mt-3 underline text-purple-900 hover:text-purple-600'><FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Back to todo lists</div>
                        </Link>
                    </div>
                </div>
                
            </>
        ))
    )
}
