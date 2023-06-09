import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, CardBody, Card, Button } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import Loader from "../../../Layout/Loader/index";
import { getLoginUserId, getWorkspaceType, getStaff, getStaffPermission, 
         getLoginUserType, getWorkspaceId, getLoginCompanyId,getLoginStaffId } from '../../../Constant/LoginConstant';
import { encode, decode, apiencrypt, apidecrypt,DownloadFile } from "../../../helper";
import { useSearchParams, } from "react-router-dom";
import axios from "axios";
import parse from 'html-react-parser';
import InquiryNoIcon from "../../../assets/images/dms/icons/inquiryNoIcon.svg";
import { ServerUrl } from "../../../Constant";
import FactoryResponseRatingIcon from '../../../assets/images/dms/icons/factoryResponseRatingIcon.svg';
import FactoryResponseRatingModal from "./FactoryResponseRatingModal";
import { useTranslation } from "react-i18next";
import AddFactoryResponseOffCanvas from '../InquiryForm/AddFactoryResponseOffCanvas';
import DownloadIcon from "../../../assets/images/dms/icons/download.svg";

const FactoryResponse = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [inquiryId, setInquiryId] = useState(decode(searchParams.get("id")));
    const [factoryRes, setFactoryRes] = useState([]);
    const [factoryId, setFactoryId] = useState();
    const [userId, setUserId] = useState(getLoginUserId);
    const [modalRating, setModalRating] = useState(false);
    const togglRating = () => setModalRating(!modalRating);
    const [factoryRatingData, setFactoryRatingData] = useState([]);
    const [factoriesList, setFactoriesList] = useState([]);
    const[currency,setCurrency] = useState();
    

    const { t } = useTranslation();
    const getInputParams = {};
    getInputParams["inquiry_id"] = inquiryId;
    getInputParams["factory_id"] = factoryId;
    getInputParams["user_id"] = getLoginUserId;

    const [modalAddFactoryResponse, setModalAddFactoryResponse] = useState(false);
    const toggleAddFactoryResponse = () => setModalAddFactoryResponse(!modalAddFactoryResponse);

    const apiCallFactoryRating = (factoryId) => {
    const factoryRatingInputParams = {};
    factoryRatingInputParams["factory_id"] = factoryId;
    factoryRatingInputParams["user_id"] = userId;
        axios
            .post(ServerUrl + "/get-factory-ratings", apiencrypt(factoryRatingInputParams))
            .then((response) => {
                response.data = apidecrypt(response.data);
                setFactoryRatingData(response.data.data);
            })
    }

    const getFactoryListResInputParams = {};
    getFactoryListResInputParams['inquiry_id'] =inquiryId;

    const apiCall = () => {
        axios
        .post(ServerUrl + "/inquiry-factory-response", apiencrypt(getInputParams))
        .then((response) => {
            response.data = apidecrypt(response.data);
            setFactoryRes(response.data.data);
        })

        axios
        .post(ServerUrl + "/get-factory-list-response", apiencrypt(getFactoryListResInputParams))
        .then((response) => {
          response.data = apidecrypt(response.data);        
          setFactoriesList(response.data.notifications);
          setCurrency(response.data.currency);
        });

    };
    useEffect(() => 
    {
    getLoginUserType == "user" ?  
        getWorkspaceType != "Factory" ? apiCall()  : 
        window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry` 
    :
        getWorkspaceType != "Factory" ?  
          (getStaff === "Staff" && getStaffPermission.includes("View Inquiry")) || getStaff == null ? 
          (getStaff === "Staff" && getStaffPermission.includes("View Response")) ? apiCall() :  window.location.href = `${process.env.PUBLIC_URL}/viewinquiry`
            :  
          (getStaff === "Staff" && getStaffPermission.includes("View Factory FeedBack")) ? window.location.href = `${process.env.PUBLIC_URL}/feedbackview`: 
          (getStaff === "Staff" && getStaffPermission.includes("Add Factory FeedBack")) ? window.location.href =` ${process.env.PUBLIC_URL}/feedbackform` : 
          (getStaff === "Staff" && getStaffPermission.includes("Create Inquiry")) ? window.location.href = `${process.env.PUBLIC_URL}/inquiryform` : 
          window.location.href = "/stafflogin"
        :
          (getStaff === "Staff" && getStaffPermission.includes("View Factory Inquiry")) || getStaff == null ? 
          window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry`
            : 
          window.location.href = `${process.env.PUBLIC_URL}/inquirycontacts`
    }, [])
    


    const onGoBack=() => {
        window.location.href = `${process.env.PUBLIC_URL}/viewinquiry` 
    }
    const toDownloadAsPdf =()=>{
        var getDownloadParams = {};
        getDownloadParams["company_id"] = getLoginCompanyId;
        getDownloadParams["workspace_id"] = getWorkspaceId;
        getDownloadParams["inquiry_id"] = inquiryId;
        getDownloadParams["user_id"] = getLoginUserType == "user" ? getLoginUserId : 0;
        getDownloadParams["staff_id"] = getLoginUserType == "staff" ? getLoginStaffId : 0;
        
        axios
        .post(ServerUrl + "/factory-response-inquiries-download", apiencrypt(getDownloadParams),{responseType: 'blob'})
        .then((response) => {
            let name = "factoryResponse_list-"+Date.now()+".pdf"; 
            DownloadFile(response.data, name);
        });
      }

    return (
        <Fragment>
            <Loader />
            <Row className="pgbgcolor">
                <Breadcrumbs mainTitle={t("factoryResponse")} parent={t("factoryResponse")} />
            </Row>
            <Container fluid={true} className="general-widget topaln">
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <Col sm="12">
                                    <Row>
                                        <Col sm="6" md="6" lg="3">
                                            <div style={{
                                                backgroundColor: "#4E90DE", borderRadius: "30px",
                                                height: "47px", padding: "10px"
                                            }} >
                                                <span className="m-y-auto">
                                                    <span>
                                                        <img src={InquiryNoIcon} width="20px" height="20px"
                                                            style={{ verticalAlign: "middle" }} />
                                                    </span>
                                                    <span style={{
                                                        color: "white", fontSize: "18px",
                                                        verticalAlign: "middle"
                                                    }}> {t("inquiryNo")}
                                                    </span>
                                                    <span className="f-right" style={{
                                                        color: "white", fontSize: "18px",
                                                        verticalAlign: "middle"
                                                    }}> {"IN-" + inquiryId}
                                                    </span>
                                                </span>
                                            </div>
                                        </Col>
                                        <Col>
                                            <Button className="btn-sm primaryBtn m-r-10 f-right"
                                                onClick={() => setModalAddFactoryResponse(!modalAddFactoryResponse)}>
                                                    +  {t("addFactoryResponse")}
                                            </Button>
                                            <AddFactoryResponseOffCanvas 
                                              modal={modalAddFactoryResponse}
                                              toggle={toggleAddFactoryResponse}
                                              factoriesList={factoriesList}
                                              currency={currency}
                                            />
                                        </Col>
                                    </Row>
                                    {factoryRes.length > 0 ? 
                                    <Row>
                                    <Col md="12" lg="12" sm="12">
                                    <div className="cursor-pointer p-1 p-l-0 m-t-5 m-r-10 f-right" onClick={()=> toDownloadAsPdf()}>
                      <img src={DownloadIcon} />
                     </div>
                     </Col>
                                    </Row> : "" }

                                </Col>

                                <Row className="g-12 m-t-20">
                                    <Col md="12" lg="12" sm="12">
                                        <Row className="g-12">
                                            <div className="table-responsive">
                                                <table className="table shadow shadow-showcase table-striped table-bordered">
                                                    <thead className="bg-primary">
                                                        <tr>
                                                            <th scope="col" className="centerAlign">{t("serialNo")}</th>
                                                            <th >{t("Factory")}</th>
                                                            <th >{t("contactName")}</th>
                                                            <th className="centerAlign">{t("phNumber")}</th>
                                                            <th className="centerAlign">{t("price")}</th>
                                                            <th className="centerAlign">{t("comments")}</th>
                                                            <th className="centerAlign">{t("rating")}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {factoryRes.length > 0 ? factoryRes.map((factRes, index) =>
                                                        (
                                                            <tr>
                                                                <td scope="row" className="centerAlign">{index + 1}</td>
                                                                <td >{factRes.factory}</td>
                                                                <td >{factRes.contact_person}</td>
                                                                <td className="centerAlign">{factRes.contact_number}</td>
                                                                <td className="centerAlign">{factRes.price}</td>
                                                                <td className="centerAlign">{parse(factRes.comments)}</td>
                                                                <td className="centerAlign">
                                                                    <img src={FactoryResponseRatingIcon}
                                                                        style={{ cursor: 'pointer' }}
                                                                        width="23px"
                                                                        onClick={() => {
                                                                            setFactoryId(factRes.factory_id),
                                                                            apiCallFactoryRating(factRes.factory_id), setModalRating(!modalRating)
                                                                        }}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )) :
                                                            <>
                                                                <tr className="text-center"><td colSpan="7">{t("listFactoryResponseDetails")}</td></tr>
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
                                <Row className="m-t-20">
                                    <Col>
                                        <Button className="btn-sm secondaryBtn m-r-10 f-right"
                                        onClick={() => onGoBack()}>
                                        {t("goBack")}
                                        </Button>
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
/*******************Code By: R.AKSHAYA MOL**********************/
