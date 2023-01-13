import React, { useState } from "react";
// import {
//     Offcanvas,
//     OffcanvasBody,
//     OffcanvasHeader
//   } from "reactstrap";
import {
  Form,
  Label,
  Card,
  CardBody,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  FormGroup,
  Media,
  Container,
  Table,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
// import { getLoginCompanyId, getWorkspaceId } from "../../Constant/LoginConstant";
import { useTranslation } from "react-i18next";
import { Btn } from "../../../AbstractElements";
import Swal from "sweetalert2";
// import { apiencrypt, apidecrypt } from "../../helper";
const InquiryInfoOffCanvas = ({
  modal,
  toggle,
  infoDetails,
  masterType,
  setPaymentTerm,
  setShowInfoCanvas,
  showInfoCanvas,
  PaymentTerm
}) => {
  const [checkedValue, setCheckedValue] = useState("");
  const { t } = useTranslation();

  const saveChecked = (checkedData) => {
    var checkboxeschecked = [];
    var markedCheckbox = document.querySelectorAll('input[type="checkbox"]');
    // alert(markedCheckbox.length);
    // console.log("LEngth",markedCheckbox.length);

    var checkboxLength = markedCheckbox.length;
    var content=PaymentTerm + "<ul>";
    for (var i = 0; i < checkboxLength; i++) {
      // console.log("Hello");
      //var checkbox = markedCheckbox[i];
      if (markedCheckbox[i].checked) {
        // console.log("&&&&",markedCheckbox[i].checked)
        checkboxeschecked.push(markedCheckbox[i].value);
        content = content+ '<li>'+markedCheckbox[i].value+'</li>';
      }
      content = content+ '</ul>';
    }
    if (checkboxeschecked.length > 0) {
      Swal.fire({
        title: "Selected Payment Terms Added Successfully",
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
        title: "Check Atleast One Before Save",
        icon: "warning",
        button: t("okLabel"),
      });
    }
  };
  return (
    <Offcanvas
      isOpen={modal}
      toggle={toggle}
      direction={"end"}
      className="offcanvas-width"
    >
      <OffcanvasHeader className="bg-primary offcanvas-header">
        {masterType === "PaymentTerms" ? "Payment Terms" : ""}
        <span
          className="f-right cursor-pointer"
          title={t("close")}
          tooltip={t("close")}
          alt={t("close")}
          onClick={toggle}
        >
          X
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
                            <div className="checkbox checkbox-solid-success">
                              <Input
                                id={info.id}
                                type="checkbox"
                                name="CheckBox"
                                value={info.content}
                              />
                              <Label
                                for={info.id}
                                style={{ textColor: "#4E90DE" }}
                              >
                                {info.content}
                              </Label>
                            </div>
                          </FormGroup>
                        </Row>
                      ))
                    ) : (
                      <>
                        <div>No Data Found</div>
                      </>
                    )}
                    <FormGroup>
                      <Button
                        style={{ textAlign: "center" }}
                        width="40px"
                        height="20px"
                        onClick={() => {
                          saveChecked({ infoDetails });
                        }}
                      >
                        Save
                      </Button>
                    </FormGroup>
                  </Row>
                </Col>

                <Col></Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default InquiryInfoOffCanvas;
