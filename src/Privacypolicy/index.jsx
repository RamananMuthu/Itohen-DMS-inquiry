import React, { Fragment, useState, useEffect } from 'react';
import { Col,  CardBody, Card,Container, Row, CardHeader, 
    Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import {  H3, LI, P, UL,H6 } from '../AbstractElements';
import { SignUp, ServerUrl} from '../Constant';

import dmslogtag from "../assets/images/dms/dms-log-with-tag.png" ;
import axios from 'axios';

import Swal from 'sweetalert2';

const Privacypolicy  = ({ selected }) => {
    
    let duration;
    const[RightTab, setRightTab] = useState('1');
     const[monthlyPlan, setMonthlyPlan] = React.useState(['']);
     const[yearlyPlan, setYearlyPlan] = React.useState(['']);
   
    return (
        <>   
        <Fragment >
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader className="pb-0">
                                <Row>
                                    <p>
                                        <img src={dmslogtag} width="150"/>
                                    </p>
                                </Row>
                            </CardHeader>
                             <Col>
                            </Col>
                                <CardBody className="termsalign">
                                   
                                    <h4>Privacy Policy (Personal Information Protection Policy)</h4>
                                    <p>
                                        Concept Art Technologies Co., Ltd. (hereinafter referred to as "our company") hereby establishes and publishes a personal information protection policy, and by ensuring that our staff and related parties recognize the importance of protecting personal information and ensure that personal information is We promote protection.<br></br><br></br>
                                        1. We will comply with laws and regulations regarding personal information protection, national guidelines and other norms regarding personal information handled in all businesses and personal information of officers and employees.<br></br><br></br>
                                        2. When acquiring personal information, we will clarify in advance the purpose of use and whether or not it will be provided, and after obtaining the consent of the individual, we will use it appropriately within the scope of the purpose and will not use it for any other purpose. We will take measures for.<br></br><br></br>
                                        3. When entrusting all or part of the handling of personal information obtained through the measures set forth in the preceding paragraph, or when providing personal information to a third party, we will select a person who meets a sufficient level of protection, and make a contract. We will take appropriate measures such as.<br></br><br></br>
                                        4. We will take reasonable safety measures and corrective measures against risks such as unauthorized access to personal information, loss, destruction, falsification, and leakage of personal information.<br></br><br></br>
                                        5. We will respond appropriately to complaints and consultations regarding personal information protection at the contact point below.<br></br><br></br>
                                        6. We will respond without delay to requests for disclosure, correction, deletion, suspension of use, etc. of the relevant personal information from the person himself/herself.<br></br><br></br>
                                        7. In response to changes in social and economic conditions, we will continuously review and improve our personal information management system in order to appropriately use and protect personal information.<br></br><br></br>
                                            Established: September 01, 2019<br></br>
                                            Concept Art Technologies Inc.<br></br>
                                            Representative Director Yusuke Hara<br></br><br></br>
                                        ■ Inquiries regarding efforts to protect personal information<br></br>
                                        Concept Art Technologies Co., Ltd.<br></br>
                                        Personal Information Protection Manager Toshiya Okawara<br></br>
                                        〒103-0013 Ligare Nihonbashi Ningyocho Annex 303, 1-11-12 Nihonbashi Ningyocho, Chuo-ku, Tokyo<br></br>
                                        email: support@catech.co.jp     
                                    </p>
                                </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
        </>  
    );

   
   
};

export default Privacypolicy ;