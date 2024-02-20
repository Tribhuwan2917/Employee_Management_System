import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Table, Row, Col, Alert, Container, Card, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState } from 'react';
import { PriviousProjectSchema } from './PriviousProjectSchema';
import { employeeManagement_base_URL, employeeManagement_priviousProject_deletePriviousProject, employeeManagement_priviousProject_getPriviousProjectByEmployeeId } from '../../../public/ApiUrl';
import { Server_Error_Message } from '../../../public/UtilData';
function PriviousProject() {
  const navigate = useNavigate();
  const [allPriviousProjectOfAEmployee, setAllPriviousProjectOfAEmployee] = useState([])
  if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
    useEffect(() => { navigate("/login") }, [])
  }
  const inputSearchIntialValue = {
    employeeId: ''
  }
  const { handleChange, handleBlur, handleSubmit, touched, errors, values } = useFormik({
    initialValues: inputSearchIntialValue,
    onSubmit:
      (values, action) => {
        axios.get(employeeManagement_base_URL + employeeManagement_priviousProject_getPriviousProjectByEmployeeId + values.employeeId)
          .then((response) => {
            console.log(response.data)
            setAllPriviousProjectOfAEmployee(response.data)
           action.resetForm()
          })
          .catch((error) => {
            // console.log(error.response.data)
            if(error.response.data.priviousProjectExceptionMessage==="Privious Project Not Found for Employee Id: "+values.employeeId)
            toast.warning("No Privious  Project Exists For  Employee Id: " + values.employeeId)
          else{
            toast.error(Server_Error_Message)
          }
          // console.log("Oops! Something went wrong")
            setAllPriviousProjectOfAEmployee([])
          })
      },

    validationSchema: PriviousProjectSchema
  })
  const handleDelete = (priviousProjectId) => {
    if (confirm("Are You!  Sure To delete the This project")) {
      // console.log("It has been called    :::::",priviousProjectId)
      axios.delete(employeeManagement_base_URL + employeeManagement_priviousProject_deletePriviousProject + priviousProjectId)
        .then((response) => {
          // console.log(response)
          toast.success("Current Project Deleted Successfully! with Current Project  Id: " + priviousProjectId);
          setAllPriviousProjectOfAEmployee(allPriviousProjectOfAEmployee.filter((priviousProject1) =>priviousProject1.priviousProjectId !== priviousProjectId))
        })
        .catch((error) => {
          if(error.response.data.exceptionMessage==="Privious Project Not Found for Employee Id: "+allPriviousProjectOfAEmployee.employeeId)
          {
            toast.warning("No Any Privious Project for Employee Id: "+allPriviousProjectOfAEmployee.employeeId)
          }
          else{
            toast.error(Server_Error_Message)
          }
          setAllPriviousProjectOfAEmployee([])
        })
    }
  }
    const handleCancel = (event) => {
      event.preventDefault();
      setAllPriviousProjectOfAEmployee([])
    }
    return (
      <div style={{margin:'5px'}}>
        <Card style={{ marginTop:'80px', textAlign: 'center', width: '70rem', height: '30rem', marginLeft: '150px', backgroundColor: '#1d2e3f', color: 'white' }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>Privious  Project  Details</Card.Title>
            {/* <Card.Img  variant="top" width={'50rem'} height={400} ></Card.Img> */}
            <Card.Text>
              <Container fluid>
                <Row>
                  <Col lg={6}>
                    <Form onSubmit={handleSubmit}>
                      <div >
                        <input style={{ width: '400px', height: '40px', borderRadius: '10px' }} inputmode="numeric" value={values.employeeId} onBlur={handleBlur} name='employeeId' onChange={handleChange} type='number' placeholder='Search Privious Project By Employee Id'></input>
                        <Button style={{ margin: '5px', width: '100px' }} disabled={false} type='submit'>Search</Button>
                        {errors.employeeId && touched.employeeId ? <Alert style={{
                          marginLeft: '7px', width: '400px'
                          , height: '30px', paddingBottom: '30px'
                        }} variant='danger'>
                          {errors.employeeId}
                        </Alert> : null}
                      </div>
                    </Form>
                  </Col>
                  <Col>
                    <Button onClick={() => { navigate("/priviousProjectDetails/addPriviousProjectDetails") }}>Add Privious Project</Button>
                  </Col>
                  <Col>
                    <Button onClick={() => { navigate("/priviousProjectDetails/getAllPriviousProjectDetails") }}>Get All Privious Project</Button>
                  </Col>
                </Row>
              </Container>{

                (allPriviousProjectOfAEmployee.length === 0) ? null :
                  <Container>
                    <Row>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
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
                          {allPriviousProjectOfAEmployee.map((priviousProject, index) => (
                            <tr key={index}>
                              <td>{priviousProject.priviousProjectId}</td>
                              <td> {priviousProject.priviousProjectTitle}</td>
                              <td>{priviousProject.priviousProjectDescription}</td>
                              <td>{priviousProject.priviousProjectObjective} </td>
                              <td>{priviousProject.employeeId}</td>
                              <td>{priviousProject.priviousProjectLink ? <div style={{ backgroundColor: '#0066FF', height: '38px', paddingTop: '5px', width: '100px', borderRadius: '6px', color: 'white', fontWeight: 450 }}>{<Link style={{ fontSize: '18px', color: 'inherit', textDecoration: 'none', color: 'white', paddingTop: '30px' }} to={priviousProject.priviousProjectLink}>Click here</Link>}</div> : 'In Dev Phase'}</td>
                              <td><Button style={{ backgroundColor: 'red', marginLeft: '5px', width: '100px', height: '40px', fontSize: '15px' }} onClick={()=>handleDelete(priviousProject.priviousProjectId)}>Delete</Button></td>
                              <td><Button style={{ marginLeft: '5px', width: '100px', height: '40px', fontSize: '15px' }} onClick={() => navigate("/priviousProjectDetails/updatePriviousProjectDetails", { state: priviousProject })}>Update</Button></td>
                            </tr>))
                          }
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

  export default PriviousProject
