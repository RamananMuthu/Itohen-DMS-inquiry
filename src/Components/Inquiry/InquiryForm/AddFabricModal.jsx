import React , {useState}from 'react';
import { Modal,  ModalBody,  ModalFooter,  ModalHeader, Input, Label } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { ServerUrl } from '../../../Constant';
import  axios  from "axios";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import { encode, decode, apiencrypt, apidecrypt } from "../../../helper";

const FormAddFabricModal = ({ modal, toggle, companyId, workspaceId, fabric }) =>{  
  const {t} = useTranslation();
  const [fabricName, setFabricName] = useState("");
  const onSaveHandle = () => {
    if(!fabricName){
      Swal.fire({
        title:  t("fabricType"),
        text:  t("fabricValidation"),
        icon: "error",
        button: t("okLabel"),
        timer: 2500,
      });
    }else{
    axios
      .post(ServerUrl + "/create-user-fabric", apiencrypt({
        company_id: companyId,
        workspace_id: workspaceId,
        name: fabricName,
      }))
      .then((response) => {
        response.data = apidecrypt(response.data);
        if (response.data.status_code === 200) {
          Swal.fire({
            title: t("fabricAddedAlert"),
            // text: t(response.data.message),
            icon: "success",
            button: t("okLabel"),
          }).then((result) => {
            if (result.isConfirmed) {
              toggle(false);
              /* To show the new roles in the dropdown */
              axios
                .post(ServerUrl + "/get-user-fabric", apiencrypt({
                  company_id: companyId,
                  workspace_id: workspaceId,
                }))
                .then((response) => {
                  response.data = apidecrypt(response.data)
                  setFabricName('');
                  fabric(response.data.data);
                });
            }
          });
        }
        /* To show error if the Role is already present*/
        if (response.data.status_code === 401) {
          setFabricName('');
          Swal.fire({
            title: t("fabricType"),
            text: t(response.data.error.name),
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
      <ModalHeader>{t("addFabric")}</ModalHeader>
      <ModalBody>
        <Label className="col-form-label" for="recipient-name">
        {t("addFabric")}
        </Label>
        <Input
          className="form-control" type="text"
          onChange={(e) => setFabricName(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}> {t("close")} </Btn>
        <Btn attrBtn={{ color: "primary btn-sm", onClick: () => onSaveHandle() }}> {t("save")}</Btn>
      </ModalFooter>
    </Modal>
  );
};

export default FormAddFabricModal;