import React, { Component, Fragment, useState, useEffect } from 'react';
import { Col, Container, Row, Form, FormGroup, Input, Label, Button, InputGroup } from 'reactstrap';
import { H4, P, H5, LI } from '../../AbstractElements';
import { ServerUrl } from '../../Constant';
import { Link } from 'react-router-dom';

import dmsBg from "../../assets/images/dms/inquiryStaffLogin.png";
import dmslogtag from "../../assets/images/dms/dms-log-with-tag.png";

import Loader from "../../Layout/Loader/index";
import axios from "axios";
import Swal from 'sweetalert2';
import * as  ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import { i18nextLng } from "../../Constant/LoginConstant";
import { apiencrypt, apidecrypt, encode } from "../../helper";

const StaffLogin = () => {
    const [assignotp, setassignotp] = useState();
    const [email, setemail] = useState();
    const [msg, setmsg] = useState();
    const [getOtp, setgetOtp] = useState(true);
    const [loading, setloading] = useState(true);
    const [signupdisable, setsignupdisable] = useState(true);
    const [emailDisable, setEmailDisable] = useState(false);
    const { t, i18n } = useTranslation();

   // localStorage.setItem("loginType", "staff");
    //i18n.changeLanguage(i18n.language=='jp'?'jp':'en');

    const [langdropdown, setLangdropdown] = useState(false);
    const [emailError, setEmailValidError] = useState({});
    const [otpError, setOtpValidError] = useState({});
    const [selected, setSelected] = useState(i18n.language=='jp'?'jp':'en');
    
    const emailValidation = (data) => 
    {

      let emailError = {};
    
      if (!email) {
        emailError.email = t("The email field is required.");
      } else if (!(email).match(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i)) {
        emailError.email = t("enterValidEmailAddress");
      } else if( data == "Contact your DMS ADMIN for Login") {
        emailError.email = t("contactYourDMSAdmin");
      } 
      setEmailValidError(emailError);
      setloading(true);
      return emailError;
    };

    const otpValidation = (data) => {
      let otpError = {};
        if (!assignotp || data === "The OTP Field is Required.") {
          otpError.assignotp = t("The otp field is required.");
        } 
        else if (!(assignotp).match(/^[0-9]+$/g)) {
            otpError.assignotp = t("numbersOnlyAllowed");
        }
       else if( data === "Incorrect OTP, Please Enter Correctly"){
        otpError.assignotp = t("inCorrectOtp");
      }
      setOtpValidError(otpError);
      setloading(true);
      return otpError;
    };

    const changeLanguage = lng => {
        if( lng === 'EN'){
          i18n.changeLanguage('en');
          setSelected('EN');
        }
        else{
          i18n.changeLanguage('jp');
          setSelected('JP');
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

    const fetchData = async () => {
        try {
           await axios.get("https://ipapi.co/json/")
           .then((response) =>
    {
    if( i18nextLng || i18nextLng !== '' )
    {
      if( i18nextLng === 'en'){
        i18n.changeLanguage('en');
        setSelected('EN');
      }
      else{
        i18n.changeLanguage('jp');
        setSelected('JP');
      }
    }
    else {
      if(response.data.country_code === "JP"){
        i18n.changeLanguage('jp');
        setSelected('JP');
      }
      else {
        i18n.changeLanguage('en');
        setSelected('EN');
      }
    }
     });
    // console.log("response.data.country_code==>",response.data.country_code);
        } catch (error) {
         // console.error(error); // You might send an exception to your error tracker like AppSignal
         // return error;
        }
      };
  
    useEffect(() => {

        fetchData();
         // console.log("fetchData==>",fetchData);
        // axios.get("https://ipapi.co/json/")
        // .then((response) =>
        // {
        // if( i18nextLng || i18nextLng !== '' )
        // {
        //   if( i18nextLng === 'en'){
        //     i18n.changeLanguage('en');
        //     setSelected('EN');
        //   }
        //   else{
        //     i18n.changeLanguage('jp');
        //     setSelected('JP');
        //   }
        // }
        // else {
        //   if(response.data.country_code === "JP"){
        //     i18n.changeLanguage('jp');
        //     setSelected('JP');
        //   }
        //   else {
        //     i18n.changeLanguage('en');
        //     setSelected('EN');
        //   }
        // }
        //  });
      }, [i18nextLng])

    /**************** For "GET OTP" =>  Values of 'Email' API (POST) *************************/
    const onGetOtpHandler = () => {
        setloading(false);
        let emailValError = emailValidation();
        if(Object.keys(emailValError).length == 0){
            axios
            .post(ServerUrl.replace("/staff", "") + "/staff-get-otp",apiencrypt({
                email: email,
            }))
            .then((response) => {
                response.data = apidecrypt(response.data)
                /*****************.... OTP sent Successfully  .... ********************/
                if (response.data.status_code === 200) {
                    Swal.fire({
                        position: 'top-middle',
                        icon: 'success',
                        title: t("otpMailSent"),
                        showConfirmButton: false,
                        timer: 1700
                    })
                    hideComponent();
                    setEmailDisable(true);
                }
                /*****************.... Email field is required  .... *****************/
                else if (response.data.status_code === 401) {
                    // Swal.fire({
                    //     title: response.data.validation_error.email,
                    //     icon: "warning",
                    //     button: t("okLabel"),
                    //     confirmButtonColor: '#4E90DE',
                    // });
                    // setloading(true);
                }

                /*****************....  User not found  .... *************************/
                else if (response.data.status_code === 400) {
                    // console.log("response.data.message", response.data.message);
                    emailValidation(response.data.message);

                    // Swal.fire({
                    //     title: t("contactYourDMSAdmin"),
                    //     icon: "error",
                    //     button: t("okLabel"),
                    //     confirmButtonColor: '#4E90DE',
                    // });
                    // setloading(true);
                }
            })
        }
    }

    /**************** For "LOGIN" =>  Values of 'Email'and 'OTP'  API (POST) *******************/
    const onLoginHandler = () => {

        let otpValError = otpValidation(); 
        if(Object.keys(otpValError).length == 0){
        setsignupdisable(false);
        axios
            .post(ServerUrl.replace("/staff", "") + "/staff-verify-otp", apiencrypt({
                email: email,
                otp: assignotp,
            }))
            .then((response) => {
                response.data = apidecrypt(response.data)
                if (response.data.status_code === 200) {

                    Swal.fire({
                        title: t("otpVerified"),
                        icon: "success",
                        button: t("okLabel"),
                        confirmButtonColor: '#4E90DE',
                        allowOutsideClick: false,
                        timer: 2000,
                    })
                        .then((result) => {
                            // if(result.isConfirmed){
                            // let staff = "Staff"
                            localStorage.clear();
                            localStorage.setItem("apiToken", response.data.token);
                            localStorage.setItem("companyId", encode(response.data.company_id));
                            localStorage.setItem("userId", response.data.user_id > 0 ? encode(response.data.user_id) : 0);
                            localStorage.setItem("staffId", encode(response.data.staff_id));
                            localStorage.setItem("firstLoginStaffId", encode(response.data.staff_id));
                            localStorage.setItem("userName", encode(response.data.user_name));
                            localStorage.setItem("loginType", encode('staff'));
                            localStorage.setItem("workspaceId", encode(response.data.workspace_id));
                            localStorage.setItem("workspaceName", encode(response.data.workspaceName));
                            localStorage.setItem("workspaceType", encode(response.data.workspaceType));
                            localStorage.setItem("roleId", encode(response.data.roleId));
                            localStorage.setItem("role", encode(response.data.role));
                            localStorage.setItem("permissions", encode(response.data.permissions));
                            localStorage.setItem("staff", encode("Staff"));
                            localStorage.setItem("workspaces", apiencrypt(JSON.stringify(response.data.workspacesList)));
                            localStorage.setItem("modules", encode(response.data.module));
                            localStorage.setItem("language", encode(response.data.language));

                            if (response.data.dateformat != '' && response.data.dateformat != null) {
                                localStorage.setItem("dateFormat", encode(response.data.dateformat));
                            } else {
                                localStorage.setItem("dateFormat", '');
                            }

                            i18n.changeLanguage(response.data.language);
                            setTimeout(() => {
                                if (response.data.company_id !== 'null') {
                                    response.data.workspaceType == "Factory" ? 
                                        window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry` : 
                                        window.location.href = `${process.env.PUBLIC_URL}/viewinquiry` 
                                } else {
                                    window.location.href = `${process.env.PUBLIC_URL}/companysetting` 
                                }
                            }, 100);
                            //  }
                        })


                } else if (response.data.status_code === 401) {
                    otpValidation(response.data.validation_error.otp);
                    // Swal.fire({
                    //     title: t(response.data.validation_error.otp),
                    //     icon: "error",
                    //     button: t("okLabel"),
                    // })
                    setsignupdisable(true);
                }
                else if (response.data.status_code === 400) {
                    otpValidation(response.data.message);
                    // Swal.fire({
                    //     title: t("inCorrectOtp"),
                    //     icon: "error",
                    //     button: t("okLabel"),
                    // })
                    setsignupdisable(true);
                }
                /*****************....  Plan Expired  .... *************************/
                else if (response.data.status_code === 600) {
                    Swal.fire({
                        title: t(response.data.message),
                        icon: "error",
                        button: t("okLabel"),
                        confirmButtonColor: '#4E90DE',
                    });
                    setloading(true);
                    setTimeout(() => {
                            window.location.href = `${process.env.PUBLIC_URL}/stafflogin` 
                            // window.location.href = '/stafflogin';
                    }, 100);
                }
            })
        }
    }
    const handleKeypressemail = e => {
  
        if (e.charCode === 13) {
          onGetOtpHandler();
          e.preventDefault();
        }
      
      
      }
      const handleKeypress = e => {
        //console.log('vvvv',e.charCode);
        if (e.charCode === 13) {
        onLoginHandler();
        e.preventDefault();
      }
    };
    return (
        <Fragment>
            <section>
                <Loader />
                <Container fluid={true} >
                    <Row >
                        <Col xl="9 order-1"
                            style={{
                                margin: '0px',
                            }}>
                            <img src={dmsBg}
                                style={{
                                    height: '100vh',
                                    width: '100%',
                                    position: 'auto',
                                    overflowY: 'hidden',
                                }} />
                        </Col>

                        <Col xl="3">
                            <Fragment>
                                <div className="login-card">
                                    <Form className="theme-form login-form" onSubmit={e => e.preventDefault()}>
                                        <p><img src={dmslogtag} width="150" /></p>
                                        <p>&nbsp;</p>
                                        <div>
                                            <Row>
                                                <Col xs="8" sm="8" md="8" lg="8">
                                                    <H4>{t("login")}</H4>
                                                </Col>
                                                <Col xs="4" sm="4" md="4" lg="4" className="f-right">
                                                <div style={{ backgroundColor: '#f2f2f2', width: '100%', height: '75%'}}>
                                                <LI attrLI={{ className: 'onhover-dropdown m-l-10' }}>
                                                    <div className={`translate_wrapper ${langdropdown ? 'active' : ''}`}>
                                                        <div className="current_lang">
                                                            <div className="lang d-flex" onClick={() => LanguageSelection(langdropdown)}>
                                                                <i className={`flag-icon flag-icon-${i18n.language.toLowerCase() === 'en' ? 'us' : selected.toLowerCase() === 'jp' ? 'jp' : 'us'}`}></i> 
                                                                <span className="lang-txt m-l-10">{selected.toUpperCase()}</span>
                                                                <i style={{ marginTop: '3px'}} className="fa fa-chevron-down m-l-10"></i>
                                                            </div>
                                                        </div>
                                                        <div className={`more_lang onhover-show-div ${langdropdown ? 'active' : ''}`}>
                                                            <div className="lang" onClick={() => {changeLanguage('EN'), setEmailValidError( () => "" ), setOtpValidError( () => "")}}>
                                                                <i className="flag-icon flag-icon-us"></i>
                                                                <span className="lang-txt m-l-10">English</span>
                                                            </div>
                                                            <div className="lang" onClick={() => {changeLanguage('JP'), setEmailValidError( () => "" ), setOtpValidError( () => "")}}>
                                                                <i className="flag-icon flag-icon-jp"></i>
                                                                <span className="lang-txt m-l-10">Japanese</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </LI>
                                                </div>
                                                </Col>
                                            </Row>
                                        </div>

                                        <FormGroup id="email">
                                        <Label>{t("emailAddress")}
                                                <sup className="font-danger">*</sup>
                                        </Label>
                                        <InputGroup>
                                            <div className="input-group"><span className="input-group-text"><i className="icon-email"></i></span>
                                                <Input 
                                                disabled={emailDisable}
                                                className="form-control" 
                                                name="email" 
                                                type="email" 
                                                required="" 
                                                placeholder={t("emailAddress")}
                                                onChange={(e) => setemail(e.target.value)}
                                                onKeyPress={handleKeypressemail}
                                                 />
                                            </div>
                                        </InputGroup>
                                        {emailError.email && (
                                            <span className="error-msg">{t(emailError.email)}</span>
                                        )}   
                                        </FormGroup>

                                        {getOtp &&
                                            <FormGroup>
                                                <Button id="getOtp" disabled={!loading}
                                                    onClick={() => { onGetOtpHandler(); }}>{!loading ? t("loading") : t("getOTP")}</Button>
                                            </FormGroup>
                                        }
                                        <FormGroup id="getOtpBtn"></FormGroup>
                                        {!getOtp && (
                                            <>
                                                <FormGroup>
                                                    <Label for="otp">{t("otp")}</Label>
                                                    <InputGroup>
                                                        <div className="input-group">
                                                            <span className="input-group-text">
                                                                <i className="icon-mobile"></i>
                                                            </span>
                                                            <Input
                                                                maxLength="6"
                                                                className="form-control"
                                                                type="tel"
                                                                name="otp"
                                                                onKeyPress={handleKeypress}
                                                                onChange={(e) => setassignotp(e.target.value)}
                                                                placeholder={t("otp")}
                                                            />
                                                        </div>
                                                    </InputGroup>
                                                    {otpError.assignotp && (
                                                        <span className="error-msg">{t(otpError.assignotp)}</span>
                                                    )}
                                                </FormGroup>

                                                <FormGroup>
                                                    <Button
                                                        disabled={!signupdisable}
                                                        onClick={() => {
                                                            onLoginHandler();
                                                        }}
                                                    >
                                                        {!signupdisable ? t("loading") : t("signIn")}
                                                    </Button>
                                                </FormGroup>
                                            </>
                                        )}
                                        <FormGroup id="loader"></FormGroup>

                                        <P >{t("dontHaveAccount")}<a className="ms-2" href="register">{t("createAdminAccount")}</a></P>
                                        <P >&nbsp;</P>

                                        {/* <div className="login-social-title">
                                        <H5>or Login With</H5>
                                    </div>
                                    
                                  

                                     <FormGroup className='f-right'>
                                        <Col md="12" sm="12">
                                     <Link 
                to={`${process.env.PUBLIC_URL}/userlogin`}
                 
                 className="btn-pill btn btn-outline-primary btn-md mb-3" ><i className="fa fa-user"></i>&nbsp;&nbsp;
                 Admin</Link>
                 </Col>
                                    </FormGroup>  */}
                                    </Form>
                                </div>
                            </Fragment>
                        </Col>

                    </Row>
                </Container>
            </section>
        </Fragment>
    );

}


export default StaffLogin;