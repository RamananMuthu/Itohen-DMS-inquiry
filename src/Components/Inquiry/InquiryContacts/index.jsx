import { Container, Row, Col, CardBody, Card, CardHeader, FormGroup,
  Form, Label, Input, Button } from "reactstrap";
import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs, H5, H6, } from "../../../AbstractElements";
import { getLoginUserId, getWorkspaceType } from '../../../Constant/LoginConstant';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import axios from "axios";
import { ServerUrl } from '../../../Constant/index';

const InquiryContacts = () => {
  // var getInputParams = {};
  // getInputParams['company_id'] = getLoginCompanyId;
  // getInputParams['workspace_id'] = getWorkspaceId;
  // getInputParams['factory_id'] = 5;  
  // const [user_id, setUserId] = useState(userId);
  const { t } = useTranslation();
  const userId = getLoginUserId;
  const [factory, setFactoryName] = useState("");
  const [factory_id, setFactoryId] = useState(userId ? userId : "");
  const [contact_person, setContactPerson] = useState('');
  const [contact_number, setContactNumber] = useState('');
  const [contact_email, setContactEmail] = useState("");
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [factoryDetails, setFactoryDetails] = useState([]);

  useEffect(() => {
    if (getWorkspaceType == "Factory" && getWorkspaceType != "PCU" && getWorkspaceType != "Buyer") {
      axios
        .post(ServerUrl + "/factory-inquiry-contact", { factory_id })
        .then((response) => {
          if (response.data.status_code === 200) {
            setFactoryDetails(response.data.data[0] ? response.data.data[0] : "");
            setValidErrors(() => "");
          }
        })
    } else {
      window.location.href = '/inquiry/viewinquiry';
    }
  }, [])

  const handleSubmitHandler = (e) => {
    if (factoryDetails.length > 0 || factoryDetails != "") {
      const updateInquirySettings = {
        factory: document.getElementById("factoryName").value,
        contact_person: document.getElementById("contact_person").value,
        contact_number: document.getElementById("contact_number").value,
        contact_email: document.getElementById("contact_email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        factory_id: userId ? userId : "",
      };

      // ********* POST API call for Update the Contact Details **********
      axios.post(ServerUrl + "/update-inquiry-contact", updateInquirySettings)
        .then((response) => {
          if (response.data.status_code === 200) {
            // localStorage.setItem("factoryId", encode(response.data.factory));
            Swal.fire({
              title: t("inquiryContactSetting"),
              text: t(response.data.message),
              icon: "success",
              button: t("okLabel"),
            })
              .then((result) => {
                if (result.isConfirmed) {
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }
              })
          } else if (response.data.status_code == 401) {
            Swal.fire({
              title: t(response.data.error.contact_number ||
                response.data.error.contact_email || response.data.error.contact_person
                || response.data.error.address || response.data.error.city || response.data.error.factory),
              icon: "warning",
              button: t("okLabel"),
            })
          }
        }
        )
    }
    else {
      let valid = inquirySettingValidation();
      if (Object.keys(valid).length == 0) {
        const inquirySettings = {
          factory, contact_person, contact_number, contact_email,
          address, city, factory_id,
        };

        // ********* POST API call for Save the New Contact Details **********
        axios.post(ServerUrl + "/save-inquiry-contact", inquirySettings)
          .then((response) => {
            factory, contact_person, contact_number,
              contact_email, address, city, factory_id
            if (response.data.status_code === 200) {
              // localStorage.setItem("factoryId", encode(response.data.factory));
              Swal.fire({
                title: factory,
                text: t(response.data.message),
                icon: "success",
                button: t("okLabel"),
              })
                .then((result) => {
                  if (result.isConfirmed) {
                    setTimeout(() => {
                      window.location.reload();
                    }, 100);
                  }
                })
            }
            else if (response.data.status_code === 401) {
              Swal.fire({
                title:
                  t(response.data.error.factory) || t(response.data.error.contact_email) ||
                  t(response.data.error.contact_person) || t(response.data.error.contact_number) ||
                  t(response.data.error.address) || t(response.data.error.city),
                // text: t("fieldMissing"),
                icon: "warning",
                button: t("okLabel"),
              });
            }
          })
        // .catch(err => {
        //   Swal.fire({
        //     title: err.t(response.data.message),
        //     icon: "warning",
        //     button: t("okLabel"),
        //   });
        // });
      } else {
        Swal.fire({
          title: t("validationError"),
          text: t("fillRequiredFields"),
          icon: "error",
          button: t("okLabel"),
        });
      }
    }
  }

  const [errors, setValidErrors] = useState({});
  const inquirySettingValidation = (data) => {
    let errors = {};
    if (!factory && !document.getElementById("factoryName").value) {
      errors.factory = t("The factory field is required.");
    }
    else if (!(factory).match(/^[@&0-9a-zA-Z_-\s]+$/g)) {
      errors.factory = t("numbersCharactersAllowed");
    }
    if (!contact_person) {
      errors.contact_person = t("The contact person field is required.");
    } else if (!(contact_person).match(/^[a-zA-Z\s]+$/g)) {
      errors.contact_person = t("allowedCharactersSpace");
    }
    if (!contact_number || contact_number.length == 0) {
      errors.contact_number = t("The contact number field is required.");
    } else if (!/^[0-9]+$/.test(contact_number)) {
      errors.contact_number = t("numbersOnlyAllowed");
    }
    if (((contact_number.length != null && contact_number.length != 'null' && contact_number.length != ''
      && (parseInt(contact_number.length) < 10) || (parseInt(contact_number.length) > 15)))) {
      errors.contact_number = t("enter10DigitsMobileNumber");
    }
    if (!contact_email) {
      errors.contact_email = t("The contact email field is required.");
    } else if (!(contact_email).match(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i)) {
      errors.contact_email = t("enterValidEmailAddress");
    }
    if (!city) {
      errors.city = t("The city field is required.");
    } else if (!(city).match(/^[a-zA-Z\s]+$/g)) {
      errors.city = ("allowedCharactersSpace");
    }
    if (!address) {
      errors.address = t("The address field is required.");
    }
    // else if (!(address).match(/^[a-zA-Z\s]+$/g)) {
    //   errors.address = ("allowedCharactersSpace");
    // }
    setValidErrors(errors);
    return errors;
  };

  return (
    <Fragment>
      <Row className="pgbgcolor">
        <Breadcrumbs mainTitle={t("inquiryContactSetting")} parent="Company Setting"
          title={t("inquiryContactSetting")} />
      </Row>
      <Container fluid={true} className="general-widget topaln">
        <Row>
          <Col sm="12" >
            <Card>
              <CardHeader className="pb-0">
                <H5>{t("inquiryContactDetails")}</H5>
              </CardHeader>
              <CardBody>
                <Form >
                  <FormGroup>
                    <Row>
                      <Col sm="12"><H6 attrH6={{ className: 'pb-2' }}>{t("contactInfo")}</H6></Col>
                      <Col sm="12" md="4" lg="4" xs="12">
                        <FormGroup>
                          <Label htmlFor="factory">
                            {t("factoryName")}<sup className="font-danger">*</sup>
                          </Label>
                          <Input
                            className={`${errors.factory && 'error-valid'}  form-control`}
                            type="text"
                            placeholder={t("factoryName")}
                            id="factoryName"
                            name="factory"
                            defaultValue={factoryDetails.factory ? factoryDetails.factory : ""}
                            onChange={(e) => setFactoryName(e.target.value)}
                            maxLength="30"
                            required="true"
                          />
                          {errors.factory && (
                            <span className="error-msg">{t(errors.factory)}</span>
                          )}
                        </FormGroup>
                      </Col>

                      <Col sm="12" md="4" lg="4" xs="12">
                        <FormGroup>
                          <Label htmlFor="exampleInputPassword2">
                            {t("contactPerson")}{" "}<sup className="font-danger">*</sup>
                          </Label>
                          <Input
                            className={`${errors.contact_person && 'error-valid'}  form-control`}
                            type="text"
                            placeholder={t("contactPerson")}
                            name="contact_person"
                            id="contact_person"
                            defaultValue={factoryDetails.contact_person ? factoryDetails.contact_person : ""}
                            onChange={(e) => setContactPerson(e.target.value)}
                            maxLength="30"
                          />
                          {errors.contact_person && (
                            <span className="error-msg">{t(errors.contact_person)}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="12" md="4" lg="4" xs="12">
                        <FormGroup>
                          <Label htmlFor="contact_number">
                            {t("contactNumber")}{" "}<sup className="font-danger">*</sup>
                          </Label>
                          <Input
                            className={`${errors.contact_number && 'error-valid'}  form-control`}
                            type="tel"
                            placeholder={t("contactNumber")}
                            name="contact_number"
                            id="contact_number"
                            defaultValue={factoryDetails.contact_number ? factoryDetails.contact_number : ""}
                            onChange={(e) => setContactNumber(e.target.value)}
                            maxLength="15"
                          />
                          {errors.contact_number && (
                            <span className="error-msg">{t(errors.contact_number)}</span>
                          )}
                        </FormGroup>
                      </Col>

                      <Col sm="12" md="4" lg="4" xs="12">
                        <FormGroup>
                          <Label htmlFor="contact_email">
                            {t("contactEmail")} <sup className="font-danger">*</sup>
                          </Label>
                          <Input
                            className={`${errors.contact_email && 'error-valid'}  form-control`}
                            type="text"
                            placeholder={t("contactEmail")}
                            name="contact_email"
                            id="contact_email"
                            defaultValue={factoryDetails.contact_email ? factoryDetails.contact_email : ""}
                            onChange={(e) => setContactEmail(e.target.value)}
                          />
                          {errors.contact_email && (
                            <span className="error-msg">{t(errors.contact_email)}</span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup>
                    <Row>
                      <Col sm="12"> <H6 attrH6={{ className: 'pb-2' }}>{t("addressInfo")}</H6></Col>
                      <Col sm="12" md="4" lg="4" xs="12">
                        <FormGroup>
                          <Label htmlFor="address">{t("address")} <sup className="font-danger">*</sup>
                          </Label>
                          <Input
                            className={`${errors.address && 'error-valid'}  form-control`}
                            type="text"
                            placeholder={t("address")}
                            name="address"
                            id="address"
                            defaultValue={factoryDetails.address ? factoryDetails.address : ""}
                            onChange={(e) => setAddress(e.target.value)}
                            maxLength="100"
                          />
                        </FormGroup>
                        {errors.address && (
                          <span className="error-msg">{errors.address}</span>
                        )}
                      </Col>

                      <Col sm="12" md="4" lg="4" xs="12">
                        <FormGroup>
                          <Label htmlFor="city">
                            {t("city")}<sup className="font-danger">*</sup>
                          </Label>
                          <Input
                            className={`${errors.city && 'error-valid'}  form-control`}
                            type="text"
                            placeholder={t("city")}
                            name="city"
                            id="city"
                            defaultValue={factoryDetails.city ? factoryDetails.city : ""}
                            onChange={(e) => setCity(e.target.value)}
                            maxLength="20"
                          />
                          {errors.city && (
                            <span className="error-msg">{errors.city}</span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>

                  <Row>
                    <Col sm="12">
                      <FormGroup className="mb-0 f-right">
                        <Button attrBtn={{ color: "success", className: "me-3" }} onClick={() => handleSubmitHandler()}>
                          {t("saveAndContinue")}
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default InquiryContacts;
// Code by : Anitha Sathysh