import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col } from 'reactstrap';
import { H3, P } from '../../../AbstractElements';
import { Error1 } from '../../Common/Data/SvgIcons';
import { getWorkspaceType, getStaff, getStaffPermission, getLoginUserType } from "../../../Constant/LoginConstant";
const ErrorPage1 = () => {
    return (
        <Fragment>
            <div className="page-wrapper" id="pageWrapper">
                <div className="error-wrapper">
                    <Container>
                        <div className="error-page1">
                            <div className="svg-wrraper mb-0">
                                <Error1 />
                            </div>
                            <Col md="8" className="offset-md-2">
                                <H3>Oops! This Page is Not Found.</H3>
                                <P attrPara={{ className: 'sub-content' }} >The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved.</P>
                                
                                {getLoginUserType == "user" ?  getWorkspaceType != "Factory" ? 
                                    <Link to={`${process.env.PUBLIC_URL}/viewinquiry`} className="btn btn-primary btn-lg">
                                        BACK TO HOME PAGE
                                    </Link>  : 
                                    <Link to={`${process.env.PUBLIC_URL}/factoryviewinquiry`} className="btn btn-primary btn-lg">
                                        BACK TO HOME PAGE
                                    </Link>
                                :
                                getWorkspaceType != "Factory" ?  
                                (getStaff === "Staff" && getStaffPermission.includes("View Inquiry")) || getStaff == null ? 
                                    <Link to={`${process.env.PUBLIC_URL}/viewinquiry`} className="btn btn-primary btn-lg">
                                        BACK TO HOME PAGE
                                    </Link> : 
                                    <Link to={`${process.env.PUBLIC_URL}/feedbackform`} className="btn btn-primary btn-lg">
                                    BACK TO HOME PAGE
                                    </Link>
                                :
                                (getStaff === "Staff" && getStaffPermission.includes("View Factory Inquiry")) || getStaff == null ?
                                    <Link to={`${process.env.PUBLIC_URL}/factoryviewinquiry`} className="btn btn-primary btn-lg">
                                    BACK TO HOME PAGE
                                    </Link> : 
                                    <Link to={`${process.env.PUBLIC_URL}/inquirycontacts`} className="btn btn-primary btn-lg">
                                    BACK TO HOME PAGE
                                    </Link>
                                }
                                

                            </Col>
                        </div>
                    </Container>
                </div>
            </div>
        </Fragment>
    );
};

export default ErrorPage1;