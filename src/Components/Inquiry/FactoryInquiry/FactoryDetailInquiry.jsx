import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, CardBody, Card, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Breadcrumbs, H6 } from "../../../AbstractElements";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Swal from "sweetalert2";
import { getLoginCompanyId, getWorkspaceId, getLoginUserId, getWorkspaceType } from '../../../Constant/LoginConstant';
import { ServerUrl } from "../../../Constant";
import { getColorSizeQtyInquiry, decode } from "../../../helper";
import parse from 'html-react-parser';
import { useSearchParams, } from "react-router-dom";
import CKEditors from 'react-ckeditor-component';

// Showing the factory inquiry Details
const FactoryDetailInquiry = () => {
  var getInputParams = {};
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
  const [testingRequirementsHtmlString, setTestingRequirementsHtmlString] = useState('');
  const [specialFinishHtmlString, setSpecialFinishHtmlString] = useState('');
  const [styleArticleDescriptionHtmlString, setStyleArticleDescriptionHtmlString] = useState('');
  const [paymentTermsHtmlString, setPaymentTermsHtmlString] = useState('');
  const [trimsNotificationsHtmlString, setTrimsNotificationsHtmlString] = useState('');
  const [orderskuDetails, setOrderskuDetails] = React.useState([]);
  const [inquiryResponse, setInquiryResponse] = React.useState([]);
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [measurementSheetList, setMeasurementSheetList] = React.useState([]);
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

  const onGoBack = () => {
    setTimeout(() => {
      window.location.href = '/inquiry/factoryviewinquiry';
    }, 100);
  }

  useEffect(() => {
    if (getWorkspaceType == "Factory" && getWorkspaceType != "PCU" && getWorkspaceType != "Buyer") {
      axios
        .post(ServerUrl + "/inquiry-details", getInputParams)
        .then((response) => {
          setFactoryInquiryDetails(response.data.data[0]);
          setSpecialFinishHtmlString(parse(response.data.data[0].special_finish));
          setSpecialRequesHtmlString(parse(response.data.data[0].sample_requirements));
          setHtmlString(parse(response.data.data[0].special_requests));
          setTestingRequirementsHtmlString(parse(response.data.data[0].testing_requirements));
          setStyleArticleDescriptionHtmlString(parse(response.data.data[0].style_article_description));
          setTrimsNotificationsHtmlString(parse(response.data.data[0].trims_nominations));
          setPaymentTermsHtmlString(parse(response.data.data[0].payment_terms));
          setCurrencySymbol(response.data.data[0].currency);
          setMeasurementSheetList(JSON.parse(response.data.data[0].measurement_sheet));
        })

      axios
        .post(ServerUrl + "/factory-inquiry-response", getInputParams)
        .then((response) => {
          setInquiryResponse(response.data.data[0] ? response.data.data[0] : "");
          setPrice(response.data.data[0].price ? (response.data.data[0].price) : "");
          setComments(response.data.data[0].comments ? response.data.data[0].comments : "");
        })

      axios
        .post(ServerUrl + "/inquiry-media", getInputParams)
        .then((response) => {
          (response.data.data.files).map((mapData) => {
            if (mapData.media_type == "MeasurementSheet") {
              var getMeasurementDetails = mapData.filepath;
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
        .post(ServerUrl + "/inquiry-sku", getInputParams)
        .then((response) => {
          setOrderskuDetails(response.data.data.sku);
          setGetColor(response.data.data.colors);
          setGetSize(response.data.data.sizes);
        })
      setValiderrors(() => "");
    } else {
      window.location.href = '/inquiry/viewinquiry';
    }
  }, [])

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

      axios.post(ServerUrl + "/save-inquiry-factory-response", inquiryFormInputParams)
        .then((response) => {
          if (response.data.status_code === 200) {
            Swal.fire({
              title: t("Inquiry Response Added Successfully"),
              icon: "success",
              button: t("okLabel"),
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/inquiry/factoryviewinquiry';
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
          <Col sm="12">
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
                          <tbody id="htmlStringListCSS">
                            <tr>
                              {factoryInquiryDetails.article_name ?
                                <>
                                  <td className="factoryDetailsTable">{t("articleName")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.article_name} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.style_no ?
                                <>
                                  <td className="factoryDetailsTable">{t("styleNo")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.style_no} </td>
                                </>
                                : ""}
                            </tr><tr>
                              <td className="factoryDetailsTable">{t("sampleFormat")}  </td>
                              <td className="text-left">
                                {sampleFormatImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("sampleFormat")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr><tr>
                              {factoryInquiryDetails.fabric_type_id ?
                                <>
                                  <td className="factoryDetailsTable">{t("fabricComposition")} </td>
                                  <td className="text-left"> {factoryInquiryDetails.fabric_type_id} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.fabric_GSM ?
                                <>
                                  <td className="factoryDetailsTable">{t("fabricGSM")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.fabric_GSM} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.fabric_type ?
                                <>
                                  <td className="factoryDetailsTable">{t("fabricType")}</td>
                                  <td className="text-left"> {factoryInquiryDetails.fabric_type} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.yarn_count ?
                                <>
                                  <td className="factoryDetailsTable">{t("yarnCount")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.yarn_count} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.target_price ?
                                <>
                                  <td className="factoryDetailsTable">{t("targetPrice")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.currency} {factoryInquiryDetails.target_price} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.incoterms ?
                                <>
                                  <td className="factoryDetailsTable">{t("incomeTerms")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.incoterms} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.payment_terms ?
                                <>
                                  <td className="factoryDetailsTable">{t("paymentTerms")}  </td>
                                  <td className="text-left"> {paymentTermsHtmlString} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.due_date && (factoryInquiryDetails.due_date != "0000-00-00") ?
                                <>
                                  <td className="factoryDetailsTable">{t("inquiryDueDate")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.due_date} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.style_article_description ?
                                <>
                                  <td className="factoryDetailsTable">{t("styleArticleDescription")}  </td>
                                  <td className="text-left"> {styleArticleDescriptionHtmlString} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.special_finish ?
                                <>
                                  <td className="factoryDetailsTable">{t("specialFinishers")}  </td>
                                  <td className="text-left"> {specialFinishHtmlString} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.total_qty ?
                                <>
                                  <td className="factoryDetailsTable">{t("totalQuantity")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.total_qty} </td>
                                </>
                                : ""}
                            </tr><tr>
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
                            </tr><tr>
                              {factoryInquiryDetails.measurement_sheet ?
                                <>
                                  <td className="factoryDetailsTable">{t("measurementChart")}  </td>
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
                            </tr><tr>
                              {factoryInquiryDetails.measurementSheet ?
                                <>
                                  <td className="factoryDetailsTable">{t("measurementSheet")}  </td>
                                  <td className="text-left">
                                    <a href={awsUrl + measurementSheet} target="_blank"> {measurementSheet} </a>
                                  </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.patterns ?
                                <>
                                  <td className="factoryDetailsTable">{t("patterns")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.patterns} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.jurisdiction ?
                                <>
                                  <td className="factoryDetailsTable">{t("placeofJurisdiction")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.jurisdiction} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.customs_declaraion_document ?
                                <>
                                  <td className="factoryDetailsTable">{t("customsDeclarationDocument")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.customs_declaraion_document} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.penality ?
                                <>
                                  <td className="factoryDetailsTable">{t("penaltyLabel")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.penality} </td>
                                </>
                                : ""}
                            </tr><tr>
                              <td className="text-left" colSpan="3">
                                <H6 className="ordersubhead">{t("printInformation")}</H6>  </td>
                            </tr><tr>
                              {factoryInquiryDetails.print_type ?
                                <>
                                  <td className="factoryDetailsTable">{t("printType")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.print_type} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.print_size ?
                                <>
                                  <td className="factoryDetailsTable">{t("printSize")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.print_size} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.print_no_of_colors ?
                                <>
                                  <td className="factoryDetailsTable">{t("noOfColors")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.print_no_of_colors} </td>
                                </>
                                : ""}
                            </tr><tr>
                              <td className="factoryDetailsTable">{t("printImage")}  </td>
                              <td className="text-left">
                                {printImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("printImage")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr><tr>
                              <td className="factoryDetailsTable" colSpan="2">
                                <H6 className="ordersubhead">{t("trimsInformation")}</H6></td>
                            </tr><tr>
                              {factoryInquiryDetails.main_lable ?
                                <>
                                  <td className="factoryDetailsTable">{t("mainLabel")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.main_lable} </td>
                                </>
                                : ""}
                            </tr><tr>
                              <td className="factoryDetailsTable">{t("mainLabelSample")}</td>
                              <td className="text-left">
                                {mainLableImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("mainLabelSample")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr><tr>
                              {factoryInquiryDetails.washcare_lable ?
                                <>
                                  <td className="factoryDetailsTable">{t("washCareLabel")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.washcare_lable} </td>
                                </>
                                : ""}
                            </tr><tr>
                              <td className="factoryDetailsTable">{t("washCareLabelSample")}  </td>
                              <td className="text-left">
                                {washCareLableImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("washCareLabel")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr><tr>
                              {factoryInquiryDetails.hangtag_lable ?
                                <>
                                  <td className="factoryDetailsTable">{t("hangtag")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.hangtag_lable} </td>
                                </>
                                : ""}
                            </tr><tr>
                              <td className="factoryDetailsTable">{t("hangtagSample")}  </td>
                              <td className="text-left">
                                {hangtagImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("hangtag")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr><tr>
                              {factoryInquiryDetails.barcode_lable ?
                                <>
                                  <td className="factoryDetailsTable">{t("barcodeStickers")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.barcode_lable} </td>
                                </>
                                : ""}
                            </tr><tr>
                              <td className="factoryDetailsTable">{t("barcodeStickersSample")}  </td>
                              <td className="text-left">
                                {barcodeStickersImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("barcodeStickersSample")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr><tr>
                              {factoryInquiryDetails.trims_nominations ?
                                <>
                                  <td className="factoryDetailsTable">{t("trimsNotificationsSpecify")}  </td>
                                  <td className="text-left"> {trimsNotificationsHtmlString} </td>
                                </>
                                : ""}
                            </tr><tr>
                              <td className="factoryDetailsTable" colSpan="2">
                                <H6 className="ordersubhead">{t("packingInformation")}</H6> </td>
                            </tr><tr>
                              {factoryInquiryDetails.poly_bag_size ?
                                <>
                                  <td className="factoryDetailsTable">{t("polybagSizeThickness")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.poly_bag_size} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.poly_bag_material ?
                                <>
                                  <td className="factoryDetailsTable">{t("polybagMaterial")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.poly_bag_material} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.poly_bag_price ?
                                <>
                                  <td className="factoryDetailsTable">{t("printDetailsPolybag")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.poly_bag_price} </td>
                                </>
                                : ""}
                            </tr><tr>
                              <td className="factoryDetailsTable">{t("polybagSampleImage")} </td>
                              <td className="text-left">
                                {polybagImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("polybagSampleImage")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr><tr>
                              {factoryInquiryDetails.carton_bag_dimensions ?
                                <>
                                  <td className="factoryDetailsTable">{t("cartonBoxDimensions")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.carton_bag_dimensions} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.carton_color ?
                                <>
                                  <td className="factoryDetailsTable">{t("cartonColor")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.carton_color} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.carton_material ?
                                <>
                                  <td className="factoryDetailsTable">{t("cartonMaterial")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.carton_material} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.barcode_lable ?
                                <>
                                  <td className="factoryDetailsTable">{t("cartonEdgeFinish")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.barcode_lable} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.carton_edge_finish ?
                                <>
                                  <td className="factoryDetailsTable">{t("cartonMarkDetails")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.carton_edge_finish} </td>
                                </>
                                : ""}
                            </tr><tr>
                              <td className="factoryDetailsTable">{t("cartonSampleImage")}  </td>
                              <td className="text-left">
                                {cartonImage.map((obj) => (
                                  <a href={awsUrl + obj} target="_blank">
                                    < img src={awsUrl + obj} alt={t("cartonSampleImage")} width="80px" height="80px"
                                      className="p-r-5 rounded" />
                                  </a>
                                ))}
                              </td>
                            </tr><tr>
                              {factoryInquiryDetails.make_up ?
                                <>
                                  <td className="factoryDetailsTable">{t("makeUp")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.make_up} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.films_cd ?
                                <>
                                  <td className="factoryDetailsTable">{t("filmsCD")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.films_cd} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.picture_card ?
                                <>
                                  <td className="factoryDetailsTable">{t("pictureCard")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.picture_card} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.inner_cardboard ?
                                <>
                                  <td className="factoryDetailsTable">{t("innerCardboard")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.inner_cardboard} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.estimate_delivery_date &&
                                (factoryInquiryDetails.estimate_delivery_date != "0000-00-00") ?
                                <>
                                  <td className="factoryDetailsTable">{t("estimatedDeliveryDate")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.estimate_delivery_date} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.shipping_size ?
                                <>
                                  <td className="factoryDetailsTable">{t("shippingSize")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.shipping_size} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.air_frieght ?
                                <>
                                  <td className="factoryDetailsTable">{t("airFreight")}  </td>
                                  <td className="text-left"> {factoryInquiryDetails.air_frieght} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {/* {factoryInquiryDetails.testing_requirements || factoryInquiryDetails.sample_requirements ||
                            factoryInquiryDetails.sample_requirements || factoryInquiryDetails.special_requests ? 
                            <>
                            <td className="text-left" colSpan="3">
                              <H6 className="ordersubhead">{t("others")}</H6> </td>
                            </>
                            :  ""} */}
                              <td className="factoryDetailsTable" colSpan="3">
                                <H6 className="ordersubhead">{t("others")}</H6> </td>
                            </tr><tr>
                              {factoryInquiryDetails.testing_requirements ?
                                <>
                                  <td className="factoryDetailsTable">{t("testingRequirement")}  </td>
                                  <td className="text-left"> {testingRequirementsHtmlString} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.sample_requirements ?
                                <>
                                  <td className="factoryDetailsTable">{t("SampleRequirements")}  </td>
                                  <td className="text-left"> {specialRequesHtmlString} </td>
                                </>
                                : ""}
                            </tr><tr>
                              {factoryInquiryDetails.special_requests ?
                                <>
                                  <td className="factoryDetailsTable">{t("specialRequestIfAny")}  </td>
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
                                      <td className="factoryDetailsTable"> {t("price")} </td>
                                      <td className="text-left"> {currencySymbol} {price} </td>
                                    </>
                                    : ""}
                                </tr>
                                <tr>
                                  {inquiryResponse.comments ?
                                    <>
                                      <td className="factoryDetailsTable">{t("comments")}  </td>
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
                          <CKEditors
                            activeclassName="p10"
                            content={(comments).toString()}
                            events={{ 'change': onChangeCommentsRequest }}
                            onchange={(e) => setComments(e.target.value)}
                            config={{
                              toolbar: [
                                ["Bold", "Italic", 'NumberedList', 'BulletedList', "Strike Through"],
                                ["Cut", "Copy", "Paste", "Pasteasplaintext", "FormattingStyles", "Undo", "Redo"],
                                ["List", "Indent", "Blocks", "Align", "Bidi", "Paragraph"],
                                ["Find", "Selection", "Spellchecker", "Editing"]
                              ],
                            }
                            }
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