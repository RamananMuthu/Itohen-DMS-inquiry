import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, CardBody, Card, } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import Loader from "../../../Layout/Loader/index";
import { getLoginUserId, getWorkspaceType } from '../../../Constant/LoginConstant';
import { encode, decode, } from "../../../helper"
import { useSearchParams, } from "react-router-dom";
import axios from "axios";
import parse from 'html-react-parser';
import InquiryNoIcon from "../../../assets/images/dms/icons/inquiryNoIcon.svg";
import { ServerUrl } from "../../../Constant";
import FactoryResponseRatingIcon from '../../../assets/images/dms/icons/factoryResponseRatingIcon.svg';
import FactoryResponseRatingModal from "./FactoryResponseRatingModal";
import { useTranslation } from "react-i18next";

const FactoryResponse = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [inquiryId, setInquiryId] = useState(decode(searchParams.get("id")));
    const [factoryRes, setFactoryRes] = useState([]);
    const [factoryId, setFactoryId] = useState();
    const [userId, setUserId] = useState(getLoginUserId);
    const [modalRating, setModalRating] = useState(false);
    const togglRating = () => setModalRating(!modalRating);
    const [factoryRatingData, setFactoryRatingData] = useState([]);
    const { t } = useTranslation();
    const getInputParams = {};
    getInputParams["inquiry_id"] = inquiryId;
    getInputParams["factory_id"] = factoryId;

    const apiCallFactoryRating = (factoryId) => {

        const factoryRatingInputParams = {};
        factoryRatingInputParams["factory_id"] = factoryId;
        factoryRatingInputParams["user_id"] = userId;

        axios
            .post(ServerUrl + "/get-factory-ratings", factoryRatingInputParams)
            .then((response) => {
                // response.data = apidecrypt(response);
                setFactoryRatingData(response.data.data);
            })
    }

    useEffect(() => {

         if( getWorkspaceType == "Factory" && getWorkspaceType != "PCU" && getWorkspaceType != "Buyer"  )
         {
            axios
            .post(ServerUrl + "/inquiry-factory-response", getInputParams)
            .then((response) => {
                setFactoryRes(response.data.data);
                // setCommentsString(parse(response.data.data[0].comments));
            })
         } else {
             window.location.href='/inquiry/viewinquiry';
         }
        
    }, [])

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
                                    </Row>
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
                                                            <th >{t("Contact Name")}</th>
                                                            <th className="centerAlign">{t("Phone Number")}</th>
                                                            <th className="centerAlign">{t("price")}</th>
                                                            <th className="centerAlign">{t("comments")}</th>
                                                            <th className="centerAlign">{t("Rating")}</th>
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
                                                                <tr className="text-center"><td colSpan="7">{t("List Factory Response Details")}</td></tr>
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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default FactoryResponse