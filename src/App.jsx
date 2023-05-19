import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import AddSkill from './pages/AddSkill'
import AddEvent from './pages/AddEvent'
import SkillDetails from './pages/SkillDetails'
import EventDetails from './pages/EventDetails'
import AllSkills from './pages/AllSkills'

function App() {

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path='/allskills' element={<AllSkills/>} />
        <Route path='/addskill' element={<PrivateRoute><AddSkill/></PrivateRoute>} />
        <Route path='/addevent' element={<PrivateRoute><AddEvent/></PrivateRoute>}/>
        <Route path='/skilldets/:skillid' element={<PrivateRoute><SkillDetails/></PrivateRoute>}/>
        <Route path='/eventdets/:eventid' element={<PrivateRoute><EventDetails/></PrivateRoute>}/>

        
      </Routes>
    </>
  )
}

export default App
