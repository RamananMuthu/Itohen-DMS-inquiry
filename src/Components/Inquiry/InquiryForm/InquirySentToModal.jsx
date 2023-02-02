import React, { } from 'react';
import { Modal, ModalBody, ModalHeader, Row, Col, Form } from 'reactstrap';
import closeIcon from "../../../assets/images/dms/icons/inquiryCloseIcon.svg";
import { useTranslation } from "react-i18next";
import noData from "../../../assets/images/dms/icons/noData.jpg";

const InquirySentToModal = ({ factoryList, modalInquirySentTo, toggleInquirySentTo, setModalInquirySentTo }) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={modalInquirySentTo} backdrop="static" toggle={toggleInquirySentTo} centered className="modelWidth" >
        <ModalHeader>
          {t("inquirySentTo")}
          <img
            className="f-right"
            style={{ backgroundColor: '#FFF', cursor: 'pointer' }}
            src={closeIcon}
            width="25px"
            height="25px"
            onClick={() => { setModalInquirySentTo(!modalInquirySentTo) }}
          />
        </ModalHeader>
        <ModalBody>
          <Form className="needs-validation" noValidate="">
            <Row>
              <Col sm="12">
                <Row className="g-12 m-t-20">
                  <Col md="12" lg="12" sm="12">
                    <Row className="g-12">
                      <div className="table-responsive">
                        <table className="table shadow shadow-showcase table-bordered">
                          <thead className='bg-primary'>
                            <tr>
                              <th className="centerAlign"> {t("serialNo")} </th>
                              <th className="centerAlign m-r-100"> {t("factory")} </th>
                              <th className="centerAlign m-r-100"> {t("contactPerson")} </th>
                              <th className="centerAlign m-r-100"> {t("contactNumber")} </th>
                              <th className="centerAlign m-r-100">{t("contactEmail")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {factoryList.length > 0 ?
                              factoryList.map((fact, index) => (
                                <tr key={fact.id} id={"factoryId" + fact.id} className="text-center">
                                  <td scope="row" className="centerAlign">{index + 1}</td>
                                  <td className="centerAlign">{fact.factory}</td>
                                  <td className="centerAlign">{fact.contact_person}</td>
                                  <td className="centerAlign">{fact.contact_number}</td>
                                  <td className="centerAlign">{fact.contact_email}</td>
                                </tr>
                              )) : <>
                                <tr className="centerAlign">
                                  <td colSpan="12">
                                    <img src={noData} style={{ width: "200px" }} />
                                    <div> {t("noDataFound")} </div> 
                                  </td>
                                </tr>
                              </>}
                          </tbody>
                        </table>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>

  );
};

export default InquirySentToModal;