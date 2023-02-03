import React, { useState } from 'react';
import {
  Input, Modal, ModalBody,
  ModalFooter, ModalHeader, Label
} from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { ServerUrl } from '../../../Constant';
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from 'react-i18next';
import { apidecrypt, apiencrypt } from '../../../helper';

const FormAddSizeModal = ({ modal, toggle, inputParams, size }) => {
  const { t } = useTranslation();
  const [sizeName, setSizeName] = useState('');

  const onSaveHandle = () => {
    if (!sizeName) {
      Swal.fire({
        title: t("sizeName"),
        text: t("sizeValidation"),
        icon: "error",
        button: t("okLabel"),
        timer: 2500,
      });
    } else {
      axios
        .post(ServerUrl + "/size", apiencrypt({
          company_id: inputParams.company_id,
          workspace_id: inputParams.workspace_id,
          user_id: inputParams.user_id,
          staff_id: inputParams.staff_id,
          status: 1,
          name: sizeName,
        }))
        .then((response) => {
          response.data = apidecrypt(response.data);
          if (response.data.status_code === 200) {
            Swal.fire({
              title: t("sizeAddedAlert"),
              // text: t(response.data.message),
              icon: "success",
              button: t("okLabel"),
            }).then((result) => {
              if (result.isConfirmed) {
                toggle(false);
                /* To show the ADDED COLOR in the dropdown */
                axios
                  .post(ServerUrl + "/get-size", apiencrypt({
                    company_id: inputParams.company_id,
                    workspace_id: inputParams.workspace_id,
                    user_id: inputParams.user_id,
                    staff_id: inputParams.staff_id,
                  }))
                  .then((response) => {
                    response.data = apidecrypt(response.data);
                    size(response.data.data);
                  });
              }
            });
          }
          /* To show error if the Role is already present*/
          if (response.data.status_code === 400) {
            Swal.fire({
              title: t(response.data.message),
              text: t("enterDifferentName"),
              icon: "warning",
              button: t("okLabel"),
              timer: 2500,
            });
          }
          /* To show error if the color is already present*/
          if (response.data.status_code === 401) {
            Swal.fire({
              title: t("sizeExistsAlert"),
              text: t("enterDifferentName"),
              icon: "warning",
              button: t("okLabel"),
              timer: 2500,
            });
          }
        });
    }
  };

  function handleKeyPress(e) {
    var key = e.key;
    var regex = /[A-Za-z0-9_-]/;
    if (!regex.test(key)) {
      e.preventDefault();
    }
  }

  return (
    <Modal isOpen={modal} toggle={toggle} centered>
      <ModalHeader>{t("addSize")}</ModalHeader>
      <ModalBody>
        <Label className="col-form-label" for="recipient-name">
          {t("addSize")}
        </Label>
        <Input
          onKeyPress={(e) => handleKeyPress(e)}
          className="form-control" type="text"
          onChange={(e) => { setSizeName(e.target.value) }} />
      </ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}>
          {t("close")}
        </Btn>
        <Btn attrBtn={{ color: "primary  btn-sm", onClick: () => onSaveHandle() }}>
          {t("save")}
        </Btn>
      </ModalFooter>
    </Modal>
  );
};

export default FormAddSizeModal;