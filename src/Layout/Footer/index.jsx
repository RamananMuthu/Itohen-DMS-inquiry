import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Footer, P } from '../../AbstractElements';
import { useLocation } from 'react-router-dom';

const FooterClass = () => {
  const location = useLocation();
  let Footeryear = new Date().getFullYear();
  
  return (
    <Fragment>
           
           {/* <div id="cover-spin" disable="true">
              <div class="ring"></div> 
               </div> */}
      <Footer attrFooter={{ className: `footer ${location.pathname === '/viho/page-layout/footer-dark' ? 'footer-dark' : location.pathname === '/viho/page-layout/footer-fixed' ? 'footer-fix' : ''}` }} >
        <Container fluid={true}>
          <Row>
            <Col md="6" className="footer-copyright">
              <P attrPara={{ className: 'mb-0' }} >{'Copyright © '}{Footeryear}{' DMS All rights reserved. Version 1.13'}</P>
            </Col>
            <Col md="6">
              {/* <P attrPara={{ className: 'pull-right mb-0' }} >Dms <i className="fa fa-heart font-secondary"></i></P> */}
            </Col>
          </Row>
        </Container>
      </Footer>
    </Fragment>
  );
};

export default FooterClass;