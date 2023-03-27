import React, { Fragment, useState, useEffect, useMemo, useRef } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Button,
} from "reactstrap";
import { Breadcrumbs, H6 } from "../../../AbstractElements";
import { useTranslation } from "react-i18next";
import axios from "axios";
import parse from 'html-react-parser';
import DownloadIcon from "../../../assets/images/dms/icons/download.svg";
import {
  getLoginCompanyId,
  getWorkspaceId,
  getLoginUserId,
  getWorkspaceType,
  getLoginUserType,
  getStaff,
  getLoginStaffId,
  getStaffPermission,
} from "../../../Constant/LoginConstant";
import { ServerUrl } from "../../../Constant";
import { encode, apiencrypt, apidecrypt, DownloadFile, PHPtoJSFormatConversion } from "../../../helper";
import noData from "../../../assets/images/dms/icons/noData.jpg";
const BillOfMaterial = () => {
  const { t } = useTranslation();
  const [inquiry, setInquiry] = useState();
  const [inquiryList, setInquiryList] = useState([]);
  const [inquiryDetails, setInquiryDetails] = useState([]);
  const [sampleFormatDtl, setSampleFormatDtl] = useState([]);
  const [measuementSheetDtl, setMeasurementSheetDtl] = useState([]);
  const [printImageDtl, setPrintImageDtl] = useState([]);
  const [mainLabelDtl, setMainLabelDtl] = useState([]);
  const [washCareLabelDtl, setWashCareLabelDtl] = useState([]);
  const [hangtagDtl, setHangtagDtl] = useState([]);
  const [barcodeStickersDtl, setBarcodeStickersDtl] = useState([]);
  const [polybagDtl, setPolybagDtl] = useState([]);
  const [cartonDtl, setCartonDtl] = useState([]);
  const [awsUrl, setAwsUrl] = useState();
  const [sampleFormatList, setSampleFormatList] = useState([]);
  const [measuementSheetList, setMeasurementSheetList] = useState([]);
  const [printImageList, setPrintImageList] = useState([]);
  const [mainLabelList, setMainLabelList] = useState([]);
  const [washCareLabelList, setWashCareLabelList] = useState([]);
  const [hangtagList, setHangtagList] = useState([]);
  const [barcodeStickersList, setBarcodeStickersList] = useState([]);
  const [polybagList, setPolybagList] = useState([]);
  const [cartonList, setCartonList] = useState([]);

  const [barcodeLable, setBarcodeLable] = useState("");
  const [barcodeLableInfo, setBarcodeLableInfo] = useState("");
  const [cartonBagDimensions, setCartonBagDimensions] = useState("");
  const [cartonColor, setCartonColor] = useState("");
  const [cartonEdgeFinish, setCartonEdgeFinish] = useState("");
  const [cartonMark, setCartonMark] = useState("");
  const [cartonMaterial, setCartonMaterial] = useState("");
  const [filePath, setFilePath] = useState("");
  const [hangtagLable, setHangtagLable] = useState("");
  const [hangtagLableInfo, setHangtagLableInfo] = useState("");
  const [id, setId] = useState("");
  const [mainLabel, setMainLabel] = useState("");
  const [mainLableInfo, setMainLableInfo] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [polyBagMaterial, setPolyBagMaterial] = useState("");
  const [polyBagPrice, setPolyBagPrice] = useState("");
  const [polyBagPrint, setPolyBagPrint] = useState("");
  const [polyBagSize, setPolyBagSize] = useState("");
  const [printNoOfColors, setPrintNoOfColors] = useState("");
  const [printSize, setPrintSize] = useState("");
  const [printType, setPrintType] = useState("");
  const [washcareLable, setwashcareLable] = useState("");
  const [washcareLableInfo, setwashcareLableInfo] = useState("");

  const [toShow, setToshow] = useState(0);
  var sampleFormatData = [];
  var measurementSheetData = [];
  var printImageData = [];
  var mainLableData = [];
  var washCareData = [];
  var hangtagData = [];
  var barcodeStickersData = [];
  var polybagData = [];
  var cartonData = [];
  var sampleFormatFile = [];
  var measurementSheetFile = [];
  var printImageFile = [];
  var mainLableFile = [];
  var washCareFile = [];
  var hangtagFile = [];
  var barcodeStickersFile = [];
  var polybagFile = [];
  var cartonFile = [];

  const workspace_id = getWorkspaceId;
  const company_id = getLoginCompanyId;
  const UserId = getLoginUserId;
  const userType = getWorkspaceType;
  const loginType = getLoginUserType;
  var InqRefParams = {};
  InqRefParams["user_type"] = userType;
  InqRefParams["user_id"] = UserId;
  InqRefParams["company_id"] = company_id;
  InqRefParams["workspace_id"] = workspace_id;
  InqRefParams["login_type"] = loginType;

/*************API CAll*******/
  const apiCall = () => {
    axios
      .post(ServerUrl + "/get-fabric-inquiry-ids", apiencrypt(InqRefParams))
      .then((response) => {
        response.data = apidecrypt(response.data);
        setInquiryList(response.data.data);
      });
  };

  useEffect(() => {
    apiCall();
     setToshow(0);
  }, []);

  const noDataShow=(data)=>{
    var noDataArray=[];
    var noDataObj ={};
    noDataObj['print_type']= data.print_type;
    noDataObj['print_size']= data.print_size;
    noDataObj['print_no_of_colors']= data.print_no_of_colors;
    noDataObj['main_lable']= data.main_lable;
    noDataObj['washcare_lable']= data.washcare_lable;
    noDataObj['hangtag_lable']= data.hangtag_lable;
    noDataObj['barcode_lable']= data.barcode_lable;
    noDataObj['poly_bag_size']= data.poly_bag_size;
    noDataObj['poly_bag_material']= data.poly_bag_material;
    noDataObj['poly_bag_print']= data.poly_bag_print;
    noDataObj['carton_bag_dimensions']= data.carton_bag_dimensions;
    noDataObj['carton_color']= data.carton_color;
    noDataObj['carton_material']= data.carton_material;
    noDataObj['carton_edge_finish']= data.carton_edge_finish;
    noDataObj['carton_mark']= data.carton_mark;
    Object.values(noDataObj).map((noData)=>{     
      if((noData!=='')&&(noData!==null)){
        noDataArray.push(noData);
      }     
    })
    if(noDataArray.length>0){
      setToshow(0);
    }else{
      setToshow(1);
    }
  }
/*************PDF Dowmload*******/
  const toDownloadAsPdf = () => {
    var InqRefParams = {};
    InqRefParams["user_id"] = UserId;
    InqRefParams["company_id"] = company_id;
    InqRefParams["workspace_id"] = workspace_id;
    InqRefParams["inquiry_id"] = inquiry;
    axios
      .post(ServerUrl + "/download-get-inquiry-label", apiencrypt(InqRefParams), { responseType: 'blob' })
      .then((response) => {
        let name = "bill_of_material-" + Date.now() + ".pdf";
        DownloadFile(response.data, name);
      });
  }

/*************Submit to Search Bill*******/
  const searchBill = () => {
    var InqRefParams = {};
    InqRefParams["user_id"] = UserId;
    InqRefParams["company_id"] = company_id;
    InqRefParams["workspace_id"] = workspace_id;
    InqRefParams["inquiry_id"] = inquiry;
    axios
      .post(ServerUrl + "/get-inquiry-label", apiencrypt(InqRefParams))
      .then((response) => {
        response.data = apidecrypt(response.data);
        response.data.data.map((data, index) => {
          if (data.media_type == "SampleFormat") {
            sampleFormatData.push(data);
            sampleFormatFile.push(data.filepath);
          }
          if (data.media_type == "MeasurementSheet") {
            measurementSheetData.push(data);
            measurementSheetFile.push(data.filepath);
          }
          if (data.media_type == "PrintImage") {
            printImageData.push(data);
            printImageFile.push(data.filepath);
          }
          if (data.media_type == "MainLabel") {
            mainLableData.push(data);
            mainLableFile.push(data.filepath);
          }
          if (data.media_type == "WashCareLabel") {
            washCareData.push(data);
            washCareFile.push(data.filepath);
          }
          if (data.media_type == "Hangtag") {
            hangtagData.push(data);
            hangtagFile.push(data.filepath);
          }
          if (data.media_type == "BarcodeStickers") {
            barcodeStickersData.push(data);
            barcodeStickersFile.push(data.filepath);
          }
          if (data.media_type == "Polybag") {
            polybagData.push(data);
            polybagFile.push(data.filepath);
          }
          if (data.media_type == "Carton") {
            cartonData.push(data);
            cartonFile.push(data.filepath);
          }
        });
        /**To Show No Data **/ 
         
        // if(
        //   printImageFile.length==0 &&
        //   mainLableFile.length==0 &&
        //   washCareFile.length==0 &&
        //   hangtagFile.length==0 &&
        //   barcodeStickersFile.length==0 &&
        //   polybagFile.length==0 &&            
        //   cartonFile.length==0 &&
        //   (response.data.data[0].print_type=="" || response.data.data[0].print_type=="null") &&
        //   (response.data.data[0].print_size==""|| response.data.data[0].print_size=="null") &&
        //   (response.data.data[0].print_no_of_colors=="" || response.data.data[0].print_no_of_colors=="null")&&
        //   (response.data.data[0].main_lable=="" || response.data.data[0].main_lable=="null") &&
        //   (response.data.data[0].washcare_lable=="" || response.data.data[0].washcare_lable=="null") &&
        //   (response.data.data[0].hangtag_lable=="" || response.data.data[0].hangtag_lable=="null") &&
        //   (response.data.data[0].barcode_lable=="" || response.data.data[0].barcode_lable=="null") &&
        //   (response.data.data[0].poly_bag_size=="" || response.data.data[0].poly_bag_size=="null") &&
        //   (response.data.data[0].poly_bag_material=="" || response.data.data[0].poly_bag_material=="null") &&
        //   (response.data.data[0].poly_bag_print =="" || response.data.data[0].poly_bag_print === "null" )&&
        //   (response.data.data[0].carton_bag_dimensions=="" || response.data.data[0].carton_bag_dimensions=="null") &&
        //   (response.data.data[0].carton_color=="" || response.data.data[0].carton_color=="null") &&
        //   (response.data.data[0].carton_material=="" || response.data.data[0].carton_material=="null") &&
        //   (response.data.data[0].carton_edge_finish=="" || response.data.data[0].carton_edge_finish=="null") &&
        //   (response.data.data[0].carton_mark=="" || response.data.data[0].carton_mark=="null" )
        //   ){
        //     setToshow(1);
        //   } else{
        //     setToshow(0);
        //   }        
        setInquiryDetails(response.data.data);
        setPrintType(response.data.data[0].print_type);
        setPrintSize(response.data.data[0].print_size);
        setPrintNoOfColors(response.data.data[0].print_no_of_colors);
        setMainLabel(response.data.data[0].main_lable);
        setwashcareLable(response.data.data[0].washcare_lable);
        setHangtagLable(response.data.data[0].hangtag_lable);
        setBarcodeLable(response.data.data[0].barcode_lable);
        setPolyBagSize(response.data.data[0].poly_bag_size);
        setPolyBagMaterial(response.data.data[0].poly_bag_material);
        setPolyBagPrint(response.data.data[0].poly_bag_print);
        setCartonBagDimensions(response.data.data[0].carton_bag_dimensions);
        setCartonColor(response.data.data[0].carton_color);
        setCartonMaterial(response.data.data[0].carton_material);
        setCartonEdgeFinish(response.data.data[0].carton_edge_finish);
        setCartonMark(response.data.data[0].carton_mark);
        setSampleFormatDtl(sampleFormatFile);
        setMeasurementSheetDtl(measurementSheetFile);
        setPrintImageDtl(printImageFile);
        setMainLabelDtl(mainLableFile);
        setWashCareLabelDtl(washCareFile);
        setHangtagDtl(hangtagFile);
        setBarcodeStickersDtl(barcodeStickersFile);
        setPolybagDtl(polybagFile);
        setCartonDtl(cartonFile);
        setSampleFormatList(sampleFormatData);
        setMeasurementSheetList(measurementSheetData);
        setPrintImageList(printImageData);
        setMainLabelList(mainLableData);
        setWashCareLabelList(washCareData);
        setHangtagList(hangtagData);
        setBarcodeStickersList(barcodeStickersData);
        setPolybagList(polybagData);
        setCartonList(cartonData);
        setAwsUrl(response.data.serverURL);
        noDataShow(response.data.data[0])
        // noDataShow();
      });
  };

  return (
    <Fragment>
      <Row className="pgbgcolor">
        <Breadcrumbs
          mainTitle={t("billOfMaterial")}
          parent={t("billOfMaterial")}
          title={t("billOfMaterial")}
          subTitle={t("billOfMaterial")}
        />
      </Row>
      <Container fluid={true} className="general-widget topaln">
        <Row>
          {console.log("Inq",inquiryDetails)}
          <Col id="htmljoditListCSS" sm="12">
            <Card>
              <CardBody>
                <Form>
                  <Col lg="12">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <Label style={{ color: "#5F5F5F" }}>
                            {t("inquiry")}
                          </Label>
                          <InputGroup>
                            <Input
                              className=""
                              name="inquiry"
                              type="select"
                              defaultValue=""
                              onChange={(e) => setInquiry(e.target.value)}
                            >
                              <option Value="" disabled>
                                {t("selectInquiry")}
                              </option>
                              {inquiryList.map((inq) => (
                                <option value={inq.id} title={inq.id}>
                                  {" "}
                                  {"IN-" + inq.id}
                                </option>
                              ))}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <InputGroup className="f-left m-t-30">
                            <Button
                              className="btn btn-primary "
                              onClick={() => {
                                searchBill();
                              }}
                            >
                              {t("search")}
                            </Button>
                          </InputGroup>
                        </FormGroup>
                        { inquiryDetails.length > 0 && toShow==0 ?
                          <div className="cursor-pointer p-1 p-l-0 m-t-5 m-r-10 f-right" onClick={() => toDownloadAsPdf()}>
                            <img src={DownloadIcon} />
                          </div>
                          :
                          ""
                        }
                      </Col>

                    </Row>
                  </Col>
                </Form>
    
                {/* {inquiryDetails.length > 0 ?
                  <> */}

                  {console.log("setToshow", toShow)}
                    <Row className="g-12 m-t-20">
                      <Col md="12" lg="12" sm="12">
                        <Row className="g-12">
                          <div className="table-responsive">
                            <table className="table shadow shadow-showcase table-bordered" id="tableId">
                              {printImageDtl.length > 0 ||printType ||printSize||printNoOfColors ?
                                <>

                                {/* Print Information */}
                                  <thead style={{ backgroundColor: "whiteSmoke" }}>
                                    <tr>
                                      <th className="align-left" > {t("printInformation")} </th>
                                      <th className="align-left" >  </th>
                                      <th className="align-left" ></th>
                                    </tr>
                                  </thead>
                                  <tbody id="htmljoditListCSS">

                                    <tr>
                                      <td>{t("printArtwork")}</td>
                                      <td>
                                        {printImageDtl.map((obj) => (
                                          <a href={awsUrl + obj} target="_blank">
                                            < img src={awsUrl + obj} alt={t("printImage")} width="80px" height="80px"
                                              className="p-r-5 rounded" />
                                          </a>
                                        ))}
                                      </td>
                                      <td>
                                        <ul>
                                          {printType ?
                                            <div>{t("printType")} : <b style={{ fontWeight: "500" }}>{printType}</b></div> : ""}
                                          {printSize ?
                                            <div>{t("printSize")} : <b style={{ fontWeight: "500" }}>{printSize}</b></div> : ""}
                                          {printNoOfColors ?
                                            <div>{t("noOfColors")} : <b style={{ fontWeight: "500" }}>
                                              {printNoOfColors}</b></div> : ""}
                                        </ul>
                                      </td>
                                    </tr>
                                  </tbody>
                                </>
                                : " "
                              }

                              {/* Trims Informations */}
                              {((mainLabelDtl.length > 0) || (washCareLabelDtl.length > 0) || (hangtagDtl.length > 0) || (barcodeStickersDtl.length > 0) || 
                              mainLabel|| washcareLable || hangtagLable||barcodeLable) ?
                                <>
                                  <thead style={{ backgroundColor: "whiteSmoke" }}>
                                    <tr>
                                      <th className="align-left"> {t("trimsInformation")} </th>
                                      <th className="align-left" >  </th>
                                      <th className="align-left" ></th>
                                    </tr>
                                  </thead>

                                  <tbody id="htmljoditListCSS">
                                    {mainLabelDtl.length > 0|| mainLabel ?
                                      <tr>
                                        <td>{t("mainLabel")}</td>
                                        <td>
                                          {mainLabelDtl.map((obj) => (
                                            <a href={awsUrl + obj} target="_blank">
                                              < img src={awsUrl + obj} alt={t("mainLabel")} width="80px" height="80px"
                                                className="p-r-5 rounded" />
                                            </a>
                                          ))}
                                        </td>
                                        <td>
                                          <ul>
                                            {mainLabel ?
                                              <div>{t("mainLabel")} : <b style={{ fontWeight: "500" }}> {parse(mainLabel)}</b></div> : ""}
                                          </ul>
                                        </td>
                                      </tr> : ""}
                                    {washCareLabelDtl.length > 0 ||washcareLable ?

                                      <tr>
                                        <td>{t("washCareLabelSample")}</td>
                                        <td>
                                          {washCareLabelDtl.map((obj) => (
                                            <a href={awsUrl + obj} target="_blank">
                                              < img src={awsUrl + obj} alt={t("washCareLabel")} width="80px" height="80px"
                                                className="p-r-5 rounded" />
                                            </a>
                                          ))}
                                        </td>
                                        <td>
                                          <ul>
                                            {washcareLable ?
                                              <div>
                                                {t("washCareLabel")} : <b style={{ fontWeight: "500" }}> {parse(washcareLable)}</b></div> : ""}
                                          </ul>
                                        </td>
                                      </tr> : ""}

                                    {hangtagDtl.length > 0 || hangtagLable?
                                      <tr>
                                        <td>{t("hangtagSample")}</td>
                                        <td>
                                          {hangtagDtl.map((obj) => (
                                            <a href={awsUrl + obj} target="_blank">
                                              < img src={awsUrl + obj} alt={t("hangtag")} width="80px" height="80px"
                                                className="p-r-5 rounded" />
                                            </a>
                                          ))}
                                        </td>
                                        <td>
                                          <ul>
                                            {hangtagLable ?
                                              <div>{t("hangtag")} : <b style={{ fontWeight: "500" }}>{parse(hangtagLable)}</b></div> : ""}
                                          </ul>
                                        </td>
                                      </tr> : ""}

                                    {barcodeStickersDtl.length > 0 || barcodeLable?
                                      <tr>
                                        <td>{t("barcodeStickersSample")}</td>
                                        <td>
                                          {barcodeStickersDtl.map((obj) => (
                                            <a href={awsUrl + obj} target="_blank">
                                              < img src={awsUrl + obj} alt={t("barcode")} width="80px" height="80px"
                                                className="p-r-5 rounded" />
                                            </a>
                                          ))}
                                        </td>
                                        <td>
                                          <ul>
                                            {barcodeLable ?
                                              <div>{t("barcode")} : <b style={{ fontWeight: "500" }}> {parse(barcodeLable)}</b></div> : ""}
                                          </ul>
                                        </td>
                                      </tr> : ""}

                                  </tbody> </> : " "}

                               {/* Packing Information  */}
                              {((polybagDtl.length > 0) || (cartonDtl.length > 0)||polyBagSize||polyBagMaterial||
                              polyBagPrint||cartonBagDimensions||cartonColor||cartonMaterial||cartonMark||cartonEdgeFinish) ?
                                <>
                                  <thead style={{ backgroundColor: "whiteSmoke" }}>
                                    <tr>
                                      <th className="align-left"> {t("packingInformation")} </th>
                                      <th className="align-left" >  </th>
                                      <th className="align-left" ></th>
                                    </tr>
                                  </thead>

                                  <tbody id="htmljoditListCSS">
                                    {polybagDtl.length > 0 ||polyBagSize|| polyBagMaterial||polyBagPrint?
                                      <tr>
                                        <td>{t("packingInformation")}</td>
                                        <td>
                                          {polybagDtl.map((obj) => (
                                            <a href={awsUrl + obj} target="_blank">
                                              < img src={awsUrl + obj} alt={t("polybag")} width="80px" height="80px"
                                                className="p-r-5 rounded" />
                                            </a>
                                          ))}
                                        </td>
                                        <td>
                                          <ul>
                                            {polyBagSize ?
                                              <div>{t("polybagSizeThickness")} : <b style={{ fontWeight: "500" }}>{polyBagSize}</b></div> : ""}
                                            {polyBagMaterial ?
                                              <div>{t("polybagMaterial")} : <b style={{ fontWeight: "500" }}>{polyBagMaterial}</b></div> : ""}
                                            {polyBagPrint ?
                                              <div>{t("polybagPrint")} : <b style={{ fontWeight: "500" }}>{polyBagPrint}</b></div> : ""}
                                          </ul>
                                        </td>
                                      </tr>
                                      : ""
                                    }

                                    {cartonDtl.length > 0 ||cartonBagDimensions||cartonColor||cartonMaterial||cartonEdgeFinish||cartonMark ?
                                      <tr>
                                        <td>{t("cartonMarkImg")}</td>
                                        <td>
                                          {cartonDtl.map((obj) => (
                                            <a href={awsUrl + obj} target="_blank">
                                              < img src={awsUrl + obj} alt={t("cartonMarkImg")} width="80px" height="80px"
                                                className="p-r-5 rounded" />
                                            </a>
                                          ))}
                                        </td>

                                        <td>
                                          <ul>
                                            {cartonBagDimensions ?
                                              <div>{t("cartonBoxDimensions")}) :<b style={{ fontWeight: "500" }}>{cartonBagDimensions}</b></div> : ""}
                                            {cartonColor ?
                                              <div>{t("cartonColor")} :<b style={{ fontWeight: "500" }}>{cartonColor}</b></div> : ""}
                                            {cartonMaterial ?
                                              <div>{t("noOfPly")}: <b style={{ fontWeight: "500" }}>{cartonMaterial}</b></div> : ""}
                                            {cartonEdgeFinish ?
                                              <div>{t("cartonEdgeFinish")} :<b style={{ fontWeight: "500" }}>{cartonEdgeFinish}</b></div> : ""}
                                            {cartonMark ?
                                              <div>{t("cartonMarkDetails")} :<b style={{ fontWeight: "500" }}>{cartonMark}</b></div> : ""}
                                          </ul>
                                        </td>
                                      </tr>
                                      : ""
                                    }
                                  </tbody> </> : " "}

                            </table>
                          </div>
                        </Row>

                      </Col>
                    </Row>
                  {/* </> 
                  : ""
                } */}

                {/* No Data Found  */}
                {toShow == 1 ?
                  <div className="centerAlign">
                    <img  src={noData} style={{ width: "200px" }} />
                    <div> {t("noDataFound")} </div>
                  </div> : ""}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default BillOfMaterial;
