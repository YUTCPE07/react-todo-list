import { useState,useEffect } from 'react'
import { Link } from 'react-router'
import { modelGetAll,modelDeleteByID } from '../model/modelTodoList'
import ModalFromTodoList from '../components/ModalFormTodoList'
import { modelInsert } from '../model/modelTodoList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const [dataList, setDataList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [todo, setTodo] = useState({
      title:'',
      description:'',
  })
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
  

  async function modalSubmit(todo) {
    try {
      setIsLoading(true)
      const res = await modelInsert(todo);
      fetchDataList()
      setIsModalOpen(false)
      resetTodo()
    } catch (error) {
      console.log(error)
    }
  }
  
 
  useEffect(()=>{
    fetchDataList()
  },[])


  return (
    <>
      <div className='flex'>
        <h1 className='text-6xl drop-shadow-2xl'>To do list</h1>
        <button onClick={()=>{setIsModalOpen(true)}} className='text-lg mt-auto px-3 py-1 ml-3 rounded-md shadow-md text-yellow-50 bg-green-600 hover:bg-green-500'>
          <FontAwesomeIcon icon="fa-solid fa-plus" /> Create
        </button>
        <ModalFromTodoList isModalOpen={isModalOpen} 
          todo={todo} setTodo={setTodo}
          resetTodo={resetTodo}
          setIsModalOpen={setIsModalOpen} modalSubmit={modalSubmit} isLoading={isLoading}/>
        </div>
      <div>
        <div className='grid grid-cols-4 gap-3 my-3'>
          {
            dataList.map((r,i)=>{
              return (
                <div key={i} className='p-2 bg-yellow-100 rounded-md grid grid-flow-row'>
                  <div className='mb-2'>
                    <div className='font-bold text-lg'>{r.id}:{r.title}</div>
                    <div className='font-light text-sm line-clamp-3'>{r.description}</div>
                  </div>
                  <div className='flex justify-end mt-auto'>
                    <div className='inline text-xs'>
                      <Link to={`/todo/edit/${r.id}`}>
                        <button className='bg-blue-700 text-yellow-50 rounded-md py-1 px-3 mt-auto mr-2'>
                          <FontAwesomeIcon icon="fa-solid fa-pen-to-square"/> Edit
                        </button>
                      </Link>
                      

                      <button onClick={async()=>{
                        await deleteData(r.id)
                      }} className={(isLoading)?'bg-red-200 text-gray-500 rounded-md py-1 px-3 mt-auto':'bg-red-500 text-gray-50 rounded-md py-1 px-3 mt-auto'}
                      disabled={isLoading}
                      >
                        <FontAwesomeIcon icon="fa-regular fa-trash-can" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
