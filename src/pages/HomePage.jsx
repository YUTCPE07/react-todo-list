import { useState,useEffect } from 'react'
import Image from '../components/Image'
import axios from "axios"
import { Link } from 'react-router'

function App() {
  const [dataList, setDataList] = useState([])
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  // const REACT_APP_API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL
  // console.log(import.meta.env)
  const fetchDataList = async() => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/v1/products`)
      setDataList(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log('error',error)
    }
  }

  async function deleteData(id) {
    try {
      setIsLoading(true)
      const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/v1/products/${id}`)
      await fetchDataList()
    } catch (error) {
      console.log('error',error)
    }
  }
  
 
  useEffect(()=>{
    fetchDataList()
  },[])

  function addCount(){
    setCount(count+1)
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-red-700 underline">
        Hello world!, Now count is {count}
      </h1>
      <button onClick={addCount} className='p-3 m-1 bg-blue-400 rounded-md'>count +1</button>
      <div>
        <Image imageUrl='https://fastly.picsum.photos/id/3/200/200.jpg?hmac=N5yYUNYl5gOUcaMmTtnNNtx839TN2qaNM4SaXhQl65U' />
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
