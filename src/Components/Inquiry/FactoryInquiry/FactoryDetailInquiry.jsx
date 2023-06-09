import React, { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { Container, Row, Col, CardBody, Card, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Breadcrumbs, H6 } from "../../../AbstractElements";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Swal from "sweetalert2";
import {
  getLoginCompanyId, getWorkspaceId, getLoginUserId, getWorkspaceType, getLoginUserType,
  getStaff, getLoginStaffId, getStaffPermission
} from '../../../Constant/LoginConstant';
import { ServerUrl } from "../../../Constant";
import { getColorSizeQtyInquiry, decode, apiencrypt, apidecrypt, PHPtoJSFormatConversion } from "../../../helper";
import parse from 'html-react-parser';
import { useSearchParams, } from "react-router-dom";
import JoditEditor from 'jodit-react';

// Showing the factory inquiry Details
const FactoryDetailInquiry = () => {
  var getInputParams = {};
  const editor = useRef(null); // **** Using for jodit Editor**//
  const [searchParams, setSearchParams] = useSearchParams();
  const [inquiry_id, setOrderId] = useState(decode(searchParams.get("id")));
  getInputParams['company_id'] = getLoginCompanyId;
  getInputParams['workspace_id'] = getWorkspaceId;
  getInputParams['factory_id'] = getLoginUserId;
  getInputParams['inquiry_id'] = inquiry_id;
  getInputParams["user_id"] = getLoginUserId;
  const [factoryInquiryDetails, setFactoryInquiryDetails] = useState([]);
  const [getColor, setGetColor] = React.useState([]);
  const [getSize, setGetSize] = React.useState([]);
  const [measurementSheet, setMeasurementSheet] = useState([]);
  const [sampleFormatImage, setSampleFormat] = useState([]);
  const [printImage, setPrintImage] = useState([]);
  const [mainLableImage, setMainLable] = useState([]);
  const [washCareLableImage, setWashCareLable] = useState([]);
  const [hangtagImage, setHangtag] = useState([]);
  const [barcodeStickersImage, setBarcodeStickers] = useState([]);
  const [cartonImage, setCartonImage] = useState([]);
  const [polybagImage, setPolybagImage] = useState([]);
  const [awsUrl, setAwsUrl] = useState();
  const [price, setPrice] = useState('');
  const [comments, setComments] = useState('');
  const [validerrors, setValiderrors] = React.useState({});
  const [sampleRequirementsHtmlString, setHtmlString] = useState('');
  const [specialRequesHtmlString, setSpecialRequesHtmlString] = useState('');
  const [forbiddenSubstanceHtmlString, setForbiddenSubstanceHtmlString] = useState('');
  const [testingRequirementsHtmlString, setTestingRequirementsHtmlString] = useState('');
  const [specialFinishHtmlString, setSpecialFinishHtmlString] = useState('');
  const [styleArticleDescriptionHtmlString, setStyleArticleDescriptionHtmlString] = useState('');
  const [paymentTermsHtmlString, setPaymentTermsHtmlString] = useState('');
  const [trimsNotificationsHtmlString, setTrimsNotificationsHtmlString] = useState('');
  const [orderskuDetails, setOrderskuDetails] = React.useState([]);
  const [inquiryResponse, setInquiryResponse] = React.useState([]);
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [measurementSheetList, setMeasurementSheetList] = React.useState([]);
  const [paymentInstructionsHtmlString, setPaymentInstructionsHtmlString] = useState('');
  const { t } = useTranslation();
  var measurementSheetData = [];
  var sampleFormatData = [];
  var printImageData = [];
  var washCareData = [];
  var mainLableData = [];
  var hangtagData = [];
  var barcodeStickersData = [];
  var cartonData = [];
  var polybagData = [];
  const placeholder = null;
  const onGoBack = () => {
    setTimeout(() => {
      window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry`
      // window.location.href = '/inquiry/factoryviewinquiry';
    }, 100);
  }

  const apiCall = () => {
    axios
      .post(ServerUrl + "/inquiry-details", apiencrypt(getInputParams))
      .then((response) => {
        response.data = apidecrypt(response.data);
        setFactoryInquiryDetails(response.data.data[0]);
        setPaymentInstructionsHtmlString(parse(response.data.data[0].payment_instructions));
        setSpecialFinishHtmlString(parse(response.data.data[0].special_finish));
        setSpecialRequesHtmlString(parse(response.data.data[0].sample_requirements));
        setForbiddenSubstanceHtmlString(parse(response.data.data[0].forbidden_substance_info));
        setHtmlString(parse(response.data.data[0].special_requests));
        setTestingRequirementsHtmlString(parse(response.data.data[0].testing_requirements));
        setStyleArticleDescriptionHtmlString(parse(response.data.data[0].style_article_description));
        setTrimsNotificationsHtmlString(parse(response.data.data[0].trims_nominations));
        setPaymentTermsHtmlString(parse(response.data.data[0].payment_terms));
        setCurrencySymbol(response.data.data[0].currency);
        setMeasurementSheetList(JSON.parse(response.data.data[0].measurement_sheet));
      })

    axios
      .post(ServerUrl + "/factory-inquiry-response", apiencrypt(getInputParams))
      .then((response) => {
        response.data = apidecrypt(response.data);
        setInquiryResponse(response.data.data[0] ? response.data.data[0] : "");
        setPrice(response.data.data[0].price ? (response.data.data[0].price) : "");
        setComments(response.data.data[0].comments ? response.data.data[0].comments : "");
      })

    axios
      .post(ServerUrl + "/inquiry-media", apiencrypt(getInputParams))
      .then((response) => {
        response.data = apidecrypt(response.data);
        (response.data.data.files).map((mapData) => {
          if (mapData.media_type == "MeasurementSheet") {
            var getMeasurementDetails = {
              filepath : mapData.filepath,
              filename : mapData.orginalfilename,
             };
            measurementSheetData.push(getMeasurementDetails);
            setMeasurementSheet(measurementSheetData)
            setAwsUrl(response.data.data.serverURL)
            
          }
          // Check the media type for showing the Image
          if (mapData.media_type == "SampleFormat") {
            var getDetails = mapData.filepath;
            sampleFormatData.push(getDetails);
            setSampleFormat(sampleFormatData)
            setAwsUrl(response.data.data.serverURL)
          }
          if (mapData.media_type == "PrintImage") {
            var getDetails = mapData.filepath;
            printImageData.push(getDetails);
            setPrintImage(printImageData)
            setAwsUrl(response.data.data.serverURL)
          }
          if (mapData.media_type == "MainLabel") {
            var getDetails = mapData.filepath;
            mainLableData.push(getDetails);
            setMainLable(mainLableData)
            setAwsUrl(response.data.data.serverURL)
          }
          if (mapData.media_type == "WashCareLabel") {
            var getDetails = mapData.filepath;
            washCareData.push(getDetails);
            setWashCareLable(washCareData)
            setAwsUrl(response.data.data.serverURL)
          }
          if (mapData.media_type == "Hangtag") {
            var getDetails = mapData.filepath;
            hangtagData.push(getDetails);
            setHangtag(hangtagData)
            setAwsUrl(response.data.data.serverURL)
          }
          if (mapData.media_type == "BarcodeStickers") {
            var getDetails = mapData.filepath;
            barcodeStickersData.push(getDetails);
            setBarcodeStickers(barcodeStickersData)
            setAwsUrl(response.data.data.serverURL)
          }
          if (mapData.media_type == "Polybag") {
            var getDetails = mapData.filepath;
            polybagData.push(getDetails);
            setPolybagImage(polybagData)
            setAwsUrl(response.data.data.serverURL)
          }
          if (mapData.media_type == "Carton") {
            var getDetails = mapData.filepath;
            cartonData.push(getDetails);
            setCartonImage(cartonData)
            setAwsUrl(response.data.data.serverURL)
          }
        })
      })

    // ********** API call for SKU Quantity Ratio ************
    axios
      .post(ServerUrl + "/inquiry-sku", apiencrypt(getInputParams))
      .then((response) => {
        response.data = apidecrypt(response.data);
        setOrderskuDetails(response.data.data.sku);
        setGetColor(response.data.data.colors);
        setGetSize(response.data.data.sizes);
      })
    setValiderrors(() => "");
  };

  useEffect(() => {
    {
      getLoginUserType == "user" ? (getWorkspaceType == "Factory") ?
        apiCall() : window.location.href = `${process.env.PUBLIC_URL}/viewinquiry`
      // window.location.href='/inquiry/viewinquiry'
      :
      (getStaff === "Staff" && getWorkspaceType == "Factory") ?
        (getStaffPermission.includes("View Factory Inquiry")) ?
          apiCall() : window.location.href = `${process.env.PUBLIC_URL}/inquirycontacts`
        //  window.location.href='/inquiry/inquirycontacts'
        :
        (getStaffPermission.includes("View Inquiry")) ?
          window.location.href = `${process.env.PUBLIC_URL}/viewinquiry`
          // window.location.href='/inquiry/viewinquiry' 
          :
          window.location.href = `${process.env.PUBLIC_URL}/feedbackform`
      // window.location.href='/inquiry/feedbackform' 
    }

  }, []);

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
  // ********* POST API call for Submit the Quotes value **********
  const submitFactoryInquiryForm = (e) => {
    let retval = validation();
    if (Object.keys(retval).length == 0) {
      var inquiryFormInputParams = {};
      inquiryFormInputParams['company_id'] = getLoginCompanyId;
      inquiryFormInputParams['workspace_id'] = getWorkspaceId;
      inquiryFormInputParams['inquiry_id'] = inquiry_id;
      inquiryFormInputParams['factory_id'] = getLoginUserId;
      inquiryFormInputParams['price'] = price;
      inquiryFormInputParams['comments'] = comments;
      inquiryFormInputParams['user_id'] = getLoginUserType == "user" ? getLoginUserId : getLoginStaffId;
      inquiryFormInputParams['user_type'] = getLoginUserType;

      axios.post(ServerUrl + "/save-inquiry-factory-response", apiencrypt(inquiryFormInputParams))
        .then((response) => {
          response.data = apidecrypt(response.data);
          if (response.data.status_code === 200) {
            Swal.fire({
              title: t("Inquiry Response Added Successfully"),
              icon: "success",
              button: t("okLabel"),
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry`
                // window.location.href = '/inquiry/factoryviewinquiry';
              }
            })
          }
          if (response.data.status_code === 401) {
            Swal.fire({
              title: t(response.data.errors.price),
              text: t("fieldMissing"),
              icon: "Warning",
              button: t("tryAgain"),
              timer: 2500,
            });
          }
        })
    }
  }

  const onChangeCommentsRequest = (e) => {
    const newContent = e.editor.getData();
    setComments(newContent);
  };

  const validation = (data) => {
    let validerrors = {};
    if (!price.trim()) {
      validerrors.price = t("pleaseEnterPrice");
    }
    if (!comments.trim()) {
      validerrors.comments = t("enteryourComments");
    }
    setValiderrors(validerrors);
    return validerrors
  }

  return (
    <Fragment>
      <Row className="pgbgcolor">
        <Breadcrumbs mainTitle={t("factoryDetailInquiry")} parent={t("factoryDetailInquiry")}
          title={t("factoryDetailInquiry")} subTitle={t("factoryDetailInquiry")} />
      </Row>

      <Container fluid={true} className="general-widget topaln">
        <Row>
          <Col id="htmljoditListCSS" sm="12">
            <Card>
              <CardBody>
                <Row className="g-12 m-t-20">
                  <Col md="12" lg="12" sm="12">
                    <Row className="g-12">
                      <div className="table-responsive">
                        <table className="table shadow shadow-showcase table-striped table-bordered">
                          <thead className="bg-primary">
                            <tr>
                              <th className="centerAlign" colSpan={2}> {t("factoryDetails")} </th>
                            </tr>
                          </thead>
                          <tbody id="htmljoditListCSS">
                            <tr>
                              {factoryInquiryDetails.article_name ?
                                <>
                                  <td className="">{t("articleName")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.article_name} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.style_no ?
                                <>
                                  <td className="">{t("styleNo")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.style_no} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              <td className="">{t("sampleFormat")}  </td>
                              <td className="text-left">
                                {sampleFormatImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("sampleFormat")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr>
                            <tr>
                              {factoryInquiryDetails.fabric_type ?
                                <>
                                  <td className="">{t("fabricType")}</td>
                                  <td className="text-left"> {factoryInquiryDetails.fabric_type} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.fabric_composition ?
                                <>
                                  <td className="">{t("fabricComposition")} </td>
                                  <td className="text-left"> {factoryInquiryDetails.fabric_composition} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.fabric_GSM ?
                                <>
                                  <td className="">{t("fabricGSM")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.fabric_GSM} {"GSM"} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.yarn_count ?
                                <>
                                  <td className="">{t("yarnCount")}  </td>
                                  <td className="text-left"> {"Ne"} {factoryInquiryDetails.yarn_count} {"Count"} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.target_price ?
                                <>
                                  <td className="">{t("targetPrice")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.currency} {factoryInquiryDetails.target_price} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.income_terms ?
                                <>
                                  <td className="">{t("incomeTerms")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.income_terms} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.payment_instructions ?
                                <>
                                  <td className="">{t("paymentinstructions")}  </td>
                                  <td className="text-left"> {paymentInstructionsHtmlString} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.payment_terms ?
                                <>
                                  <td className="">{t("paymentTerms")}  </td>
                                  <td className="text-left"> {paymentTermsHtmlString} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.due_date && (factoryInquiryDetails.due_date != "0000-00-00") ?
                                <>
                                  <td className="">{t("inquiryDueDate")}  </td>
                                  <td className="text-left"> {PHPtoJSFormatConversion.format(new Date(factoryInquiryDetails.due_date))} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.style_article_description ?
                                <>
                                  <td className="">{t("styleArticleDescription")}  </td>
                                  <td className="text-left"> {styleArticleDescriptionHtmlString} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.special_finish ?
                                <>
                                  <td className="">{t("specialFinishers")}  </td>
                                  <td className="text-left"> {specialFinishHtmlString} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.total_qty ?
                                <>
                                  <td className="">{t("totalQuantity")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.total_qty} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              <td className="text-left" colSpan={3}>
                                <Col className="table-responsive" md="12" sm="12" lg="12">
                                  <Card>
                                    <CardBody>
                                      <Form className="needs-validation" noValidate="">
                                        <H6 className="ordersubhead">{t("addQuantityRatio")}</H6>
                                        <Row className="g-12">
                                          <div className="table-responsive">
                                            <table className="table">
                                              <thead>
                                                <tr>
                                                  <th scope="col">{t("colorSize")}</th>
                                                  {getSize.map((option) => {
                                                    return <th>{option.name}</th>;
                                                  })}
                                                  {/* <th scope="col">Total</th> */}
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {Object.values(getColor).map((optionc) => {
                                                  return (
                                                    <tr>
                                                      <th>{optionc.name}</th>
                                                      {getSize.map((option) => {
                                                        return (

                                                          <th style={{ fontWeight: 500 }}>
                                                            {getColorSizeQtyInquiry(orderskuDetails, optionc.id, option.id)}
                                                          </th>
                                                        );
                                                      })}
                                                      {/* <th>{optionc.quantity}</th> */}
                                                    </tr>
                                                  );
                                                })}
                                              </tbody>
                                            </table>
                                          </div>
                                        </Row>
                                      </Form>
                                    </CardBody>
                                  </Card>
                                </Col>
                              </td>
                            </tr>
                            <tr>
                              {factoryInquiryDetails.measurement_sheet ?
                                <>
                                  <td className="">{t("measurementChart")}  </td>
                                  <td className="text-left">
                                    <Col className="table-responsive" md="12" sm="12" lg="12">
                                      <Card>
                                        <CardBody>
                                          <Form className="needs-validation" noValidate="">
                                            <Row className="g-12">
                                              <div className="table-responsive">
                                                <table className="table">
                                                  <thead>
                                                    <tr>
                                                      {
                                                        Object.keys(measurementSheetList).map((key, i) => (
                                                          (i == 0) ?
                                                            Object.keys(measurementSheetList[key]).map((k, data) => (
                                                              <th scope="col" style={{ textTransform: "capitalize" }}>{k}</th>
                                                            )
                                                            ) : ""
                                                        ))
                                                      }
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {
                                                      Object.keys(measurementSheetList).map((key, i) => (
                                                        <tr>
                                                          {
                                                            Object.keys(measurementSheetList[key]).map((k, data) => (
                                                              <td scope="col">{measurementSheetList[key][k]}</td>
                                                            ))
                                                          }
                                                        </tr>
                                                      ))
                                                    }
                                                  </tbody>
                                                </table>
                                              </div>
                                            </Row>
                                          </Form>
                                        </CardBody>
                                      </Card>
                                    </Col>
                                  </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {measurementSheet ?
                                <>
                                  <td className="">{t("measurementSheet")}  </td>
                                  <td>
                                    {measurementSheet.map((obj)=>(
                                  
                                    <li><a href={awsUrl + obj.filepath} target="_blank"> {obj.filename } </a></li>
                               
                                    ))
                                    }
                                     </td>
                                 
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.patterns ?
                                <>
                                  <td className="">{t("patterns")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.patterns} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.jurisdiction ?
                                <>
                                  <td className="">{t("placeofJurisdiction")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.jurisdiction} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.customs_declaraion_document ?
                                <>
                                  <td className="">{t("customsDeclarationDocument")}  </td>
                                  <td className="text-left"> {parse(factoryInquiryDetails.customs_declaraion_document)} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.penality ?
                                <>
                                  <td className="">{t("penaltyLabel")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.penality} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              <td className="text-left" colSpan="3">
                                <H6 className="ordersubhead">{t("printInformation")}</H6>  </td>
                            </tr>
                            <tr>
                              {factoryInquiryDetails.print_type ?
                                <>
                                  <td className="">{t("printType")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.print_type} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.print_size ?
                                <>
                                  <td className="">{t("printSize")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.print_size} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.print_no_of_colors ?
                                <>
                                  <td className="">{t("noOfColors")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.print_no_of_colors} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              <td className="">{t("printImage")}  </td>
                              <td className="text-left">
                                {printImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("printImage")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr>
                            <tr>
                              <td className="" colSpan="2">
                                <H6 className="ordersubhead">{t("trimsInformation")}</H6></td>
                            </tr><tr>
                              {factoryInquiryDetails.main_lable ?
                                <>
                                  <td className="">{t("mainLabel")}  </td>
                                  <td className="text-left"> {parse(factoryInquiryDetails.main_lable)} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              <td className="">{t("mainLabelSample")}</td>
                              <td className="text-left">
                                {mainLableImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("mainLabelSample")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr>
                            <tr>
                              {factoryInquiryDetails.washcare_lable ?
                                <>
                                  <td className="">{t("washCareLabel")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.washcare_lable} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              <td className="">{t("washCareLabelSample")}  </td>
                              <td className="text-left">
                                {washCareLableImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("washCareLabel")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr>
                            <tr>
                              {factoryInquiryDetails.hangtag_lable ?
                                <>
                                  <td className="">{t("hangtag")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.hangtag_lable} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              <td className="">{t("hangtagSample")}  </td>
                              <td className="text-left">
                                {hangtagImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("hangtag")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr>
                            <tr>
                              {factoryInquiryDetails.barcode_lable ?
                                <>
                                  <td className="">{t("barcodeStickers")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.barcode_lable} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              <td className="">{t("barcodeStickersSample")}  </td>
                              <td className="text-left">
                                {barcodeStickersImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("barcodeStickersSample")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr>
                            <tr>
                              {factoryInquiryDetails.trims_nominations ?
                                <>
                                  <td className="">{t("trimsNotificationsSpecify")}  </td>
                                  <td className="text-left"> {trimsNotificationsHtmlString} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              <td className="" colSpan="2">
                                <H6 className="ordersubhead">{t("packingInformation")}</H6> </td>
                            </tr>
                            <tr>
                              {factoryInquiryDetails.poly_bag_size ?
                                <>
                                  <td className="">{t("polybagSizeThickness")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.poly_bag_size} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.poly_bag_material ?
                                <>
                                  <td className="">{t("polybagMaterial")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.poly_bag_material} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.poly_bag_print ?
                                <>
                                  <td className="">{t("printDetailsPolybag")}</td>
                                  <td className="text-left">{factoryInquiryDetails.poly_bag_print}</td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.poly_bag_price ?
                                <>
                                  <td className="">{t("printDetailsPolybag")}</td>
                                  <td className="text-left">{factoryInquiryDetails.poly_bag_price}</td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              <td className="">{t("polybagPrintArtwork")} </td>
                              <td className="text-left">
                                {polybagImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("polybagPrintArtwork")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr>
                            <tr>
                              {factoryInquiryDetails.carton_bag_dimensions ?
                                <>
                                  <td className="">{t("cartonBoxDimensions")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.carton_bag_dimensions} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.carton_color ?
                                <>
                                  <td className="">{t("cartonColor")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.carton_color} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.carton_material ?
                                <>
                                  <td className="">{t("cartonMaterial")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.carton_material} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.barcode_lable ?
                                <>
                                  <td className="">{t("cartonEdgeFinish")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.barcode_lable} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.carton_edge_finish ?
                                <>
                                  <td className="">{t("cartonMarkDetails")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.carton_edge_finish} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              <td className="">{t("cartonMarkImg")}  </td>
                              <td className="text-left">
                                {cartonImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("cartonMarkImg")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr>
                            <tr>
                              {factoryInquiryDetails.make_up ?
                                <>
                                  <td className="">{t("makeUp")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.make_up} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.films_cd ?
                                <>
                                  <td className="">{t("filmsCD")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.films_cd} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.picture_card ?
                                <>
                                  <td className="">{t("pictureCard")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.picture_card} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.inner_cardboard ?
                                <>
                                  <td className="">{t("innerCardboard")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.inner_cardboard} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.estimate_delivery_date &&
                                (factoryInquiryDetails.estimate_delivery_date != "0000-00-00") ?
                                <>
                                  <td className="">{t("estimatedDeliveryDate")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.estimate_delivery_date} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.shipping_size ?
                                <>
                                  <td className="">{t("shippingSize")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.shipping_size} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.air_frieght ?
                                <>
                                  <td className="">{t("airFreight")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.air_frieght} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {/* {factoryInquiryDetails.testing_requirements || factoryInquiryDetails.forbidden_substance_info ||
                            factoryInquiryDetails.sample_requirements || factoryInquiryDetails.special_requests ? 
                            <>
                            <td className="text-left" colSpan="3">
                              <H6 className="ordersubhead">{t("others")}</H6> </td>
                            </>
                            :  ""} */}
                              <td className="" colSpan="3">
                                <H6 className="ordersubhead">{t("others")}</H6> </td>
                            </tr>
                            <tr>
                              {factoryInquiryDetails.forbidden_substance_info ?
                                <>
                                  <td className="">{t("forbiddenSubstancesInformation")}  </td>
                                  <td className="text-left"> {forbiddenSubstanceHtmlString} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.testing_requirements ?
                                <>
                                  <td className="">{t("testingRequirement")}  </td>
                                  <td className="text-left"> {testingRequirementsHtmlString} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.sample_requirements ?
                                <>
                                  <td className="">{t("SampleRequirements")}  </td>
                                  <td className="text-left"> {specialRequesHtmlString} </td>
                                </>
                                : ""}
                            </tr>
                            <tr>
                              {factoryInquiryDetails.special_requests ?
                                <>
                                  <td className="">{t("specialRequestIfAny")}  </td>
                                  <td className="text-left"> {sampleRequirementsHtmlString} </td>
                                </>
                                : ""}
                            </tr>

                            {(inquiryResponse.price) && (inquiryResponse.comments)
                              ?
                              <>
                                <tr>
                                  <td className="text-left" colSpan="3">
                                    <H6 className="ordersubhead">{t("quoteDetails")}</H6> </td>
                                </tr>
                                <tr>
                                  {inquiryResponse.price ?
                                    <>
                                      <td className=""> {t("price")} </td>
                                      <td className="text-left"> {currencySymbol} {price} </td>
                                    </>
                                    : ""}
                                </tr>
                                <tr>
                                  {inquiryResponse.comments ?
                                    <>
                                      <td className="">{t("comments")}  </td>
                                      <td className="text-left"> {parse(comments)} </td>
                                    </>
                                    : ""}
                                </tr>
                              </>
                              :
                              ""
                            }

                          </tbody>
                        </table>
                      </div>
                    </Row>
                  </Col>
                </Row>

                {getLoginUserType == "user" ?
                  <Row className="mt-5">
                    {inquiryResponse.length >= 0 ?
                      <Form>
                        <Col xl="4" lg="6" md="6" sm="12">
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

                        <Col xl="4" lg="6" md="6" sm="12">
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

                        <FormGroup className="f-right">
                          <Button
                            className="btn btn-primary mx-2" onClick={() => { submitFactoryInquiryForm() }} >
                            {t("sentQuote")}
                          </Button>

                          <Button className="btn-sm secondaryBtn m-r-10 f-right"
                            onClick={() => onGoBack()}>
                            {t("goBack")}
                          </Button>
                        </FormGroup>
                      </Form>
                      :
                      <>
                        <Col xl="8" lg="8" md="8" sm="12"></Col>
                        <Col xl="4" lg="4" md="4" sm="12">
                          <Button className="btn-sm secondaryBtn m-r-10 f-right"
                            onClick={() => onGoBack()}>
                            {t("goBack")}
                          </Button>
                        </Col>
                      </>
                    }
                  </Row>
                  :
                  (getStaff === "Staff" && getStaffPermission.includes("Add Response")) || getStaff == null ?
                    <Row className="mt-5">
                      {inquiryResponse.length >= 0 ?
                        <Form>
                          <Col xl="4" lg="6" md="6" sm="12">
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

                          <Col xl="4" lg="6" md="6" sm="12">
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

                          <FormGroup className="f-right">
                            <Button
                              className="btn btn-primary mx-2" onClick={() => { submitFactoryInquiryForm() }} >
                              {t("sentQuote")}
                            </Button>

                            <Button className="btn-sm secondaryBtn m-r-10 f-right"
                              onClick={() => onGoBack()}>
                              {t("goBack")}
                            </Button>
                          </FormGroup>
                        </Form>
                        :
                        <>
                          <Col xl="8" lg="8" md="8" sm="12"></Col>
                          <Col xl="4" lg="4" md="4" sm="12">
                            <Button className="btn-sm secondaryBtn m-r-10 f-right"
                              onClick={() => onGoBack()}>
                              {t("goBack")}
                            </Button>
                          </Col>
                        </>
                      }
                    </Row>
                    :
                    <Row className="mt-5">
                      <Col xl="8" lg="8" md="8" sm="12"></Col>
                      <Col xl="4" lg="4" md="4" sm="12">
                        <Button className="btn-sm secondaryBtn m-r-10 f-right"
                          onClick={() => onGoBack()}>
                          {t("goBack")}
                        </Button>
                      </Col>
                    </Row>
                }

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default FactoryDetailInquiry
// Code by : Anitha Sathysh