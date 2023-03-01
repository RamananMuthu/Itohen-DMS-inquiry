import React, { useState } from "react";
import {
  Form, Label, Col, Row, Input, Button, FormGroup,
  Offcanvas, OffcanvasBody, OffcanvasHeader,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import AddMoreModal from "./AddMoreModal";
const InquiryInfoOffCanvas = ({ modal, toggle, infoDetails,setInfoDetails, masterType, setShowInfoCanvas, showInfoCanvas,setCustomsDeclarationDoc,setMainLabel,referenceId,custDeclarationCheckboxValue, setCustDeclarationCheckboxValue,mainLabelCheckboxValue, setMainLabelCheckboxValue }) => {
  const { t } = useTranslation();
  const [modalNew, setModalNew] = useState(false);
  const toggleNew = () => setModalNew(!modalNew);
  // const [ custDeclarationCheckboxValue, setCustDeclarationCheckboxValue ] = useState([]);
  // const [ mainLabelCheckboxValue, setMainLabelCheckboxValue ] = useState([]);

/******************Save Cheched Factory************************/
  const saveChecked = (checkedData) => {
    var checkboxeschecked = [];
    if( masterType=='CustomsDeclarationDocument'){
      let a = checkedData.infoDetails;
      var content = '<ul>';
      (a).map((mapData) => {
        if( document.getElementById(mapData.id).checked){
          checkboxeschecked.push(mapData.content);
          content =  content + '<li>' + mapData.content + '</li>';
        } 
      })
      content =  content +'</ul>' ;
      setCustDeclarationCheckboxValue(checkboxeschecked);
    }
    else if(masterType=='MainLabel'){
      var checkboxeschecked = [];
      if( masterType=='MainLabel'){
        let b = checkedData.infoDetails;
        var content = '<ul>';
        (b).map((mapData) => {
          if( document.getElementById(mapData.id).checked){
            checkboxeschecked.push(mapData.content);
            content =  content + '<li>' + mapData.content + '</li>';
          } 
        })
         content =  content +'</ul>' ;
         setMainLabelCheckboxValue(checkboxeschecked);
    }
    }

    if (checkboxeschecked.length > 0) {
      if( masterType=='CustomsDeclarationDocument')
      {
      Swal.fire({
        title: t("selectedCustomsDeclarationDocument"),
        icon: "success",
        showCancelButton: true,
        button: t("okLabel"),
      }).then((result) => {
        if (result.isConfirmed) {
          setShowInfoCanvas(!showInfoCanvas);
          
          setCustomsDeclarationDoc(content);
        }
      });
    }
    else if( masterType=='MainLabel'){
      Swal.fire({
        title: t("selectedMainLabel"),
        icon: "success",
        showCancelButton: true,
        button: t("okLabel"),
      }).then((result) => {
        if (result.isConfirmed) {
          setShowInfoCanvas(!showInfoCanvas);
          setMainLabel(content);
        }
      });
    }
    } else {
      Swal.fire({
        title: t("checkAtleastOneBeforeSave"),
        icon: "warning",
        button: t("okLabel"),
        timer: 2500,
      });
    }
  };

  return (
    <Offcanvas className="offcanvas-width" isOpen={modal} toggle={toggle} direction={"end"} >
      <OffcanvasHeader className="bg-primary offcanvas-header">
        {masterType === "MainLabel" ? t("mainLabel") : masterType==="CustomsDeclarationDocument"? t("customsDeclarationDocument"):"" }
        <span className="f-right cursor-pointer"
          title={t("close")} tooltip={t("close")}
          alt={t("close")} onClick={toggle} > X
        </span>
      </OffcanvasHeader>
      <OffcanvasBody>
        <Form>
          <Row>
            <Col sm="12">
              <Row className="g-12 m-t-20">
                <Col md="12" lg="12" sm="12">
                  <Row>
                    {infoDetails.length > 0 ? (
                      infoDetails.map((info, index) => (
                        <Row>
                          <FormGroup className="m-t-15 ">
                            <div className="checkbox">
                              {
                                masterType == "CustomsDeclarationDocument" ? 
                                custDeclarationCheckboxValue.includes(info.content) ?  
                                <Input
                                 defaultChecked
                                 id={info.id}
                                 type="checkbox" name="CheckBox"
                                 value={info.content}
                                 />
                                 : 
                                 <Input
                                 id={info.id}
                                 type="checkbox" name="CheckBox"
                                 value={info.content}
                                 /> 
                                :
                                mainLabelCheckboxValue.includes(info.content) ?  
                                <Input
                                 defaultChecked
                                 id={info.id}
                                 type="checkbox" name="CheckBox"
                                 value={info.content}
                                 />
                                 : 
                                 <Input
                                 id={info.id}
                                 type="checkbox" name="CheckBox"
                                 value={info.content}
                                 /> 
                              }
                              
                              <Label for={info.id} style={{ textColor: "#4E90DE" }}>
                                {info.content}
                              </Label>
                            </div>
                          </FormGroup>
                        </Row>
                      ))
                    ) : (
                      <> <div> {t("noDataFound")} </div> </>
                    )}
                  </Row>
                </Col>
                <Col></Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </OffcanvasBody>
      <OffcanvasHeader>
        <FormGroup className="f-right m-r-20">
        <Button className="m-r-10" style={{ textAlign: "center" }}
            width="40px" height="20px"
            onClick={toggleNew}
          > {t("addMore")}
          </Button>
          <AddMoreModal 
          modal={modalNew}
          toggle={toggleNew}
          infoDetails={infoDetails}
          setInfoDetails={setInfoDetails}
          masterType={masterType}
          referenceId={referenceId}
        />
          <Button style={{ textAlign: "center" }}
            width="40px" height="20px"
            onClick={() => { saveChecked({ infoDetails }); }}
          > {t("save")}
          </Button>
        </FormGroup>
      </OffcanvasHeader>
    </Offcanvas>
  );
};

export default InquiryInfoOffCanvas;
/******************Code By: R.AKSHAYA MOL*******************/
