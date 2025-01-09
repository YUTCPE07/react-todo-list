import { useState,useEffect } from 'react'
import { Link } from 'react-router'
import { modelGetAll,modelDeleteByID } from '../model/modelTodoList'
import ModalCreateTodoList from '../components/ModalCreateTodoList'
import { modelInsert } from '../model/modelTodoList'

function App() {
  const [dataList, setDataList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchDataList = async() => {
    try {
      const data = await modelGetAll()
      setDataList(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
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
        <button onClick={()=>{setIsModalOpen(true)}} className='text-lg mt-auto px-3 py-1 ml-3 rounded-md shadow-md text-yellow-50 bg-green-600 hover:bg-green-500'>Create</button>
        <ModalCreateTodoList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalSubmit={modalSubmit} isLoading={isLoading}/>
        </div>
      <div>
        <div className='grid grid-cols-4 gap-3 my-3'>
          {
            dataList.map((r,i)=>{
              return (
                <div key={i} className='p-2 bg-yellow-100 rounded-md grid grid-flow-row'>
                  <div>
                    <div className='font-bold text-lg'>{r.id}:{r.title}</div>
                    <div className='font-light text-sm'>{r.description}</div>
                  </div>
                  <div className='flex justify-end mt-auto'>
                    <div className='inline'>
                      <Link to={`/todo/edit/${r.id}`}>
                       <button className='bg-blue-700 text-yellow-200 rounded-md py-1 px-3 mt-auto mr-2'>Edit</button>
                      </Link>
                      

                      <button onClick={async()=>{
                        await deleteData(r.id)
                      }} className={(isLoading)?'bg-red-200 text-gray-500 rounded-md py-1 px-3 mt-auto':'bg-red-500 text-gray-50 rounded-md py-1 px-3 mt-auto'}
                      disabled={isLoading}
                      >Delete</button>
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
