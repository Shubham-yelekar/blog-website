import './App.css'
import conf from './conf/conf.js'

function App() {

  const key = conf.appwriteurl
  console.log(conf)
  return (
    <>
      <h1 className="text-2xl text-gray-100"> Msg - {key} </h1>
    </>
  )
}

export default App
