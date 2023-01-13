import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, CardBody, Card, Label, } from "reactstrap";
import { Breadcrumbs, H5, P, Btn, H6, H2, H4 } from "../../../AbstractElements";
import Loader from "../../../Layout/Loader/index";
import { getLoginUserId } from '../../../Constant/LoginConstant';
import { encode, decode, calculateDateDiffCountFromCurrentDate, apiencrypt, apidecrypt } from "../../../helper"
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import InquiryNoIcon from "../../../assets/images/dms/icons/inquiryNoIcon.svg";
import {  maxFileUpload, maxUploadFileSize, ServerUrl } from "../../../Constant";
import FactoryResponseRatingIcon from '../../../assets/images/dms/icons/factoryResponseRatingIcon.svg';
import FactoryResponseRatingModal from "./FactoryResponseRatingModal";
const FactoryResponse = (  ) => {

    const [searchParams, setSearchParams] = useSearchParams(); 
    const [inquiryId,setInquiryId]= useState(decode(searchParams.get("id")));
    const [factoryRes,setFactoryRes] = useState([]);
    const [factoryId, setFactoryId] = useState(); 

    const [ userId, setUserId ] = useState(getLoginUserId);

    const [modalRating, setModalRating] = useState(false);
    const togglRating = () => setModalRating(!modalRating);

    const [ factoryRatingData, setFactoryRatingData] = useState([]);

    const getInputParams ={};
    getInputParams["inquiry_id"] = "26";

    const factoryRatingInputParams ={};
    factoryRatingInputParams["factory_id"] = 18;
    factoryRatingInputParams["user_id"] = 16;

    const apiCallFactoryRating = ( factoryId ) => 
    {
        axios
          .post(ServerUrl + "/get-factory-ratings", factoryRatingInputParams)
          .then((response) => {
            // response.data = apidecrypt(response);
            setFactoryRatingData(response.data.data);
          })
    }

    useEffect(() => {
        axios
          .post(ServerUrl + "/inquiry-factory-response", getInputParams)
          .then((response) => {
            // console.log("###", response.data.data);
             setFactoryRes(response.data.data);
          })
      }, [])  

  return (
   <Fragment>
    <Loader />
    <Row className="pgbgcolor">
        <Breadcrumbs mainTitle ="Factory Response" parent = "Factory Response" />
    </Row>
    <Container fluid={true} className="general-widget topaln">
        <Row>
            <Col sm="12">
                <Card>
                    <CardBody>
                        <Col sm ="12">
                            <Row>
                                <Col sm ="6" md ="6" lg="3">
                                    {/* <Card  style={{ backgroundColor:"#4E90DE" ,borderRadius: "30px"}}  >
                                    <CardBody> */}
                                    <div  style={{ backgroundColor:"#4E90DE" ,borderRadius: "30px",height:"47px",padding:"10px" }} >
                                        
                                        <span className="m-y-auto">
                                            <span><img src ={InquiryNoIcon} width ="20px" height="20px" style={{verticalAlign:"middle"  }} /></span>
                                                <span style={{ color: "white",fontSize:"18px",verticalAlign:"middle"  }}> Inquiry No </span>
                                                <span className="f-right" style={{ color: "white",fontSize:"18px",verticalAlign:"middle"  }}>{"IN-"+inquiryId}</span>
                                                </span>  
                                                
                                                </div> 
                                                {/* </CardBody>
                                </div>
                                    </Card> */}
                                </Col>
                            </Row>
                        </Col>
                        <Row className="g-12 m-t-20">
                            <Col md="12" lg="12" sm="12">
                                <Row className="g-12">
                                    <div className="table-responsive">
                                        <table className="table shadow shadow-showcase table-striped table-bordered">
                                            <thead  className="bg-primary">
                                                <tr>
                                                <th scope="col" className="centerAlign">S.No</th>
                                                <th  >Factory</th>
                                                <th  >Contact Name</th>
                                                <th  className="centerAlign">Phone Number</th>
                                                <th  className="centerAlign">Price</th>
                                                <th  className="centerAlign">Comment</th>
                                                <th  className="centerAlign">Rating</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {factoryRes.length > 0 ? factoryRes.map((factRes,index)=> 
                                                    (
                                                        <tr>
                                                        <td  scope="row" className="centerAlign">{index+1}</td>
                                                        <td >{factRes.factory}</td>  
                                                        <td >{factRes.contact_person}</td>
                                                        <td className="centerAlign">{factRes.contact_number}</td>
                                                        <td className="centerAlign">{factRes.price}</td>
                                                        <td className="centerAlign">{factRes.comments}</td>  
                                                        <td className="centerAlign"> 
                                                        <img src={FactoryResponseRatingIcon} 
                                                            style={{ cursor: 'pointer'}} 
                                                            width="23px" 
                                                            onClick={() => { setFactoryId(factRes.factory_id), apiCallFactoryRating(), setModalRating(!modalRating) }}
                                                        />
                                                        </td>                          
                                                    </tr>
                                                    )):
                                                    <>
                                                        <tr className="text-center"><td colSpan="6">List Factory Response Details</td></tr>
                                                    </>
                                                }
                                                < FactoryResponseRatingModal
                                                    modal={modalRating}
                                                    toggle={togglRating} 
                                                    factoryRatingData={factoryRatingData}
                                                    factoryId={factoryId}
                                                    userId={userId}
                                                />
                                            </tbody>
                                        </table> 
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
   </Fragment>
  )
}

export default FactoryResponse