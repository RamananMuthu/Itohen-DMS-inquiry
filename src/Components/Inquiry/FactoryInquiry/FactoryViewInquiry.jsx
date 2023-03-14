import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, CardBody, Card,Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import DocumentIcon from "../../../assets/images/dms/icons/inquiryDocumentIcon.svg";
import lastDay from "../../../assets/images/dms/InquiryOneDayRemain.svg";
import bomb from "../../../assets/images/dms/BombSmiley.svg";
import smile from "../../../assets/images/dms/InquiryQuoteSent.svg";
import yellowSmile from "../../../assets/images/dms/inquiryYellowSmile.svg";
import graySadSmile from "../../../assets/images/dms/inquirygray_icon.svg";
import graySmile from"../../../assets/images/dms/InquiryRemainingSmile.svg";
import download_icon from"../../../assets/images/dms/icons/grey_factory_view_download_icon.svg";
import axios from "axios";
import { encode, apiencrypt, apidecrypt,calculateDateDiffCountFromTwoDates,DownloadFile,PHPtoJSFormatConversion } from "../../../helper";
import {
  getLoginCompanyId,
  getWorkspaceId,
  getLoginUserId,
  getWorkspaceType,
  getStaff,
  getStaffPermission,
  getLoginUserType,getLoginStaffId
} from "../../../Constant/LoginConstant";
import { useTranslation } from "react-i18next";
import { ServerUrl } from "../../../Constant";
import FactoryDetailInquiry from "./FactoryDetailInquiry";
import Documentfactory from "../../../assets/images/dms/icons/Document_Factory_icon.svg";
import FilterIcon from "../../../assets/images/dms/icons/filter.svg"
import FilterOffCanvas from "./FilterOffCanvas";
import FactoryFilesDownloadModal from "./FactoryFilesDownloadModal";
import DownloadIcon from "../../../assets/images/dms/icons/download.svg";

// Showing the factory inquiry list
const FactoryViewInquiry = () => {
  const workspace_id = getWorkspaceId;
  const company_id = getLoginCompanyId;
  var getInputParams = {};
  getInputParams["company_id"] = getLoginCompanyId;
  getInputParams["workspace_id"] = getWorkspaceId;
  getInputParams["factory_id"] = getLoginUserId;
 
  const { t } = useTranslation();

  const [inquiryDetails, setInquiryDetails] = useState([]);
  const [Inquiryarticles, setInquiryarticles] = useState([]);
  const [Inquiryusers, setInquiryusers] = useState([]);
  const [inquiryResponse, setInquiryResponse] = useState([]);
  const [totalFactList, setTotalFactList] = useState();
  const [links, setlinks] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [filterOffCanvas , setFilterOffCanvas] = useState(false);
  const toggleFilterCanvas = () => setFilterOffCanvas(!filterOffCanvas);

  const [filterBuyerDetails, setFilterBuyerDetails] = useState("0");
  const [filterArticleDetails, setFilterArticleDetails] = useState("0");
  const [filterstartDateDetails, setFilterStartDateDetails] = useState("");
  const [filterEndDateDetails, setFilterEndDateDetails] = useState("");

  const [downloadFileDetails, setDownloadFileDetails] = useState([]);
  const [downloadMsSheetDetails, setDownloadMsSheetDetails] = useState([]);
  
  const [modalBuyerFilesDownload, setModalBuyerFileDownload] = useState(false);
  const toggleFactoryFilesDownload = () => setModalBuyerFileDownload(!modalBuyerFilesDownload);
  const [inquiryNo, setInquiryNo] = useState();
  const [ pgNo, setPgNo ] = useState(0);

  const apiCall = (pageNumber) => {
    var getInputParams = {};
    getInputParams["company_id"] = getLoginCompanyId;
    getInputParams["workspace_id"] = getWorkspaceId;
    getInputParams["factory_id"] = getLoginUserId;
    getInputParams["page"] =     pageNumber;
    if(filterBuyerDetails!="0"){
      getInputParams["user_id"] = filterBuyerDetails;
    }
    if(filterArticleDetails!="0"){
      getInputParams["article_id"] = filterArticleDetails;      
    } 
    if(filterstartDateDetails!=""){
      getInputParams["from_date"] = filterstartDateDetails;  
    } 
    if(filterEndDateDetails!=""){
      getInputParams["to_date"] = filterEndDateDetails;
    }
    axios
    .post(ServerUrl + "/factory-get-inquiry", apiencrypt(getInputParams))
    .then((response) => {
      response.data = apidecrypt(response.data);
      // setInquiryDetails(response.data.data);
      setInquiryResponse(response.data.response);
      setTotalFactList(response.data.data.last_page);
      setlinks(response.data.data.links);
      setInquiryDetails(response.data.data.data);
      setInquiryarticles(response.data.articles);
      setInquiryusers(response.data.users);
      setPageNumber(pageNumber);
    })
  }

  useEffect(() => 
  {  
    getLoginUserType == "user" ?  (getWorkspaceType == "Factory") ? 
      apiCall()  : 
      window.location.href = `${process.env.PUBLIC_URL}/viewinquiry`
    :
    (getWorkspaceType == "Factory") ?  
      (getStaff === "Staff" && getStaffPermission.includes("View Factory Inquiry")) || getStaff == null ? 
      apiCall() : 
      window.location.href = `${process.env.PUBLIC_URL}/inquirycontacts` 
    :
      (getStaff === "Staff" && getStaffPermission.includes("View Inquiry")) || getStaff == null ? 
      window.location.href = `${process.env.PUBLIC_URL}/viewinquiry` 
        :
      window.location.href = `${process.env.PUBLIC_URL}/feedbackform` 

        setPgNo(() => "");
  }, []);

  const factoryDetails = (inquiryId, factoryId) => 
  {
    <FactoryDetailInquiry inquiryId={inquiryId} factoryId={factoryId} />;
    // window.location.href = `${process.env.PUBLIC_URL}/factorydetailinquiry?id="`+ encode(inquiryId); 
    window.location.href = `${process.env.PUBLIC_URL}/factorydetailinquiry?id=`+ encode(inquiryId);
  };

  const delayStatus = (daysCount, read, id,responsdate,duedate) => {
    if (read == 1 && inquiryResponse.includes(id)) {   
      let ctacdate = calculateDateDiffCountFromTwoDates(duedate,responsdate); 
      if (ctacdate < 0) {
        return(
          <td style={{ color: "#FE9738" }}>
          <img className="p-0 img-30" src={yellowSmile} /> &nbsp; {t("quoteSent")}
        </td>)
      }
      else {
        return(
        <td style={{ color: "#26A69A" }}>
          <img className="p-0 img-30" src={smile} /> &nbsp; {t("quoteSent")}
        </td>)
      }
      // return (
      //   <td style={{ color: "#26A69A" }}>
      //     <img className="p-0 img-30" src={smile} /> &nbsp; {t("quoteSent")}
      //   </td>
      // );
    } else {
      if (daysCount == 0) {
        return (
          <td className=" centerAlign" style={{ color: "#A8A8A8" }}>
            <img className="p-0 img-30" src={graySadSmile} /> &nbsp; {t("lastDay")}
          </td>
        );
      } else if (daysCount > 0 && daysCount == 1) {
        return (
          <td className="centerAlign" style={{ color: "#A8A8A8" }}>
            <img className="p-0 img-30" src={graySmile} /> &nbsp;
            {t("dayRemaining")}
          </td>
        );
      } else if (daysCount > 0) {
        let days = Math.abs(daysCount);
        return (
          <td className="centerAlign" style={{ color: "#A8A8A8" }}>
            <img className="p-0 img-30" src={graySmile} /> &nbsp;
            {t("daysRemaining", { remainingdayscount: days })}
          </td>
        );
      } else if (daysCount < 0) {
        let delaydays = Math.abs(daysCount);
        return (
          <td className="centerAlign" style={{ color: "#FF3838" }}>
            <img className="p-0 img-30" src={bomb} /> &nbsp;{delaydays} {t("daysDelay")}
          </td>
        );
      } else {
        return (
          <td className="textCenter" style={{ textAlign: "center !important" }}>
            -
          </td>
        );
      }
    }
  };
  
  const toggleDownload = (inquiryId) => {
    setInquiryNo(inquiryId);
    var downloadParams = {};
    downloadParams["inquiry_id"] = inquiryId.toString();
    axios
    .post(ServerUrl + "/inquiry-pdf-download", apiencrypt(downloadParams))
    .then((response) => {
        response.data = apidecrypt(response.data);
        setModalBuyerFileDownload(!modalBuyerFilesDownload);
        setDownloadFileDetails(response.data.data);
        setDownloadMsSheetDetails(response.data.data.ms_sheet);
    })
  };

  const toDownloadAsPdf =()=>{
    var getDownloadParams = {};
    getDownloadParams["company_id"] = getLoginCompanyId;
    getDownloadParams["workspace_id"] = getWorkspaceId;
    getDownloadParams["user_id"] = getLoginUserType == "user" ? getLoginUserId : 0;
    getDownloadParams["staff_id"] = getLoginUserType == "staff" ? getLoginStaffId : 0;
    getDownloadParams["factory_id"] = getLoginUserId;
    if(filterArticleDetails!="0" )
    {
      getDownloadParams["article_id"]=filterArticleDetails;
    }
    if(filterBuyerDetails!="0")
    {
      getDownloadParams["buyer_id"]=filterBuyerDetails;
    }
    if(filterstartDateDetails!="" || filterEndDateDetails!=""){
      getDownloadParams["from_date"] = filterstartDateDetails;  
      getDownloadParams["to_date"] = filterEndDateDetails;
    }
    
    
    axios
    .post(ServerUrl + "/factory-inquiries-download", apiencrypt(getDownloadParams),{responseType: 'blob'})
    .then((response) => {
        let name = "inquiry_list-"+Date.now()+".pdf";
        DownloadFile(response.data, name);
    });
  }
  return (
    <Fragment>
      <Row className="pgbgcolor">
        <Breadcrumbs
          mainTitle={t("factoryViewInquiry")}
          parent={t("factoryViewInquiry")}
          title={t("factoryViewInquiry")}
          subTitle={t("factoryViewInquiry")}
        />
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
                    <div className="cursor-pointer p-1 p-r-0 m-t-5 f-right" 
                         onClick={() => toggleFilterCanvas()}>
                        <img src={FilterIcon} />
                    </div>
                    {inquiryDetails.length > 0 ? 
                    <div className="cursor-pointer p-1 p-l-0 m-t-5 m-r-10 f-right" onClick={()=> toDownloadAsPdf()}>
                      <img src={DownloadIcon} />
                    </div> 
                     :
                    "" 
                    }
                    </Col>

                    {/* {inquiryDetails.length > 0 ?  
                    <Col md="12" lg="12" sm="12">                    
                    <div className="cursor-pointer p-1 p-r-0 m-t-5 f-right" onClick={() => toggleFilterCanvas()}>
                        <img src={FilterIcon} />
                     </div>
                     <div className="cursor-pointer p-1 p-l-0 m-t-5 m-r-10 f-right" onClick={()=> toDownloadAsPdf()}>
                      <img src={DownloadIcon} />
                     </div>
                    </Col> : "" } */}

                      <div className="table-responsive">
                        <table className="table shadow shadow-showcase  table-bordered">
                          <thead className="bg-primary">
                            <tr>
                              <th scope="col" className="centerAlign">{" "}{t("serialNo")}{" "}</th>
                              <th className="centerAlign">{" "}{t("inquiryNo")}{" "}</th>
                              <th className="centerAlign"> {t("styleNo")} </th>
                              <th className="centerAlign">{t("inquiryfrom")}</th>
                              <th className="centerAlign">{" "}{t("inquiryDate")}{" "}</th> 
                              <th className="centerAlign">{" "} {t("itemsArticleName")}{" "}</th>
                              <th className="centerAlign"> {t("dueDate")} </th>
                              <th className="centerAlign"> {t("status")} </th>
                              {
                                getLoginUserType == "user" ? 
                                <th className="centerAlign"> {t("response")} </th>
                                :
                                (getStaff === "Staff" && getStaffPermission.includes("Add Response")) || getStaff == null ?
                                <th className="centerAlign"> {t("response")} </th> : ""
                              }
                              <th className="centerAlign">{t("action")} </th>
                            </tr>
                          </thead>
                          <tbody>
                            {inquiryDetails.length > 0 ? (
                              inquiryDetails.map((inquirydtls, index) => (
                                <tr>
                                  <td
                                    scope="row"
                                    className="centerAlign middle "
                                  >
                                  {
                                    pgNo >= 1 ?
                                    ((index)+(20 * pgNo) + 1)
                                    :
                                    (index)+1
                                  }
                                  </td>
                                  <td className="text-left middle"> {" "}  {"IN-" + inquirydtls.id}  </td>
                                  <td className="text-left middle "> {inquirydtls.style_no} </td>
                                   <td className="text-left middle "> {inquirydtls.user}</td>
                                  <td className="text-left middle "> {PHPtoJSFormatConversion.format(new Date(inquirydtls.created_date))} </td> 
                                  <td className="text-left middle ">{inquirydtls.name}</td>
                                  <td className="text-left middle ">{PHPtoJSFormatConversion.format(new Date(inquirydtls.due_date))}</td>
                                  <td className="text-left middle ">
                                    {delayStatus(
                                      inquirydtls.due_days,
                                      inquirydtls.is_read,
                                      inquirydtls.id,
                                      inquirydtls.response_date,
                                      inquirydtls.due_date,
                                    )}
                                  </td>

                                  {
                                    getLoginUserType == "user" ? 
                                    <td className="centerAlign middle">
                                  {inquirydtls.is_read == 0 ?
                                    <img
                                      name="inquiryId"
                                      value={inquirydtls.id}
                                      title={t("factoryDetailInquiry")}
                                      width="20px"
                                      style={{ cursor: "pointer",color: "#3062CA" }}
                                      // className="m-r-30"
                                    src={Documentfactory}
                                  
                                      onClick={() => {
                                        factoryDetails(
                                          inquirydtls.id,
                                          inquirydtls.factory_id
                                        );
                                      }}
                                    />:
                                    <img
                                    name="inquiryId"
                                    value={inquirydtls.id}
                                    title={t("factoryDetailInquiry")}
                                    width="20px"
                                    style={{ cursor: "pointer",color: "#3062CA" }}
                                    // className="m-r-30"
                                    src={DocumentIcon}
                                    onClick={() => {
                                      factoryDetails(
                                        inquirydtls.id,
                                        inquirydtls.factory_id
                                      );
                                    }}
                                  />}
                                    {/* <sup className="m-l-5">
                                      {inquirydtls.is_read == 0 ? (
                                        <span
                                          style={{
                                            color: "#3062CA",
                                            fontSize: "60px",
                                          }}
                                        >
                                          .
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            color: "#fff",
                                            fontSize: "60px",
                                          }}
                                        >
                                          .
                                        </span>
                                      )}
                                    </sup> */}
                                    {/* <br></br> */}
                                    {/* {inquiryResponse.includes(inquirydtls.id) ? "" : t("Pending")}  */}
                                  </td>
                                    :
                                    (getStaff === "Staff" && getStaffPermission.includes("Add Response")) || getStaff == null ?
                                    <td className="centerAlign middle ">
                                    {inquirydtls.is_read == 0 ?
                                      <img
                                        name="inquiryId"
                                        value={inquirydtls.id}
                                        title={t("factoryDetailInquiry")}
                                        width="20px"
                                        style={{ cursor: "pointer",color: "#3062CA" }}
                                        // className="m-r-30"
                                      src={Documentfactory}
                                    
                                        onClick={() => {
                                          factoryDetails(
                                            inquirydtls.id,
                                            inquirydtls.factory_id
                                          );
                                        }}
                                      />:
                                      <img
                                      name="inquiryId"
                                      value={inquirydtls.id}
                                      title={t("factoryDetailInquiry")}
                                      width="20px"
                                      style={{ cursor: "pointer",color: "#3062CA" }}
                                      // className="m-r-30"
                                      src={DocumentIcon}
                                      onClick={() => {
                                        factoryDetails(
                                          inquirydtls.id,
                                          inquirydtls.factory_id
                                        );
                                      }}
                                    />}
                                      {/* <sup className="m-l-5">
                                        {inquirydtls.is_read == 0 ? (
                                          <span
                                            style={{
                                              color: "#3062CA",
                                              fontSize: "60px",
                                            }}
                                          >
                                            .
                                          </span>
                                        ) : (
                                          <span
                                            style={{
                                              color: "#fff",
                                              fontSize: "60px",
                                            }}
                                          >
                                            .
                                          </span>
                                        )}
                                      </sup> */}
                                      {/* <br></br> */}
                                      {/* {inquiryResponse.includes(inquirydtls.id) ? "" : t("Pending")}  */}
                                    </td>
                                    : ""
                                  }
                                  <td className="centerAlign middle">
                                    <img
                                        width="36px"
                                        style={{ cursor: "pointer" }}
                                        className="p-1" 
                                        title="Download"
                                        value={inquirydtls.id}
                                        src={download_icon}
                                        onClick={() => {
                                          toggleDownload(inquirydtls.id);
                                        }}
                                      />
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <>
                                <tr className="text-center">
                                  <td colSpan="7">{t("ListInquiryDetails")}</td>
                                </tr>
                              </>
                            )}
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

        <FactoryFilesDownloadModal
          modalBuyerFilesDownload={modalBuyerFilesDownload}
          setModalBuyerFileDownload={setModalBuyerFileDownload}
          toggleFactoryFilesDownload={toggleFactoryFilesDownload}
          downloadFileDetails={downloadFileDetails}
          downloadMsSheetDetails={downloadMsSheetDetails}
          inquiryNo={inquiryNo}
        />  

        <FilterOffCanvas modal={filterOffCanvas} toggle={toggleFilterCanvas} Article={inquiryDetails}  Inquiryarticles={Inquiryarticles} Inquiryusers={Inquiryusers} InquiryDetails={setInquiryDetails} 
        InquiryResponse ={setInquiryResponse} TotalFactList={setTotalFactList} links={setlinks} pageNumber={setPageNumber} 
        setFilterEndDateDetails={setFilterEndDateDetails} setFilterStartDateDetails={setFilterStartDateDetails}
        setFilterArticleDetails={setFilterArticleDetails} setFilterBuyerDetails={setFilterBuyerDetails}
                    // statusFilter={statusFilter} 
                    // filterStartDate={setFilterStartDate} filterEndDate={setFilterEndDate} filterOperator={setFilterOperator} 
                    // filterDaysDelay={setFilterDaysDelay} filterStyleNo={setFilterStyleNo} filterType={setFilterType} 
                    // selectFilterType={filterType}
                    />
      </Container>
    {/* **********************Pagination***************************** */}
      {totalFactList > 1 ? 
      <>
        <Pagination  aria-label="Page navigation example" className="pagination-primary f-right" >
          {
            links.map((link)=>(
              (link.label >0 || link.label=='...')?
              link.active ?
              <PaginationItem active>
                <PaginationLink style ={{ cursor: "inherit" }}>{link.label}</PaginationLink>
              </PaginationItem>
              :
              <PaginationItem>
                      <PaginationLink onClick={() => {apiCall(link.label), setPgNo(link.label - 1)}}>{link.label}
                      </PaginationLink>
            </PaginationItem>
            :""
            ))
          }
        </Pagination>
      </> 
      : 
      <>
      </>}
    </Fragment>
  );
};

export default FactoryViewInquiry;
// Code by : Anitha Sathysh

//Updated By: R.AKSHAYA MOL
