// import { Container, Row, Col } from 'react-bootstrap';

// function Footer() {
//   return (
//     <footer className="bg-light text-center text-lg-start fixed-bottom">
    //   <Container>
    //     <Row>
    //       <Col lg={6} md={12} className="mb-4 mb-md-0">
    //         <h5 className="text-uppercase">Company name</h5>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
    //         </p>
    //       </Col>

    //       <Col lg={3} md={6} className="mb-4 mb-md-0">
    //         <h5 className="text-uppercase">Links</h5>

    //         <ul className="list-unstyled">
    //           <li>
    //             <a href="#!" className="text-dark">Link 1</a>
    //           </li>
    //           <li>
    //             <a href="#!" className="text-dark">Link 2</a>
    //           </li>
    //           <li>
    //             <a href="#!" className="text-dark">Link 3</a>
    //           </li>
    //           <li>
    //             <a href="#!" className="text-dark">Link 4</a>
    //           </li>
    //         </ul>
    //       </Col>

    //       <Col lg={3} md={6} className="mb-4 mb-md-0">
    //         <h5 className="text-uppercase mb-0">Links</h5>

    //         <ul className="list-unstyled">
    //           <li>
    //             <a href="#!" className="text-dark">Link 1</a>
    //           </li>
    //           <li>
    //             <a href="#!" className="text-dark">Link 2</a>
    //           </li>
    //           <li>
    //             <a href="#!" className="text-dark">Link 3</a>
    //           </li>
    //           <li>
    //             <a href="#!" className="text-dark">Link 4</a>
    //           </li>
    //         </ul>
    //       </Col>
    //     </Row>
    //   </Container>

    //   <div className="text-center p-3 bg-dark text-white">
    //     &copy; {new Date().getFullYear()} Company Name. All rights reserved.
    //   </div>
//     </footer>
//   );
// }

// export default Footer;


import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

function Footer() {
  const [showFooter, setShowFooter] = useState(false);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleScroll = () => {
//     const hasItems = document.body.offsetHeight > window.innerHeight;
//     if (hasItems && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//       setShowFooter(false);
//     } else {
//       setShowFooter(true);
//     }
//   };

  return (
    // <footer className={`navbar navbar-expand-lg navbar-light bg-light${!showFooter ? ' fixed-bottom' : ''}`}>
      <footer className="footer--pin navbar navbar-expand-lg navbar-light bg-light">
      <Container>
        <Row>
          <Col lg={6} md={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">DigiCart</h5>
            <p>
            DIGICART is the perfect choice for shopping malls looking to unlock their digital shopping potential. With our easy-to-use DIGICART, DigiCart is a digital cart that lets you shop more conveniently at the mall. Simply scan an item through your cart, and the bill will be generated instantly. You do not need to stand in line to pay your bill.
            </p>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Made With</h5>

            <ul className="list-unstyled">
              <li>
                <p  className="text-dark">REACT.js</p>
              </li>
              <li>
                <p  className="text-dark">JAVASCRIPT</p>
              </li>
              <li>
                <p  className="text-dark">NODE.js</p>
              </li>
              <li>
                <p  className="text-dark">HTML</p>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Links</h5>

            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-dark">Link 1</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Link 2</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Link 3</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Link 4</a>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="text-center p-3 bg-dark text-white">
        &copy; {new Date().getFullYear()} DigiCart. All rights reserved.
      </div>
      </Container>

     
      
    </footer>
  );
}

export default Footer;