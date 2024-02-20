import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { employeeManagement_base_URL, employeeManagement_priviousProject_deletePriviousProject, employeeManagement_priviousProject_getAllPriviousProject_URL } from '../../../public/ApiUrl'
import { Table, Button,Row,Col } from 'react-bootstrap';
import { Alert } from 'bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Server_Error_Message } from '../../../public/UtilData';

function GetAllPrivousProject() {
  const navigate = useNavigate()
  const [allProjectPriviousData, setAllPriviousProjectData] = useState([])
  if (!sessionStorage.getItem('isLoggedIn') || sessionStorage.getItem("isLoggedIn") === 'false') {
    navigate('/login')
  }
  useEffect(() => {
    axios.get(employeeManagement_base_URL + employeeManagement_priviousProject_getAllPriviousProject_URL)
      .then((response) => {
        setAllPriviousProjectData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error.response)
      })
  }, [])

  console.log("This is  all data", allProjectPriviousData)
  allProjectPriviousData.sort((project1, project2) => (project2.employeeId - project1.employeeId)).reverse()
  let wellFormedData = []
  let priviousProjectOfAEmployee = []
  let employeeId = 0;
  for (let key in allProjectPriviousData) {
    if (employeeId !== allProjectPriviousData[key].employeeId) {
      employeeId = allProjectPriviousData[key].employeeId;
      if (priviousProjectOfAEmployee.length > 0) {
        wellFormedData.push(priviousProjectOfAEmployee);
        priviousProjectOfAEmployee = []
        priviousProjectOfAEmployee.push(allProjectPriviousData[key])
      }
    }
    else {
      priviousProjectOfAEmployee.push(allProjectPriviousData[key])
    }
  }
  wellFormedData.push(priviousProjectOfAEmployee)
  const handleDelete = (priviousProjectId) => {
    if (confirm("Are You!  Sure To delete the This project")) {
      axios.delete(employeeManagement_base_URL + employeeManagement_priviousProject_deletePriviousProject + priviousProjectId)
        .then(() => {
          toast.success("Current Project Deleted Successfully! with Current Project  Id: " + priviousProjectId);
          setAllPriviousProjectData(allProjectPriviousData.filter((priviousProject1) => priviousProject1.priviousProjectId !== priviousProjectId))
        })
        .catch((error) => {
          if (error.response.data.exceptionMessage === "Privious Project Not Found for Employee Id: " + allProjectPriviousData.employeeId) {
            toast.warning("No Any Privious Project for Employee Id: " + allProjectPriviousData.employeeId)
          }
          else {
            toast.error(Server_Error_Message)
          }
          setAllPriviousProjectData([])
        })

    }
  }
  const handleCancel=()=>{
    navigate(-1);
  }
  return (
    <div style={{ marginTop:'80px'}}>
      {wellFormedData.length <= 0 ? <Alert  varient='danger'>No Any Privious Are Exists</Alert> :
        wellFormedData.map(
          (employeePriviousProject, index) => (<div key={index}>
            <Table striped bordered hover>
              <thead>
                <tr style={{textAlign:'center'}}>
                  <th>Project Id</th>
                  <th> Title</th>
                  <th> Objective</th>
                  <th> Description </th>
                  <th>Emp. Id</th>
                  <th> Link</th>
                  <th>Delete </th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {employeePriviousProject.map((priviousProject, index) => (
                  <tr key={index} style={{textAlign:'center'}}>
                    <td>{priviousProject.priviousProjectId}</td>
                    <td> {priviousProject.priviousProjectTitle}</td>
                    <td>{priviousProject.priviousProjectDescription}</td>
                    <td>{priviousProject.priviousProjectObjective} </td>
                    <td>{priviousProject.employeeId}</td>
                    <td>{priviousProject.priviousProjectLink ? <div style={{backgroundColor: '#0066FF', height: '38px', paddingTop: '5px', borderRadius: '6px', color: 'white', fontWeight: 450 }}>{<Link style={{ fontSize: '18px',width: '100px', textDecoration: 'none', color: 'white', paddingTop: '30px' }} to={priviousProject.priviousProjectLink}>Click here</Link>}</div> : 'In Dev Phase'}</td>
                    <td><Button style={{ backgroundColor: 'red',width:'100px', height: '40px', fontSize: '15px' }} onClick={() => handleDelete(priviousProject.priviousProjectId)}>Delete</Button></td>
                    <td><Button style={{width:'100px', height: '40px', fontSize: '15px' }} onClick={() => navigate("/priviousProjectDetails/updatePriviousProjectDetails", { state: priviousProject })}>Update</Button></td>
                  </tr>))
                }
              </tbody>
            </Table>
            <ToastContainer></ToastContainer>
          </div>)
        )}
        <Row>
        <Col>
          <div></div>
        </Col>
        <Col>
          <div></div>
        </Col>
        <Col>
          <div></div>
        </Col>
        <Col>
          <div></div>
        </Col>
        <Col>
          <div></div>
        </Col>
        <Col>
          <div></div>
        </Col>
        <Col>
          <div></div>
        </Col>
        <Col>
          <div></div>
        </Col>
        <Col>
        <div><Button style={{ backgroundColor: 'red', width: '120px', height: '40px', marginLeft: '15px' }} Button onClick={handleCancel}>Cancel</Button></div>
        </Col>
        </Row>
    </div>
  )

}

export default GetAllPrivousProject
