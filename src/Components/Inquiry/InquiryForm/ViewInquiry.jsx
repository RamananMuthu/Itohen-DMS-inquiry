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
import { getLoginCompanyId, getWorkspaceId, getWorkspaceType, getLoginUserId, getStaff, getStaffPermission, getLoginUserType } from "../../../Constant/LoginConstant";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { ServerUrl } from "../../../Constant";
import InquirySentToModal from "./InquirySentToModal";
import FilterIcon from "../../../assets/images/dms/icons/filter.svg"
import FilterBuyerOffCanvas from "./FilterBuyerOffCanvas";
import BuyerFilesDownloadModal from "./BuyerFilesDownloadModal";
import DownloadIcon from "../../../assets/images/dms/icons/download.svg";
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
  const [pageNumber, setPageNumber] = useState(1);
  const [factoryList, setFactoryList] = useState([]);
  const [selectedFactoriesList, setSelectedFactoriesList] = useState([]);
  const [totalInquiryListSet, setTotalInquiryListSet] = useState();
  const [links, setlinks] = useState([]);
  const { t } = useTranslation();
  const toggle = () => setModal(!modal);
  const toggleart = () => setModalart(!modalart);
  const [modalInquirySentTo, setModalInquirySentTo] = useState(false);
  const toggleInquirySentTo = () => setModalInquirySentTo(!modalInquirySentTo);

  const [InquiryfactorieDetails, setInquiryfactorieDetails] = useState([]);
  const [InquiryarticlesDetails, setInquiryarticlesDetails] = useState([]);
  const [downloadFileDetails, setDownloadBuyerDetails] = useState([]);
  const [downloadMsSheetDetails, setDownloadMsSheetDetails] = useState([]);

  const [filterFactoryDetails, setFilterFactoryDetails] = useState("0");
  const [filterArticleDetails, setFilterArticleDetails] = useState("0");
  const [filterstartDateDetails, setFilterStartDateDetails] = useState("");
  const [filterEndDateDetails, setFilterEndDateDetails] = useState("");
  let selectedFactoriesArray = [];
  const dataToSendAtStarting = {
    company_id: company_id,
    workspace_id: workspace_id,
  };

  const [viewFactoryDownload, setViewFactoryDownload] = useState(false);
  const toggleBuyerFilesDownload = () => setViewFactoryDownload(!viewFactoryDownload);
  const [inquiryNo, setInquiryNo] = useState();
  
  const toggleDownload = (inquiryId) => {
    setInquiryNo(inquiryId);
    var downloadParams = {};
    downloadParams["inquiry_id"] = inquiryId.toString();
    axios
    .post(ServerUrl + "/inquiry-pdf-download", apiencrypt(downloadParams))
    .then((response) => {
        response.data = apidecrypt(response.data);
       // console.log("response.data.data", response.data.data.ms_sheet);
        setViewFactoryDownload(!viewFactoryDownload);
        setDownloadBuyerDetails(response.data.data);
        setDownloadMsSheetDetails(response.data.data.ms_sheet);
    })
    }

  const [buyerFilterOffCanvas , setBuyerFilterOffCanvas] = useState(false);
  const toggleBuyerFilterCanvas = () => setBuyerFilterOffCanvas(!buyerFilterOffCanvas);
  const apiCall = (pageNumber) => {
    var getInputParams = {};
    getInputParams["company_id"] = getLoginCompanyId;
    getInputParams["workspace_id"] = getWorkspaceId;
    getInputParams["user_id"] = getLoginUserId;
    getInputParams["page"] =     pageNumber;
    if(filterFactoryDetails!="0"){
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
    .post(ServerUrl + "/get-inquiry", apiencrypt(getInputParams))
    .then((response) => {
      response.data = apidecrypt(response.data);
      // setInquiryDetails(response.data.data);
      setInquiryDownloadPath(response.data.pdfpath);
      setInquiryDetails(response.data.data.data);
      setTotalInquiryListSet(response.data.data.last_page);
      setlinks(response.data.data.links);
      setPageNumber(pageNumber);
      setInquiryfactorieDetails(response.data.factories);
      setInquiryarticlesDetails(response.data.articles);

    });

    axios
    .post(ServerUrl + "/get-inquiry-factory", apiencrypt())
    .then((response) => {
        response.data = apidecrypt(response.data);
        setFactory(response.data.data);
        
    });
  };

  useEffect(() => 
  {
       getLoginUserType == "user" ?  getWorkspaceType != "Factory" ? apiCall()  : 
    window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry` 
    :
    getWorkspaceType != "Factory" ?  
      (getStaff === "Staff" && getStaffPermission.includes("View Inquiry")) || getStaff == null ? 
      apiCall() :  
      window.location.href = `${process.env.PUBLIC_URL}/feedbackform` 
    :
      (getStaff === "Staff" && getStaffPermission.includes("View Factory Inquiry")) || getStaff == null ? 
      window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry`
      : 
      window.location.href = `${process.env.PUBLIC_URL}/inquirycontacts`
  
  }, []);

  const factResponse = (inquiryId) => {
    window.location.href = `${process.env.PUBLIC_URL}/factoryresponse?id=` + encode(inquiryId);
    // window.location.href = "/inquiry/factoryresponse?id=" + encode(inquiryId);
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
          .post(ServerUrl + "/delete-inquiry", apiencrypt(deleteParams))
          .then((response) => {
            response.data = apidecrypt(response.data);
            if (response.data.status_code == 200) {
              Swal.fire({
                title: t(response.data.meassage),
                icon: "success",
                button: t("okLabel"),
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  axios
                    .post(ServerUrl + "/get-inquiry", apiencrypt(getInputParams))
                    .then((response) => {
                      response.data = apidecrypt(response.data);
                      setInquiryDetails(response.data.data.data);
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
      .post(ServerUrl + "/inquiry-factory-list", apiencrypt(dataToSendAtStarting))
      .then((response) => {
        response.data = apidecrypt(response.data);
        setFactoryList(response.data.data);
        response.data.data.map((factoriesListData) => {
          selectedFactoriesArray.push(factoriesListData.id);
        });
        setSelectedFactoriesList(selectedFactoriesArray);
      });
  };
  const toDownloadAsPdf =()=>{
    var getDownloadParams = {};
    getDownloadParams["company_id"] = getLoginCompanyId;
    getDownloadParams["workspace_id"] = getWorkspaceId;
    getDownloadParams["user_id"] = getLoginUserType == "user" ? getLoginUserId : 0;
    getDownloadParams["staff_id"] = getLoginUserType == "staff" ? getLoginStaffId : 0;
    if(filterArticleDetails!="0" )
    {
      getDownloadParams["article_id"]=filterArticleDetails;
    }
    if(filterFactoryDetails!="0")
    {
      getDownloadParams["factory_id"]=filterFactoryDetails;
    }
    if(filterstartDateDetails!="" || filterEndDateDetails!=""){
      getDownloadParams["from_date"] = filterstartDateDetails;  
      getDownloadParams["to_date"] = filterEndDateDetails;
    } 
    axios
    .post(ServerUrl + "/buyer-inquiries-download", apiencrypt(getDownloadParams),{responseType: 'blob'})
    .then((response) => {
        console.log(response.data);
        let name = "inquiry_list.pdf";

        DownloadFile(response.data, name);
    });
  }
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
                    <Col md="12" lg="12" sm="12">
                    <div className="cursor-pointer p-1 p-r-0 m-t-5 f-right" onClick={() => toggleBuyerFilterCanvas()}>
                        <img src={FilterIcon} />
                     </div>
                     <div className="cursor-pointer p-1 p-l-0 m-t-5 m-r-10 f-right" onClick={()=> toDownloadAsPdf()}>
                      <img src={DownloadIcon} />
                     </div>
                    </Col>
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
                                  <td scope="row" className="centerAlign"> {(index) + 1} </td>
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

                                    <img
                                      width="33px"
                                      style={{ cursor: "pointer" }}
                                      className="m-r-30 p-1" 
                                      title={t("filesDownload")}
                                      value={inquirydtls.id}
                                      src={download_icon}
                                      onClick={() => {
                                        toggleDownload(inquirydtls.id);
                                      }}
                                    />

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
                                </tr>
                                :
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
                                      <img
                                          width="33px"
                                          style={{ cursor: "pointer" }}
                                          className="m-r-30 p-1" 
                                          title={t("filesDownload")}
                                          value={inquirydtls.id}
                                          src={download_icon}
                                          onClick={() => {
                                            toggleDownload(inquirydtls.id);
                                          }}
                                        />

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

                                  {/* {getLoginUserType == "user" ?  */}
                                      
                                    {/* :
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
                                      ""} */}
                                    
                                  
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
                            <BuyerFilesDownloadModal
                              viewFactoryDownload={viewFactoryDownload}
                              toggleBuyerFilesDownload={toggleBuyerFilesDownload}
                              downloadFileDetails={downloadFileDetails}
                              downloadMsSheetDetails={downloadMsSheetDetails}
                              setViewFactoryDownload={setViewFactoryDownload}
                              inquiryNo={inquiryNo}
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
        <FilterBuyerOffCanvas modal={buyerFilterOffCanvas} toggle={toggleBuyerFilterCanvas} InquiryfactorieDetails={InquiryfactorieDetails} InquiryarticlesDetails={InquiryarticlesDetails}
         InquiryDetails={setInquiryDetails} TotalInquiryListSet={setTotalInquiryListSet} links={setlinks} pageNumber={setPageNumber} InquiryDownloadPath={setInquiryDownloadPath}
         setFilterEndDateDetails={setFilterEndDateDetails} setFilterStartDateDetails={setFilterStartDateDetails}
         setFilterArticleDetails={setFilterArticleDetails} setFilterFactoryDetails={setFilterFactoryDetails}
                    // statusFilter={statusFilter} 
                    // filterStartDate={setFilterStartDate} filterEndDate={setFilterEndDate} filterOperator={setFilterOperator} 
                    // filterDaysDelay={setFilterDaysDelay} filterStyleNo={setFilterStyleNo} filterType={setFilterType} 
                    // selectFilterType={filterType}
                    />
      </Container>
    {/* **********************Pagination***************************** */}
      {totalInquiryListSet>1 ? 
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

export default ViewInquiry;
/************Code By: R. AKSHAYA MOL***************/