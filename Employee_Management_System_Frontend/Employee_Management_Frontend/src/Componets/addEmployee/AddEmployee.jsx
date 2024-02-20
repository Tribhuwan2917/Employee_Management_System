import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddEmployeeDetailsSchema } from "./AddEmployeeDetailsSchema";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import {
  EmployeeCountryName,
  Server_Error_Message,
} from "../../../public/UtilData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  employeeManagement_base_URL,
  employeeManagement_employeeDetails_postEmployeeDetails_URL,
} from "../../../public/ApiUrl";
import { Employee_Image_Cloud_URL } from "../../../public/ApiUrl";
function AddEmployee() {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState();
  const [imageUrl, setImageUrl] = useState();
  const employeeIntialValue = {
    employeeId: "",
    employeeFirstName: "",
    employeeLastName: "",
    employeeEmail: "",
    employeeCountry: "",
    employeeAddressZipCode: "",
    employeeAddressCity: "",
    employeeSalaryPerMonth: "",
    employeeGender: "",
    employeeImageUrl: "",
  };
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: employeeIntialValue,
      onSubmit: (values, action) => {
        console.log("This is my Data");
        values.employeeImageUrl=imageUrl;
        console.log(values);
        axios
          .post(
            employeeManagement_base_URL +
              employeeManagement_employeeDetails_postEmployeeDetails_URL,
            values
          )
          .then(() => {
            toast.success(
              "Employee Added Successfully with Employee Id:" +
                values.employeeId
            );
            action.resetForm();
          })
          .catch((error) => {
            console.log("It has been called");
            if (
              error.response.data.exceptionMessage ===
              "Employee With Employee Id " +
                values.employeeId +
                " Already exists"
            ) {
              toast.warning(
                "Employee With Employee Id: " +
                  values.employeeId +
                  " Already exists"
              );
            } else {
              toast.warning(Server_Error_Message);
            }
          });
      },
      validationSchema: AddEmployeeDetailsSchema,
    });
  const upload = () => {
    const data = new FormData();
    data.append("file", imageData);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dwnlcx35q");
    fetch(Employee_Image_Cloud_URL, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleImageChange = (event) => {
    if (
      event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      setImageData(event.target.files[0]);
    } else {
      toast.error("Invalid image file");
    }
  };
  const handleImageSubmit = (event) => {
    event.preventDefault();
    upload();
  };
  return (
    <div style={{ margin: "5px" }}>
      <Container style={{ marginLeft: "400px", display: "flex" }}>
        <Row>
          <Col>
            <Card
              style={{
                zIndex: "-1",
                position: "inherit",
                marginTop: "80px",
                width: "60rem",
                textAlign: "center",
                backgroundColor: "#1d2e3f",
                color: "white",
                height: "700px",
                marginLeft: "-200px",
              }}
            >
              <Card.Body>
                <Card.Title>Add Employee</Card.Title>
                <Card.Img src=""></Card.Img>
                <Card.Text>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col>
                        <div>
                          <label>Employee Id:</label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            onBlur={handleBlur}
                            type="number"
                            value={values.employeeId}
                            onChange={handleChange}
                            name="employeeId"
                          ></input>
                          {errors.employeeId && touched.employeeId ? (
                            <Alert
                              style={{
                                marginLeft: "25px",
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeId}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Employee Email Id</label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            onBlur={handleBlur}
                            type="text"
                            value={values.employeeEmail}
                            onChange={handleChange}
                            name="employeeEmail"
                          ></input>
                          <br></br>
                          {errors.employeeEmail && touched.employeeEmail ? (
                            <Alert
                              style={{
                                marginLeft: "25px",
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeEmail}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <label>Employee First Name</label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            type="text"
                            onBlur={handleBlur}
                            value={values.employeeFirstName}
                            onChange={handleChange}
                            name="employeeFirstName"
                          ></input>
                          <br></br>
                          {errors.employeeFirstName &&
                          touched.employeeFirstName ? (
                            <Alert
                              style={{
                                marginLeft: "25px",
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeFirstName}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Employee Last Name</label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            onBlur={handleBlur}
                            type="text"
                            value={values.employeeLastName}
                            onChange={handleChange}
                            name="employeeLastName"
                          ></input>
                          <br></br>
                          {errors.employeeLastName &&
                          touched.employeeLastName ? (
                            <Alert
                              style={{
                                marginLeft: "25px",
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeLastName}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div style={{ padding: "2px" }}>
                          <label>Employee Address City</label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            type="text"
                            value={values.employeeAddressCity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="employeeAddressCity"
                          ></input>
                          <br></br>
                          {errors.employeeAddressCity &&
                          touched.employeeAddressCity ? (
                            <Alert
                              style={{
                                marginLeft: "25px",
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeAddressCity}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        <div style={{ padding: "2px" }}>
                          <label>Employee Address ZipCode</label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            type="text"
                            value={values.employeeAddressZipCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="employeeAddressZipCode"
                          ></input>
                          <br></br>
                          {errors.employeeAddressZipCode &&
                          touched.employeeAddressZipCode ? (
                            <Alert
                              style={{
                                marginLeft: "25px",
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeAddressZipCode}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div style={{ padding: "2px" }}>
                          <label>Salary Per month </label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            type="number"
                            value={values.employeeSalaryPerMonth}
                            onChange={handleChange}
                            name="employeeSalaryPerMonth"
                            onBlur={handleBlur}
                          ></input>
                          <br></br>
                          {errors.employeeSalaryPerMonth &&
                          touched.employeeSalaryPerMonth ? (
                            <Alert
                              style={{
                                marginLeft: "25px",
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeSalaryPerMonth}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        <div style={{ padding: "2px" }}>
                          <label>Select Country</label>
                          <Form.Select
                            style={{ marginLeft: "25px", width: "400px" }}
                            name="employeeCountry"
                            value={values.employeeCountry}
                            onChange={handleChange}
                          >
                            {EmployeeCountryName.map((CountryName, index) => (
                              <option
                                key={index}
                                onBlur={handleBlur}
                                value={CountryName}
                              >
                                {CountryName}
                              </option>
                            ))}
                            {errors.employeeCountry ? (
                              <Alert
                                style={{
                                  marginLeft: "25px",
                                  marginTop: "2px",
                                  paddingBottom: "30px",
                                  height: "40px",
                                  width: "400px",
                                }}
                                variant="danger"
                              >
                                {errors.employeeCountry}
                              </Alert>
                            ) : null}
                          </Form.Select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Row>
                          <Col>
                            <div style={{ marginLeft: "-280px" }}>
                             
                              Employee Gender
                            </div>
                          </Col>
                          <Col>
                            <div></div>
                          </Col>
                        </Row>
                        <Row>
                          <Col  style={{display:'flex'}}>
                            <span style={{  marginLeft: "30px" }}>
                              Male
                              <Form.Check
                                name="employeeGender"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="radio"
                                value="Male"
                              />
                            </span>
                            <span style={{ marginLeft: "20px" }}>
                              Female
                              <Form.Check
                                onBlur={handleBlur}
                                name="employeeGender"
                                onChange={handleChange}
                                type="radio"
                                value="Famale"
                              />
                             
                            </span>
                            <span style={{ marginLeft: "20px" }}>
                              Other
                              <Form.Check
                                onBlur={handleBlur}
                                name="employeeGender"
                                onChange={handleChange}
                                type="radio"
                                value="Other"
                              />
                             
                            </span>
                          </Col>
                          <Col>
                            
                          </Col>
                          <Col>
                           
                          </Col>
                          <Col></Col>
                          <Col>
                            <div style={{ marginRight: "20px",marginLeft:'-30px' }}>
                              <Button
                                style={{
                                  backgroundColor: "red",
                                  width: "100px",
                                }}
                                onClick={() => {
                                  navigate(-1);
                                }}
                                disabled={false}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Col>
                          <Col>
                            <div style={{ marginRight: "20px" }}>
                              <Button
                                style={{ width: "100px", margin: "2px" }}
                                type="submit"
                              >
                                Add
                              </Button>
                            </div>
                          </Col>
                        </Row>
                        {errors.employeeGender && touched.employeeGender ? (
                          <span>
                            <Alert
                              style={{
                                marginLeft: "25px",
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeGender}
                            </Alert>
                          </span>
                        ) : null}
                      </Col>
                    </Row>
                  </form>

                  <form
                    onSubmit={handleImageSubmit}
                    style={{ marginTop: "-70px" }}
                  >
                    <h6 style={{ marginLeft: "-180px", paddingTop: "5px" }}>
                      Employee Image
                    </h6>
                    <input onChange={handleImageChange} style={{marginRight:'10px'}} type="file"></input>
                    <Button type="submit" style={{ marginLeft: "-100px", marginTop:'-18px' }}>
                      Upload
                    </Button>
                  </form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default AddEmployee;
