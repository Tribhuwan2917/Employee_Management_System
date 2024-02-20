import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { CurrentProjectDetailsSchema } from './CurrentProjectDetailsSchema';
import { Table, Row, Col, Alert, Container, Card, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState } from 'react';
import { employeeManagement_base_URL, employeeManagement_currentProject_deleteCurrentProject_URL,  employeeManagement_currentProject_getCurrentProjectByEmployeeId_URL } from '../../../public/ApiUrl';
function CurrentProject() {
  const navigate = useNavigate();
  if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
    // console.log("user not logged in")
    navigate("/login")
  }
  const inputSearchIntialValue = {
    employeeId: ''
  }
  const { handleChange, handleBlur, handleSubmit, touched, errors, values } = useFormik({
    initialValues: inputSearchIntialValue,
    onSubmit:
      (values, action) => {
        console.log(values.employeeId)
        axios.get(employeeManagement_base_URL + employeeManagement_currentProject_getCurrentProjectByEmployeeId_URL + values.employeeId).then((response) => {
          setCurrentProject(response.data)
          action.resetForm()
        }).catch(() => {
          toast.warning("No Current Project Exists For  Employee Id: " + values.employeeId)
          setCurrentProject({})
        })
      },

    validationSchema: CurrentProjectDetailsSchema
  })
  const [currentProject, setCurrentProject] = useState({

    currentProjectId: '',
    currentProjectTitle: '',
    currentProjectLink: '',
    currentProjectDescription: '',
    currentProjectObjective: '',
    employeeId: ''
  })
  const handleDelete = (event) => {
    event.preventDefault();
    if (confirm("Are You!  Sure To delete the This project")) {
      // console.log("Employee deleted successfully!")
      axios.delete(employeeManagement_base_URL + employeeManagement_currentProject_deleteCurrentProject_URL + currentProject.currentProjectId)
        .then(() => {
          toast.success("Current Project Deleted Successfully! with Current Project  Id: " + currentProject.employeeId);
          setCurrentProject({})
        }).catch(() => {
          // console.log(error)
          toast.warning("Oops! Something Went wrong")
          setCurrentProject({})
        })
    }
    // console.log("Data has been deleted successfully")

  }
  const handleCancel = (event) => {
    event.preventDefault();
    setCurrentProject({})
    // console.log("data has been cancel successfully")
  }
  return (
    <div style={{margin:'5px'}}>
      <Card style={{ marginTop:'75px' ,textAlign: 'center', width: '70rem', height: '30rem', marginLeft: '150px', backgroundColor: '#1d2e3f', color: 'white' }}>
        <Card.Body>
          <Card.Title>Current Project  Details</Card.Title>
          <Card.Text>
            <Container fluid>
              <Row>
                <Col lg={6}>
                  <Form onSubmit={handleSubmit}>
                    <div >
                      <input style={{ width: '400px', height: '40px', borderRadius: '10px' }} value={values.employeeId} onBlur={handleBlur} name='employeeId' onChange={handleChange} type='number' placeholder='Search Current Project By Employee Id'></input>
                      <Button style={{ margin: '5px' ,width:'100px' }} disabled={false} type='submit'>Search</Button>
                      {errors.employeeId && touched.employeeId ? <Alert style={{
                        marginLeft: '20px', width: '400px'
                        , height: '30px',paddingBottom: '30px'
                      }} variant='danger'>
                        {errors.employeeId}
                      </Alert> : null}
                    </div>
                  </Form>
                </Col>
                <Col>
                  <Button onClick={() => { navigate("/currentProjectDetails/addCurrentProjectDetails") }}>Add Current Project</Button>
                </Col>
                <Col>
                  <Button onClick={()=>{navigate("/currentProjectDetails/getAllCurrentProjectDetails")}}>Get All
                    Current Project</Button>
                </Col>
              </Row>
            </Container>{

              (!currentProject.currentProjectId) ? null :
                <Container>
                  <Row>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Project Id</th>
                          <th> Title</th>
                          <th>  Objective</th>
                          <th> Description </th>
                          <th>Emp. Id</th>
                          <th> Link</th>
                          <th>Delete </th>
                          <th>Update</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{currentProject.currentProjectId}</td>
                          <td> {currentProject.currentProjectTitle}</td>
                          <td>{currentProject.currentProjectObjective}</td>
                          <td>{currentProject.currentProjectDescription} </td>
                          <td>{currentProject.employeeId}</td>
                          <td>{currentProject.currentProjectLink?<div style={{ backgroundColor: '#0066FF', height: '38px', paddingTop: '5px', width: '100px', borderRadius: '6px', color: 'white', fontWeight: 450 }}>{<Link style={{ fontSize: '18px', textDecoration: 'none', color: 'white', paddingTop: '30px' }} to={currentProject.currentProjectLink}>Click here</Link>}</div>:'In Dev Phase'}</td>
                          <td><Button style={{ backgroundColor: 'red', marginLeft: '5px', width: '100px', height: '40px', fontSize: '15px' }} onClick={handleDelete}>Delete</Button></td>
                          <td><Button style={{  marginLeft: '5px', width: '100px', height: '40px', fontSize: '15px' }} onClick={()=>navigate("/currentProjectDetails/upadateCurrentProjectDetails",{state:currentProject})}>Update</Button></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>
                  <Row>
                    <Col><div></div></Col>
                    <Col><div></div></Col>
                    <Col><div></div></Col>
                    <Col><div></div></Col>
                    <Col><div></div></Col>
                    <Col><div></div></Col>
                    <Col><div><Button style={{ backgroundColor: 'red', width: '120px', height: '40px', marginLeft: '15px' }} Button onClick={handleCancel}>Cancel</Button></div></Col>
                  </Row>
                </Container>
            }
          </Card.Text>
        </Card.Body>
      </Card>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default CurrentProject

