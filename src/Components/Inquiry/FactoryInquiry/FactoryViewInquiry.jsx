import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, CardBody, Card } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import DocumentIcon from "../../../assets/images/dms/icons/inquiryDocumentIcon.svg";
// import DocumentIcon from "../../../assets/images/dms/docGreen.svg";
import lastDay from "../../../assets/images/dms/InquiryOneDayRemain.svg";
import oneDay from "../../../assets/images/dms/InquiryRemainingDays.svg";
import bomb from "../../../assets/images/dms/BombSmiley.svg";
import smile from "../../../assets/images/dms/InquiryQuoteSent.svg";
import yellowSmile from "../../../assets/images/dms/inquiryYellowSmile.svg";
import axios from "axios";
import { encode } from "../../../helper";
import {
  getLoginCompanyId,
  getWorkspaceId,
  getLoginUserId,
  getWorkspaceType,
} from "../../../Constant/LoginConstant";
import { useTranslation } from "react-i18next";
import { ServerUrl } from "../../../Constant";
import FactoryDetailInquiry from "./FactoryDetailInquiry";

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

  useEffect(() => {
    if (
      getWorkspaceType == "Factory" &&
      getWorkspaceType != "PCU" &&
      getWorkspaceType != "Buyer"
    ) {
      axios
        .post(ServerUrl + "/factory-get-inquiry", getInputParams)
        .then((response) => {
          setInquiryDetails(response.data.data);
          setInquiryResponse(response.data.response);
        });
    } else {
      window.location.href = "/inquiry/viewinquiry";
    }
  }, []);

  const factoryDetails = (inquiryId, factoryId) => {
    <FactoryDetailInquiry inquiryId={inquiryId} factoryId={factoryId} />;
    window.location.href =
      "/inquiry/factorydetailinquiry?id=" + encode(inquiryId);
  };

  const delayStatus = (daysCount, read, id) => {
    if (read == 1 && inquiryResponse.includes(id)) {
      return (
        <td style={{ color: "#26A69A" }}>
          <img className="p-0 img-30" src={smile} /> &nbsp; {t("quoteSent")}{" "}
        </td>
      );
    } else {
      if (daysCount == 0) {
        return (
          <td className=" centerAlign" style={{ color: "#FE9738" }}>
            <img className="p-0 img-30" src={lastDay} /> &nbsp; {t("lastDay")}{" "}
          </td>
        );
      } else if (daysCount > 0 && daysCount == 1) {
        return (
          <td className="centerAlign" style={{ color: "#FE9738" }}>
            <img className="p-0 img-30" src={yellowSmile} /> &nbsp;{" "}
            {t("dayRemaining")}{" "}
          </td>
        );
      } else if (daysCount > 0) {
        let days = Math.abs(daysCount);
        return (
          <td className="centerAlign" style={{ color: "#FE9738" }}>
            <img className="p-0 img-30" src={yellowSmile} /> &nbsp; {days}{" "}
            {t("moredaysRemaining", { remainingdayscount: days })}{" "}
          </td>
        );
      } else if (daysCount < 0) {
        let delaydays = Math.abs(daysCount);
        return (
          <td className="centerAlign" style={{ color: "#FF3838" }}>
            <img className="p-0 img-30" src={bomb} /> &nbsp;{delaydays}{" "}
            {t("daysDelay")}{" "}
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
                              <th scope="col" className="centerAlign">
                                {" "}
                                {t("serialNo")}{" "}
                              </th>
                              <th className="centerAlign">
                                {" "}
                                {t("inquiryNo")}{" "}
                              </th>
                              <th className="centerAlign"> {t("styleNo")} </th>
                              <th className="centerAlign">
                                {" "}
                                {t("inquiryDate")}{" "}
                              </th>
                              <th className="centerAlign">
                                {" "}
                                {t("itemsArticleName")}{" "}
                              </th>
                              <th className="centerAlign"> {t("dueDate")} </th>
                              <th className="centerAlign"> {t("status")} </th>
                              <th className="centerAlign"> {t("response")} </th>
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
                                      inquirydtls.id
                                    )}
                                  </td>
                                  <td className="centerAlign middle ">
                                    <img
                                      name="inquiryId"
                                      value={inquirydtls.id}
                                      title={t("factoryDetailInquiry")}
                                      width="20px"
                                      style={{ cursor: "pointer" }}
                                      // className="m-r-30"
                                      src={DocumentIcon}
                                      onClick={() => {
                                        factoryDetails(
                                          inquirydtls.id,
                                          inquirydtls.factory_id
                                        );
                                      }}
                                    />{" "}
                                    <sup className="m-l-5">
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
                                    </sup>
                                    {/* <br></br> */}
                                    {/* {inquiryResponse.includes(inquirydtls.id) ? "" : t("Pending")}  */}
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
      </Container>
    </Fragment>
  );
};

export default FactoryViewInquiry;
// Code by : Anitha Sathysh

//Updated By: R.AKSHAYA MOL
