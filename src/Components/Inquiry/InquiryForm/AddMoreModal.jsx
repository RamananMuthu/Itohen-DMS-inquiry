import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Input, Label } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { ServerUrl } from '../../../Constant';
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { encode, decode, apiencrypt, apidecrypt } from "../../../helper";

const FormAddMoreModal = ({ modal, toggle, infoDetails,setInfoDetails,masterType ,referenceId}) => {
  const { t } = useTranslation();

  const [customDecDoc, setCustomDecDoc] = useState("");
  const [mainLable,setMainLable]=useState("");
  const onSaveHandle = () => {
    if (masterType === "CustomsDeclarationDocument")
    {
    if (!customDecDoc) {
      Swal.fire({
        title: t("plsEnterCusDecDoc"),
        icon: "error",
        button: t("okLabel"),
        timer: 2500,
      });
    } else {
      axios
        .post(ServerUrl + "/add-inquiry-master-data", apiencrypt({
          type: "CustomsDeclarationDocument",
          content: customDecDoc,
          referenceId:referenceId
        }))
        .then((response) => {
          response.data = apidecrypt(response.data);
          if (response.data.status_code === 200) {
            Swal.fire({
              text: t(response.data.message),
              icon: "success",
              button: t("okLabel"),
            }).then((result) => {
              if (result.isConfirmed) {
                toggle(false);
                /* To show the new roles in the dropdown */
                axios
                  .post(ServerUrl + "/get-inquiry-master", apiencrypt({
                    type: "CustomsDeclarationDocument",
                    referenceId: referenceId}))
                  .then((response) => {
                    response.data = apidecrypt(response.data);
                    setInfoDetails(response.data.data);
                  });
              }
            });
          }
          /* To show error if the Role is already present*/
          if (response.data.status_code === 401) {
            Swal.fire({
              title: t("cusDecDocExistAlert"),
              text: t("enterDifferentName"),
              icon: "error",
              button: t("okLabel"),
              timer: 2500,
            });
          }
        });
    }
}
else if(masterType==="MainLabel"){
    if (!mainLable) {
        Swal.fire({
          title: t("plsEnterMainLabel"),
          icon: "error",
          button: t("okLabel"),
          timer: 2500,
        });
      } else {
        axios
          .post(ServerUrl + "/add-inquiry-master-data", apiencrypt({
            type: "MainLabel",
            content: mainLable,
            referenceId:referenceId
          }))
          .then((response) => {
            response.data = apidecrypt(response.data);
            if (response.data.status_code === 200) {
              Swal.fire({
                text: t(response.data.message),
                icon: "success",
                button: t("okLabel"),
              }).then((result) => {
                if (result.isConfirmed) {
                  toggle(false);
                  /* To show the new roles in the dropdown */
                  axios
                    .post(ServerUrl + "/get-inquiry-master", apiencrypt({
                      type: "MainLabel",
                      referenceId: referenceId}))
                    .then((response) => {
                      response.data = apidecrypt(response.data);
                      setInfoDetails(response.data.data);
                    });
                }
              });
            }
            /* To show error if the Role is already present*/
            if (response.data.status_code === 401) {
              Swal.fire({
                title: t("mainLabExistAlert"),
                text: t("enterDifferentName"),
                icon: "error",
                button: t("okLabel"),
                timer: 2500,
              });
            }
          });
      }
}

  };
  return (
    <Modal isOpen={modal} toggle={toggle} centered>
      <ModalHeader> {masterType === "MainLabel" ? t("addMainlabel") : masterType==="CustomsDeclarationDocument"? t("addCusDecDoc"):"" }</ModalHeader>
      <ModalBody>
        <Label className="col-form-label" for="recipient-name">
        {masterType === "MainLabel" ? t("addMainlabel") : masterType==="CustomsDeclarationDocument"? t("addCusDecDoc"):"" }
        </Label>
        <Input
          className="form-control"
          type="text"
          onChange={(e) =>  {masterType === "MainLabel" ? setMainLable(e.target.value) : masterType==="CustomsDeclarationDocument"? setCustomDecDoc(e.target.value):"" }}
        />
      </ModalBody>
      <ModalFooter>
        <Btn  attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}>{t("close")}</Btn>
        <Btn  attrBtn={{ color: "primary btn-sm", onClick: () => onSaveHandle() }}> {t("save")}</Btn>
      </ModalFooter>
    </Modal>
  );
};

export default FormAddMoreModal;