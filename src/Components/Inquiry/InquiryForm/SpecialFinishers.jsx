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

const SpecialFinishers = ({ modal, toggle,specialFinishes,setSpecialFinishes,setSpecialFinishersModal,specialFinishersModal}) =>{
  
  const {t} = useTranslation();

  const [specialFinishesedit, setSpecialFinishesedit] = useState("");
  const onSaveHandle = () => {
    setSpecialFinishes(specialFinishesedit)
    setSpecialFinishersModal(!specialFinishersModal)
  };
  const SpecialFinishesStyles = (newContent) => {
    setSpecialFinishesedit(newContent)
   
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
      'align', '|', 'ul', 'ol', '|', 'cut', 'copy', 'paste', '|', 'undo', 'redo', '|', 'dots'
    ],
    buttonsSM: [
      'Bold', 'Italic', 'underline', 'strikethrough', '|', 'brush', 'font', 'fontsize',
      'align', '|', 'ul', 'ol', '|', 'cut', 'copy', 'paste', '|', 'undo', 'redo', '|', 'dots'
    ],
    buttonsMD: [
      'Bold', 'Italic', 'underline', 'strikethrough', '|', 'brush', 'font', 'fontsize',
      'align', '|', 'ul', 'ol', '|', 'cut', 'copy', 'paste', '|', 'undo', 'redo', '|', 'dots',
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
      'paragraph', '|', 'cut', 'copy', 'paste', '|', 'link', 'table', '|', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize',
    ],
    uploader: { insertImageAsBase64URI: true },

    placeholder: placeholder || t("startTyping"),
    hidePoweredByJodit: false,
  }),
    [placeholder])
  return (
    <Modal isOpen={modal} toggle={toggle} centered>
      <ModalHeader>{t("specialFinishers")}</ModalHeader>
      <ModalBody id="htmljoditListCSS">
      <JoditEditor
                          ref={editor}
                          value={specialFinishes}
                          config={config}
                          tabIndex={1}
                          onChange={(newContent) => SpecialFinishesStyles(newContent)}
                        />
      </ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}>{t("close")}</Btn>
        <button className='btn btn-primary' onClick={()=>{onSaveHandle()}}>{t("save")}</button>
      </ModalFooter>
    </Modal>
  );
};

export default SpecialFinishers;