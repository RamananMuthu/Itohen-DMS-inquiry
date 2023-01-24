import React, { useState } from 'react';
import {
  Input, Modal, ModalBody, ModalFooter,
  ModalHeader, Label, FormGroup,
} from 'reactstrap';
import { ServerUrl } from '../../../Constant';
import closeIcon from "../../../assets/images/dms/icons/inquiryCloseIcon.svg";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Swal from "sweetalert2";

const AddFactoryModal = ({ modal, toggle, setFactoryModal, companyId, workspaceId, factory }) => {
  const { t } = useTranslation();
  const [factoryName, setFactoryName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const [errors, setValidErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({});

  var apiInputParams = {};
  apiInputParams['factory'] = factoryName;
  apiInputParams['contact_person'] = contactPerson;
  apiInputParams['contact_number'] = contactNumber;
  apiInputParams['contact_email'] = email;
  apiInputParams['address'] = address;
  apiInputParams['city'] = city;

  const orderValidation = (data) => {

    let errors = {};
    if (!factoryName) {
      errors.factoryName = "Please enter the factory name";
    } else if (!(factoryName).match(/^[@&0-9a-zA-Z_-\s]+$/g)) {
      errors.factoryName = t("numbersCharactersAllowed");
    } else if (!(factoryName).match(/^[a-zA-Z\s]+$/g)) {
      errors.factoryName = t("allowedCharactersSpace");
    }

    if (!contactPerson) {
      errors.contactPerson = "Please enter the contact person";
    } else if (!(contactPerson).match(/^[@&0-9a-zA-Z_-\s]+$/g)) {
      errors.contactPerson = t("numbersCharactersAllowed");
    } else if (!(contactPerson).match(/^[a-zA-Z\s]+$/g)) {
      errors.contactPerson = t("allowedCharactersSpace");
    }

    if (!contactNumber) {
      errors.contactNumber = "Please enter the contact number";
    } else if (contactNumber == '') {
      errors.contactNumber = t("enterMobileNumber");
    } else if (!/^[0-9]+$/.test(contactNumber)) {
      errors.contactNumber = t("numbersOnlyAllowed");
    } else if (((contactNumber.length != null && contactNumber.length != 'null' && contactNumber.length != '' &&
      (parseInt(contactNumber.length) < 10) || (parseInt(contactNumber.length) > 15)))) {
      errors.contactNumber = t("enter10DigitsMobileNumber");
    }

    if (!email) {
      errors.email = "Please enter the email";
    }

    if (!address) {
      errors.address = "Please enter the address";
    }

    if (!city) {
      errors.city = "Please enter the city";
    } else if (!(city).match(/^[@&0-9a-zA-Z_-\s]+$/g)) {
      errors.city = t("numbersCharactersAllowed");
    } else if (!(city).match(/^[a-zA-Z\s]+$/g)) {
      errors.city = t("allowedCharactersSpace");
    }

    setValidErrors(errors);
    return errors;
  };
  // const dataToSendAtStarting = {
  //   "company_id": companyId,
  //   "workspace_id": workspaceId
  // };

  const onSaveHandle = () => {
    let backendErrors = {};

    let retval = orderValidation();
    if (Object.keys(retval).length == 0) {
      axios
        .post(ServerUrl + "/save-inquiry-contact", apiInputParams)
        .then((response) => {

          if (response.data.status_code == 200) {
            Swal.fire({
              title: response.data.message,
              icon: "success",
              button: t("okLabel"),
              confirmButtonColor: '#4E90DE',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                toggle(false);
                axios
                  .post(ServerUrl + "/get-inquiry-factory", {
                    company_id: companyId,
                    workspace_id: workspaceId
                  }
                  )
                  .then((response) => {
                    // response.data = apidecrypt(response.data)
                    factory(response.data.data);
                  });
              }
            })
          }

          else if (response.data.status_code == 401) {

            Swal.fire({
              title: ((response.data.error.contact_number) || (response.data.error.contact_email)),
              icon: "warning",
              button: t("okLabel"),
              confirmButtonColor: '#4E90DE',
              allowOutsideClick: false,
            })

            // setBackendErrors(()=>"");
            // if( response.data.error.contact_number[0] == "The contact number has already been taken."){
            //   backendErrors.contactNumber =  "The contact number has already been taken."
            //   setBackendErrors(backendErrors);
            // }
            // else if( response.data.error.contact_email[0] == "The contact email has already been taken." ){
            //   backendErrors.email = "The contact email has already been taken.";
            //   setBackendErrors(backendErrors);
            // }
          }
        })
    }
  }
  return (
    <Modal isOpen={modal} toggle={toggle} backdrop="static" centered id="addsatffmodal">
      <ModalHeader> {t("addNewFactory")}
        <img
          className="f-right"
          style={{ cursor: 'pointer' }}
          src={closeIcon}
          width="25px"
          height="25px"
          // onClick={toggle}
          onClick={() => {
            setFactoryModal(!toggle),
              setBackendErrors(() => ""),
              setValidErrors(() => ""),
              setFactoryName(() => ""),
              setContactPerson(() => ""),
              setContactNumber(() => ""),
              setEmail(() => ""),
              setAddress(() => ""),
              setCity(() => "")
          }}

        />
      </ModalHeader>
      <ModalBody>
        <Label className="col-form-label">
        </Label>
        <FormGroup>
          <Label> {t("factory")} </Label><sup className="font-danger">*</sup>
          <Input
            className={`${errors.factoryName && 'select-error-valid'}  form-control digits`}
            type="text"
            name='Factory'
            onChange={(e) => setFactoryName(e.target.value)}
          />
          {errors.factoryName && (
            <span className="error-msg">{errors.factoryName}</span>
          )}
        </FormGroup>
        <FormGroup>
          <Label> {t("contactPerson")} </Label><sup className="font-danger">*</sup>
          <Input
            className={`${errors.contactPerson && 'select-error-valid'}  form-control digits`}
            type="text"
            name='Company'
            onChange={(e) => setContactPerson(e.target.value)} />
          {errors.contactPerson && (
            <span className="error-msg">{errors.contactPerson}</span>
          )}
        </FormGroup>
        <FormGroup>
          <Label> {t("contactNumber")} </Label><sup className="font-danger">*</sup>
          <Input
            className={`${errors.contactNumber && 'select-error-valid'}  form-control digits`}
            type="number"
            maxLength="15"
            name='Contact Person'
            onChange={(e) => setContactNumber(e.target.value)} />
          {errors.contactNumber && (
            <span className="error-msg">{errors.contactNumber}</span>
          )}
          {backendErrors.contactNumber && (
            <span className="error-msg">{backendErrors.contactNumber}</span>
          )}
        </FormGroup>
        <FormGroup>
          <Label>{t("email")}</Label><sup className="font-danger">*</sup>
          <Input
            className={`${errors.email && 'select-error-valid'}  form-control digits`}
            type="email"
            // placeholder={t("email")}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="error-msg">{errors.email}</span>
          )}
          {backendErrors.email && (
            <span className="error-msg">{backendErrors.email}</span>
          )}
        </FormGroup>
        <FormGroup>
          <Label> {t("address")} </Label><sup className="font-danger">*</sup>
          <Input
            className={`${errors.address && 'select-error-valid'} form-control digits`}
            type="text"
            name="Address"
            onChange={(e) => setAddress(e.target.value)} />
          {errors.address && (
            <span className="error-msg">{errors.address}</span>
          )}
        </FormGroup>
        <FormGroup>
          <Label>{t("city")}</Label><sup className="font-danger">*</sup>
          <Input
            className={`${errors.city && 'select-error-valid'} form-control digits`}
            type="text"
            name="City"
            onChange={(e) => setCity(e.target.value)} />
          {errors.city && (
            <span className="error-msg">{errors.city}</span>
          )}
        </FormGroup>

      </ModalBody>
      <ModalFooter className="factSave">
        <a
          type="button"
          className="btn m-l-5"
          style={{ backgroundColor: '#4E90DE', color: "#FFFFFF" }}
          onClick={() => onSaveHandle()} > {t("save")} </a>
        {/* <Button className="factSave"   onClick= {() => onSaveHandle()}> Save </Button> */}
        {/* <Btn attrBtn={{ color: "primary btn-sm", onClick: () => onSaveHandle() }}>
          Save
        </Btn> */}
      </ModalFooter>
    </Modal>
  );
};

export default AddFactoryModal;