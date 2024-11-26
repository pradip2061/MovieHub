
import './App.css'
import React, { createContext, useEffect } from 'react'
import{BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'
import Home from './router/Home'
import Nav from './components/Nav'
import Features from './router/Features'
import Contact from './router/Contact'
import Login from './router/Login'
import SignUp from './router/SignUp'
import Content from './router/Content'
import AdminDash from './router/AdminDash'
import Create from './router/Create'
import Single from './router/Single'
import Adsingle from './router/Adsingle'
import All from './router/All'
import Trending from './router/Trending'
import YourVideos from './router/YourVideos'
import Trend from './router/Trend'
import Profile from './router/Profile'
//export const context = createContext()


function App() {

  return (
      <BrowserRouter>
 <Routes>
   <Route path='/' element={<Home/>} />
   <Route path='/feature' element={<Features/>}/>
   <Route path='/contact' element={<Contact/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/signup' element={<SignUp/>}/>
   <Route path='/content/*' element={<Content/>}/>
   <Route path='/admin' element={<AdminDash/>}/>
   <Route path='/create' element={<Create/>}/>
   <Route path='/single/:id' element={<Single/>}/>
   <Route path='/adsingle/:id' element={<Adsingle/>}/>
   <Route path='/all' element={<All/>}/>
   <Route path='/trending' element={<Trending/>}/>
   <Route path='/yourvideo' element={<YourVideos/>}/>
   <Route path='/trend/:id' element={<Trend/>}/>
   <Route path='/profile' element={<Profile/>}/>
 </Routes>
    </BrowserRouter>
  )
}

export default App
