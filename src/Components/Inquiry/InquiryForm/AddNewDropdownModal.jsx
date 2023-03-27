import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Input, Label } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { ServerUrl } from '../../../Constant';
import axios from "axios";
import Swal from "sweetalert2";


import { useTranslation } from "react-i18next";
import { encode, decode, apiencrypt, apidecrypt } from "../../../helper";

const FormAddNewModal = ({ modal, toggle, infoDetails,setInfoDetails,masterType,referenceId,setPaymentTermList,setPrintTypeList,setNoOfPlyList,setCartonEdgeFinishList,setPatternList,setPaymentTerm}) => {
  const { t } = useTranslation();

  const [payTerms, setPayTerms] = useState("");
  const [printTyp,setPrintTyp]=useState("");
  const[plyList,setPlyList]=useState("");
  const[carEdgeFin,setCarEdgeFin]=useState("");
  const[pattern,setPattern]=useState("");

  const onSaveHandle = () => {
    if (masterType === "PaymentTerms")
    {
    if (!payTerms) {
      Swal.fire({
        title: t("plsEnterPaymentTerms"),
        icon: "error",
        button: t("okLabel"),
        timer: 2500,
      });
    } else {
      axios
        .post(ServerUrl + "/add-inquiry-master-data", apiencrypt({
          type: "PaymentTerms",
          content: payTerms,
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
                    type: "PaymentTerms",
                    referenceId: referenceId}))
                  .then((response) => {
                    response.data = apidecrypt(response.data);
                    setPaymentTermList(response.data.data);
                  });
              }
            });
          }
          /* To show error if the Role is already present*/
          if (response.data.status_code === 401) {
            Swal.fire({
              title: t("paymentTermExistsAlert"),
              text: t("enterDifferentName"),
              icon: "error",
              button: t("okLabel"),
              timer: 2500,
            });
          }
        });
    }
}
else if(masterType==="PrintType"){
    if (!printTyp) {
        Swal.fire({
          title: t("plsEnterPrintType"),
          icon: "error",
          button: t("okLabel"),
          timer: 2500,
        });
      } else {
        axios
          .post(ServerUrl + "/add-inquiry-master-data", apiencrypt({
            type: "PrintType",
            content: printTyp,
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
                      type: "PrintType",
                      referenceId: referenceId}))
                    .then((response) => {
                      response.data = apidecrypt(response.data);
                      setPrintTypeList(response.data.data);
                    });
                }
              });
            }
            /* To show error if the Role is already present*/
            if (response.data.status_code === 401) {
              Swal.fire({
                title: t("printTypeExistsAlert"),
                text: t("enterDifferentName"),
                icon: "error",
                button: t("okLabel"),
                timer: 2500,
              });
            }
          });
      }
}
else if(masterType==="NoofPly"){
    if (!plyList) {
        Swal.fire({
          title: t("plsEnterNoOfPly"),
          icon: "error",
          button: t("okLabel"),
          timer: 2500,
        });
      } else {
        axios
          .post(ServerUrl + "/add-inquiry-master-data", apiencrypt({
            type: "NoofPly",
            content: plyList,
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
                      type: "NoofPly",
                      referenceId: referenceId}))
                    .then((response) => {
                      response.data = apidecrypt(response.data);
                      setNoOfPlyList(response.data.data);
                    });
                }
              });
            }
            /* To show error if the Role is already present*/
            if (response.data.status_code === 401) {
              Swal.fire({
                title: t("noOfPlyExixtsAlert"),
                text: t("enterDifferentName"),
                icon: "error",
                button: t("okLabel"),
                timer: 2500,
              });
            }
          });
      }
}
else if(masterType==="CartonEdgeFinish"){
    if (!carEdgeFin) {
        Swal.fire({
          title: t("plsEnterCartonEdgeFin"),
          icon: "error",
          button: t("okLabel"),
          timer: 2500,
        });
      } else {
        axios
          .post(ServerUrl + "/add-inquiry-master-data", apiencrypt({
            type: "CartonEdgeFinish",
            content: carEdgeFin,
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
                      type: "CartonEdgeFinish",
                      referenceId: referenceId}))
                    .then((response) => {
                      response.data = apidecrypt(response.data);
                      setCartonEdgeFinishList(response.data.data);
                    });
                }
              });
            }
            /* To show error if the Role is already present*/
            if (response.data.status_code === 401) {
              Swal.fire({
                title: t("cartonEdgeExistsAlert"),
                text: t("enterDifferentName"),
                icon: "error",
                button: t("okLabel"),
                timer: 2500,
              });
            }
          });
      }
}
else if(masterType==="Patterns"){
    if (!pattern) {
        Swal.fire({
          title: t("plsEnterPattern"),
          icon: "error",
          button: t("okLabel"),
          timer: 2500,
        });
      } else {
        axios
          .post(ServerUrl + "/add-inquiry-master-data", apiencrypt({
            type: "Patterns",
            content: pattern,
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
                      type: "Patterns",
                      referenceId: referenceId}))
                    .then((response) => {
                      response.data = apidecrypt(response.data);
                      setPatternList(response.data.data);
                    });
                }
              });
            }
            /* To show error if the Role is already present*/
            if (response.data.status_code === 401) {
              Swal.fire({
                title: t("patternExistAlert"),
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
      <ModalHeader> {masterType === "PaymentTerms" ? t("addPayTerms") : masterType==="PrintType"? t("addPrintType"):masterType==="NoofPly"? t("addNoOfPly"):masterType==="CartonEdgeFinish"? t("addCartonEdge"):masterType==="Patterns"? t("addPattern") :""}</ModalHeader>
      <ModalBody>
        <Label className="col-form-label" for="recipient-name">
        {masterType === "PaymentTerms" ? t("addPayTerms") : masterType==="PrintType"? t("addPrintType"):masterType==="NoofPly"? t("addNoOfPly"):masterType==="CartonEdgeFinish"? t("addCartonEdge"):masterType==="Patterns"? t("addPattern") :""}
        </Label>
        <Input
          className="form-control"
          type="text"
          onChange={(e) => {masterType === "PaymentTerms" ? setPayTerms(e.target.value) : masterType==="PrintType"? setPrintTyp(e.target.value):masterType==="NoofPly"? setPlyList(e.target.value):masterType==="CartonEdgeFinish"? setCarEdgeFin(e.target.value):masterType==="Patterns"? setPattern(e.target.value) :"" }}
        />
      </ModalBody>
      <ModalFooter>
        <Btn  attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}>{t("close")}</Btn>
        <Btn  attrBtn={{ color: "primary btn-sm", onClick: () => onSaveHandle() }}> {t("save")}</Btn>
      </ModalFooter>
    </Modal>
  );
};

export default FormAddNewModal;