import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, CardBody, Card, } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import DocumentIcon from "../../../assets/images/dms/icons/inquiryDocumentIcon.svg";
import axios from "axios";
import { encode, apiencrypt, } from "../../../helper"
import { getLoginCompanyId, getWorkspaceId, getLoginUserId } from '../../../Constant/LoginConstant';
import { useTranslation } from 'react-i18next';
import { ServerUrl } from "../../../Constant";
import FactoryDetailInquiry from "./FactoryDetailInquiry";

const FactoryViewInquiry = () => {
  const workspace_id = getWorkspaceId;
  const company_id = getLoginCompanyId;
  var getInputParams = {};
  getInputParams['company_id'] = getLoginCompanyId;
  getInputParams['workspace_id'] = getWorkspaceId;
  getInputParams['factory_id'] = getLoginUserId;

  const [inquiryDetails, setInquiryDetails] = useState([]);
  const [inquiryId, setInquiryId] = useState("");
  const { t } = useTranslation();
  const [factory, setFactory] = useState([]);
  const [inquiryResponse, setInquiryResponse] = useState([]);

  useEffect(() => {
    axios
      .post(ServerUrl + "/factory-get-inquiry", getInputParams)
      .then((response) => {
        setInquiryDetails(response.data.data);
        setInquiryResponse(response.data.response);
      })

    axios.post(ServerUrl + "/get-inquiry-factory", getInputParams)
      .then((response) => {
        // response.data = apidecrypt(response.data)
        setFactory(response.data.data);
      });
  }, [])

  const factoryDetails = (inquiryId) => {
    <FactoryDetailInquiry inquiryId={inquiryId} />
    window.location.href = '/factorydetailinquiry?id=' + encode(inquiryId);
  }


  return (
    <Fragment>
      <Row className="pgbgcolor">
        <Breadcrumbs mainTitle={t("factoryViewInquiry")} parent={t("factoryViewInquiry")}
          title={t("factoryViewInquiry")} subTitle={t("factoryViewInquiry")} />
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
                              <th className="centerAlign">{t("inquiryDate")}</th>
                              <th className="centerAlign">{t("itemsArticleName")}</th>
                              <th className="centerAlign">{t("response")}</th>
                              <th className="centerAlign">{t("action")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {inquiryDetails.length > 0 ? inquiryDetails.map((inquirydtls, index) => (
                              <tr>
                                <td scope="row" className="centerAlign">{index + 1}</td>
                                <td className="centerAlign">{"IN-" + inquirydtls.id}</td>
                                <td className="centerAlign">{inquirydtls.style_no}</td>
                                <td className="centerAlign">{inquirydtls.created_date}</td>
                                <td className="centerAlign">{inquirydtls.name}</td>
                                <td className="text-center">  {inquiryResponse.includes(inquirydtls.id) ? t("quoteSent") : t("Pending")} </td>
                                <td className="centerAlign">
                                  <img
                                    name="inquiryId"
                                    value={inquirydtls.id}
                                    title={t("factoryDetailInquiry")}
                                    width="20px"
                                    style={{ cursor: 'pointer' }}
                                    className="m-r-30"
                                    src={DocumentIcon}
                                    onClick={() => {
                                      factoryDetails(inquirydtls.id)
                                    }}
                                  />
                                </td>
                              </tr>
                            )) : <>
                              <tr className="text-center"><td colSpan="6">{t("ListInquiryDetails")}</td></tr>
                            </>
                            }
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
}

export default FactoryViewInquiry