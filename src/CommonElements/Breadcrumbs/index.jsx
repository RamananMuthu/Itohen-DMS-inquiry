import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import H3 from '../Headings/H3Element';
import { useTranslation } from 'react-i18next';

const Breadcrumbs = (props) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Container fluid={true}>
        <div className="page-header">
          <Row>
            <Col sm="6" className='hdtext'>
              <H3 className="brdhead">{t(props.mainTitle)}</H3>
              {/* {props.subTitle?props.subTitle:<span>&nbsp;</span>} */}
            </Col>
            <Col sm="6">
              {/* <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>Home</Link></li>
                <li className="breadcrumb-item">{props.parent}</li>
                {props.subParent ? <li className="breadcrumb-item">{props.subParent}</li> : ''}
                <li className="breadcrumb-item active">{props.title}</li>
              </ol> */}
            </Col>

          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Breadcrumbs;