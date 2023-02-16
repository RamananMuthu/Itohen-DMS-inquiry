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
import axios from "axios";
import { encode, apiencrypt, apidecrypt,calculateDateDiffCountFromTwoDates } from "../../../helper";
import {
  getLoginCompanyId,
  getWorkspaceId,
  getLoginUserId,
  getWorkspaceType,
  getStaff,
  getStaffPermission,
  getLoginUserType
} from "../../../Constant/LoginConstant";
import { useTranslation } from "react-i18next";
import { ServerUrl } from "../../../Constant";
import FactoryDetailInquiry from "./FactoryDetailInquiry";
import Documentfactory from "../../../assets/images/dms/icons/Document_Factory_icon.svg";

// Showing the factory inquiry list
const FactoryViewInquiry = () => {
  const workspace_id = getWorkspaceId;
  const company_id = getLoginCompanyId;
  var getInputParams = {};
  getInputParams["company_id"] = getLoginCompanyId;
  getInputParams["workspace_id"] = getWorkspaceId;
  getInputParams["factory_id"] = getLoginUserId;

  const [inquiryDetails, setInquiryDetails] = useState([]);
  const { t } = useTranslation();
  const [inquiryResponse, setInquiryResponse] = useState([]);
  const [totalFactList, setTotalFactList] = useState();
  const [links, setlinks] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const apiCall = (pageNumber) => {
    var getInputParams = {};
    getInputParams["company_id"] = getLoginCompanyId;
    getInputParams["workspace_id"] = getWorkspaceId;
    getInputParams["factory_id"] = getLoginUserId;
    getInputParams["page"] =     pageNumber;
    axios
    .post(ServerUrl + "/factory-get-inquiry", apiencrypt(getInputParams))
    .then((response) => {
      response.data = apidecrypt(response.data);
      setTotalFactList(response.data.data.last_page);
      setlinks(response.data.data.links);
      setInquiryDetails(response.data.data.data);
      setInquiryResponse(response.data.response);
      setPageNumber(pageNumber);
    })
  }

  useEffect(() => 
  {  
    getLoginUserType == "user" ?  (getWorkspaceType == "Factory") ? 
      apiCall()  : 
      window.location.href = `${process.env.PUBLIC_URL}/viewinquiry`
      // window.location.href='/inquiry/viewinquiry'
    :
    (getWorkspaceType == "Factory") ?  
      (getStaff === "Staff" && getStaffPermission.includes("View Factory Inquiry")) || getStaff == null ? 
      apiCall() : 
      window.location.href = `${process.env.PUBLIC_URL}/inquirycontacts` 
      // window.location.href='/inquirycontacts'
    :
      (getStaff === "Staff" && getStaffPermission.includes("View Inquiry")) || getStaff == null ? 
      window.location.href = `${process.env.PUBLIC_URL}/viewinquiry` 
        // window.location.href='/inquiry/viewinquiry' 
        :
      window.location.href = `${process.env.PUBLIC_URL}/feedbackform` 
        // window.location.href='/inquiry/feedbackform' 
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
                      <div className="table-responsive">
                        <table className="table shadow shadow-showcase  table-bordered">
                          <thead className="bg-primary">
                            <tr>
                              <th scope="col" className="centerAlign">{" "}{t("serialNo")}{" "}</th>
                              <th className="centerAlign">{" "}{t("inquiryNo")}{" "}</th>
                              <th className="centerAlign"> {t("styleNo")} </th>
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
                                    {index + 1}
                                  </td>
                                  <td className="text-left middle"> {" "}  {"IN-" + inquirydtls.id}  </td>
                                  <td className="text-left middle "> {inquirydtls.style_no} </td>
                                  <td className="text-left middle "> {inquirydtls.created_date} </td> 
                                  <td className="text-left middle ">{inquirydtls.name}</td>
                                  <td className="text-left middle ">{inquirydtls.due_date}</td>
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
                  <PaginationLink onClick={() => apiCall(link.label)}>{link.label}
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
