import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader, Input, Label
} from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { Close, SaveChanges, ServerUrl } from '../../../Constant';
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { apidecrypt, apiencrypt } from '../../../helper';

const FormAddFabricGSM = ({ modal, toggle, companyId, workspaceId, article }) => {
  const { t } = useTranslation();
  const [fabricGSM, setFabricGSM] = useState("");

  const onSaveHandle = () => {
    if (!fabricGSM) {
      Swal.fire({
        title: t("0"),
        text: t("articleNameValidation"),
        icon: "error",
        button: t("okLabel"),
      });
    } else {
      axios
        .post(ServerUrl + "/create-user-article", apiencrypt({
          company_id: companyId,
          workspace_id: workspaceId,
          name: fabricGSM,
        }))
        .then((response) => {
          response.data = apidecrypt(response.data);
          if (response.data.status_code === 200) {
            Swal.fire({
              title: t("Fabric GSM added Successfully"),
              // text: t(response.data.message),
              icon: "success",
              button: t("okLabel"),
            }).then((result) => {
              if (result.isConfirmed) {
                toggle(false);
                /* To show the new roles in the dropdown */
                axios
                  .post(ServerUrl + "/get-user-article", apiencrypt({
                    company_id: companyId,
                    workspace_id: workspaceId,
                  }))
                  .then((response) => {
                    response.data = apidecrypt(response.data);
                    article(response.data.data);
                  });
              }
            });
          }
          /* To show error if the Role is already present*/
          if (response.data.status_code === 401) {
            Swal.fire({
              title: t("Fabric GSM Already Exists"),
              text: t("enterDifferentName"),
              icon: "error",
              button: t("okLabel"),
            });
          }
        });
    }
  };
  return (
    <Modal isOpen={modal} toggle={toggle} centered>
      <ModalHeader>{t("addFabricGSM")}</ModalHeader>
      <ModalBody>
        <Label className="col-form-label" for="recipient-name"> {t("addFabricGSM")} </Label>
        <Input className="form-control" type="text"  onChange={(e) => setFabricGSM(e.target.value)} />
      </ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}>{t("close")}</Btn>
        <Btn attrBtn={{ color: "primary btn-sm", onClick: () => onSaveHandle() }}> {t("save")} </Btn>
      </ModalFooter>
    </Modal>
  );
};

export default FormAddFabricGSM;