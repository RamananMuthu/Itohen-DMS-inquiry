import React, { useState, useRef, useMemo } from "react";
import {
  Form, Label, Col, Row, Input, Button, FormGroup,
  Offcanvas, OffcanvasBody, OffcanvasHeader, InputGroup, 
} from "reactstrap";
import { getLoginUserId, getLoginUserType} from '../../../Constant/LoginConstant';
import { useTranslation } from "react-i18next";
import axios from "axios";
import Swal from "sweetalert2";
import { ServerUrl } from "../../../Constant";
import JoditEditor from 'jodit-react';
import {  decode, apiencrypt, apidecrypt } from "../../../helper";
import { useSearchParams, } from "react-router-dom";
import parse from 'html-react-parser';

const AddFactoryResponseOffCanvas = ({ modal, toggle, factoriesList,currency }) => 
{
  const { t } = useTranslation();
  const editor = useRef(null); // **** Using for jodit Editor**//
  const placeholder = null;
  const [factory, setFactory] = useState('');
  const [price, setPrice] = useState('');
  const [comments, setComments] = useState('');
  const [validerrors, setValiderrors] = React.useState({});
  //const [currencySymbol, setCurrencySymbol] = useState('$');
  const [searchParams, setSearchParams] = useSearchParams();
  const [inquiryId,setInquiryId]= useState((searchParams.get("id")));
  const [inquiry_Id,setInquiry_Id]=useState(decode(searchParams.get("id")))

/****************** Validation *************************/
    const validation = (data) => {

      let validerrors = {};
      if (!factory) {
        validerrors.factory = t("selectFactory");
        // validerrors.factory = "Select Factory";
      }
      if (!price) {
        validerrors.price = t("pleaseEnterPrice");
        // validerrors.price = "Please Enter Price";
      }
      if (parse(comments).length == 0) 
      {
        validerrors.comments = t("enteryourComments");
        // validerrors.comments = "Please Enter Comments";
      }
      setValiderrors(validerrors);
      return validerrors;
    };

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

    placeholder: placeholder || 'Start typing...',
    hidePoweredByJodit: false,
  }),
    [placeholder])
  /****************** Go Back  *************************/
    const onGoBack = () => {
      setValiderrors(() => "");
      setTimeout(() => {
        window.location.href = `${process.env.PUBLIC_URL}/factoryresponse?id=`+ inquiryId;
      }, 100);
  }
/****************** Submit Data ************************/
  const submitData = () => {
    let retval = validation();
    if (Object.keys(retval).length == 0) 
    {
      var responseFactInputParams = {};
      responseFactInputParams['inquiry_id'] = inquiry_Id;
      responseFactInputParams['user_id']= getLoginUserType == "user"? getLoginUserId : getLoginStaffId;
      responseFactInputParams['user_type']= getLoginUserType;
      responseFactInputParams['factory_id'] = factory;
      responseFactInputParams['price']=price;
      responseFactInputParams['comments']=comments;
      axios.post(ServerUrl + "/save-buyer-inquiry-factory-response", apiencrypt(responseFactInputParams))
      .then((response) => {
        response.data = apidecrypt(response.data);
        if (response.data.status_code === 200) {
          Swal.fire({
            title: t("Inquiry Response Added Successfully"),
            icon: "success",
            button: t("okLabel"),
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) 
            {
               window.location.href = `${process.env.PUBLIC_URL}/factoryresponse?id=`+ inquiryId;
              // window.location.href = '/inquiry/factoryviewinquiry';
            }
          })
        }
      })
    }
  };

  return (
    <Offcanvas className="offcanvas-width" isOpen={modal} toggle={toggle} direction={"end"}  backdrop="static">
      <OffcanvasHeader className="bg-primary offcanvas-header text-center">
      {t("addFactoryResponse")}
      </OffcanvasHeader>
      <OffcanvasBody>
        <Form>
          <Row>
            <FormGroup>
              <Label style={{ color: "#5F5F5F" }}>
                {t("factory")}
              </Label>
              <sup className="font-danger">*</sup>
              <InputGroup>
                <Input
                  className=""
                  name="factory list"
                  type="select"
                  defaultValue=""
                  onChange={(e) => {setFactory(e.target.value)}}
                >
                  <option Value="" disabled>
                  {t("selectFactory")}
                  </option>
                  {factoriesList.map((resfactlist) => (
                    <option value={resfactlist.id}>{resfactlist.factory}</option>
                  ))}
                </Input>
              </InputGroup>
              {validerrors.factory && (
                  <span className="error-msg">{validerrors.factory}</span>
                )}
            </FormGroup>
          </Row>

            <Col>
              <FormGroup>
                <Label>{t("price")}</Label> (in {currency})<sup className="font-danger">*</sup>
                <Input name="price" placeholder={t("pleaseEnterPrice")}
                  // disabled={price ? true : false}
                  maxLength="20"
                  defaultValue={price}
                  onChange={(e) => setPrice(e.target.value)}>
                </Input>
                {validerrors.price && (
                  <span className="error-msg">{validerrors.price}</span>
                )}
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label className="form-label">{t("comments")}</Label><sup className="font-danger">*</sup>
                <JoditEditor
                  ref={editor}
                  value={comments}
                  config={config}
                  tabIndex={1}
                  onChange={(newContent) => setComments(newContent)}
                />
                {validerrors.comments && (
                  <span className="error-msg">{validerrors.comments}</span>
                )}
              </FormGroup>
            </Col>
        </Form>
      </OffcanvasBody>
      <OffcanvasHeader style={{ backgroundColor: '#ECF4FC' }}>
      <FormGroup className="f-right">
              <Button
                className="btn btn-primary mx-2" onClick={() => { submitData() }} >
                {t("save")}
              </Button>

              <Button className="btn-sm secondaryBtn m-r-10 f-right"
                onClick={() => onGoBack()}>
                {t("goBack")}
              </Button>
            </FormGroup>
      </OffcanvasHeader>
    </Offcanvas>
  );
};

export default AddFactoryResponseOffCanvas;
/******************Code By: RAMANAN.M *******************/
