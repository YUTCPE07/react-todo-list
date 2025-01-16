import React from 'react'
import meImage from '../assets/images/me001.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AboutPage() {

  const data = [
    {
      title:"Deverloper",
      detail:[
        "Use Axios Fetch Data",
        "Data mock by",
        "Use React Router",
      ],
    },
    {
      title:"Functions",
      detail:[
        "Create/Update/Delete todo list",
        "View Homepage Aboutpage DetailTodopage",
        "Authentication Login/Logout",
      ],
    },
  ];

  return (
    <div className='container mx-auto'>
      <div className='text-center'>
        <div className='md:flex md:justify-center'>
          <h1 className='text-2xl font-medium
            md:text-5xl mt-auto drop-shadow-xl bg-gradient-to-r from-indigo-500 to-purple-500 inline-block text-transparent bg-clip-text 
            mb-3 md:mb-0'>This website deverloper</h1>
          <div className='mt-auto'>
            <img src={meImage} className='rounded-full w-52 h-52 shadow-md border-8 border-purple-400 mx-auto' alt="Image profile"/>
            <div className='text-xl text-purple-500'>by teerapat suksanghuan</div>
          </div>
        </div>
        <p className='text-gray-500'>
          Teach : <FontAwesomeIcon icon="fa-brands fa-react" /> React + 
          Vite + 
          tailwindcss
        </p>
    </div>
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 xl:px-52 lg:px-20 md:px-3 mt-14 px-3`}>
      {
        data.map((r,i) => (
          <div className='bg-white rounded-md p-3 text-gray-600 border-2 border-color-3' key={i}>
            <div className='text-xl font-medium text-color-3'>{r.title}</div>
              <div className='font-light'>
                {
                  r.detail.map((r2,i2)=>(
                    <div key={`r2${i2}`}>
                      <FontAwesomeIcon icon="fa-solid fa-minus" className='text-color-3' /> {r2} 
                      {
                        (r2==='Data mock by') && <a className='text-indigo-600 hover:underline ml-1' href='https://mockapi.io/'>mockapi.io</a>
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
