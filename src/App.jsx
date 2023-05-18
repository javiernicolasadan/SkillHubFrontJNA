import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AddSkill from './pages/AddSkill'
import AddEvent from './pages/AddEvent'

function App() {

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/addskill' element={<AddSkill/>} />
        <Route path='/addevent' element={<AddEvent/>}/>
        
      </Routes>
    </>
  )
}

export default App
