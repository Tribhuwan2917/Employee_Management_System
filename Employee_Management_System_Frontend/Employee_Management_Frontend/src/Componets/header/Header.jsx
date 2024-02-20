import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image_URL } from '../../../public/UtilData';


function Header() {
  // const [isClicked, setIsClecked] = useState("false")
  // // const navigate=useNavigate()
  // const handleClicked = (event) => {
  //   event.preventDefault();
  // }
  return (<>
    <Navbar expand="lg" style={{ zIndex: '3', position: 'fixed' }} className="bg-body">
      <Container style={{ backgroundColor: '#333333', padding: '0px', margin: '0px' }} fluid>
        <Navbar.Brand href="#" style={{ backgroundColor: '#333333' }}>
          <img src={Image_URL} style={{ borderRadius: '50%' }} width={50} height={50}></img>
          <span style={{ padding: '2px' }}>
            Employee Management
          </span>
        </Navbar.Brand>
        <span>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/employeeDetails">Employee Details</Nav.Link>
              {(sessionStorage.getItem("isLoggedIn") === null) ? <Nav.Link href="/login">Login</Nav.Link> : <Nav.Link href="/logout">Logout</Nav.Link>}
              {(sessionStorage.getItem("isLoggedIn") === null) ? <Nav.Link href="/signup">SignUp</Nav.Link> : null}
              <NavDropdown title="Employee Project" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/currentProjectDetails">Current Project</NavDropdown.Item>
                <NavDropdown.Item href="/priviousProjectDetails">
                  Privious Project
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              {/* <NavDropdown style={{marginRight:'50px'}} title="Analysis" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/employeeAnalysisDetails">Employee Analysis</NavDropdown.Item>
                <NavDropdown.Item href="/companyAnalysisDetails">Company Analysis</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown> */}
             
            </Nav>
          </Navbar.Collapse>
        </span>
      </Container>
    </Navbar>
    {/* {isClicked === 'true' ? <Search></Search> : null} */}
  </>
  );
}

export default Header;