import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carousel from 'react-bootstrap/Carousel';
import { Alert} from 'react-bootstrap';
import './home.css'
import {Slider_Image1_URL, Slider_Image2_URL,Slider_Image3_URL, Slider_Image4_URL } from '../../../public/ApiUrl';
function Home() {
  return (
    <div style={{height:'640px'}} className='home'>
    {(!sessionStorage.getItem('isLoggedIn')||sessionStorage.getItem('isLoggedIn')==='false')? <Carousel style={{paddingTop:'200px'}} data-bs-theme="dark">
      <Carousel.Item style={{textAlign:'center'}}>
        <img
          style={{marginLeft:'50px', height:'350px',width:'900px', borderRadius:'10px'}}
          src={Slider_Image1_URL}
          alt="First slide"
        />
        <Carousel.Caption style={{textAlign:'center'}}>
          <h5 style={{color:'black',marginLeft:'50px'}}>Your employees are your greatest asset. Take care of them, and they will take care of your business</h5> <h3 style={{color:'lightslategrey',fontStyle:'italic'}}>Richard Branson</h3>
          <p style={{color:'black'}}></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          
          style={{marginLeft:'270px' , height:'350px',width:'900px', borderRadius:'10px'}}
          src={Slider_Image2_URL}
          alt="Second slide"
        />
        <Carousel.Caption style={{textAlign:'center'}}>
          <h5 style={{color:'black',marginLeft:'50px'}}>The strength of the team is each individual member. The strength of each member is the team.</h5><h3 style={{color:'lightslategrey',fontStyle:'italic'}}> Phil Jackson</h3> 
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{marginLeft:'260px',height:'350px',width:'900px',borderRadius:'10px'}}
          src={Slider_Image3_URL}
          alt="Third slide"
        />
        <Carousel.Caption >
        <h5 style={{color:'black',marginLeft:'50px'}}>Treat your employees exactly as you want them to treat your best customers.</h5><h3 style={{color:'lightslategrey',fontStyle:'italic'}}> Stephen R. Covey</h3> 
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{marginLeft:'260px',height:'350px',width:'900px',borderRadius:'10px'}}
           src={Slider_Image4_URL}
          alt="Third slide"
        />
        <Carousel.Caption >
        <h5 style={{color:'black',marginLeft:'50px'}}>The best leaders are those most interested in surrounding themselves with assistants and associates smarter than they are.</h5><h3 style={{color:'lightslategrey',fontStyle:'italic'}}>  John C. Maxwell</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>:<Alert style={{marginTop:'80px', zIndex:'1'}} variant='success'>
    <marquee>
         Your Most Welcome! {sessionStorage.getItem('registrationEmail')} </marquee>
        </Alert>}
        <div ></div>

      <ToastContainer/>
    </div>
  )
}

export default Home
