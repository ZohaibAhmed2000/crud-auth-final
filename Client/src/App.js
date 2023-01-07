import './App.css';
import {Typography } from '@mui/material';
import {Todo} from './Components/Todo';
import { useEffect } from 'react';
import axios from 'axios';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Signup } from './Pages/Signup';
import Login from './Pages/Login';
import Toast from './Pages/Toast';



function App() {
  return (
  
     <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/signup" element={<Signup/>}/> 
      <Route path="/login" element={<Login/>}/> 
      <Route path="/toast" element={<Toast/>}/> 
     </Routes> 
  
  );
}

export default App;

