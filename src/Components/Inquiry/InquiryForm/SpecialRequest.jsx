import React, {useState,useRef,useMemo} from 'react';
import { Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,} from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import JoditEditor from 'jodit-react';
import {useTranslation} from "react-i18next";
const SpecialRequest = ({ modal, toggle,specialRequest,setSpecialRequest,setSpecialRequestModal,specialRequestsModal}) =>{
  
  const {t} = useTranslation();
  const [SpecialRequestDescription, setSpecialRequestDescription] = useState("");
  const onSaveHandle = () => {
    setSpecialRequest(SpecialRequestDescription)
    setSpecialRequestModal(!specialRequestsModal)
  };
  const onSpecialRequest = (newContent) => {
    setSpecialRequestDescription(newContent)
   
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
      'align', '|', 'ul', 'ol', 
    ],
    buttonsSM: [
      'Bold', 'Italic', 'underline', 'strikethrough', '|', 'brush', 'font', 'fontsize',
      'align', '|', 'ul', 'ol', 
    ],
    buttonsMD: [
      'Bold', 'Italic', 'underline', 'strikethrough', '|', 'brush', 'font', 'fontsize',
      'align', '|', 'ul', 'ol', 
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
    <Modal isOpen={modal} toggle={toggle} centered style={{"max-width":"700px"}}>
      <ModalHeader>{t("specialRequestIfAny")}</ModalHeader>
      <ModalBody id="htmljoditListCSS">
      <JoditEditor
                          ref={editor}
                           value={specialRequest}
                          config={config}
                          tabIndex={1}
                           onChange={(newContent) => onSpecialRequest(newContent)}
                        />
      </ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}>{t("close")}</Btn>
        <button className='btn btn-primary' onClick={()=>{onSaveHandle()}}>{t("save")}</button>
      </ModalFooter>
    </Modal>
  );
};

export default SpecialRequest;