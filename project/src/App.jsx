import './App.css'
import { FaBeer } from 'react-icons/fa';

function App() {

  const key = import.meta.env.VITE_APPWRITE_URL

  return (
    <>
      <h1 className='text-2xl text-gray-100'> Msg - {key} </h1>
    </>
  )
}

export default App
