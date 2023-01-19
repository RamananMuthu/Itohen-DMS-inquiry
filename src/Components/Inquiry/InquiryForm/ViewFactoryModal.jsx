import React, {useState,useEffect, Fragment} from 'react';
import { Modal,
  ModalBody,
  ModalFooter,
  ModalHeader, Input, Label, Card, CardBody,Row,Col,Form,FormGroup, Button } from 'reactstrap';
import { ServerUrl } from '../../../Constant';
import closeIcon from "../../../assets/images/dms/icons/inquiryCloseIcon.svg";
import  axios  from "axios";
import Swal from "sweetalert2";
import AddFactory from "./AddFactoryModal";
import {useTranslation} from "react-i18next";
import { apidecrypt, apiencrypt } from '../../../helper';

const ViewFactoryModal = ({ modal, toggle, inquiryId, factory, setFactory, selectedFactoriesList}) =>{
  const {t} = useTranslation();
  const [factorymodal, setFactoryModal] = useState(false);
  
  const toggleFact = () => setFactoryModal(!factorymodal);

  function getChecked(factoryListData, ) {

      var factory_id = [];
      var checkboxes = document.querySelectorAll("input[type=checkbox]");
      const factoryListLength = factoryListData.factory.length;
      for (var i = 0; i < factoryListLength; i++)
      {
        var checkBox = checkboxes[i];
        if (checkBox.checked)
        {
          factory_id.push(checkBox.id );
        }
      }

      if( factory_id.length > 0)
      {
          apiCall(factory_id);
      } 
      else {
        Swal.fire({
          title: "Please select atleast one factory",
          icon: 'warning',
          button: "OK!",
          allowOutsideClick:false
      })
      }
  }

  const apiCall = (data) => {
    
    var apiInputParams = {};
    apiInputParams['inquiry_id'] = inquiryId ? inquiryId : "0";
    apiInputParams['factory_id'] = data ? data : "0";


    axios
    .post(ServerUrl + "/send-inquiry", apiInputParams)
    .then((response) => 
    {

      if(response.data.status_code == 200)
     { 
      // setsignupdisable(true);
      Swal.fire({
        // title: "Inquiry Sent Successfully",
        title: response.data.message,
        icon: 'success',
        button: "OK!",
        allowOutsideClick:false

    })
    
    .then((result)=>{
      if(result.isConfirmed){
         toggle(false);
      }
    }
    )
  }
    })
  }

  return (
    <>
    <Modal isOpen={modal} backdrop="static" toggle={toggle} centered className= "modelWidth" >
      <ModalHeader>
        {/* {selectedFactoriesList(factoryList)} */}
        Select Factory  
        <img 
          className="f-right" 
          style={{ backgroundColor: '#FFF', cursor: 'pointer'  }}
          src={closeIcon} 
          width="25px" 
          height="25px" 
          onClick={toggle}
        />
           
      {/* <Btn className="f-right" attrBtn={{ onClick: toggle }}></Btn> */}
      
      </ModalHeader>
      <ModalBody>
      <Form className="needs-validation" noValidate="">
        <Row>
            <Col sm ="12">
                {/* <Card> */}
                    {/* <CardBody> */}
                        <Row className="g-12 m-t-20">
                        <Col md="12" lg="12" sm="12">
                        <Row className="g-12">
                            <div className="table-responsive">
                                <table className="table shadow shadow-showcase table-bordered">
                                    <thead className='bg-primary'>
                                        <tr>
                                            <th className="centerAlign">S.No</th>
                                            <th className="centerAlign">Factory</th>
                                            <th className="centerAlign">Contact Person</th>
                                            <th className="centerAlign">Contact Number</th>
                                            <th className="centerAlign">Email</th>
                                            <th className="centerAlign">Select Factory</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                      {factory.length >0 ? 
                                      factory.map((fact,index)=>(
                                        <tr key= {fact.id} id={"factoryId"+fact.id}>
                                            { selectedFactoriesList.includes(fact.id) ?  
                                                <td scope="row" className="centerAlign" 
                                                    style={{ backgroundColor: '#EDF4FC' }}>{index+1}</td> 
                                                :
                                                <td scope="row" className="centerAlign">{index+1}</td>}
                                            { selectedFactoriesList.includes(fact.id) ? 
                                                <td className="centerAlign"
                                                    style={{ backgroundColor: '#EDF4FC' }}>{fact.factory}</td>
                                                :
                                                <td className="centerAlign">{fact.factory}</td>}
                                            { selectedFactoriesList.includes(fact.id) ? 
                                              <td className="centerAlign"
                                                  style={{ backgroundColor: '#EDF4FC' }}>{fact.contact_person}</td>
                                              :
                                              <td className="centerAlign">{fact.contact_person}</td>}
                                            { selectedFactoriesList.includes(fact.id) ?  
                                              <td className="centerAlign"
                                                  style={{ backgroundColor: '#EDF4FC' }}>{fact.contact_number}</td>
                                              :
                                              <td className="centerAlign">{fact.contact_number}</td>}
                                            { selectedFactoriesList.includes(fact.id) ? 
                                              <td className="centerAlign"
                                                  style={{ backgroundColor: '#EDF4FC' }}>{fact.contact_email}</td>
                                              :
                                              <td className="centerAlign">{fact.contact_email}</td>} 
                                              { selectedFactoriesList.includes(fact.id) ? 
                                                  <td className="centerAlign" style={{ backgroundColor: '#EDF4FC' }}>
                                                    <div className="checkbox checkbox-primary marg-min-top-10">
                                                        <Input
                                                          disabled
                                                          checked
                                                          style={{ borderColor:'#df1f26', backgroundColor: '#abcdef' }}
                                                          type="checkbox"
                                                          className="form-check-input"
                                                          name="checkBox"
                                                          value={fact.factory+fact.contact_email}
                                                          id={fact.id}
                                                        />  
                                                        <Label
                                                          for={fact.id}
                                                          className="form-label">
                                                        </Label>
                                                    </div> 
                                                  </td>
                                                :
                                                  <td className="centerAlign">
                                                    <div className="checkbox checkbox-primary marg-min-top-10">
                                                        <Input
                                                          style={{ borderColor:'#df1f26' }}
                                                          type="checkbox"
                                                          className="form-check-input"
                                                          name="checkBox"
                                                          value={fact.factory+fact.contact_email}
                                                          id={fact.id}
                                                        /> 
                                                        <Label
                                                          for={fact.id}
                                                          className="form-label">
                                                        </Label>
                                                    </div> 
                                                  </td>
                                              }
                                        </tr>
                                      )):
                                      <>
                                        <tr className="text-center"><td colSpan="6">List Factories</td></tr>
                                      </>}
                                    </tbody>
                                </table>
                            </div>
                            </Row> 
                        </Col>
                        </Row>
                    {/* </CardBody> */}
                {/* </Card> */}
            </Col>
        <Row className="m-l-5" >
        <Col className='m-t-20'>
                  <FormGroup className="f-left">
                    {/* <Button>Save and Continue</Button> */}
                    <a
                     type="button"
                      className="btn"
                      style={{ backgroundColor:'#4E90DE',color:"#FFFFFF" }}
                      onClick={toggleFact}>
                      Add New Factory</a>
                  </FormGroup>
    
          <FormGroup className="f-right" >
            {/* <Button>Save and Continue</Button> */}
            <a
              // type="button"
              // disabled={!signupdisable}
              className="btn m-l-5"
              style={{ backgroundColor:'#4E90DE',color:"#FFFFFF" }}
              onClick={(e) => {
                getChecked({factory})}}
            >
              Send 
            </a>
          </FormGroup>
          </Col>
        </Row>
        </Row>
        {/* <Row className="g-12">
        <Col>
                 
                  <FormGroup className="f-left">
                   
                    <a
                      className="btn btn-primary"
                      onClick={toggleFact}
                    >
                      Add New Factory</a>
                  </FormGroup>
                </Col>
        <Col>
                 
                  <FormGroup className="f-right">
                   
                    <a
                      className="btn btn-primary"
                      onClick={(e) => getChecked(factory)}
                    >
                      Send</a>
                  </FormGroup>
                </Col>
        </Row> */}
        </Form>
        
      </ModalBody>
         
      {/* <ModalFooter>
        <Btn attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}>{t("close")}</Btn>
        <Btn attrBtn={{ color: "primary btn-sm", onClick: () => onSaveHandle() }}>
          {t("save")}
        </Btn>
      </ModalFooter> */}
    </Modal>
    <AddFactory 
    setFactoryModal={setFactoryModal}
    modal ={factorymodal}
    toggle ={toggleFact}
    factory ={setFactory}/>
    </>
    
  );
};

export default ViewFactoryModal;