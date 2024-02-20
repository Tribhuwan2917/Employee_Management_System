import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {Row,Col,Container} from 'react-bootstrap'
import Header from './Componets/header/Header'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Componets/login/Login'
import Home from './Componets/home/Home'
import SignUp from './Componets/signup/SignUp'
import Logout from './Componets/logout/Logout'
import CurrentProject from './Componets/currentProject/CurrentProject'
import PriviousProject from './Componets/priviousProject/PriviousProject'
import EmployeeDetails from  './Componets/employeeDetails/EmployeeDetails'
import AddEmployee from './Componets/addEmployee/AddEmployee'
import GetAllEmployee from './Componets/getAllEmployee/GetAllEmployee'
import UpdateEmployeeDetails from './Componets/updateEmployee/UpdateEmployeeDetails'
import UpdateCurrentProject from './Componets/updateCurrentProject/UpdateCurrentProject'
import AddCurrentProject from './Componets/addCurrentProject/AddCurrentProject'
import GetAllCurrentProject from './Componets/getAllCurrentProject/GetAllCurrentProject'
import AddPriviousProject from './Componets/addPriviousProject/AddPriviousProject'
import UpdatePriviousProject from './Componets/updatePriviousProject/UpdatePriviousProject'
import GetAllPrivousProject from './Componets/getAllPriviousProject/GetAllPrivousProject'
import Footer from './Componets/footerComponents/Footer'
import ForgotPassword from './Componets/forgotPassword/ForgotPassword'
import ChangePassword from './Componets/changePassword/ChangePassword'

function App() {
  // /**.index_main{
  //       /* background-image: url("");  */
  //       background-repeat: no-repeat;
  //       background-size: contain;
  //       backface-visibility: visible;
  //       width: 100%;
  //       z-index: -1;
  //       height: 4000vh;
  //       background-color: #34568B;
  //      } */

  return (
    <>
      <Container fluid>
        <Row>
        <Header></Header>
        </Row>
        <Row style={{
          backgroundColor:'#34568B',
          backgroundSize:'contain',
          width:'100%',
          zIndex:'-1',
          // height:'100%'

           
        }}>
        <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='*' element={<Home></Home>}></Route>
        
        <Route path='/login' element={<Login></Login>}>
        </Route>
        <Route path='/Signup' element={<SignUp></SignUp>}>
        </Route>
        <Route path='/logout' element={<Logout></Logout>}></Route>
        <Route exact path='/employeeDetails' element={<EmployeeDetails></EmployeeDetails>}></Route>
        <Route path='/employeeDetails/addEmployee' element={<AddEmployee></AddEmployee>}></Route>
        <Route path='/employeeDetails/getAllEmployee' element={<GetAllEmployee></GetAllEmployee>}></Route>
        <Route path='/employeeDetails/getAllEmployee/updateEmployeeDetails' element={<UpdateEmployeeDetails></UpdateEmployeeDetails>}></Route>
        <Route path='/employeeDetails/updateEmployeeDetails' element={<UpdateEmployeeDetails></UpdateEmployeeDetails>}></Route>
        <Route path='/currentProjectDetails' element={<CurrentProject></CurrentProject>}></Route>
        <Route path='/currentProjectDetails/getAllCurrentProjectDetails' element={<GetAllCurrentProject></GetAllCurrentProject>}></Route>
        <Route path='/currentProjectDetails/getAllCurrentProjectDetails/updateCurrentProjectDetails' element={<UpdateCurrentProject></UpdateCurrentProject>}></Route>
        <Route path='/currentProjectDetails/addCurrentProjectDetails' element={<AddCurrentProject></AddCurrentProject>}></Route>
        <Route path='/currentProjectDetails/upadateCurrentProjectDetails' element={<UpdateCurrentProject></UpdateCurrentProject>}></Route>

        <Route path='/priviousProjectDetails' element={<PriviousProject></PriviousProject>}></Route>
        <Route path='/priviousProjectDetails/addPriviousProjectDetails' element={<AddPriviousProject></AddPriviousProject>}></Route>
        <Route path='/priviousProjectDetails/updatePriviousProjectDetails' element={<UpdatePriviousProject></UpdatePriviousProject>}></Route>
        <Route path='/priviousProjectDetails/getAllPriviousProjectDetails' element={<GetAllPrivousProject></GetAllPrivousProject>}></Route>
        <Route path='/changePassword' element={<ChangePassword></ChangePassword>}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>
      </Routes>
    </BrowserRouter>
        </Row>
        <Row style={{
          width:'100%',
          height:'500px',
          backgroundColor:'	rgb(5, 5, 10)',
          backgroundSize:'contain',
         color:'white',
         marginTop:'1px'
        }}>
          <Col><Footer></Footer></Col>
        </Row>
      </Container>
      {/* <Routes>
        <Route to='/home' element={<Home></Home>}></Route>
      </Routes> */}
    </>
  )
}

export default App
