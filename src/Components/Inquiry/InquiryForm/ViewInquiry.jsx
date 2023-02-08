import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, CardBody, Card } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import InquiryViewIcon from "../../../assets/images/dms/inquiryViewIcon.svg";
import addIcon from "../../../assets/images/dms/icons/addIcon.svg";
import DocumentIcon from "../../../assets/images/dms/icons/inquiryDocumentIcon.svg";
import shareIcon from "../../../assets/images/dms/icons/inquiryShareIcon.svg";
import deleteIcon from "../../../assets/images/dms/icons/inquiryDeleteIcon.svg";
import responseBlueIcon from "../../../assets/images/dms/inquiryResponseBlueIcon.svg";
import axios from "axios";
import ViewFactoryModal from "./ViewFactoryModal";
import { encode, apiencrypt, decode } from "../../../helper";
import { getLoginCompanyId, getWorkspaceId, getWorkspaceType, getLoginUserId, getStaff, getStaffPermission, getLoginUserType } from "../../../Constant/LoginConstant";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { ServerUrl } from "../../../Constant";
import InquirySentToModal from "./InquirySentToModal";

const ViewInquiry = () => {
  const workspace_id = getWorkspaceId;
  const company_id = getLoginCompanyId;
  var getInputParams = {};
  getInputParams["company_id"] = getLoginCompanyId;
  getInputParams["workspace_id"] = getWorkspaceId;
  getInputParams["user_id"] = getLoginUserId;
  const [modalart, setModalart] = useState(false);
  const [inquiryDetails, setInquiryDetails] = useState([]);
  const [inquiryId, setInquiryId] = useState("");
  const [factory, setFactory] = useState([]);
  const [inquiryDownloadPath, setInquiryDownloadPath] = useState("");
  const [factoryList, setFactoryList] = useState([]);
  const [selectedFactoriesList, setSelectedFactoriesList] = useState([]);
  const { t } = useTranslation();
  const toggle = () => setModal(!modal);
  const toggleart = () => setModalart(!modalart);
  const [modalInquirySentTo, setModalInquirySentTo] = useState(false);
  const toggleInquirySentTo = () => setModalInquirySentTo(!modalInquirySentTo);
  let selectedFactoriesArray = [];

  const dataToSendAtStarting = {
    company_id: company_id,
    workspace_id: workspace_id,
  };

  const apiCall = ( ) => {
    axios
    .post(ServerUrl + "/get-inquiry", getInputParams).then((response) => {
      setInquiryDetails(response.data.data);
      setInquiryDownloadPath(response.data.pdfpath);
    });

    axios
    .post(ServerUrl + "/get-inquiry-factory",
        apiencrypt(dataToSendAtStarting)).then((response) => {
        setFactory(response.data.data);
    });
  };

  useEffect(() => 
  {

    // getLoginUserType == "user" ?
    // /************************ ADMIN  ************************/
    // getWorkspaceType == "Buyer" || getWorkspaceType == "PCU" && getWorkspaceType != "Factory" ? apiCall()  : window.location.href='/inquiry/factoryviewinquiry'
    // :
    // /************************ STAFF  ************************/

    // ////////////////////////// STAFF - BUYER Or PCU //////////////////////////
    // getWorkspaceType == "Buyer" || getWorkspaceType == "PCU" && getWorkspaceType != "Factory" ?  
    //   (getStaff === "Staff" && getStaffPermission.includes("View Inquiry")) || getStaff == null ? 
    //   apiCall() :  
    //     (getStaff === "Staff" && getStaffPermission.includes("View Factory Inquiry")) || getStaff == null ? window.location.href='/inquiry/factoryviewinquiry' :  window.location.href='/inquiry/inquirycontacts' 
    // : ""

    getLoginUserType == "user" ?  getWorkspaceType != "Factory" ? apiCall()  : 
    window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry` 
    // window.location.href='/inquiry/factoryviewinquiry'
    :
    getWorkspaceType != "Factory" ?  
      (getStaff === "Staff" && getStaffPermission.includes("View Inquiry")) || getStaff == null ? 
      apiCall() :  
      window.location.href = `${process.env.PUBLIC_URL}/feedbackform` 
      // window.location.href='/inquiry/feedbackform'
    :
      (getStaff === "Staff" && getStaffPermission.includes("View Factory Inquiry")) || getStaff == null ? 
      window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry`
      // window.location.href='/inquiry/factoryviewinquiry' 
      : 
      window.location.href = `${process.env.PUBLIC_URL}/inquirycontacts`
      // window.location.href='/inquiry/inquirycontacts' 
  
  }, []);

  const factResponse = (inquiryId) => {
    window.location.href = "/inquiry/factoryresponse?id=" + encode(inquiryId);
  };
      /**Delete Inquiry based on Id*********/
  const deleteInquiry = (inquiryId) => {
    var deleteParams = {};
    deleteParams["inquiry_id"] = inquiryId.toString();
    deleteParams["company_id"] = company_id;

    var getInputParams = {};
    getInputParams["company_id"] = getLoginCompanyId;
    getInputParams["workspace_id"] = getWorkspaceId;
    getInputParams["user_id"] = getLoginUserId;
    
    Swal.fire({
      title: t("deleteConfirmation"),
      icon: "warning",
      button: t("okLabel"),
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(ServerUrl + "/delete-inquiry", deleteParams)
          .then((response) => {
            if (response.data.status_code == 200) {
              Swal.fire({
                title: t(response.data.meassage),
                icon: "success",
                button: t("okLabel"),
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  axios
                    .post(ServerUrl + "/get-inquiry", getInputParams)
                    .then((response) => {
                      setInquiryDetails(response.data.data);
                    });
                }
              });
            }
          });
      }
    });
  };

  const apiCallInquirySentTo = (inquiryId) => {
    var dataToSendAtStarting = {};
    dataToSendAtStarting["inquiry_id"] = inquiryId;

    axios
      .post(ServerUrl + "/inquiry-factory-list", dataToSendAtStarting)
      .then((response) => {
        setFactoryList(response.data.data);
        response.data.data.map((factoriesListData) => {
          selectedFactoriesArray.push(factoriesListData.id);
        });
        setSelectedFactoriesList(selectedFactoriesArray);
      });
  };

  return (
    <Fragment>
      <Row className="pgbgcolor">
        <Breadcrumbs mainTitle={t("viewInquiry")} parent={t("viewInquiry")} />
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
                        <table className="table shadow shadow-showcase table-striped table-bordered">
                          <thead className="bg-primary">
                            <tr>
                              <th scope="col" className="centerAlign">{t("serialNo")}</th>
                              <th className="centerAlign">{t("inquiryNo")}</th>
                              <th className="centerAlign">{t("styleNo")}</th>
                              <th className="centerAlign">{t("date")}</th>
                              <th className="centerAlign">{t("itemsArticleName")}</th>
                              <th className="centerAlign">{t("action")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {inquiryDetails.length > 0 ? (
                              inquiryDetails.map((inquirydtls, index) => (
                       
                                (inquirydtls.notification == null ? 
                                <tr>
                                  <td scope="row" className="centerAlign"> {index + 1} </td>
                                  <td className="centerAlign"> {"IN-" + inquirydtls.id} </td>
                                  <td className="centerAlign"> {inquirydtls.style_no} </td>
                                  <td className="centerAlign"> {inquirydtls.created_date} </td>
                                  <td className="centerAlign"> {inquirydtls.name} </td>
                                  <td className="centerAlign">
                                    <a href={inquiryDownloadPath + inquirydtls.id + ".pdf"}
                                      target="_blank">
                                      <img style={{ cursor: "pointer" }} 
                                        width="29px" className="m-r-30 p-1"
                                        title={t("viewInquiryDetails")} src={InquiryViewIcon}
                                      />
                                    </a>

                                    {/**********  ADD ICON ********/ }
                                    { getLoginUserType == "user" ? 
                                      <>
                                        <img name="inquiryId"
                                          value={inquirydtls.id}
                                          title={t("selectFactory")}
                                          width="30px" className="m-r-30 p-1"
                                          style={{ cursor: "pointer" }}
                                          src={addIcon}
                                          onClick={() => {
                                            setSelectedFactoriesList(() => "");
                                            setModalart(!modalart),
                                              setInquiryId(inquirydtls.id),
                                              apiCallInquirySentTo(inquirydtls.id);
                                          }}
                                        />
                                      </>
                                    :
                                    (getStaff === "Staff" && getStaffPermission.includes("Sent Inquiry")) || getStaff == null ?
                                        <img name="inquiryId"
                                        value={inquirydtls.id}
                                        title={t("selectFactory")}
                                        width="30px" className="m-r-30 p-1"
                                        style={{ cursor: "pointer" }}
                                        src={addIcon}
                                        onClick={() => {
                                          setSelectedFactoriesList(() => "");
                                          setModalart(!modalart),
                                            setInquiryId(inquirydtls.id),
                                            apiCallInquirySentTo(inquirydtls.id);
                                        }}
                                        />
                                      :
                                      ""}

                                    {/********** DOCUMENT ICON ********/ }
                                    {
                                      getLoginUserType == "user" ? 
                                      <>
                                        <img
                                          width="25px"
                                          style={{ cursor: "pointer" }}
                                          className="m-r-30 p-1"
                                          title={t("Inquiry Sent To")}
                                          value={inquirydtls.id}
                                          src={DocumentIcon}
                                          onClick={() => {
                                            setModalInquirySentTo(
                                              !modalInquirySentTo
                                            ),
                                              setInquiryId(inquirydtls.id),
                                              apiCallInquirySentTo(inquirydtls.id);
                                          }}
                                        />   
                                      </>
                                    :
                                    (getStaff === "Staff" && getStaffPermission.includes("Sent Inquiry")) || getStaff == null ?
                                        <img
                                        width="25px"
                                        style={{ cursor: "pointer" }}
                                        className="m-r-30 p-1"
                                        title={t("Inquiry Sent To")}
                                        value={inquirydtls.id}
                                        src={DocumentIcon}
                                        onClick={() => {
                                          setModalInquirySentTo(
                                            !modalInquirySentTo
                                          ),
                                            setInquiryId(inquirydtls.id),
                                            apiCallInquirySentTo(inquirydtls.id);
                                        }}
                                      /> 
                                      :
                                      "" }

                                     {/********** SHARE ICON ********/ }
                                    {getLoginUserType == "user" ? 
                                      <>
                                         <img
                                            width="29px"
                                            style={{ cursor: "pointer" }}
                                            className="m-r-30 p-1"
                                            title={t("factoryResponse")}
                                            value={inquirydtls.id}
                                            src={shareIcon}
                                            onClick={() => {
                                              factResponse(inquirydtls.id);
                                            }}
                                          />
                                      </>
                                    :
                                    (getStaff === "Staff" && getStaffPermission.includes("View Response")) || getStaff == null ?
                                    <img
                                      width="29px"
                                      style={{ cursor: "pointer" }}
                                      className="m-r-30 p-1"
                                      title={t("factoryResponse")}
                                      value={inquirydtls.id}
                                      src={shareIcon}
                                      onClick={() => {
                                        factResponse(inquirydtls.id);
                                      }}
                                    />
                                      :
                                      ""}

                                    {/********** DELETE ICON ********/ }
                                    {getLoginUserType == "user" ? 
                                        <img
                                        width="28px"
                                        style={{ cursor: "pointer" }}
                                        className="m-r-30 p-1"
                                        value={inquirydtls.id}
                                        title={t("delete")}
                                        src={deleteIcon}
                                        onClick={() => {
                                          deleteInquiry(inquirydtls.id);
                                        }}
                                      />
                                    :
                                    (getStaff === "Staff" && getStaffPermission.includes("Delete Inquiry")) || getStaff == null ?
                                        <img
                                        width="28px"
                                        style={{ cursor: "pointer" }}
                                        className="m-r-30 p-1"
                                        value={inquirydtls.id}
                                        title={t("delete")}
                                        src={deleteIcon}
                                        onClick={() => {
                                          deleteInquiry(inquirydtls.id);
                                        }}
                                      />
                                      :
                                      ""}
                                  </td>
                                </tr>:
                                <tr >
                                  <td scope="row" className="centerAlign"> {index + 1} </td>
                                  <td className="centerAlign"> {"IN-" + inquirydtls.id} </td>
                                  <td className="centerAlign"> {inquirydtls.style_no} </td>
                                  <td className="centerAlign"> {inquirydtls.created_date} </td>
                                  <td className="centerAlign"> {inquirydtls.name} </td>
                                  <td className="centerAlign">
                                    <a href={inquiryDownloadPath + inquirydtls.id + ".pdf"}
                                      target="_blank">
                                      <img width="29px"
                                        style={{ cursor: "pointer" }} className="m-r-30 p-1"
                                        title={t("viewInquiryDetails")} src={InquiryViewIcon}
                                      />
                                    </a>

                                        {/**********  ADD ICON ********/ }
                                    {
                                      getLoginUserType == "user" ? 
                                      <>
                                        <img name="inquiryId"
                                          value={inquirydtls.id}
                                          title={t("selectFactory")}
                                          width="30px"  className="m-r-30 p-1"
                                          style={{ cursor: "pointer" }}
                                          src={addIcon}
                                          onClick={() => {
                                            setSelectedFactoriesList(() => "");
                                            setModalart(!modalart),
                                              setInquiryId(inquirydtls.id),
                                              apiCallInquirySentTo(inquirydtls.id);
                                          }}
                                        />
                                      </>
                                    :
                                    (getStaff === "Staff" && getStaffPermission.includes("Sent Inquiry")) || getStaff == null ?
                                           
                                        <img name="inquiryId"
                                          value={inquirydtls.id}
                                          title={t("selectFactory")}
                                          width="30px"  className="m-r-30 p-1"
                                          style={{ cursor: "pointer" }}
                                          src={addIcon}
                                          onClick={() => {
                                            setSelectedFactoriesList(() => "");
                                            setModalart(!modalart),
                                              setInquiryId(inquirydtls.id),
                                              apiCallInquirySentTo(inquirydtls.id);
                                          }}
                                        />
                                      :
                                      ""
                                    }

                                      {/********** DOCUMENT ICON ********/ }
                                    {
                                      getLoginUserType == "user" ? 
                                      <>
                                        <img
                                          width="25px"
                                          style={{ cursor: "pointer" }}
                                          className="m-r-30 p-1"
                                          title={t("inquirySentTo")}
                                          value={inquirydtls.id}
                                          src={DocumentIcon}
                                          onClick={() => {
                                            setModalInquirySentTo(
                                              !modalInquirySentTo
                                            ),
                                              setInquiryId(inquirydtls.id),
                                              apiCallInquirySentTo(inquirydtls.id);
                                          }}
                                        />
                                      </>
                                    :
                                    (getStaff === "Staff" && getStaffPermission.includes("Sent Inquiry")) || getStaff == null ?
                                      <img
                                        width="25px"
                                        style={{ cursor: "pointer" }}
                                        className="m-r-30 p-1"
                                        title={t("inquirySentTo")}
                                        value={inquirydtls.id}
                                        src={DocumentIcon}
                                        onClick={() => {
                                          setModalInquirySentTo(
                                            !modalInquirySentTo
                                          ),
                                            setInquiryId(inquirydtls.id),
                                            apiCallInquirySentTo(inquirydtls.id);
                                        }}
                                      />
                                      :
                                      ""
                                    }

                                    {/********** RESPONSE BLUE ICON ********/ }
                                    {getLoginUserType == "user" ? 
                                      <>
                                         <img
                                            width="29px"
                                            style={{ cursor: "pointer" }}
                                            className="m-r-30 p-1"
                                            title={t("factoryResponse")}
                                            value={inquirydtls.id}
                                            src={responseBlueIcon}
                                            onClick={() => {
                                              factResponse(inquirydtls.id);
                                            }}
                                          />
                                      </>
                                    :
                                    (getStaff === "Staff" && getStaffPermission.includes("View Response")) || getStaff == null ?
                                    <img
                                      width="29px"
                                      style={{ cursor: "pointer" }}
                                      className="m-r-30 p-1"
                                      title={t("factoryResponse")}
                                      value={inquirydtls.id}
                                      src={responseBlueIcon}
                                      onClick={() => {
                                        factResponse(inquirydtls.id);
                                      }}
                                    />
                                      :
                                      ""}

                                    {/********** DELETE ICON ********/ }
                                    {getLoginUserType == "user" ? 
                                          <img
                                            width="28px"
                                            style={{ cursor: "pointer" }}
                                            className="m-r-30 p-1"
                                            value={inquirydtls.id}
                                            title={t("delete")}
                                            src={deleteIcon}
                                            onClick={() => {
                                              deleteInquiry(inquirydtls.id);
                                            }}
                                          />
                                    :
                                    (getStaff === "Staff" && getStaffPermission.includes("Delete Inquiry")) || getStaff == null ?
                                        <img
                                          width="28px"
                                          style={{ cursor: "pointer" }}
                                          className="m-r-30 p-1"
                                          value={inquirydtls.id}
                                          title={t("delete")}
                                          src={deleteIcon}
                                          onClick={() => {
                                            deleteInquiry(inquirydtls.id);
                                          }}
                                        />
                                      :
                                      ""}
                                  </td>
                                </tr>)
                              ))
                            ) : (
                              <>
                                <tr className="text-center">
                                  <td colSpan="7">{t("ListInquiryDetails")}</td>
                                </tr>
                              </>
                            )}
                            <ViewFactoryModal
                              selectedFactoriesList={selectedFactoriesList}
                              factory={factory}
                              setFactory={setFactory}
                              factoryList={factoryList}
                              inquiryId={inquiryId}
                              modal={modalart}
                              toggle={toggleart}
                            />

                            <InquirySentToModal
                              factoryList={factoryList}
                              modalInquirySentTo={modalInquirySentTo}
                              toggleInquirySentTo={toggleInquirySentTo}
                              setModalInquirySentTo={setModalInquirySentTo}
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
  );
};

export default ViewInquiry;
/************Code By: R. AKSHAYA MOL***************/