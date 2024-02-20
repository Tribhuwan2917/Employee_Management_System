import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { employeeManagement_base_URL, employeeManagement_currentProject_deleteCurrentProject_URL, employeeManagement_currentProject_getAllCurrentProject_URL } from '../../../public/ApiUrl';
import { Table, Container, Row, Col, Alert, Button } from 'react-bootstrap'
import { Server_Error_Message } from '../../../public/UtilData';

function GetAllCurrentProject() {
    const navigate = useNavigate()
    const [allCuurentProjectData, setAllCurrentProjectData] = useState([])
    if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem('isLoggedIn') === 'false') {
        console.log(sessionStorage.getItem("isLoggedIn"))
            navigate('/login')
    }
  
    useEffect(() => {
        axios.get(employeeManagement_base_URL + employeeManagement_currentProject_getAllCurrentProject_URL)
            .then((response) => {
                setAllCurrentProjectData(response.data)
            })
            .catch((error) => {
                if(error.response.data.exceptionMessage==="No Current Project exits in database")
                {
                     toast.warning("No Current Project exits in database")
                }
                else{
                    toast.warning(Server_Error_Message)
                }               
            })
    }, [])
    const handleDelete = (currentProjectId) => {
        if (confirm("Are You Sure! to delete the this current Project")) {
            axios.delete(employeeManagement_base_URL + employeeManagement_currentProject_deleteCurrentProject_URL + currentProjectId)
                .then(() => {
                    toast.success("Your Current Project deleted Successfully With Current Project Id: " + currentProjectId);
                    setAllCurrentProjectData(allCuurentProjectData.filter((currentProject) => (currentProject.currentProjectId !== currentProjectId)))
                })
                .catch((error) => {
                    console.log(error.response.data)
                    toast.error(Server_Error_Message)

                })

        }
    }
    return (
        <div style={{marginTop:'80px', height:'520px'}}>
            {allCuurentProjectData.length <= 0 ? <Alert style={{  marginTop:'80px', textAlign: 'center', backgroundColor: '#1e2d3f', color: 'white' }}>No Any Current Project  Exists</Alert> :
                <Container >
                    <Table striped bordered hover>
                        <thead style={{textAlign: 'center' }}>
                            <tr>
                                <th>Project Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Objective</th>
                                <th>Emp. Id </th>
                                <th>Link</th>
                                <th>Delete </th>
                                <th>Update </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCuurentProjectData.map((currentProject, index) => (
                                <tr key={index}>
                                    <td>{currentProject.currentProjectId}</td>
                                    <td>{currentProject.currentProjectTitle}</td>
                                    <td>{currentProject.currentProjectDescription}</td>
                                    <td>{currentProject.currentProjectObjective}</td>
                                    <td>{currentProject.employeeId}</td>
                                    <td>{currentProject.currentProjectLink ? <div style={{ marginLeft:'30px', backgroundColor: '#3377FF', height: '38px', paddingTop: '5px', width: '100px', borderRadius: '6px', color: 'white', fontWeight: 450 }}>{<Link style={{ fontSize: '18px', textDecoration: 'none', marginLeft: '10px', color: 'white', paddingTop: '30px' }} to={currentProject.currentProjectLink}>Click here</Link>}</div> : "In Dev Phase"}</td>
                                    <td>{<Button style={{ marginLeft:'30px', width: '100px', backgroundColor: 'red' }} onClick={() => handleDelete(currentProject.currentProjectId)}>Delete</Button>}</td>
                                    <td>{<Button style={{marginLeft:'30px', width: '100px' }} onClick={()=>navigate('/currentProjectDetails/getAllCurrentProjectDetails/updateCurrentProjectDetails',{state:currentProject})} >Update</Button>}</td>
                                </tr>
                            ))}
                            <tr>
                            </tr>
                        </tbody>
                    </Table>
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
                        <Col><div><Button style={{ backgroundColor: 'red', marginLeft: '5px', width: '100px', height: '40px', fontSize: '15px' }} onClick={() => { navigate(-1) }}>Cancel</Button></div></Col>
                    </Row>
                </Container>
            }
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default GetAllCurrentProject
