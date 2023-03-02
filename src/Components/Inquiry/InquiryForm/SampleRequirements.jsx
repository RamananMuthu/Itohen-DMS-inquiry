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

const SampleRequirements = ({ modal, toggle,sampleRequirement,setSampleRequirement,setSampleRequirementsModal,sampleRequirementsModal}) =>{
  
  const {t} = useTranslation();

  const [SampleRequirementsDescription, setSampleRequirementsDescription] = useState("");
  const onSaveHandle = () => {
    setSampleRequirement(SampleRequirementsDescription)
    setSampleRequirementsModal(!sampleRequirementsModal)
  };
  const onSampleRequirements = (newContent) => {
    setSampleRequirementsDescription(newContent)
   
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

    placeholder:t("startTyping"),
    hidePoweredByJodit: false,
  }),
    )
  return (
    <Modal isOpen={modal} toggle={toggle} centered style={{"max-width":"700px"}}>
      <ModalHeader>{t("SampleRequirements")}</ModalHeader>
      <ModalBody id="htmljoditListCSS">
      <JoditEditor
                          ref={editor}
                           value={sampleRequirement}
                          config={config}
                          tabIndex={1}
                           onChange={(newContent) => onSampleRequirements(newContent)}
                        />
      </ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}>{t("close")}</Btn>
        <button className='btn btn-primary' onClick={()=>{onSaveHandle()}}>{t("save")}</button>
      </ModalFooter>
    </Modal>
  );
};

export default SampleRequirements;