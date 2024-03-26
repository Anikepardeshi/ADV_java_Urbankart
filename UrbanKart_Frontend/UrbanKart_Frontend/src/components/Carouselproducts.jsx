import Carousel from 'react-bootstrap/Carousel';


import carimage1 from '../images/Home.jpg'
import carimage2 from '../images/Story.jpeg'

import carimage3 from '../images/Web Banner.jpeg'

import carimage4 from '../images/Holyster - Fashion WooCommerce Theme.jpeg'
import carimage5 from '../images/Web Banner.jpeg'


function Carouselproducts() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carimage1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5></h5>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carimage2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5></h5>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carimage3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5></h5>
          <p>
            
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carimage4}
          alt="Third slie"
        />
        <Carousel.Caption>
          <h5></h5>
          <p>
            
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carouselproducts;