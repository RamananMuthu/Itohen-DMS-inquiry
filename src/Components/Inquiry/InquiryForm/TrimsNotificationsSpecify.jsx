import React, {useState,useRef,useMemo} from 'react';
import { Modal,
  ModalBody,
  ModalFooter,
  ModalHeader} from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import JoditEditor from 'jodit-react';
import {useTranslation} from "react-i18next";
const TrimsNotificationsSpecify = ({ modal, toggle,trimsNotification,setTrimsNotification,setTrimsNotificationsModal,trimsNotificationsModal}) =>{
  const {t} = useTranslation();
  const [NotificationsDescription, setNotificationsDescription] = useState("");
  const onSaveHandle = () => {
    setTrimsNotification(NotificationsDescription)
    setTrimsNotificationsModal(!trimsNotificationsModal)
  };
  const onNotificationsDescription = (newContent) => {
    setNotificationsDescription(newContent)
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
      <ModalHeader>Trims Notifications- Specify If any</ModalHeader>
      <ModalBody id="htmljoditListCSS">
      <JoditEditor
                          ref={editor}
                           value={trimsNotification}
                          config={config}
                          tabIndex={1}
                           onChange={(newContent) => onNotificationsDescription(newContent)}
                        />
      </ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}>{t("close")}</Btn>
        <button className='btn btn-primary' onClick={()=>{onSaveHandle()}}>{t("save")}</button>
      </ModalFooter>
    </Modal>
  );
};
export default TrimsNotificationsSpecify;