import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { employeeManagement_base_URL, employeeManagement_registration_deleteRegistration_URL } from '../../../public/ApiUrl';
function Logout() {
  const navigate=useNavigate()
  // const location=useLocation()
  // console.log(sessionStorage.getItem("registrationEmail"))
  // console.log(sessionStorage.getItem("registraionPassword"))
  // console.log(sessionStorage.getItem("registraionPassword"))
useEffect(()=>{
axios.delete(employeeManagement_base_URL+employeeManagement_registration_deleteRegistration_URL+sessionStorage.getItem("registrationEmail")).then((response)=>{
  sessionStorage.clear();
  toast.success("Employee logged out successfully")
  setTimeout(()=>{
    navigate('/home');
    location.reload();
  },4000)


  
}).catch((error)=>{
  console.log(error)
 
  sessionStorage.clear();
})
},[])
  return (
    <div>
    <ToastContainer></ToastContainer>
    </div>
  )
}

export default Logout
