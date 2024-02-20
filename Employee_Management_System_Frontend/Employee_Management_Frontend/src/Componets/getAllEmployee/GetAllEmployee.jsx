import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { employeeManagement_base_URL, employeeManagement_employeeDetails_deleteEmployeeDetails_URL, employeeManagement_employeeDetails_getAllEmployeeDetails_URL } from '../../../public/ApiUrl';
import { Alert, Button, Col, Row, Table } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Server_Error_Message } from '../../../public/UtilData';

function GetAllEmployee() {
    const navigate = useNavigate();
    if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
       
            navigate("/login")
    
    }
    const [allEmployeeData, setAllEmployeeData] = useState([])
    useEffect(() => {
        axios.get(employeeManagement_base_URL + employeeManagement_employeeDetails_getAllEmployeeDetails_URL)
            .then((response) => {
                setAllEmployeeData(response.data)
            })
            .catch((error) => {
                if(error.response.data.exceptionMessage==="No Employee Exists")
                {
                    toast.warning("Oops! No Employee Exists")
                }
                else{
                    toast.warning( Server_Error_Message)
                }
            })
    },[])
    const handleDelete=(employeeId)=>{
        console.log(allEmployeeData)
     
       if(confirm("Are! You To Sure delete This Employee Details")){
        axios.delete(employeeManagement_base_URL+employeeManagement_employeeDetails_deleteEmployeeDetails_URL+employeeId)
        .then(()=>{
           setAllEmployeeData(allEmployeeData.filter((employeeDetails)=>(employeeDetails.employeeId!==employeeId)))
           toast.success("Employee With Employee Id: "+employeeId+" has been deleted successfully!")
        })
        .catch(()=>{
            toast.warning(Server_Error_Message)
        })
      }
    

    }

    return (
        <div style={{marginTop:'80px'}}>
            {allEmployeeData.length <= 0 ?<Alert style={{textAlign:'center',backgroundColor:'#1d2e3f', color:'white'}}>No Employee Exists</Alert> :
                <Table striped bordered hover>
                    <thead style={{textAlign:'center'}}>
                        <tr>
                            <th>Profile</th>
                            <th>Emp.Id</th>
                            <th> First Name</th>
                            <th> Last Name</th>
                            <th>Gender</th>
                            <th> Email Id </th>
                            <th>Country</th>
                            <th>Addess ZipCode</th>
                            <th>City</th>
                            <th>Salary/Month</th>
                            <th>Current Project Id</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                    {allEmployeeData.map((employeeData,index)=>(
                        <tr key={index}>
                        <td><img src={employeeData.employeeImageUrl} height={70} width={70} style={{borderRadius:'50%'}}></img></td>
                        <td>{employeeData.employeeId}</td>
                        <td>{employeeData.employeeFirstName}</td>
                        <td>{employeeData.employeeLastName}</td>
                        <td>{employeeData.employeeGender}</td>
                        <td>{employeeData.employeeEmail}</td>
                        <td>{employeeData.employeeCountry}</td>
                        <td>{employeeData.employeeAddressZipCode}</td>
                        <td>{employeeData.employeeAddressCity}</td>
                        <td>{employeeData.employeeSalaryPerMonth}</td>
                        <td>{employeeData.currentProjectId?employeeData.currentProjectId:"NA"}</td>
                        <td><Button style={{backgroundColor:'red',marginLeft:'5px',width:'120px',height:'40px',fontSize:'15px'}} onClick={()=>handleDelete(employeeData.employeeId)} >Delete</Button></td>
                        <td><Button style={{marginLeft:'5px',width:'120px',height:'40px',fontSize:'15px'}} onClick={()=>navigate("/employeeDetails/getAllEmployee/updateEmployeeDetails",{state:{employeeData}})} >Update</Button></td>
                        </tr>
                         ))}
                    <tr>
                    </tr>
                    </tbody>
                </Table>
            }
            <Row>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div><Button style={{backgroundColor:'red',marginLeft:'-35px',width:'120px',height:'40px',fontSize:'15px'}} onClick={()=>{navigate(-1)}}>Cancel</Button></div></Col>
            </Row>
<ToastContainer></ToastContainer>
        </div>
    )
}

export default GetAllEmployee
