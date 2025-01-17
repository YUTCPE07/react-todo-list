import { useState,useEffect,useCallback } from 'react'
import { Link } from 'react-router'
import { modelGetAll, modelUpdateByID ,modelDeleteByID } from '../model/modelTodoList'
import ModalFromTodoList from '../components/ModalFormTodoList'
import { modelInsert } from '../model/modelTodoList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from '../components/Loading'
import {verifySession} from '../library/session'


export default function HomePage() {
  const [dataList, setDataList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [todo, setTodo] = useState({
      title:'',
      description:'',
  })

  async function getUser() {
    const user = await verifySession()
    setUser(user)
  }

  const fetchDataList = async() => {
    try {
      const data = await modelGetAll()
      setDataList(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  

  async function resetTodo(){
    setTodo({
      title:'',
      description:'',
    })
  }

  async function deleteData(id) {
    try {
      setIsLoading(true)
      await modelDeleteByID(id);
      await fetchDataList()
    } catch (error) {
      console.log('error',error)
    }
  }
  

  async function modalSubmitCreate(todo) {
    try {
      setIsLoading(true)
      const res = await modelInsert(todo);
      fetchDataList()
      setIsModalCreateOpen(false)
      resetTodo()
    } catch (error) {
      console.log(error)
    }
  }

  async function modalSubmitEdit(todo) {
    try {
      setIsLoading(true)
      const res = await modelUpdateByID(todo);
      setIsModalEditOpen(false)
      resetTodo()
      setIsLoading(false)
      setTimeout(()=>{
        alert("success")
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  function clickEditTodo(todo){
    setTodo(todo)
    setIsModalEditOpen(true)
  }
  
 
  useEffect(()=>{
    fetchDataList()
    getUser()
  },[])


  return (
    <>
      <div className='flex'>
        <h1 className='text-6xl drop-shadow-2xl'>To do list</h1>
        <button onClick={()=>{setIsModalCreateOpen(true)}} className='text-lg mt-auto px-3 py-1 ml-3 rounded-md shadow-md text-yellow-50 bg-green-600 hover:bg-green-500'>
          <FontAwesomeIcon icon="fa-solid fa-plus" /> Create
        </button>
        <ModalFromTodoList 
          isModalOpen={isModalCreateOpen} textHeader={'Create todo list'}
          todo={todo} setTodo={setTodo} resetTodo={resetTodo}
          setIsModalOpen={setIsModalCreateOpen} modalSubmit={modalSubmitCreate} isLoading={isLoading}/>

        <ModalFromTodoList 
          isModalOpen={isModalEditOpen} textHeader={'Edit todo list'}
          todo={todo} setTodo={setTodo} resetTodo={resetTodo}
          setIsModalOpen={setIsModalEditOpen} modalSubmit={modalSubmitEdit} isLoading={isLoading}/>
        </div>
      <div>
        {
          (isLoading && !dataList.length && (<Loading />)) ||
          (dataList.length && (
            <div className='grid grid-cols-4 gap-3 my-3'>
              {
                dataList.map((r,i)=>{
                  return (
                    <div key={i} className='p-2 bg-yellow-100 rounded-md grid grid-flow-row shadow
                      hover:shadow-pink-500
                      '>
                      <div className='mb-2'>
                        <Link to={`/todo/detail/${r.id}`}>
                          <div className='font-bold text-lg'>{r.id}:{r.title}</div>
                          <div className='font-light text-sm line-clamp-3'>{r.description}</div>
                        </Link>
                      </div>
                      <div className='flex justify-between mt-auto text-xs'>
                        <div className='inline'>
                          <button onClick={async()=>{
                            await deleteData(r.id)
                          }} className={(isLoading)?'bg-red-200 text-gray-500 rounded-md py-1 px-3 mt-auto':'bg-red-500 text-gray-50 rounded-md py-1 px-3 mt-auto shadow'}
                            disabled={isLoading}
                          >
                            <FontAwesomeIcon icon="fa-regular fa-trash-can" /> Delete
                          </button>
                          <button onClick={()=>{clickEditTodo(r)}} className='bg-blue-700 text-yellow-50 rounded-md py-1 px-3 mt-auto ml-2 shadow'>
                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Edit
                          </button>
                        </div>
                        <div>
                          <Link to={`/todo/detail/${r.id}`}>
                            <button className='shadow bg-yellow-50 rounded-md py-1 px-3 mt-auto ml-2
                              hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-yellow-50
                              '>
                            <FontAwesomeIcon icon="fa-regular fa-eye" /> Show more
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
        
      </div>
    </>
  )
}
