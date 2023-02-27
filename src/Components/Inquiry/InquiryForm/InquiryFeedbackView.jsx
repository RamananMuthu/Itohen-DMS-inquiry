import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, CardBody, Card,Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import InquiryViewIcon from "../../../assets/images/dms/inquiryViewIcon.svg";
import addIcon from "../../../assets/images/dms/icons/addIcon.svg";
import DocumentIcon from "../../../assets/images/dms/icons/inquiryDocumentIcon.svg";
import shareIcon from "../../../assets/images/dms/icons/inquiryShareIcon.svg";
import deleteIcon from "../../../assets/images/dms/icons/inquiryDeleteIcon.svg";
import download_icon from"../../../assets/images/dms/icons/grey_factory_view_download_icon.svg";
import responseBlueIcon from "../../../assets/images/dms/inquiryResponseBlueIcon.svg";
import axios from "axios";
import ViewFactoryModal from "./ViewFactoryModal";
import { encode,apiencrypt, apidecrypt, DownloadFile } from "../../../helper";
import { getLoginCompanyId, getWorkspaceId, getWorkspaceType, getLoginUserId, getStaff, getStaffPermission, getLoginUserType,getLoginStaffId } from "../../../Constant/LoginConstant";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { ServerUrl } from "../../../Constant";
import InquirySentToModal from "./InquirySentToModal";
import FilterIcon from "../../../assets/images/dms/icons/filter.svg"
import FilterBuyerOffCanvas from "./FilterBuyerOffCanvas";
import BuyerFilesDownloadModal from "./BuyerFilesDownloadModal";
import infoIcon from "../../../assets/images/dms/icons/inquiryInfoIcon.svg";
import DownloadIcon from "../../../assets/images/dms/icons/download.svg";
import FeedbackCommentModal from "./FeedbackCommentModal";
import FilterFeedbackViewOffCanvas from "./FilterFeedbackViewOffCanvas";
const InquiryFeedbackView = () => {
  const workspace_id = getWorkspaceId;
  const company_id = getLoginCompanyId;
  var getInputParams = {};
  getInputParams["company_id"] = getLoginCompanyId;
  getInputParams["workspace_id"] = getWorkspaceId;
  getInputParams["user_id"] = getLoginUserId;
  const [modalart, setModalart] = useState(false);
  const [links, setlinks] = useState([]);
  const { t } = useTranslation();
  const toggle = () => setModal(!modal);
  const toggleart = () => setModalart(!modalart);
  const [modalInquirySentTo, setModalInquirySentTo] = useState(false);
  const toggleInquirySentTo = () => setModalInquirySentTo(!modalInquirySentTo);
  const [factoryFeedback, setFactoryFeedback] = useState([]);
  const [factoryId, setFactoryId] = useState();
  const [feedComments, setFeedComments] = useState();
  const [viewFactoryDownload, setViewFactoryDownload] = useState(false);
  const toggleBuyerFilesDownload = () => setViewFactoryDownload(!viewFactoryDownload);
  const [inquiryNo, setInquiryNo] = useState();
  
  const [factoryFeedbackDetailsModal, setFactoryFeedbackDetailsModal] = useState(false);
  const toggleFactoryFeedbackDetails = () => setFactoryFeedbackDetailsModal(!factoryFeedbackDetailsModal);

  const [filterFeedbackViewOffCanvas , setFilterFeedbackViewOffCanvas] = useState(false);
  const toggleFilterFeedbackViewOffCanvas = () => setFilterFeedbackViewOffCanvas(!filterFeedbackViewOffCanvas);
  const [FeedbackFactory, setFeedbackFactoryDetails] = useState("");
  const [feedbackInquiryId, setFeedbackInquiryId] = useState("");

  const [filterFeedbackFactoryDetails, setFilterFeedbackFactoryDetails] = useState("0");
  const [filterInquiryIdDetails, setFilterInquiryIdDetailsDetails] = useState("0");
  const [filterstartDateDetails, setFilterStartDateDetails] = useState("");
  const [filterEndDateDetails, setFilterEndDateDetails] = useState("");

  console.log("FeedbackFactory",FeedbackFactory)
  useEffect(() => {
    getInputParams["company_id"] = getLoginCompanyId;
    getInputParams["workspace_id"] = getWorkspaceId;
    if(filterFeedbackFactoryDetails!="0"){
      getInputParams["factory_id"] = filterFeedbackFactoryDetails;
    }
    if(filterInquiryIdDetails!="0"){
      getInputParams["inquiry_id"] = filterInquiryIdDetails;      
    } 
    if(filterstartDateDetails!=""){
      getInputParams["from_date"] = filterstartDateDetails;  
    } 
    if(filterEndDateDetails!=""){
      getInputParams["to_date"] = filterEndDateDetails;
    }
    axios
      .post(ServerUrl + "/factory-feedback",apiencrypt(getInputParams))
      .then((response) => {
        response.data = apidecrypt(response.data)
         setFactoryFeedback(response.data.data);
         setFeedbackFactoryDetails(response.data.factories);
         setFeedbackInquiryId(response.data.inquiries);
      });
  }, []);
  const toDownloadAsPdf =()=>{
    var getDownloadParams = {};
    getDownloadParams["company_id"] = getLoginCompanyId;
    getDownloadParams["workspace_id"] = getWorkspaceId;
    getDownloadParams["user_id"] = getLoginUserType == "user" ? getLoginUserId : 0;
    getDownloadParams["staff_id"] = getLoginUserType == "staff" ? getLoginStaffId : 0;
    if(filterFeedbackFactoryDetails!="0"){
      getInputParams["factory_id"] = filterFeedbackFactoryDetails;
    }
    if(filterInquiryIdDetails!="0"){
      getInputParams["inquiry_id"] = filterInquiryIdDetails;      
    } 
    if(filterstartDateDetails!=""){
      getInputParams["from_date"] = filterstartDateDetails;  
    } 
    if(filterEndDateDetails!=""){
      getInputParams["to_date"] = filterEndDateDetails;
    }
    axios
    .post(ServerUrl + "/factory-feedback-download", apiencrypt(getDownloadParams),{responseType: 'blob'})
    .then((response) => {
        console.log(response.data);
        const currDate = new Date().toLocaleDateString();
        let namelist=   currDate + "-"+ "inquiry_feedback"+ Date.now()+".pdf"
        DownloadFile(response.data, namelist);
    });
  }
  return (
    <Fragment>
      <Row className="pgbgcolor">
        <Breadcrumbs mainTitle={t("feedbackFormView")} parent={t("viewInquiry")} />
      </Row>
      <Container fluid={true} className="general-widget topaln">
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Row className="g-12 m-t-20">
                  <Col md="12" lg="12" sm="12">
                    <Row className="g-12">
                    <Col md="12" lg="12" sm="12">
                    <div className="cursor-pointer p-1 p-r-0 m-t-5 f-right" onClick={() => toggleFilterFeedbackViewOffCanvas()}>
                        <img src={FilterIcon} />
                     </div>
                     <div className="cursor-pointer p-1 p-l-0 m-t-5 m-r-10 f-right" onClick={()=> toDownloadAsPdf(factoryFeedback.inquiry_id)}>
                      <img src={DownloadIcon} />
                     </div>
                    </Col>
                      <div className="table-responsive">
                        <table className="table shadow shadow-showcase table-striped table-bordered">
                          <thead className="bg-primary">
                            <tr>
                              <th style={{width:"5%"}} scope="col"  className="centerAlign">{t("serialNo")}</th>
                              <th style={{width:"10%"}}className="centerAlign">{t("factory")}</th>
                              <th style={{width:"7%"}}className="centerAlign">{t("inquiryId")}</th>
                              <th style={{width:"8%"}} className="centerAlign">{t("lowestPrice")}</th>
                              <th style={{width:"9%"}} className="centerAlign">{t("effiCommunication")}</th>
                              <th style={{width:"9%"}} className="centerAlign">{t("reliableTimeDelivery")}</th>
                              <th style={{width:"9%"}} className="centerAlign">{t("lessQuantityIssues")}</th>
                              <th style={{width:"9%"}} className="centerAlign">{t("vbRelations")}</th>
                              <th style={{width:"7%"}} className="centerAlign">{t("goodSell")}</th>
                              <th style={{width:"9%"}} className="centerAlign">{t("onTimeSampleSub")}</th>
                              <th style={{width:"9%"}} className="centerAlign">{t("collabApproach")}</th>
                              <th style={{width:"9%"}} className="centerAlign">{t("date")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            
                                {/* <tr>
                                  <td scope="row" className="centerAlign"> {(index) + 1} </td>
                                  <td className="centerAlign"> {"IN-" + inquirydtls.id} </td>
                                  <td className="centerAlign"> {inquirydtls.style_no} </td>
                                  <td className="centerAlign"> {inquirydtls.created_date} </td>
                                  <td className="centerAlign"> {inquirydtls.name} </td>     
                                </tr> */}
                                {
                (factoryFeedback).length > 0 ?
                <>
                {
                  (factoryFeedback).map((Feedback,index) => (
                                <tr>
                                  <td scope="row" className="centerAlign"> {(index) + 1} </td>
                                  <td className="centerAlign">{Feedback.factory}</td>
                                  <td className="centerAlign"> {"IN -"}{Feedback.inquiry_id}</td>
                                  <td className="centerAlign">{Feedback.lowest_price}
                                   {Feedback.lowest_price_comments==""? ""
                                   : 
                                    <span className="m-l-10"><img
                                        src={infoIcon}
                                        width="15px"
                                        height="15px"
                                        tooltip={t("viewComments")}
                                        title={t("viewComments")}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          toggleFactoryFeedbackDetails(),
                                          setInquiryNo(Feedback.inquiry_id)
                                          setFactoryId(Feedback.factory_contact_id )
                                          setFeedComments("lowestPrice")
                                        }
                                        }
                                      /></span>}
                                 </td>
                                  <td className="centerAlign">{Feedback.communication}
                                  {Feedback.communication_comments==""?"": <span className="m-l-10"><img
                                        src={infoIcon}
                                        width="15px"
                                        height="15px"
                                        tooltip={t("viewComments")}
                                        title={t("viewComments")}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          toggleFactoryFeedbackDetails(),
                                          setInquiryNo(Feedback.inquiry_id)
                                          setFactoryId(Feedback.factory_contact_id )
                                          setFeedComments("effiCommunication")
                                         
                                        }
                                        }
                                      /></span>}
                                   </td>     
                                  <td className="centerAlign">{Feedback.ontime_delivery}
                                  {Feedback.ontime_delivery_comments==""?"":<span className="m-l-10"><img
                                        src={infoIcon}
                                        width="15px"
                                        height="15px"
                                        tooltip={t("viewComments")}
                                        title={t("viewComments")}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          toggleFactoryFeedbackDetails(),
                                          setInquiryNo(Feedback.inquiry_id)
                                          setFactoryId(Feedback.factory_contact_id )
                                          setFeedComments("reliableTimeDelivery")
                                        }
                                        }
                                      /></span>}
                                      </td>     
                                  <td className="centerAlign">{Feedback.less_quality_issue}
                                  {Feedback.less_quality_issue_comments==""?"":<span className="m-l-10"><img
                                        src={infoIcon}
                                        width="15px"
                                        height="15px"
                                        tooltip={t("viewComments")}
                                        title={t("viewComments")}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          toggleFactoryFeedbackDetails(),
                                          setInquiryNo(Feedback.inquiry_id)
                                          setFactoryId(Feedback.factory_contact_id )
                                          setFeedComments("lessQuantityIssues")
                                        }
                                        }
                                      /></span>}
                                  </td>     
                                  <td className="centerAlign">{Feedback.vendor_buyer_relation}
                                  {Feedback.vendor_buyer_relation_comments=="" ?"":<span className="m-l-10"><img
                                        src={infoIcon}
                                        width="15px"
                                        height="15px"
                                        tooltip={t("viewComments")}
                                        title={t("viewComments")}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          toggleFactoryFeedbackDetails(),
                                          setInquiryNo(Feedback.inquiry_id)
                                          setFactoryId(Feedback.factory_contact_id )
                                          setFeedComments("vbRelations")
                                        }
                                        }
                                      /></span>}
                                   </td>     
                                  <td className="centerAlign">{Feedback.good_sell_through}
                                  {Feedback.good_sell_through_comments==""?"":<span className="m-l-10"><img
                                        src={infoIcon}
                                        width="15px"
                                        height="15px"
                                        tooltip={t("viewComments")}
                                        title={t("viewComments")}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          toggleFactoryFeedbackDetails(),
                                          setInquiryNo(Feedback.inquiry_id)
                                          setFactoryId(Feedback.factory_contact_id )
                                          setFeedComments("goodSell")
                                        }
                                        }
                                      /></span>}
                                  </td>     
                                  <td className="centerAlign">{Feedback.sample_submission}
                                  {Feedback.sample_submission_comments==""?"": <span className="m-l-10"><img
                                        src={infoIcon}
                                        width="15px"
                                        height="15px"
                                        tooltip={t("viewComments")}
                                        title={t("viewComments")}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          toggleFactoryFeedbackDetails(),
                                          setInquiryNo(Feedback.inquiry_id)
                                          setFactoryId(Feedback.factory_contact_id )
                                          setFeedComments("onTimeSampleSub")
                                        }
                                        }
                                      /></span>}
                                 </td>     
                                  <td className="centerAlign">{Feedback.collaborative_approach} 
                                  {Feedback.collaborative_approach_comments==""?"":  <span className="m-l-10"><img
                                        src={infoIcon}
                                        width="15px"
                                        height="15px"
                                        tooltip={t("viewComments")}
                                        title={t("viewComments")}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          toggleFactoryFeedbackDetails(),
                                          setInquiryNo(Feedback.inquiry_id)
                                          setFactoryId(Feedback.factory_contact_id )
                                          setFeedComments("collabApproach")
                                        }
                                        }
                                      /></span>}
                                </td>     
                                  <td className="centerAlign">{Feedback.created_date} </td>     
                                </tr>
                                )) } </>:""}

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
      <FeedbackCommentModal modal={factoryFeedbackDetailsModal} toggle={toggleFactoryFeedbackDetails} factoryFeedbackView={factoryFeedback}  inquiryNo={inquiryNo} 
      factoryId={factoryId} feedComments={feedComments}
      />
      <FilterFeedbackViewOffCanvas modal={filterFeedbackViewOffCanvas} toggle={toggleFilterFeedbackViewOffCanvas} FeedbackFactory={FeedbackFactory} feedbackInquiryId={feedbackInquiryId} 
      setFilterInquiryIdDetailsDetails={setFilterInquiryIdDetailsDetails} setFilterFeedbackFactoryDetails={setFilterFeedbackFactoryDetails}
      setFilterStartDateDetails={setFilterStartDateDetails} setFilterEndDateDetails={setFilterEndDateDetails} FeedbackFactoryDetails={setFeedbackFactoryDetails}
      factoryFeedback={setFactoryFeedback}  feedbackInquiryIddetails={setFeedbackInquiryId}
      />
      </Container>
    
    </Fragment>
  );
};

export default InquiryFeedbackView;
/************Code By: R. AKSHAYA MOL***************/