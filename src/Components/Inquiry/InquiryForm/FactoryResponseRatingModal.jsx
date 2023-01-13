import React, { useState } from "react";
import {
  Offcanvas,
  OffcanvasBody, Input,
  OffcanvasHeader, Button,  CardBody, Card, CardHeader, Collapse, Row, Col
} from "reactstrap";
import { Btn, P, H5,H4 } from "../../../AbstractElements";
import {  Important, ServerUrl } from "../../../Constant";
import axios from "axios";
import Swal from "sweetalert2";
import Moment from 'moment';
import { getLoginCompanyId, getWorkspaceId } from "../../../Constant/LoginConstant";
import { useTranslation } from 'react-i18next';
import { apiencrypt, apidecrypt } from "../../../helper";
import { Accordion } from 'react-bootstrap';
import Rating from 'react-rating';

const FactoryResponseRatingModal = ({ modal, toggle, factoryRatingData }) => 
{
  var lowestPriceRating = 0;
  var onTimeDeliveryRating = 0;
  var collaborativeRating = 0;
  var efficientCommunicationRating = 0;
  var goodSellRating = 0;
  var lessQuantityIssuesRating = 0;
  var OnTimeSampleSubmissionRating = 0;
  var vendorBuyerRelationshipRating = 0;
 

//   console.log("Data", factoryRatingData.no_of_orders );
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(1);
  const toggleAccordion = (id) => (isOpen === id ? setIsOpen(null) : setIsOpen(id));

//   const[a,setA]=useState(0);
  var getInputHolidays = {}
  getInputHolidays['company_id'] = getLoginCompanyId;
  getInputHolidays['workspace_id'] = getWorkspaceId;

  return (
    <Offcanvas 
        isOpen={modal} toggle={toggle} 
        direction={"end"} 
        className="offcanvas-width ratingModel" 
        style={{ height: '75%', width: '500px', fontSize:'12px',  marginTop: '7%', borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px'}}>
      <OffcanvasBody>
        <Accordion defaultActiveKey="0">
                    {Object.entries(factoryRatingData).map((mapData) => 
                    (
                        <div className="default-according" id="accordion">
                            <Card>
                                <CardHeader>
                                <H4 attrH4={{ className: 'mb-0' }} style={{  textAlign: 'left' }}  >
                                    <Btn 
                                        attrBtn={{ as: Card.Header, className: 'btn btn-link paddingZero width-100', color: 'default', 
                                        }}>
                                        <Row>
                                            <span style={{  textAlign: 'left' }}>
                                                {mapData[0] == "lowest_price" ?  "Lowest Price" : ""}
                                                {mapData[0] == "collaborative_approach" ?  "Collaborative Approach" : ""}
                                                {mapData[0] == "communication" ?  "Communication" : ""}
                                                {mapData[0] == "good_sell_through" ?  "Good Sell Through" : ""}
                                                {mapData[0] == "less_quality_issue"?  "Less Quality Issue" : ""}
                                                {mapData[0] == "ontime_delivery" ?  "Ontime Delivery" : ""}
                                                {mapData[0] == "sample_submission" ?  "Sample Submission" : ""}
                                                {mapData[0] == "vendor_buyer_relation" ?  "Vendor Buyer Relation" : ""}
                                            </span>
                                        </Row>
                                     
                                        <Row style={{  textAlign: 'left' }}>       
                                                    {mapData[0] == "lowest_price" ?  
                                                        (mapData[1]).map((mapData, index) => 
                                                    (
                                                        lowestPriceRating+=mapData.rating, 
                                                        (index)+1 == factoryRatingData.no_of_orders 
                                                        ?
                                                        <>
                                                            <Col md="3">
                                                            <Rating
                                                                readonly
                                                                className="starColor"
                                                                initialRating={lowestPriceRating/factoryRatingData.no_of_orders }
                                                                emptySymbol={"fa fa-star-o fa-1x"}
                                                                fullSymbol="fa fa-star fa-1x"
                                                                >
                                                            </Rating>
                                                            </Col>
                                                            <Col md="9">
                                                            <P> {(lowestPriceRating/factoryRatingData.no_of_orders).toFixed(1) } Out Of 5 ({factoryRatingData.no_of_orders } Orders)
                                                            </P>
                                                            </Col>
                                                        
                                                        </>

                                                        :
                                                        ""))
                                                    : ""}

                                                    {mapData[0] == "ontime_delivery" ?  
                                                        (mapData[1]).map((mapData, index) => 
                                                    (
                                                        onTimeDeliveryRating+=mapData.rating, 
                                                        (index)+1 == factoryRatingData.no_of_orders 
                                                        ?
                                                        <>
                                                        <Col md="3">
                                                        <Rating
                                                            readonly
                                                            className="starColor"
                                                            initialRating={onTimeDeliveryRating/factoryRatingData.no_of_orders }
                                                            emptySymbol={"fa fa-star-o fa-1x"}
                                                            fullSymbol="fa fa-star fa-1x"
                                                            >
                                                        </Rating>
                                                        </Col>
                                                        <Col md="9">
                                                        <P> {(onTimeDeliveryRating/factoryRatingData.no_of_orders).toFixed(1) } Out Of 5 ({factoryRatingData.no_of_orders } Orders)
                                                        </P>
                                                        </Col>
                                                        </>                                                        
                                                        :
                                                        ""))
                                                    : ""}

                                                    {mapData[0] == "collaborative_approach" ?  
                                                        (mapData[1]).map((mapData, index) => 
                                                    (
                                                        collaborativeRating+=mapData.rating, 
                                                        (index)+1 == factoryRatingData.no_of_orders 
                                                        ?
                                                        <>
                                                        <Col md="3">
                                                        <Rating
                                                            readonly
                                                            className="starColor"
                                                            initialRating={collaborativeRating/factoryRatingData.no_of_orders }
                                                            emptySymbol={"fa fa-star-o fa-1x"}
                                                            fullSymbol="fa fa-star fa-1x"
                                                            >
                                                        </Rating>
                                                        </Col>
                                                        <Col md="9">
                                                        <P> {(collaborativeRating/factoryRatingData.no_of_orders).toFixed(1) } Out Of 5 ({factoryRatingData.no_of_orders } Orders)
                                                        </P>
                                                        </Col>
                                                        </>          
                                                        :
                                                        ""))
                                                    : ""}

                                                    {mapData[0] == "communication" ?  
                                                        (mapData[1]).map((mapData, index) => 
                                                    (
                                                        efficientCommunicationRating+=mapData.rating, 
                                                        (index)+1 == factoryRatingData.no_of_orders 
                                                        ?
                                                        <>
                                                        <Col md="3">
                                                        <Rating
                                                            readonly
                                                            className="starColor"
                                                            initialRating={efficientCommunicationRating/factoryRatingData.no_of_orders }
                                                            emptySymbol={"fa fa-star-o fa-1x"}
                                                            fullSymbol="fa fa-star fa-1x"
                                                            >
                                                        </Rating>
                                                        </Col>
                                                        <Col md="9">
                                                        <P> {(efficientCommunicationRating/factoryRatingData.no_of_orders).toFixed(1) } Out Of 5 ({factoryRatingData.no_of_orders } Orders)
                                                        </P>
                                                        </Col>
                                                        </>          
                                                       
                                                        :
                                                        ""))
                                                    : ""}
                                                 
                                                 {mapData[0] == "good_sell_through" ?  
                                                        (mapData[1]).map((mapData, index) => 
                                                    (
                                                        goodSellRating+=mapData.rating, 
                                                        (index)+1 == factoryRatingData.no_of_orders 
                                                        ?
                                                        <>
                                                        <Col md="3">
                                                        <Rating
                                                            readonly
                                                            className="starColor"
                                                            initialRating={goodSellRating/factoryRatingData.no_of_orders }
                                                            emptySymbol={"fa fa-star-o fa-1x"}
                                                            fullSymbol="fa fa-star fa-1x"
                                                            >
                                                        </Rating>
                                                        </Col>
                                                        <Col md="9">
                                                        <P> {(goodSellRating/factoryRatingData.no_of_orders).toFixed(1) } Out Of 5 ({factoryRatingData.no_of_orders } Orders)
                                                        </P>
                                                        </Col>
                                                        </>          
                                                        
                                                        :
                                                        ""))
                                                    : ""}

                                                    {mapData[0] == "less_quality_issue" ?  
                                                        (mapData[1]).map((mapData, index) => 
                                                    (
                                                        lessQuantityIssuesRating+=mapData.rating, 
                                                        (index)+1 == factoryRatingData.no_of_orders 
                                                        ?
                                                        <>
                                                        <Col md="3">
                                                        <Rating
                                                            readonly
                                                            className="starColor"
                                                            initialRating={lessQuantityIssuesRating/factoryRatingData.no_of_orders }
                                                            emptySymbol={"fa fa-star-o fa-1x"}
                                                            fullSymbol="fa fa-star fa-1x"
                                                            >
                                                        </Rating>
                                                        </Col>
                                                        <Col md="9">
                                                        <P> {(lessQuantityIssuesRating/factoryRatingData.no_of_orders).toFixed(1) } Out Of 5 ({factoryRatingData.no_of_orders } Orders)
                                                        </P>
                                                        </Col>
                                                        </>          
                                                       
                                                        :
                                                        ""))
                                                    : ""}

                                                    
                                                    {mapData[0] == "sample_submission" ?  
                                                        (mapData[1]).map((mapData, index) => 
                                                    (
                                                        OnTimeSampleSubmissionRating+=mapData.rating, 
                                                        (index)+1 == factoryRatingData.no_of_orders 
                                                        ?
                                                        <>
                                                        <Col md="3">
                                                        <Rating
                                                            readonly
                                                            className="starColor"
                                                            initialRating={OnTimeSampleSubmissionRating/factoryRatingData.no_of_orders }
                                                            emptySymbol={"fa fa-star-o fa-1x"}
                                                            fullSymbol="fa fa-star fa-1x"
                                                            >
                                                        </Rating>
                                                        </Col>
                                                        <Col md="9">
                                                        <P> {(OnTimeSampleSubmissionRating/factoryRatingData.no_of_orders).toFixed(1) } Out Of 5 ({factoryRatingData.no_of_orders } Orders)
                                                        </P>
                                                        </Col>
                                                        </>          
                                                       
                                                        :
                                                        ""))
                                                    : ""}

                                                    {mapData[0] == "vendor_buyer_relation" ?  
                                                        (mapData[1]).map((mapData, index) => 
                                                    (
                                                        vendorBuyerRelationshipRating+=mapData.rating, 
                                                        (index)+1 == factoryRatingData.no_of_orders 
                                                        ?
                                                        <>
                                                        <Col md="3">
                                                        <Rating
                                                            readonly
                                                            className="starColor"
                                                            initialRating={vendorBuyerRelationshipRating/factoryRatingData.no_of_orders }
                                                            emptySymbol={"fa fa-star-o fa-1x"}
                                                            fullSymbol="fa fa-star fa-1x"
                                                            >
                                                        </Rating>
                                                        </Col>
                                                        <Col md="9">
                                                        <P> {(vendorBuyerRelationshipRating/factoryRatingData.no_of_orders).toFixed(1) } Out Of 5 ({factoryRatingData.no_of_orders } Orders)
                                                        </P>
                                                        </Col>
                                                        </>          
                                                        
                                                        :
                                                        ""))
                                                    : ""}
                                                </Row> 
                                    </Btn>
                                </H4>
                                </CardHeader>
                                    <Collapse isOpen={isOpen === 1}>
                                            <div className="table-responsive">
                                                <table className="table shadow shadow-showcase table-striped table-bordered">
                                                    <thead>
                                                        <tr>
                                                        <th scope="col" className="centerAlign">Order ID</th>
                                                        <th className="centerAlign">Style No</th>
                                                        <th className="centerAlign">Rating</th>
                                                        <th className="centerAlign">Comments</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        
                                                        { 
                                                        (mapData[0]) == "lowest_price" 
                                                            ?
                                                            (mapData[1]).map((mapData, index) => 
                                                                (
                                                                    <tr>
                                                                        <td >{mapData.inquiry_id}</td>  
                                                                        <td >{mapData.style_no}</td>
                                                                        <td className="centerAlign">{mapData.rating}</td>
                                                                        <td className="centerAlign">{mapData.comments}</td>  
                                                                    </tr> 
                                                                )
                                                            )
                                                            :
                                                            ""
                                                        }
                                                        
                                                        {/* { setLowestPriceRating((a/factoryRatingData.no_of_orders).toFixed(1)) } */}
                                                         

                                                        { (mapData[0]) == "ontime_delivery" ?
                                                            (mapData[1]).map((mapData) => 
                                                                (
                                                                    <tr>
                                                                    <td >{mapData.inquiry_id}</td>  
                                                                    <td >{mapData.style_no}</td>
                                                                    <td className="centerAlign">{mapData.rating}</td>
                                                                    <td className="centerAlign">{mapData.comments}</td>  
                                                                </tr>

                                                                )
                                                            )
                                                            :
                                                            ""
                                                        }

                                                        { (mapData[0]) == "vendor_buyer_relation" ?
                                                            (mapData[1]).map((mapData) => 
                                                                (
                                                                    <tr>
                                                                    <td >{mapData.inquiry_id}</td>  
                                                                    <td >{mapData.style_no}</td>
                                                                    <td className="centerAlign">{mapData.rating}</td>
                                                                    <td className="centerAlign">{mapData.comments}</td>  
                                                                </tr>

                                                                )
                                                            )
                                                            :
                                                            ""
                                                        }

                                                        { (mapData[0]) == "sample_submission" ?
                                                            (mapData[1]).map((mapData) => 
                                                                (
                                                                    <tr>
                                                                    <td >{mapData.inquiry_id}</td>  
                                                                    <td >{mapData.style_no}</td>
                                                                    <td className="centerAlign">{mapData.rating}</td>
                                                                    <td className="centerAlign">{mapData.comments}</td>  
                                                                </tr>

                                                                )
                                                            )
                                                            :
                                                            ""
                                                        }


                                                        { (mapData[0]) == "communication" ?
                                                            (mapData[1]).map((mapData) => 
                                                                (
                                                                    <tr>
                                                                    <td >{mapData.inquiry_id}</td>  
                                                                    <td >{mapData.style_no}</td>
                                                                    <td className="centerAlign">{mapData.rating}</td>
                                                                    <td className="centerAlign">{mapData.comments}</td>  
                                                                </tr>

                                                                )
                                                            )
                                                            :
                                                            ""
                                                        }


                                                        { (mapData[0]) == "less_quality_issue" ?
                                                            (mapData[1]).map((mapData) => 
                                                                (
                                                                    <tr>
                                                                    <td >{mapData.inquiry_id}</td>  
                                                                    <td >{mapData.style_no}</td>
                                                                    <td className="centerAlign">{mapData.rating}</td>
                                                                    <td className="centerAlign">{mapData.comments}</td>  
                                                                </tr>

                                                                )
                                                            )
                                                            :
                                                            ""
                                                        }


                                                        { (mapData[0]) == "good_sell_through" ?
                                                            (mapData[1]).map((mapData) => 
                                                                (
                                                                    <tr>
                                                                    <td >{mapData.inquiry_id}</td>  
                                                                    <td >{mapData.style_no}</td>
                                                                    <td className="centerAlign">{mapData.rating}</td>
                                                                    <td className="centerAlign">{mapData.comments}</td>  
                                                                </tr>

                                                                )
                                                            )
                                                            :
                                                            ""
                                                        }

                                                        { (mapData[0]) == "collaborative_approach" ?
                                                            (mapData[1]).map((mapData) => 
                                                                (
                                                                    <tr>
                                                                    <td >{mapData.inquiry_id}</td>  
                                                                    <td >{mapData.style_no}</td>
                                                                    <td className="centerAlign">{mapData.rating}</td>
                                                                    <td className="centerAlign">{mapData.comments}</td>  
                                                                </tr>

                                                                )
                                                            )
                                                            :
                                                            ""
                                                        }
                                                    </tbody>
                                                </table> 
                                            </div>
                                    </Collapse>
                            </Card>
                            {/* {console.log(" (===a===) ", a)} */}
                        </div>
                    ))
                    }     
                
        </Accordion>
      </OffcanvasBody>
    </Offcanvas>
  );
};
export default FactoryResponseRatingModal;