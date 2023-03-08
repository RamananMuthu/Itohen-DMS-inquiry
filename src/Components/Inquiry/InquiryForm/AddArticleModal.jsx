import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Input, Label } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { ServerUrl } from '../../../Constant';
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { encode, decode, apiencrypt, apidecrypt } from "../../../helper";

const FormAddArticalModal = ({ modal, toggle, companyId, workspaceId, article,setArticle, referenceId }) => {
  const { t } = useTranslation();

  const [articleName, setArticleName] = useState("");
  const onSaveHandle = () => {
    if (!articleName) {
      Swal.fire({
        title: t("articleName"),
        text: t("articleNameValidation"),
        icon: "error",
        button: t("okLabel"),
        timer: 2500,
      });
    } else {
      axios
        .post(ServerUrl + "/create-user-article", apiencrypt({
          company_id: companyId,
          workspace_id: workspaceId,
          name: articleName,
          referenceId: referenceId
        }))
        .then((response) => {
          response.data = apidecrypt(response.data);
          if (response.data.status_code === 200) {
            Swal.fire({
              title: t("articleAddedAlert"),
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
              setArticle('');
            });
          }
          /* To show error if the Role is already present*/
          if (response.data.status_code === 401) {
            Swal.fire({
              title: t("articleExistsAlert"),
              text: t("enterDifferentName"),
              icon: "error",
              button: t("okLabel"),
              timer: 2500,
            });
          }
        });
    }
  };
  return (
    <Modal isOpen={modal} toggle={toggle} centered>
      <ModalHeader>{t("addArticle")}</ModalHeader>
      <ModalBody>
        <Label className="col-form-label" for="recipient-name">
          {t("addArticle")}
        </Label>
        <Input
          className="form-control"
          type="text"
          onChange={(e) => setArticleName(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}>{t("close")}</Btn>
        <Btn attrBtn={{ color: "primary btn-sm", onClick: () => onSaveHandle() }}> {t("save")}</Btn>
      </ModalFooter>
    </Modal>
  );
};

export default FormAddArticalModal;