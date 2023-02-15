import React, { Component, Fragment, useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Button,
} from "reactstrap";
import { H4, P, H5, LI } from "../../AbstractElements";
import { ServerUrl } from "../../Constant";

import dmsBg from "../../assets/images/dms/inquiryStaffLogin.png";
import dmslogtag from "../../assets/images/dms/dms-log-with-tag.png";

import Loader from "../../Layout/Loader/index";
import axios from "axios";
import Swal from "sweetalert2";
import * as ReactDOM from "react-dom";
import { Server } from "react-feather";
import { useTranslation } from 'react-i18next';
import { i18nextLng } from "../../Constant/LoginConstant";
import { apiencrypt, apidecrypt, encode } from "../../helper";

const Register = () => {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState();
  const [email, setemail] = useState();
  const [mobile_number, setmobile_number] = useState();
  const [user_type, setuser_type] = useState();
  const [ip_address, setip_address] = useState();
  const [checkbox, setcheckbox] = useState(false);
  const [msg, setmsg] = useState();
  const [country, setcountry] = useState([]);
  const [selcountry, setselcountry] = useState();
  const [language, setlanguage] = useState([]);
  const [sellanguage, setsellanguage] = useState();
  const [selworkspace_type, setselworkspace_type] = useState();
  const [workspace_type, setworkspace_type] = useState([]);
  
  const [loading, setloading] = useState(true);
  const [signupdisable, setsignupdisable] = useState(true);
  const { t,i18n } = useTranslation();
  const [selected, setSelected] = useState(i18n.language=='jp'?'jp':'en');
  localStorage.setItem("loginType", encode("user"));
//i18n.changeLanguage(i18n.language=='jp'?'jp':'en');

const inputParamsUser = {};
inputParamsUser['first_name'] = first_name;
inputParamsUser['last_name'] = last_name;
inputParamsUser['email'] = email;
inputParamsUser['user_type'] = user_type;
inputParamsUser['ip_address'] = ip_address;
inputParamsUser['countryId'] = selcountry;
inputParamsUser['language'] = sellanguage;
inputParamsUser['mobile_number'] = mobile_number;
inputParamsUser['user_type'] = selworkspace_type;

  useEffect(() => { 
    axios.get(ServerUrl.replace("/staff", "")+"/get-countries")
    .then((response)=>{
      response.data = apidecrypt(response.data)
      setcountry(response.data.data);
  
  });
    axios.get(ServerUrl.replace("/staff", "")+"/get-languages")
    .then((response)=>{
      response.data = apidecrypt(response.data)
      setlanguage(response.data.data);

  });
    axios.get(ServerUrl.replace("/staff", "")+"/workspace-type")
    .then((response) => {
      response.data = apidecrypt(response.data)
      setworkspace_type(response.data.data);
    });

    axios.get("https://ipapi.co/json/")
    .then((response) =>{
      setip_address(response.data.ip);
    });

    if( i18nextLng ){
      if(i18nextLng === 'en'){
        i18n.changeLanguage('en');
        setSelected('EN');
      }
      else{
        i18n.changeLanguage('jp');
        setSelected('JP');
      }
    }
    else {
      i18n.changeLanguage('en');
      setSelected('EN');
    }

  }, [i18nextLng])

  const [langdropdown, setLangdropdown] = useState(false);

  const [errors, setValidErrors] = useState({});
  const orderValidation = (data) => 
  {

    let errors = {};
    if (!first_name) {
       errors.first_name = t("The first name field is required.");
     } else if (!(first_name).match(/^[a-zA-Z]+$/g)) {
      errors.first_name = t("specialCharactersNumbersNotAllowed");
    }

     if (!last_name) {
      errors.last_name = t("The last name field is required.");
    } if ((last_name != null && last_name != 'null' && last_name != '')) {
      if (!(last_name).match(/^[a-zA-Z]+$/g)) {
        errors.last_name = t("specialCharactersNumbersNotAllowed");
      }
    }

    if (!email) {
      errors.email = t("The email field is required.");
    } else if( data === "The email has already been taken.") {
      errors.email = t("The email has already been taken.");
    } else if (!(email).match(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i)) {
      errors.email = t("enterValidEmailAddress");
    }

    if (!selcountry) {
      errors.selcountry = t("The country id field is required.");
    }
    if (!sellanguage) {
      errors.sellanguage = t("The language field is required.");
    } 
    if (!mobile_number) {
      errors.mobile_number = t("The mobile number field is required.");
    } else if (!/^[0-9]+$/.test(mobile_number)) {
      errors.mobile_number = ("numbersOnlyAllowed");
    } else if(((mobile_number.length != null && mobile_number.length != 'null' && mobile_number.length != '' && (parseInt(mobile_number.length) < 10 ) || (parseInt(mobile_number.length) > 15 )))) {
        errors.mobile_number = ("enter10DigitsMobileNumber");
    }
    
    if (!selworkspace_type) {
      errors.selworkspace_type = t("The user type field is required.");
    }
    setValidErrors(errors);
    return errors;
  };
  
  const changeLanguage = lng => {
      if( lng === 'EN'){
        i18n.changeLanguage('en');
        setSelected('EN');
      }  else if(lng === 'JP'){
        i18n.changeLanguage('jp');
        setSelected('JP');
      }  else if(lng === 'BD'){
        i18n.changeLanguage('bd');
        setSelected('BD');
      } else {
        i18n.changeLanguage('in');
        setSelected('IN');
      }
  };

  const LanguageSelection = (language) => {
      if (language) {
          setLangdropdown(!language);
      } else {
          setLangdropdown(!language);
      }
  };

  function hideComponent() {
    setgetOtp(false);
  }

  const TermsAndConditions = (e) =>{
    let isCheck = e.target.checked;
    if (isCheck === true){
      setcheckbox(true);
     
    }

    else{
  
      setcheckbox(false);
      Swal.fire({
        title: t("acceptTermsAndConditions"),
        icon: "error",
        button: t("okLabel"),
        confirmButtonColor: '#4E90DE',
        timer: 2500,
       });
    }
  }

  const onChangehandler = (e, key) =>{
    //const { signupData } = this.state;
    if(e.target.name === "countryId"){
      let country = e.target.value.split("||");
     // signupData[e.target.name] = country[0];
     setselcountry(country[0])
      document.getElementById("mobileCountryCode").innerHTML = country[1];
    }else{
      //signupData[e.target.name] = e.target.value;
    }
   // this.setState({ signupData});
  };

  const onSubmitHandler = (data) => 
  {
    let valErrors = orderValidation();

    if( Object.keys(valErrors).length == 0){
      axios
      .post(ServerUrl.replace("/staff", "")+"/register-user", apiencrypt(inputParamsUser))
        .then((response) =>{
            response.data = apidecrypt(response.data)
            if(response.data.status_code === 200 ){
            const email = response.data.data.email;
            const userId = response.data.data.id; 
            const langCode = response.data.data.lang_code;
              Swal.fire({
                title: first_name + " " + last_name,
                text: t("registrationCompletedSuccessfully"),
                icon: "success",
                button: t("okLabel"),
                confirmButtonColor: '#4E90DE',
                allowOutsideClick: false,
                timer: 2500,
              })
              .then((result) => {
                localStorage.setItem( "Email", encode(email));
                localStorage.setItem( "UserId", encode(userId));
                i18n.changeLanguage(response.data.language);
               // setTimeout(() => {
                window.location.href = `${process.env.PUBLIC_URL}/pricing`
             // }, 1000);    
              })
            }
            if(response.data.status_code === 400){
              setmsg(response.data.message);
              setTimeout(() => {
                setmsg("");
              }, 1000);    
            }
            if(response.data.status_code === 401){    
                let errors = {};
                if( response.data.errors.email == "The email has already been taken."){
                  orderValidation("The email has already been taken.");
                  errors.email = t("The email has already been taken.");
                }
                setmsg(response.data.message);
            
              // Swal.fire({
              //   title: 
              //     t(response.data.errors.first_name) || t(response.data.errors.last_name) || 
              //     t(response.data.errors.email) || t(response.data.errors.countryId) ||
              //     t(response.data.errors.language) ||  t(response.data.errors.mobile_number) ||
              //     t(response.data.errors.user_type), 
              //   text:t ("fieldMissing"),
              //   icon: "warning",
              //   button: t("okLabel"),
              //   confirmButtonColor: '#4E90DE' ,
              //   });
            }
        });
    }
  }

  return (
    <Fragment>
      <section>
        <Loader />
        <Container fluid={true}>
          <Row>
            <Col
              xl="9 order-1"
              style={{
                margin: "0px",
              }}
            >
              <img
                src={dmsBg}
                style={{
                  height: "100vh",
                  width: "100%",
                  position: "auto",
                  overflowY: "hidden",
                }}
              />
            </Col>

            <Col xl="3">
              <Fragment>
                <div className="login-card m-t-20">
                    <Form className="theme-form login-form"
                      onSubmit={e => e.preventDefault()}>
                        <p><img src={dmslogtag} width="150"/></p>
                        <Row className="m-t-30 m-b-15">
                        <Col xs="8" sm="8" md="8" lg="7">
                          <H4>{t("signUp")}</H4>
                        </Col>
                        <Col xs="4" sm="4" md="4" lg="5" className="f-right">
                          <div style={{ backgroundColor: '#f2f2f2', width: '100%', height: '75%'}}>
                            <LI attrLI={{ className: 'onhover-dropdown m-l-10' }}>
                                <div className={`translate_wrapper ${langdropdown ? 'active' : ''}`}>
                                    <div className="current_lang">
                                        <div className="lang d-flex" onClick={() => LanguageSelection(langdropdown)}>
                                            <i className={`flag-icon flag-icon-${(i18n.language.toLowerCase()) === 'en' ? 'us' : ''}`}></i> 
                                            <i className={`flag-icon flag-icon-${(i18n.language.toLowerCase()) === 'jp' ? 'jp' : ''}`}></i> 
                                            <i className={`flag-icon flag-icon-${(i18n.language.toLowerCase()) === 'in' ? 'in' : ''}`}></i> 
                                            <i className={`flag-icon flag-icon-${(i18n.language.toLowerCase()) === 'bd' ? 'bd' : ''}`}></i> 
                                            <span className="lang-txt m-l-10">{selected.toUpperCase()}</span>
                                            <i style={{ marginTop: '3px'}} className="fa fa-chevron-down m-l-10"></i>
                                        </div>
                                    </div>
                                    <div className={`more_lang onhover-show-div ${langdropdown ? 'active' : ''}`}>
                                        <div className="lang" id="eng" onClick={() => {changeLanguage('EN'), setValidErrors( () => "" )}}>
                                          <i className="flag-icon flag-icon-us"></i>
                                          <span className="lang-txt m-l-10">English</span>
                                        </div>
                                        <div className="lang" id="jp" onClick={() => {changeLanguage('JP'), setValidErrors( () => "" )}}>
                                          <i className="flag-icon flag-icon-jp"></i>
                                          <span className="lang-txt m-l-10">Japanese</span>
                                        </div>
                                        <div className="lang" id="jp" onClick={() => {changeLanguage('BD'), setValidErrors( () => "" )}}>
                                          <i className="flag-icon flag-icon-bd"></i>
                                          <span className="lang-txt m-l-10">Bengali</span>
                                        </div>
                                        <div className="lang" id="jp" onClick={() => {changeLanguage('IN'), setValidErrors( () => "" )}}>
                                          <i className="flag-icon flag-icon-in"></i>
                                          <span className="lang-txt m-l-10">Hindi</span>
                                        </div>
                                    </div>
                                </div>
                            </LI>
                          </div>
                        </Col>
                        </Row>
                        <FormGroup id="first_name"> 
                            <Label>{t("firstName")}
                            <sup className="font-danger">*</sup>
                            </Label>
                            <InputGroup>
                              <div className="input-group"><span className="input-group-text"><i className="icon-user"></i></span>
                                  <Input 
                                  className={`${errors.firstName && 'select-error-valid'}  form-control`}
                                  type="text" 
                                  name="first_name" 
                                  placeholder={t("firstName")}  
                                  defaultValue={first_name}
                                  onChange={(e) => setfirst_name(e.target.value)} />
                              </div>
                            </InputGroup>
                            {errors.first_name && (
                                  <span className="error-msg">{t(errors.first_name)}</span>
                            )}
                        </FormGroup>
                        <FormGroup  id="last_name">
                            <Label>{t("lastName")}
                              <sup className="font-danger">*</sup>
                            </Label>
                            <InputGroup>
                              <div className="input-group"><span className="input-group-text"><i className="icon-user"></i></span>
                                  <Input className="form-control"  name="last_name" type="text"  defaultValue={last_name}
                                      onChange={(e) => setlast_name(e.target.value)} placeholder={t("lastName")} />
                              </div>
                            </InputGroup>
                            {errors.last_name && (
                              <span className="error-msg">{t(errors.last_name)}</span>
                            )}
                        </FormGroup>
                        <FormGroup id="email">
                            <Label>{t("emailAddress")}
                             <sup className="font-danger">*</sup>
                            </Label>
                            <InputGroup>
                              <div className="input-group"><span className="input-group-text"><i className="icon-email"></i></span>
                                <Input className="form-control" type="email" name="email"  defaultValue={email}
                                onChange={(e) => setemail(e.target.value)} placeholder={t("emailAddress")} />
                              </div>
                            </InputGroup>
                            {errors.email && (
                              <span className="error-msg">{t(errors.email)}</span>
                            )}
                        </FormGroup>
                        <FormGroup id='country'>
                            <Label>{t("country")}
                            <sup className="font-danger">*</sup>
                            </Label>
                            <InputGroup>
                              <Input 
                               type="select" 
                               placeholder="Select Country"
                               className="form-control digits"  
                               defaultValue="" 
                               name="countryId"
                                  onChange={(e) => onChangehandler(e)}>
                                    <option  selected disabled>{t("selectCountry")}</option>
                                        {country.map(country => ( 
                                    <option value={country.id+"||"+country.code}>
                                    {country.name}
                                    </option>
                                  ))}
                              </Input>
                            </InputGroup>
                            {errors.selcountry && (
                              <span className="error-msg">{t(errors.selcountry)}</span>
                            )}
                        </FormGroup>
                        <FormGroup id='language'>
                            <Label>{t("language")}
                            <sup className="font-danger">*</sup>
                            </Label>
                            <InputGroup>
                              <Input type="select" placeholder={t("selectLanguage")} className="form-control digits"  defaultValue="" name="language"
                                  onChange={(e) => setsellanguage(e.target.value)}>
                                  <option  selected disabled>{t("selectLanguage")}</option>
                                  {language.map(language => (
                                  <option value={language.lang_code}>
                                  {language.name}
                                  </option>
                                  ))}
                              </Input>
                            </InputGroup>
                            {errors.sellanguage && (
                              <span className="error-msg">{t(errors.sellanguage)}</span>
                            )}
                        </FormGroup>
                        <FormGroup id="mobile"> 
                            <Label>{t("mobileNumber")}
                            <sup className="font-danger">*</sup>
                            </Label>
                            <InputGroup>
                              <div className="input-group"><span className="input-group-text"><i className="icon-mobile"></i></span>
                              <span className="input-group-text2" id="mobileCountryCode"></span>
                                  <Input 
                                  className="form-control"
                                  type="tel" 
                                  required="" 
                                  name="mobile_number" 
                                  placeholder={t("mobileNumber")}
                                  id="floatingInput" 
                                  defaultValue={mobile_number}
                                  minLength="10"
                                  maxLength="15"
                                  onChange={(e) => setmobile_number(e.target.value)} />
                              </div>
                            </InputGroup>
                            {errors.mobile_number && (
                              <span className="error-msg">{t(errors.mobile_number)}</span>
                            )}
                        </FormGroup>
                        <FormGroup id='user_type'>
                            <Label>{t("userType")}
                            <sup className="font-danger">*</sup>
                            </Label>
                            <InputGroup>
                              <Input type="select" placeholder={t("userType")} className="form-control digits"  defaultValue="" name="user_type"
                                  onChange={(e) => setselworkspace_type(e.target.value)} >
                                  <option selected disabled> {t("selectUserType")} </option>
                                      {workspace_type.map( workspace_type => (
                                        <option>
                                          {workspace_type.name}
                                        </option>
                                  ))}
                              </Input>
                            </InputGroup>
                            {errors.selworkspace_type && (
                              <span className="error-msg">{t(errors.selworkspace_type)}</span>
                            )}
                        </FormGroup>
                        <FormGroup id="ip_address">
                                <div className="form-floating mt-3">
                                  <input type="hidden" name="ip_address"
                                  className="form-control"/>
                                  <label htmlFor="ip_address" className="signupLabel"></label>
                              </div>  
                        </FormGroup>
                        
                        <div className="checkbox p-0 pl-3">
                                    <Input id="dafault-checkbox" type="checkbox" data-original-title="" title="" 
                                      checked  onChange={(e) => TermsAndConditions(e)} />
                                    <Label className="mb-0" htmlFor="dafault-checkbox" >
                                     {t("iaccept")}&nbsp;
                                      <a href="">
                                      {t("termsConditions")}
                                      </a>
                                    </Label>
                        </div>
                        <FormGroup>
                            <Button id="signUpBtn" onClick={ (e) => { onSubmitHandler("signUpBtn"); }}>{t("signUp")}</Button>                  
                        </FormGroup>
                        
                        <div className="login-social-title">
                            <H5>{t("signIn")} </H5>
                        </div>
                        
                        <P>{t("alReadyHaveAccount")} <a className="ms-2" href="adminlogin">{t("signIn")}</a></P>
                    </Form>
                </div>
              </Fragment>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Register;
