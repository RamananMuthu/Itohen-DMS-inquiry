import React, { useState } from "react";
import {
  Form, Label, Col, Row, Input, Button, FormGroup,
  Offcanvas, OffcanvasBody, OffcanvasHeader,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const InquiryInfoOffCanvas = ({ modal, toggle, infoDetails, masterType,
  setPaymentTerm, setShowInfoCanvas, showInfoCanvas, PaymentTerm }) => {
  const { t } = useTranslation();
/******************Save Cheched Factory************************/
  const saveChecked = (checkedData) => {
    var checkboxeschecked = [];
    var markedCheckbox = document.querySelectorAll('input[type="checkbox"]');
    var checkboxLength = markedCheckbox.length;
    var content = PaymentTerm + "<ul>";
    for (var i = 0; i < checkboxLength; i++) {
      if (markedCheckbox[i].checked) {
        checkboxeschecked.push(markedCheckbox[i].value);
        content = content + '<li>' + markedCheckbox[i].value + '</li>';
      }
      content = content + '</ul>';
    }

    if (checkboxeschecked.length > 0) {
      Swal.fire({
        title: t("selectedPaymentTermsAddedSuccessfully"),
        icon: "success",
        showCancelButton: true,
        button: t("okLabel"),
      }).then((result) => {
        if (result.isConfirmed) {
          setShowInfoCanvas(!showInfoCanvas);
          setPaymentTerm(content);
          // toggle();
        }
      });
    } else {
      Swal.fire({
        title: t("checkAtleastOneBeforeSave"),
        icon: "warning",
        button: t("okLabel"),
      });
    }
  };

  return (
    <Offcanvas className="offcanvas-width" isOpen={modal} toggle={toggle} direction={"end"} >
      <OffcanvasHeader className="bg-primary offcanvas-header">
        {masterType === "PaymentTerms" ? "Payment Terms" : ""}
        <span className="f-right cursor-pointer"
          title={t("close")} tooltip={t("close")}
          alt={t("close")} onClick={toggle} > X
        </span>
      </OffcanvasHeader>
      <OffcanvasBody>
        <Form>
          <Row>
            <Col sm="12">
              <Row className="g-12 m-t-20">
                <Col md="12" lg="12" sm="12">
                  <Row>
                    {infoDetails.length > 0 ? (
                      infoDetails.map((info) => (
                        <Row>
                          <FormGroup className="m-t-15 ">
                            <div className="checkbox">
                              <Input id={info.id}
                                type="checkbox" name="CheckBox"
                                value={info.content}
                              />
                              <Label for={info.id} style={{ textColor: "#4E90DE" }}>
                                {info.content}
                              </Label>
                            </div>
                          </FormGroup>
                        </Row>
                      ))
                    ) : (
                      <> <div> {t("noDataFound")} </div> </>
                    )}
                  </Row>
                </Col>
                <Col></Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </OffcanvasBody>
      <OffcanvasHeader>
        <FormGroup className="f-right m-r-20">
          <Button style={{ textAlign: "center" }}
            width="40px" height="20px"
            onClick={() => { saveChecked({ infoDetails }); }}
          > {t("save")}
          </Button>
        </FormGroup>
      </OffcanvasHeader>
    </Offcanvas>
  );
};

export default InquiryInfoOffCanvas;
/******************Code By: R.AKSHAYA MOL*******************/
