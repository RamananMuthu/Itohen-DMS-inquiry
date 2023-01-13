
import React, { Fragment, useState, useEffect } from "react";
import {
    Form,
    Label,
    Card,
    CardBody,
    Col,
    Row,
    Input,
    InputGroup,
    InputGroupText,
    Button,
    FormGroup,
    Media,
    Container,
    Table
  } from "reactstrap";
  import axios from "axios";
  import {
    getLoginCompanyId, getWorkspaceId, getLoginUserId, getWorkspaceType,
    getStaff, getStaffPermission, getLoginStaffId
  }
    from '../../../Constant/LoginConstant';
    import Swal from "sweetalert2";
    import { Breadcrumbs, H6,Btn,Image} from '../../../AbstractElements';
    import { useTranslation } from 'react-i18next';
    import { maxFileUpload, maxUploadFileSize, ServerUrl } from "../../../Constant";
    import Rating from 'react-rating';

    const FeedbackFormInquiry = () => {
        const [ratingLowestPrice, setRatingLowestPrice] = useState();
        const [ratingCommunication, setRatingCommunication] = useState();
        const [ratingOnTimeDelivery, setRatingOnTimeDelivery] = useState();
        const [ratingLessQuantityIssues, setRatingLessQuantityIssues] = useState();
        const [ratingVBRelationship, setRatingVBRelationship] = useState();
        const [ratingGoodSell, setRatingGoodSell] = useState();
        const [ratingOnTimeSampleSubmit, setRatingOnTimeSampleSubmit] = useState();
        const [ratingCollabrative, setRatingCollabrative] = useState(); 
        const[inquiryIds,setInquiryIds] = useState([]);
        const[inquiryID,setInquiryID] = useState('');
        const[factory,setFactory] = useState('');  
        const[lowestPriceComment,setLowestPriceComment] = useState('');
        const[effiCommunicationComment,setEffiCommunicationComment] = useState(''); 
        const[onTimeDeliveryComment,setOnTimeDeliveryComment] = useState('');
        const[factoriesListData,setFactoriesListData] = useState([]);
        const[lessQuantityComment,setLessQuantityComment] = useState('');
    const[vbRelationshipComment,setVbRelationshipComment] = useState('');
    const[goodSellComment,setGoodSellComment] = useState('');
    const[onTimeSampleSubmitComment,setOnTimeSampleSubmitComment] = useState('');
    const[collabrativeComment,setCollabrativeComment] = useState('');
    const { t } = useTranslation();
        var getInputParams = {};
        getInputParams["company_id"] = getLoginCompanyId;
        getInputParams["workspace_id"] = getWorkspaceId;
        getInputParams["user_id"] = getLoginUserId;

        useEffect(() => {
    axios
    .post(ServerUrl + "/get-buyer-inquiry-list",getInputParams)
    .then((response) => {
        // console.log(response.data.data);
    // response.data = apidecrypt(response.data);
    setInquiryIds(response.data.data);
    });

        },[]);
        const factoryCall=(id)=>{
            var getInquiryId ={};
            getInquiryId["inquiry_id"]=id;
            axios
            .post(ServerUrl + "/get-inquiry-factory-list",getInquiryId)
            .then((response) => {
                // console.log("HLLO:",response.data.data);
            // response.data = apidecrypt(response.data);
            setFactoriesListData(response.data.data);
            });
        }
        const onSaveHandle =(e)=>{
            var feedbackInputParams={};
            feedbackInputParams["inquiry_id"]= inquiryID;
            feedbackInputParams["company_id"]= getLoginCompanyId;
            feedbackInputParams["workspace_id"]= getWorkspaceId ;
            feedbackInputParams["user_id"]= getLoginUserId;
            feedbackInputParams["factory_id"]= factory;
            feedbackInputParams["lowest_price"]= ratingLowestPrice ;
            feedbackInputParams["lowest_price_comments"]= lowestPriceComment;
            feedbackInputParams["ontime_delivery"]= ratingOnTimeDelivery;
            feedbackInputParams["ontime_delivery_comments"]= onTimeDeliveryComment;
            feedbackInputParams["vendor_buyer_relation"]= ratingVBRelationship;
            feedbackInputParams["vendor_buyer_relation_comments"]= vbRelationshipComment;
            feedbackInputParams["sample_submission"]= ratingOnTimeSampleSubmit;
            feedbackInputParams["sample_submission_comments"]= onTimeSampleSubmitComment;
            feedbackInputParams["communication"]= ratingCommunication;
            feedbackInputParams["communication_comments"]= effiCommunicationComment;
            feedbackInputParams["less_quality_issue"]= ratingLessQuantityIssues;
            feedbackInputParams["less_quality_issue_comments"]=lessQuantityComment;
            feedbackInputParams["good_sell_through"]=ratingGoodSell;
            feedbackInputParams["good_sell_through_comments"]=goodSellComment;
            feedbackInputParams["collaborative_approach"]=ratingCollabrative;
            feedbackInputParams["ollaborative_approach_comments"]=collabrativeComment;

            axios
            .post(ServerUrl+ "/save-factory-feedback",feedbackInputParams)
            .then((response)=>{
                // console.log("FF",response.data.status_code);
                if(response.data.status_code == 200){
                    Swal.fire({
                        title: "FeedBack Added Successfully",
                        // text: t(response.data.message),
                        icon: "success",
                        button: t("okLabel"),
                        allowOutsideClick: false,
                    });
                }
            });
        }
    return (
        <Fragment>
                <Row className="pgbgcolor">
                <Breadcrumbs mainTitle= "Feed Back" parent="Inquiry" 
                title="Inquiry" />
                </Row>  
                <Container fluid ={true} className="general-widget topaln">
                    <Col md='12' sm='12' lg='12'>
                        <Card>
    <CardBody>
        <Form>
            <Col lg='12'>
                <Row>
                    <Col lg='4'>
                        <FormGroup>
                            <Label style={{ color: "#5F5F5F" }}>Inquiry ID</Label>
                            <Input  className="" name="Inquiry Id" type ="select" defaultValue ="" 
                                    onChange={(e)=>{setInquiryID(e.target.value),
                            factoryCall(e.target.value)}}>
                                <option value = "" disabled>Select Inquiry ID</option>
                            {inquiryIds.map((inqryId)=>(
                                <option value={inqryId.id}>{"IN-" + inqryId.id +"("+ inqryId.style_no +")" }</option>
                            ))}
                            </Input>

                        </FormGroup>
                    </Col>
                    <Col lg='4'>
                        <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>Factory</Label>
                        <Input  className="" name="Factory                   
                        " type ="select" defaultValue ="" onChange={(e)=>setFactory(e.target.value)}>
                        <option value= "" disabled >Select Factory</option>
                    {factoriesListData.map((factry)=>(
                        <option value={factry.id}>{factry.factory}</option>
                    ))}
                        </Input>
                        </FormGroup>
                        </Col>
                </Row>
            </Col>
            <Col lg="12">
                <Row>
                    <Col lg='4'>
                        <FormGroup>
                            <Label style={{ color: "#5F5F5F" }}>Lowest Price</Label>
                            <Row className="mb-2">
                            <Rating 
                                    className="starColor"
                                        initialRating={ratingLowestPrice}
                                        emptySymbol={"fa fa-star-o fa-2x"}
                                        fullSymbol="fa fa-star fa-2x"
                                        onChange={(rate) => setRatingLowestPrice(rate)}
                                    >
                                    </Rating></Row>
                                    <Input className="" placeholder="Comments" onChange={(e)=>setLowestPriceComment(e.target.value)}></Input>
                            </FormGroup>
                            </Col>
                            <Col lg='4'>
                            <FormGroup>
                            <Label style={{ color: "#5F5F5F" }}>Efficient Communication</Label>
                            <Row className="mb-2">
                            <Rating 
                                        className="starColor"
                                        initialRating={ratingCommunication}
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        onChange={(rate) => setRatingCommunication(rate)}
                                    >
                                    </Rating></Row>
                                    <Input className="" placeholder="Comments" onChange={(e)=>setEffiCommunicationComment(e.target.value)}></Input>
                            </FormGroup>
                    </Col>
                </Row>
            </Col>
            <Col lg="12">
                <Row>
                    <Col lg='4'>
                        <FormGroup>
                            <Label style={{ color: "#5F5F5F" }}>Reliable on Time Delivery in the Post</Label>
                            <Row className="mb-2">
                            <Rating 
                                    className="starColor"
                                        initialRating={ratingOnTimeDelivery}
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        onChange={(rate) => setRatingOnTimeDelivery(rate)}
                                    >
                                    </Rating></Row>
                                    <Input className="" name="on Time" placeholder="Comments" onChange={(e)=>setOnTimeDeliveryComment(e.target.value)}></Input>
                            </FormGroup>
                            </Col>
                            <Col lg='4'>
                            <FormGroup>
                            <Label style={{ color: "#5F5F5F" }}>Less Quantity Issues</Label>
                            <Row className="mb-2">
                            <Rating 
                            className="starColor"
                                        initialRating={ratingLessQuantityIssues}
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        onChange={(rate) => setRatingLessQuantityIssues(rate)}
                                    >
                                    </Rating></Row>
                                    <Input className="" placeholder="Comments" onChange={(e)=>setLessQuantityComment(e.target.value)}></Input>
                            </FormGroup>
                    </Col>
                </Row>
            </Col>
            <Col lg="12">
                <Row>
                    <Col lg='4'>
                        <FormGroup>
                            <Label style={{ color: "#5F5F5F" }}>Vendor/Buyer Relationship Longetivy</Label>
                            <Row className="mb-2">
                            <Rating 
                            className="starColor"
                                        initialRating={ratingVBRelationship}
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        onChange={(rate) => setRatingVBRelationship(rate)}
                                    >
                                    </Rating></Row>
                                    <Input className="" name="on Time" placeholder="Comments" onChange={(e)=>setVbRelationshipComment(e.target.value)}></Input>
                            </FormGroup>
                            </Col>
                            <Col lg='4'>
                            <FormGroup>
                            <Label style={{ color: "#5F5F5F" }}>Good Sell Through's</Label>
                            <Row className="mb-2">
                            <Rating 
                            className="starColor"
                                        initialRating={ratingGoodSell}
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        onChange={(rate) => setRatingGoodSell(rate)}
                                    >
                                    </Rating></Row>
                                    <Input className="" placeholder="Comments" onChange={(e)=>setGoodSellComment(e.target.value)}></Input>
                            </FormGroup>
                    </Col>
                </Row>
            </Col>
            <Col lg="12">
                <Row>
                    <Col lg='4'>
                        <FormGroup>
                            <Label style={{ color: "#5F5F5F" }}>On time Sample Submissions</Label>
                            <Row className="mb-2">
                            <Rating 
                            className="starColor"
                                        initialRating={ratingOnTimeSampleSubmit}
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        onChange={(rate) => setRatingOnTimeSampleSubmit(rate)}
                                    >
                                    </Rating></Row>
                                    <Input className="" name="on Time" placeholder="Comments" onChange={(e)=>setOnTimeSampleSubmitComment(e.target.value)}></Input>
                            </FormGroup>
                            </Col>
                            <Col lg='4'>
                            <FormGroup>
                            <Label style={{ color: "#5F5F5F" }}>Collaborative Approach</Label>
                            <Row className="mb-2">
                            <Rating 
                            className="starColor"
                                        initialRating={ratingCollabrative}
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        onChange={(rate) => setRatingCollabrative(rate)}
                                    >
                                    </Rating></Row>
                                    <Input className="" placeholder="Comments" onChange={(e)=>setCollabrativeComment(e.target.value)}></Input>
                            </FormGroup>
                    </Col>
                </Row>
            </Col>
            <Col lg="12" className="mt-20">
                <Row className="mt-20">
                    <FormGroup>
                    <a
                        type="button"
                        className="btn"
                        style={{ backgroundColor:'#4E90DE',color:"#FFFFFF" }}
                        onClick={()=>{onSaveHandle()}}
                        >
                        Save Feedback</a>
                    {/* <Button className="btn"   onClick= {() => onSaveHandle()} > Save FeedBack </Button>  */}
                    </FormGroup>
                </Row>
            </Col>
        </Form>
    </CardBody>
                        </Card>
                    </Col>
                </Container>
        </Fragment>
    )
    }

export default FeedbackFormInquiry