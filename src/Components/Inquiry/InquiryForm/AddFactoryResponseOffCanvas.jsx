import React, { useState, useRef, useMemo } from "react";
import {
  Form, Label, Col, Row, Input, Button, FormGroup,
  Offcanvas, OffcanvasBody, OffcanvasHeader, InputGroup, 
} from "reactstrap";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import CKEditors from 'react-ckeditor-component';
import JoditEditor from 'jodit-react';
import { useSearchParams, } from "react-router-dom";
import parse from 'html-react-parser';

const AddFactoryResponseOffCanvas = ({ modal, toggle, factoriesList }) => 
{
  const { t } = useTranslation();
  const editor = useRef(null); // **** Using for jodit Editor**//
  const placeholder = null;
  const [factory, setFactory] = useState('');
  const [price, setPrice] = useState('');
  const [comments, setComments] = useState('');
  const [validerrors, setValiderrors] = React.useState({});
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [searchParams, setSearchParams] = useSearchParams();
  const [inquiryId,setInquiryId]= useState((searchParams.get("id")));


/****************** Validation *************************/
    const validation = (data) => {

      let validerrors = {};
      if (!factory) {
        validerrors.factory = "Select Factory";
      }
      if (!price) {
        validerrors.price = "Please Enter Price";
      }
      // if (parse(comments).key == null) 
      // {
      //   validerrors.comments = "Please Enter Comments";
      // }
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

    }
  };

  return (
    <Offcanvas className="offcanvas-width" isOpen={modal} toggle={toggle} direction={"end"} >
      <OffcanvasHeader className="bg-primary offcanvas-header text-center">
          Add Factory Response
      </OffcanvasHeader>
      <OffcanvasBody>
        <Form>
          <Row>
            <FormGroup>
              <Label style={{ color: "#5F5F5F" }}>
                Factory
              </Label>
              <sup className="font-danger">*</sup>
              <InputGroup>
                <Input
                  className=""
                  name="article"
                  type="select"
                  defaultValue=""
                  onChange={(e) => {setFactory(e.target.value)}}
                >
                  <option Value="" disabled>
                    Select Factory
                  </option>
                  {factoriesList.map((article) => (
                    <option value={factoriesList.id}>{factoriesList.name}</option>
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
                <Label>{t("price")}</Label> (in {currencySymbol})<sup className="font-danger">*</sup>
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
                  // value={paymentTerm}
                  // config={config}
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
                {t("sentQuote")}
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
