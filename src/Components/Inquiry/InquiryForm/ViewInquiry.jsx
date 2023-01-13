import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, CardBody, Card } from "reactstrap";
import { Breadcrumbs, H5, P, Btn, H6 } from "../../../AbstractElements";
import InquiryDowloadIcon from "../../../assets/images/dms/icons/inquirydownload.svg";
import addIcon from "../../../assets/images/dms/icons/addIcon.svg";
import DocumentIcon from "../../../assets/images/dms/icons/inquiryDocumentIcon.svg";
import shareIcon from "../../../assets/images/dms/icons/inquiryShareIcon.svg";
import deleteIcon from "../../../assets/images/dms/icons/inquiryDeleteIcon.svg";
import axios from "axios";
import ViewFactoryModal from "./ViewFactoryModal";
import {
  encode,
  decode,
  calculateDateDiffCountFromCurrentDate,
  apiencrypt,
  apidecrypt,
} from "../../../helper";
import {
  getLoginCompanyId,
  getWorkspaceId,
  getLoginUserId,
  getWorkspaceType,
  getStaff,
  getStaffPermission,
  getLoginStaffId,
} from "../../../Constant/LoginConstant";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { maxFileUpload, maxUploadFileSize, ServerUrl } from "../../../Constant";
import InquirySentToModal from "./InquirySentToModal";
import { array } from "prop-types";

// import { Container } from "reactstrap";

const ViewInquiry = () => {
  const workspace_id = getWorkspaceId;
  const company_id = getLoginCompanyId;
  var getInputParams = {};
  getInputParams["company_id"] = getLoginCompanyId;
  getInputParams["workspace_id"] = getWorkspaceId;
  const [articles, setArticles] = useState([]);
  //const [article, setArticle] = useState('');
  const [modalart, setModalart] = useState(false);
  const [inquiryDetails, setInquiryDetails] = useState([]);
  const [inquiryId, setInquiryId] = useState("");
  // const [factory,setFactory] =useState([]);
  const { t } = useTranslation();
  const toggle = () => setModal(!modal);
  const toggleart = () => setModalart(!modalart);
  const [modalInquirySentTo, setModalInquirySentTo] = useState(false);
  const toggleInquirySentTo = () => setModalInquirySentTo(!modalInquirySentTo);

  const [factory, setFactory] = useState([]);
  const [inquiryDownloadPath, setInquiryDownloadPath] = useState("");
  const [factoryList, setFactoryList] = useState([]);
  const [selectedFactoriesList, setSelectedFactoriesList] = useState([]);
  let selectedFactoriesArray = [];

  const dataToSendAtStarting = {
    company_id: company_id,
    workspace_id: workspace_id,
  };

  useEffect(() => {
    axios.post(ServerUrl + "/get-inquiry", getInputParams).then((response) => {
      setInquiryDetails(response.data.data);
      setInquiryDownloadPath(response.data.pdfpath);
    });

    axios
      .post(
        ServerUrl + "/get-inquiry-factory",
        apiencrypt(dataToSendAtStarting)
      )
      .then((response) => {
        // response.data = apidecrypt(response.data)
        setFactory(response.data.data);
      });
  }, []);

  const factResponse = (inquiryId) => {
    window.location.href = "/factoryresponse?id=" + encode(inquiryId);
  };

  const deleteInquiry = (inquiryId) => {
    var deleteParams = {};
    deleteParams["inquiry_id"] = inquiryId.toString();
    deleteParams["company_id"] = company_id;
    var getInputParams = {};
    getInputParams["company_id"] = getLoginCompanyId;
    getInputParams["workspace_id"] = getWorkspaceId;
    Swal.fire({
      title: "Are you sure you want to delete ?",
      icon: "warning",
      button: t("okLabel"),
      showCancelButton: true,
      // confirmButtonColor: "danger",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(ServerUrl + "/delete-inquiry", deleteParams)
          .then((response) => {
            if (response.data.status_code == 200) {
              Swal.fire({
                title: response.data.meassage,
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
        <Breadcrumbs
          mainTitle="View Inquiry"
          parent="View Inquiry"
          title="View Inquiry Details"
          subTitle="View Inquiry Details"
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
                        <table className="table shadow shadow-showcase table-striped table-bordered">
                          <thead className="bg-primary">
                            <tr>
                              <th scope="col" className="centerAlign">
                                S.No
                              </th>
                              <th className="centerAlign">Inquiry No</th>
                              <th className="centerAlign">Style No</th>
                              <th className="centerAlign">Date</th>
                              <th className="centerAlign">
                                Items/Article Name
                              </th>
                              <th className="centerAlign">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {inquiryDetails.length > 0 ? (
                              inquiryDetails.map((inquirydtls, index) => (
                                <tr>
                                  <td scope="row" className="centerAlign">
                                    {index + 1}
                                  </td>
                                  <td className="centerAlign">
                                    {"IN-" + inquirydtls.id}
                                  </td>
                                  <td className="centerAlign">
                                    {inquirydtls.style_no}
                                  </td>
                                  <td className="centerAlign">
                                    {inquirydtls.created_date}
                                  </td>
                                  <td className="centerAlign">
                                    {inquirydtls.name}
                                  </td>
                                  <td className="centerAlign">
                                    <a
                                      href={
                                        inquiryDownloadPath +
                                        inquirydtls.id +
                                        ".pdf"
                                      }
                                      target="_blank"
                                    >
                                      <img
                                        style={{ cursor: "pointer" }}
                                        className="m-r-30"
                                        title="Inquiry Details Download"
                                        src={InquiryDowloadIcon}
                                      />
                                    </a>
                                    <img
                                      name="inquiryId"
                                      value={inquirydtls.id}
                                      title="Select Factory"
                                      width="20px"
                                      style={{ cursor: "pointer" }}
                                      className="m-r-30"
                                      src={addIcon}
                                      onClick={() => {
                                        setSelectedFactoriesList(() => "");
                                        setModalart(!modalart),
                                          setInquiryId(inquirydtls.id),
                                          apiCallInquirySentTo(inquirydtls.id);
                                      }}
                                    />

                                    <img
                                      style={{ cursor: "pointer" }}
                                      className="m-r-30"
                                      title="Inquiry Sent To"
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
                                    <img
                                      style={{ cursor: "pointer" }}
                                      className="m-r-30"
                                      title="Factory Response"
                                      value={inquirydtls.id}
                                      src={shareIcon}
                                      onClick={() => {
                                        factResponse(inquirydtls.id);
                                      }}
                                    />
                                    <img
                                      style={{ cursor: "pointer" }}
                                      className="m-r-30"
                                      value={inquirydtls.id}
                                      title="Delete"
                                      src={deleteIcon}
                                      onClick={() => {
                                        deleteInquiry(inquirydtls.id);
                                      }}
                                    />
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <>
                                <tr className="text-center">
                                  <td colSpan="6">List Inquiry Details</td>
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
