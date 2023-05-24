import { Route, Routes } from 'react-router-dom'
import './App.css'
import './Styles.css'
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
import UpdateEvent from './pages/UpdateEvent'
import AllEvents from './pages/Allevents'


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
        <Route path ='/updateskill/:skillid' element={<PrivateRoute><AddSkill isUpdating /></PrivateRoute> } />
        <Route path='/addevent/:skillid' element={<PrivateRoute><AddEvent/></PrivateRoute>}/>
        <Route path='/skilldets/:skillid' element={<PrivateRoute><SkillDetails/></PrivateRoute>}/>
        <Route path='/eventdets/:eventId' element={<PrivateRoute><EventDetails/></PrivateRoute>}/>
        <Route path='/updateevent/:eventId' element={<PrivateRoute><UpdateEvent/></PrivateRoute>}/>
        <Route path='/allevents' element={<AllEvents/>}/>

        
      </Routes>
    </>
  )
}

export default App
