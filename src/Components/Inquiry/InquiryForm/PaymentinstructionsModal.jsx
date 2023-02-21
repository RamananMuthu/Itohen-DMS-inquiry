import React, {useState,useRef,useMemo} from 'react';
import { Modal,
  ModalBody,
  ModalFooter,
  ModalHeader, Input, Label } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { Close, SaveChanges, ServerUrl } from '../../../Constant';
import  axios  from "axios";
import Swal from "sweetalert2";
import JoditEditor from 'jodit-react';
import {useTranslation} from "react-i18next";
import { apidecrypt, apiencrypt } from '../../../helper';

const PaymentinstructionsModal = ({ modal, toggle,paymentinstructionsDesc,setPaymentinstructionsDesc,setpaymentinstructionsModal,paymentinstructionsModal}) =>{
  
  const {t} = useTranslation();

  const [paymentDescription, setpaymentDescription] = useState("");
  const onSaveHandle = () => {
    setPaymentinstructionsDesc(paymentDescription)
    setpaymentinstructionsModal(!paymentinstructionsModal)
  };
  const onpayment = (newContent) => {
    setpaymentDescription(newContent)
   
  };
  const editor = useRef(null); // **** Using for jodit Editor**//

  const placeholder = null;

  const config = useMemo(() => ({
    readonly: false,
    removeButtons: ['hr', 'image', 'table', 'copyformat', 'paragraph', 'eraser', 'link', 'fullsize',],
    // toolbarButtonSize:"xsmall",
    // toolbar:true,
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: true,
    toolbarSticky: true,
    enableDragAndDropFileToEditor: true,
    buttonsXS: [
      'Bold', 'Italic', 'underline', 'strikethrough', '|', 'brush', 'font', 'fontsize',
      'align', '|', 'ul', 'ol', '|', 'cut', 'copy'
    ],
    buttonsSM: [
      'Bold', 'Italic', 'underline', 'strikethrough', '|', 'brush', 'font', 'fontsize',
      'align', '|', 'ul', 'ol', '|', 'cut', 'copy'
    ],
    buttonsMD: [
      'Bold', 'Italic', 'underline', 'strikethrough', '|', 'brush', 'font', 'fontsize',
      'align', '|', 'ul', 'ol', '|', 'cut', 'copy'
    ],
    buttonsXL: [
      'Bold',
      'Italic',
      'cut',
      'copy',
      'paste',
    ],
    buttons: [
      'Bold', 'Italic', 'cut', 'copy', 'paste', 'underline', '|', 'ul', 'ol', 'outdent', 'indent', '|',
      'paragraph', '|', 'cut', 'copy', 'paste'
    ],
    uploader: { insertImageAsBase64URI: true },

    placeholder: placeholder || t("startTyping"),
    hidePoweredByJodit: false,
  }),
    [placeholder])
  return (
    <Modal isOpen={modal} toggle={toggle} centered style={{"max-width":"700px"}}>
      <ModalHeader>payment instructions</ModalHeader>
      <ModalBody  id="htmljoditListCSS">
      <JoditEditor
                          ref={editor}
                           value={paymentinstructionsDesc}
                          config={config}
                          tabIndex={1}
                           onChange={(newContent) => onpayment(newContent)}
                        />
      </ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}>{t("close")}</Btn>
        <button className='btn btn-primary' onClick={()=>{onSaveHandle()}}>{t("save")}</button>
      </ModalFooter>
    </Modal>
  );
};

export default PaymentinstructionsModal;