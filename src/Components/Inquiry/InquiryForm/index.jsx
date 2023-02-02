import React, { Fragment, useState, useEffect,useRef } from "react";
import {
  Form,
  Label,
  Card,
  CardBody,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  FormGroup,
  Container,
  Table,
} from "reactstrap";
import axios from "axios";
import {
  getLoginCompanyId,
  getWorkspaceId,
  getLoginUserId,
  getWorkspaceType,
  getStaff,
  getStaffPermission,
  getLoginStaffId,
} from "../../../Constant/LoginConstant";
import { encode, decode, apiencrypt, apidecrypt } from "../../../helper";
import addIcon from "../../../assets/images/dms/icons/addIcon.svg";
import imgUpload from "../../../assets/images/dms/icons/imgUpload.svg";
import quantity from "../../../assets/images/dms/icons/quantity.svg";
import docIcon from "../../../assets/images/dms/icons/inquiryDocIcon.svg";
import infoIcon from "../../../assets/images/dms/icons/inquiryInfoIcon.svg";
import deleteIcon from"../../../assets/images/dms/inquiryDelIcon.svg";
import scrollUpIcon from"../../../assets/images/dms/inquiryScrollUpIcon.svg";
import { Breadcrumbs, H6, Btn, Image, UL } from "../../../AbstractElements";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { maxFileUpload, maxUploadFileSize, ServerUrl } from "../../../Constant";
import CKEditors from "react-ckeditor-component";
import Files from "react-files";
import AddArticleModal from "./AddArticleModal";
import AddColorModal from "./AddColorModal";
import AddSizeModal from "./AddSizeModal";
import AddFabricModal from "./AddFabricModal";
import InfoCanvas from "./InquiryInfoOffCanvas";

const index = () => {
  
  const { t } = useTranslation();
  
  const workspace_id = getWorkspaceId;
  const company_id = getLoginCompanyId;
  const UserId = getLoginUserId;
  const dataToSendAtStarting = {
    company_id: company_id,
    workspace_id: workspace_id,
  };
  const [color, setColor] = React.useState([]);
  const [size, setSize] = React.useState([]);
  const [files, setFiles] = useState([]);
  const [fileSampleFormat, setFileSampleFormat] = useState([]);
  const [filePrintImage, setFilePrintImage] = useState([]);
  const [fileMainLabel, setFileMainLabel] = useState([]);
  const [fileWashCareLabel, setFileWashCareLabel] = useState([]);
  const [fileHangtag, setFileHangtag] = useState([]);
  const [fileBarcodeStickers, setFileBarcodeStickers] = useState([]);
  const [fileMeasurementSheet, setFileMeasurementSheet] = useState([]);
  const [filePolybagImg,setFilePolyBagImg]=useState([]);
  const [fileCartonImg,setFileCartonImg]=useState([]);
  const [articles, setArticles] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [sampleFormatImg, setSampleFormatImg] = useState("");
  const [incomeTerms, setIncomeTerms] = useState([]);
  const [incomeTerm, setIncomeTerm] = useState();
  const [getColor, setGetColor] = React.useState([]);
  const [getSize, setGetSize] = React.useState([]);
  const [article, setArticle] = useState("");
  const [fabricCom, setFabricCom] = useState("");
  const [styleNo, setStyleNo] = useState("");
  const [sampleFormat, setSampleFormat] = useState("");
  const [MeasurementSheet, setMeasurementSheet] = useState("");
  const [fabricGSM, setFabricGSM] = useState("");
  const [yarnCount, setYarnCount] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [inquiryDueDate, setInquiryDueDate] = useState("");
  const [styleArtcileDesc, setStyleArticleDesc] = useState("");
  const [specialFinishes, setSpecialFinishes] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [patterns, setPatterns] = useState("");
  const [placesOfJurisdiction, setPlaceOfJurisdiction] = useState("");
  const [customsDeclarationDoc, setCustomsDeclarationDoc] = useState("");
  const [penalty, setPenalty] = useState("");
  const [printType, setPrintType] = useState("");
  const [printSize, setPrintSize] = useState("");
  const [noOfColors, setNoOfColors] = useState("");
  const [printImage, setPrintImage] = useState("");
  const [mainLabel, setMainLabel] = useState("");
  const [washCareLabel, setWashCareLabel] = useState("");
  const [hangtag, setHangtag] = useState("");
  const [barcodeStickers, setBarcodeStickers] = useState("");
  const [trimsNotification, setTrimsNotification] = useState("");
  const [polybagSizeThickness, setPolybagSizeThickness] = useState("");
  const [polybagMaterial, setPolybagMaterial] = useState("");
  const [printDetailsPolybag, setPrintDetailsPolybag] = useState("");
  const [cartonBoxDimension, setCartonBoxDimension] = useState("");
  const [cartonColors, setCartonColors] = useState("");
  const [cartonMaterial, setCartonMaterial] = useState("");
  const [cartonEdgeFinish, setCartonEdgeFinish] = useState("");
  const [cartonMarkDetails, setCartonMarkDetails] = useState("");
  const [makeUp, setMakeUp] = useState("");
  const [flimsCD, setFlimsCD] = useState("");
  const [pictureCard, setPictureCard] = useState("");
  const [innerCardBoard, setInnerCardBoard] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [shippingSize, setShippingSize] = useState("");
  const [airFrieght, setAirFrieght] = useState("");
  const [forbiddenSubstancesInfo, setForbiddenSubstancesInfo] = useState("");
  const [testingRequirement, setTestingRequirement] = useState("");
  const [sampleRequirement, setSampleRequirement] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [modalArt, setModalArt] = useState(false);
  const [modalfabric, setModalfabric] = useState(false);
  const [modalClr, setModalClr] = useState(false);
  const [modalSize, setModalSize] = useState(false);
  const [showColor, setShowColor] = React.useState([]);
  const [showSize, setShowSize] = React.useState([]);
  const [measurementSheetImg, setMeasurementSheetImg] = React.useState("");
  const [printImg, setPrintImg] = React.useState("");
  const [mainLabelSampleImg, setMainLabelSampleImg] = React.useState("");
  const [washCareLabelSampleImg, setWashCareLabelSampleImg] =React.useState("");
  const [hangtagSampleImg, setHangtagSampleImg] = React.useState("");
  const [barcodeStickersSampleImg, setBarcodeStickersSampleImg] =React.useState("");
  const[polybagSampleImg, setPolybagSampleImg] = React.useState("");
  const[cartonSampleImg, setCartonSampleImg] = React.useState("");
  const [referenceId, setReferenceId] = useState(Date.now());
  const [awsUrl, setAwsUrl] = useState();
  const [showInfoCanvas, setShowInfoCanvas] = useState(false);
  const [infoDetails, setInfoDetails] = useState([]);
  const [masterType, setMasterType] = useState();
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState("");
  const [measurementChart, setMeasurementChart] = useState([]);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const toggleart = () => setModalArt(!modalArt);
  const togglefabric = () => setModalfabric(!modalfabric);
  const toggleclr = () => setModalClr(!modalClr);
  const togglesize = () => setModalSize(!modalSize);
  const toggleInfoCanvas = () => setShowInfoCanvas(!showInfoCanvas);
  const [validerrors, setValiderros] = React.useState({});
  var getInputParams = {};
  getInputParams["company_id"] = getLoginCompanyId;
  getInputParams["workspace_id"] = getWorkspaceId;
  getInputParams["user_id"] = getLoginUserId;
  getInputParams["staff_id"] = getLoginStaffId;
  getInputParams["order_id"] = "1";
  getInputParams["sku"] = [{}];
  
  const basicinfo = useRef(null);
  const fabricinfo = useRef(null);
  const printinfo = useRef(null);
  const trimsinfo = useRef(null);
  const packinginfo = useRef(null);
  const othersinfo = useRef(null);

  /****------- Tab Scroll ---------- ****/ 
  const scrollToSection =(elementRef)=>{
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior:'smooth'
    })
  }

   /****------- Payment Terms modal - Checked Value ---------- ****/ 
  const checkedVal = (valueType) => {

    var params = {};
    params["type"] = valueType;
    axios.post(ServerUrl + "/get-inquiry-master", params).then((response) => {
      setInfoDetails(response.data.data);
    });
    setMasterType(valueType);
    toggleInfoCanvas();
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };
  /****------- Validation ---------- ****/ 
  const validation = (data) => {
    let validerrors = {};
    if (!article) {
      validerrors.article = t("selectArticleName");
    }
    if (!styleNo.trim()) {
      validerrors.styleNo = t("enterStyleNumber");
    }
    if (!fabricCom) {
      validerrors.fabricCom = t("selectFabricComposition");
    }
    if (!totalQuantity) {
      validerrors.totalQuantity = t("enterTotQty");
    }
    setValiderros(validerrors);
    return validerrors;
  };
/****------- Delete Color ---------- ****/ 
  const deleteColor = (e) => {
    var getColor = e.target.id;
    Swal.fire({
      title: t("colorDeleteAlert"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("delete"),
      confirmButtonColor: "#d33",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setShowColor((current) =>
          current.filter((showcolor, v) => {
            return showcolor !== getColor;
          })
        );
        setColor((currentv) =>
          currentv.filter((color, vf) => {
            return color.name !== getColor;
          })
        );
        document.getElementById("Overall_total_quantity").value = 0;
        getTotalColorWise("delete");
        getTotalSizeWise("delete");
        getOverallTotal("delete");
      }
    });
  };
/****------- Delete Size ---------- ****/ 
  const deleteSize = (e) => {
    var getSize = e.target.id;
    Swal.fire({
      title: t("sizeDeleteAlert"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("delete"),
      confirmButtonColor: "#d33",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setShowSize((current) =>
          current.filter((showSize, v) => {
            return showSize !== getSize;
          })
        );

        setSize((currentv) =>
          currentv.filter((size, vf) => {
            return size.name !== getSize;
          })
        );
        document.getElementById("Overall_total_quantity").value = 0;
        getTotalColorWise("delete");
        getTotalSizeWise("delete");
        getOverallTotal("delete");
      }
    });
  };
/****------- Color -Size Add Quantity ---------- ****/ 
  const addQty = (e) => {
    var idv = e.target.id;
    var value = e.target.value;

    /***** Split the ID values of Size and Color *****/
    var sptv = idv.split("#");
    var color_id = sptv[0];
    var size_id = sptv[1];
    var totQty = 0;
    size.forEach((e) => {
      var getsizeid = e.id;
      var t = document.getElementById(color_id + "#" + getsizeid).value;
      if (parseInt(t) > 0) {
        totQty += parseInt(t);
      }
      document.getElementById("totqty_" + color_id).value = totQty;
    });
    overallTotalQty(e);
    sizeTotalQty(e);
  };
/****------- Color -Size Get Quantity ---------- ****/ 
  const getQtyDetails = (e) => {
    var skuDet = [];
    const breakOut = false;
    var g = -1;
    color.forEach((c) => {
      size.forEach((e) => {
        g++;
        var t = document.getElementById(c.id + "#" + e.id).value;
        var skuData = {};
        skuData["color_id"] = c.id;
        skuData["size_id"] = e.id;
        skuData["quantity"] = t == "" ? 0 : t;
        skuDet[g] = skuData;
      });
    });
    return skuDet;
  };
/****------- Color -Size Overall Total Quantity ---------- ****/ 
  const overallTotalQty = (e) => {
    var id = e.target.id;
    var value = e.target.value;

    var splitId = id.split("#");
    var color_id = splitId[0];
    var size_id = splitId[1];

    var sum = 0;
    color.forEach((data) => {
      var totalQtyValue = document.getElementById("totqty_" + data.id).value;
      if (parseInt(totalQtyValue) > 0) {
        sum += parseInt(totalQtyValue);
      }
    });
    document.getElementById("Overall_total_quantity").value = sum;
  };
/****------- Color -Size ,Size wise Total ---------- ****/ 
  const sizeTotalQty = (e) => {
    var id = e.target.id;
    var value = e.target.value;

    var splitId = id.split("#");
    var color_id = splitId[0];
    var size_id = splitId[1];

    var tot = 0;
    color.forEach((e) => {
      var colorId = e.id;
      var qtyValue = document.getElementById(colorId + "#" + size_id).value;
      if (parseInt(qtyValue) > 0) {
        tot += parseInt(qtyValue);
      }
      document.getElementById("SizeId_total_quantity" + size_id).value = tot;
    });
  };

  useEffect(() => {
    if( getWorkspaceType == "Buyer" || getWorkspaceType == "PCU" && getWorkspaceType != "Factory"  )
    {
    axios
      .post(ServerUrl + "/get-color", apiencrypt(getInputParams))
      .then((response) => {
        response.data = apidecrypt(response.data);
        setGetColor(response.data.data);
      });
    axios
      .post(ServerUrl + "/get-user-article", apiencrypt(dataToSendAtStarting))
      .then((response) => {
        response.data = apidecrypt(response.data);
        setArticles(response.data.data);
      });
    axios
      .post(ServerUrl + "/get-user-fabric", apiencrypt(dataToSendAtStarting))
      .then((response) => {
        response.data = apidecrypt(response.data);
        setFabrics(response.data.data);
      });
    axios
      .post(ServerUrl + "/get-size", apiencrypt(getInputParams))
      .then((response) => {
        response.data = apidecrypt(response.data);
        setGetSize(response.data.data);
      });
    axios.get(ServerUrl + "/get-income-terms").then((response) => {
      response.data = apidecrypt(response.data);
      setIncomeTerms(response.data.data);
    });
    axios.get(ServerUrl + "/get-currencies").then((response) => {
      response.data = apidecrypt(response.data);
      setCurrencies(response.data.data);
    });
    window.addEventListener("scroll", () => {
      scrollSticky();
      if (window.scrollY > 400) {
          setShowTopBtn(true);
      } else {
          setShowTopBtn(false);
      }
  });
  const scrollSticky=()=> {
    var header = document.getElementById("myHeader");
     var sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
  
  } else {
    window.location.href="/inquiry/factoryviewinquiry";
  }
  }, []);
  
  /****------- Image Upload API Call ---------- ****/ 
  const uploadImageApiCall = (imageType, file) => {
    axios
      .post(
        ServerUrl + "/inquiry-file-upload",
        {
          type: imageType,
          referenceId: referenceId,
          file: file[0],
          company_id: company_id,
          workspace_id: workspace_id,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((response) => {
        if (response.data.status_code == 200) {
          if (imageType == "SampleFormat") {
            setFileSampleFormat(response.data.files.files);
            setAwsUrl(response.data.files.serverURL);
          } else if (imageType == "MeasurementSheet") {
            setFileMeasurementSheet(response.data.files.files);
            setAwsUrl(response.data.files.serverURL);
          } else if (imageType == "PrintImage") {
            // setPrintImg(response.data.files[0].filepath);
            setFilePrintImage(response.data.files.files);
            setAwsUrl(response.data.files.serverURL);
          } else if (imageType == "MainLabel") {
            setFileMainLabel(response.data.files.files);
            setAwsUrl(response.data.files.serverURL);
          } else if (imageType == "WashCareLabel") {
            setFileWashCareLabel(response.data.files.files);
            setAwsUrl(response.data.files.serverURL);
          } else if (imageType == "Hangtag") {
            setFileHangtag(response.data.files.files);
            setAwsUrl(response.data.files.serverURL);
          } else if (imageType == "BarcodeStickers") {
            setFileBarcodeStickers(response.data.files.files);
            setAwsUrl(response.data.files.serverURL);
          } else if( imageType == "Polybag"){
            setFilePolyBagImg(response.data.files.files);
            setAwsUrl(response.data.files.serverURL);
          } else if( imageType == "Carton"){
            setFileCartonImg(response.data.files.files);
            setAwsUrl(response.data.files.serverURL);
        }
      }
    });
  };

/****------- Delete Image  ---------- ****/ 
  const deleteImageFiles = (imageType, file) => {
    var media ={};
    media["media_id"]= file.media_id;
    Swal.fire({
      title: t("areYouSureToDeleteThisImage"),
      text: t("cantRevertBack"),
      icon: "warning",
      showCancelButton: true,
      button: t("okLabel"),
    }).then((result) => {
      if (result.isConfirmed) 
      {         
        axios
        .post(ServerUrl+"/delete-inquiry-media",media)
        .then((response) => {
          if(response.data.status_code == 200){
            Swal.fire({
              title: t(response.data.meassage),
              icon: "success",
              showCancelButton: true,
              button: t("okLabel"),
              
            }).then((result) => {
              if(result.isConfirmed){
                uploadImageApiCall(imageType, file);
              }
            }
            )
          }
        })
      }
    });
  };
/****------- Press Enter - Next Field ---------- ****/ 
  function handleEnter(event) {
    if (
      (event.keyCode === 13 || event.keyCode === 9) &&
      event.target.nodeName === "INPUT"
    ) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);

      if (form.elements[index + 1].readOnly == false) {
        form.elements[index + 1].focus();
      } else {
        if (form.elements[index + 2].readOnly == false) {
          form.elements[index + 2].focus();
        } else {
          // let index=0;
          if (form.elements[index + 3].readOnly == false) {
            form.elements[index + 3].focus();
          } else {
            if (form.elements[index + 4].readOnly == false) {
              let indexv = index + 4;
              form.elements[indexv].focus();
            } else {
              let index = 0;
              form.elements[index].focus();
            }
          }
        }
      }
    }
  };

  function handleKeyPress(e) {
    var key = e.key;
    var regex = /[0-9]/;
    if (!regex.test(key)) {
      e.preventDefault();
    }
  };
/****------- Color Selection  ---------- ****/ 
  const handleChangeColor = (e) => {
    var id = e.nativeEvent.target.selectedIndex;
    var idvc = e.nativeEvent.target[id].value;
    var name = e.nativeEvent.target[id].text;
    var colorary = [];
    colorary["id"] = idvc;
    colorary["name"] = name;
    var t = showColor;
    var index = t.indexOf(name);
    if (index == -1) {
      setShowColor([...showColor, name]);
      setColor([...color, colorary]);
    }
  };
/****------- Size Selection  ---------- ****/ 
  const handleChangeSize = (e) => {
    var id = e.nativeEvent.target.selectedIndex;
    var idvs = e.nativeEvent.target[id].value;
    var name = e.nativeEvent.target[id].text;
    var sizeary = [];
    sizeary["id"] = idvs;
    sizeary["name"] = name;

    var t = showSize;
    var index = t.indexOf(name);
    if (index == -1) {
      setShowSize([...showSize, name]);
      setSize([...size, sizeary]);
    }
  };

/****------- Text Editor OnChange ---------- ****/ 
  const onChangeArticleDescription = (e) => {
    const newContent = e.editor.getData();
    setStyleArticleDesc(newContent);
  };
 
  const onChangePaymentTerms = (e) => {
    const newContent = e.editor.getData();
    setPaymentTerm(newContent);
  };

  const onChangeSpecialFinshers = (e) => {
    const newContent = e.editor.getData();
    setSpecialFinishes(newContent);
  };

  const onChangeTrimsNotifications = (e) => {
    const newContent = e.editor.getData();
    setTrimsNotification(newContent);
  };

  const onChangeForbiddenSubstancesInfo = (e) => {
    const newContent = e.editor.getData();
    setForbiddenSubstancesInfo(newContent);
  };

  const onChangeTestingRequirement = (e) => {
    const newContent = e.editor.getData();
    setTestingRequirement(newContent);
  };

  const onChangeSampleRequirement = (e) => {
    const newContent = e.editor.getData();
    setSampleRequirement(newContent);
  };

  const onChangeSpecialRequest = (e) => {
    const newContent = e.editor.getData();
    setSpecialRequest(newContent);
  };
  /****----------------- ****/ 

  /****------- Image Upload Validation ---------- ****/ 
  const SampleFormatImg = (files) => {
    files.map((sampleFormatImg) => {
      if (
        sampleFormatImg.extension == "jpeg" ||
        sampleFormatImg.extension == "jpg" ||
        sampleFormatImg.extension == "png"
      ) {
        const getFileSize = Math.round(sampleFormatImg.size / 1024);
        if (getFileSize > maxUploadFileSize) {
          Swal.fire({
            title: t("sizeExceededTitleAlert"),
            text: t("uploadFileTalidationText", {
              fileSize: maxUploadFileSize / 1024,
            }),
            // text: t("uploadFileWithinTextAlert1") + " " + (maxUploadFileSize / 1024) + " " + t("uploadFileWithinTextAlert2"),
            icon: "warning",
            button: t("okLabel"),
          });
        } else {
          let responseData = uploadImageApiCall("SampleFormat", files);
          setSampleFormatImg(sampleFormatImg.name);
        }
      } else {
        Swal.fire({
          title: t("wrongFileFormat"),
          text: t("validFileFormatsImages"),
          icon: "warning",
          button: t("okLabel"),
        });
      }
    });
  };

  const MeasurementImg = (files) => {
    files.map((measureImg) => {
      if (
        measureImg.extension == "pdf" ||
        measureImg.extension == "xls" ||
        measureImg.extension == "xlsx"
      ) {
        const getFileSize = Math.round(measureImg.size / 1024);
        if (getFileSize > maxUploadFileSize) {
          Swal.fire({
            title: t("sizeExceededTitleAlert"),
            text: t("uploadFileTalidationText", {
              fileSize: maxUploadFileSize / 1024,
            }),
            icon: "warning",
            button: t("okLabel"),
          });
        } else {
          let responseData = uploadImageApiCall("MeasurementSheet", files);
          setMeasurementSheetImg(measureImg.name);
        }
      } else {
        Swal.fire({
          title: t("wrongFileFormat"),
          text: t("ValidFileFormatsDocuments"),
          icon: "warning",
          button: t("okLabel"),
        });
      }
    });
  };

  const PrintImage = (files) => {
    files.map((printImg) => {
      if (
        printImg.extension == "jpeg" ||
        printImg.extension == "jpg" ||
        printImg.extension == "png"
      ) {
        const getFileSize = Math.round(printImg.size / 1024);
        if (getFileSize > maxUploadFileSize) {
          Swal.fire({
            title: t("sizeExceededTitleAlert"),
            text: t("uploadFileTalidationText", {
              fileSize: maxUploadFileSize / 1024,
            }),
            // text: t("uploadFileWithinTextAlert1") + " " + (maxUploadFileSize / 1024) + " " + t("uploadFileWithinTextAlert2"),
            icon: "warning",
            button: t("okLabel"),
          });
        } else {
          let responseData = uploadImageApiCall("PrintImage", files);
          setPrintImg(printImg.name);
        }
      } else {
        Swal.fire({
          title: t("wrongFileFormat"),
          text: t("validFileFormatsImages"),
          icon: "warning",
          button: t("okLabel"),
        });
      }
    });
  };

  const MainLabelSample = (files) => {
    files.map((mainLabelSample) => {
      if (
        mainLabelSample.extension == "jpeg" ||
        mainLabelSample.extension == "jpg" ||
        mainLabelSample.extension == "png"
      ) {
        const getFileSize = Math.round(mainLabelSample.size / 1024);
        if (getFileSize > maxUploadFileSize) {
          Swal.fire({
            title: t("sizeExceededTitleAlert"),
            text: t("uploadFileTalidationText", {
              fileSize: maxUploadFileSize / 1024,
            }),
            // text: t("uploadFileWithinTextAlert1") + " " + (maxUploadFileSize / 1024) + " " + t("uploadFileWithinTextAlert2"),
            icon: "warning",
            button: t("okLabel"),
          });
        } else {
          let responseData = uploadImageApiCall("MainLabel", files);
          setMainLabelSampleImg(mainLabelSample.name);
        }
      } else {
        Swal.fire({
          title: t("wrongFileFormat"),
          text: t("validFileFormatsImages"),
          icon: "warning",
          button: t("okLabel"),
        });
      }
    });
  };

  const WashCareLabelSample = (files) => {
    files.map((washCareLabelSample) => {
      if (
        washCareLabelSample.extension == "jpeg" ||
        washCareLabelSample.extension == "jpg" ||
        washCareLabelSample.extension == "png"
      ) {
        const getFileSize = Math.round(washCareLabelSample.size / 1024);
        if (getFileSize > maxUploadFileSize) {
          Swal.fire({
            title: t("sizeExceededTitleAlert"),
            text: t("uploadFileTalidationText", {
              fileSize: maxUploadFileSize / 1024,
            }),
            // text: t("uploadFileWithinTextAlert1") + " " + (maxUploadFileSize / 1024) + " " + t("uploadFileWithinTextAlert2"),
            icon: "warning",
            button: t("okLabel"),
          });
        } else {
          let responseData = uploadImageApiCall("WashCareLabel", files);
          setWashCareLabelSampleImg(washCareLabelSample.name);
        }
      } else {
        Swal.fire({
          title: t("wrongFileFormat"),
          text: t("validFileFormatsImages"),
          icon: "warning",
          button: t("okLabel"),
        });
      }
    });
  };

  const HangtagSample = (files) => {
    files.map((hangtagSample) => {
      if (
        hangtagSample.extension == "jpeg" ||
        hangtagSample.extension == "jpg" ||
        hangtagSample.extension == "png"
      ) {
        const getFileSize = Math.round(hangtagSample.size / 1024);
        if (getFileSize > maxUploadFileSize) {
          Swal.fire({
            title: t("sizeExceededTitleAlert"),
            text: t("uploadFileTalidationText", {
              fileSize: maxUploadFileSize / 1024,
            }),
            // text: t("uploadFileWithinTextAlert1") + " " + (maxUploadFileSize / 1024) + " " + t("uploadFileWithinTextAlert2"),
            icon: "warning",
            button: t("okLabel"),
          });
        } else {
          let responseData = uploadImageApiCall("Hangtag", files);
          setHangtagSampleImg(hangtagSample.name);
        }
      } else {
        Swal.fire({
          title: t("wrongFileFormat"),
          text: t("validFileFormatsImages"),
          icon: "warning",
          button: t("okLabel"),
        });
      }
    });
  };

  const BarcodeStickersSample = (files) => {
    files.map((barcodeStickersSample) => {
      if (
        barcodeStickersSample.extension == "jpeg" ||
        barcodeStickersSample.extension == "jpg" ||
        barcodeStickersSample.extension == "png"
      ) {
        const getFileSize = Math.round(barcodeStickersSample.size / 1024);
        if (getFileSize > maxUploadFileSize) {
          Swal.fire({
            title: t("sizeExceededTitleAlert"),
            text: t("uploadFileTalidationText", {
              fileSize: maxUploadFileSize / 1024,
            }),
            // text: t("uploadFileWithinTextAlert1") + " " + (maxUploadFileSize / 1024) + " " + t("uploadFileWithinTextAlert2"),
            icon: "warning",
            button: t("okLabel"),
          });
        } else {
          let responseData = uploadImageApiCall("BarcodeStickers", files);
          setBarcodeStickersSampleImg(barcodeStickersSample.name);
        }
      } else {
        Swal.fire({
          title: t("wrongFileFormat"),
          text: t("validFileFormatsImages"),
          icon: "warning",
          button: t("okLabel"),
        });
      }
    });
  };

  const PolyBagSample = (files) => {
    files.map((polyBagSample) => {
      if (
        polyBagSample.extension == "jpeg" ||
        polyBagSample.extension == "jpg" ||
        polyBagSample.extension == "png"
      ) {
        const getFileSize = Math.round(polyBagSample.size / 1024);
        if (getFileSize > maxUploadFileSize) {
          Swal.fire({
            title: t("sizeExceededTitleAlert"),
            text: t("uploadFileTalidationText", {
              fileSize: maxUploadFileSize / 1024,
            }),
            // text: t("uploadFileWithinTextAlert1") + " " + (maxUploadFileSize / 1024) + " " + t("uploadFileWithinTextAlert2"),
            icon: "warning",
            button: t("okLabel"),
          });
        } else {
          let responseData = uploadImageApiCall("Polybag", files);
          setPolybagSampleImg(polyBagSample.name);
        }
      } else {
        Swal.fire({
          title: t("wrongFileFormat"),
          text: t("validFileFormatsImages"),
          icon: "warning",
          button: t("okLabel"),
        });
      }
    });
  };

  const CartonSample = (files) => {
    files.map((cartonSample) => {
      if (
        cartonSample.extension == "jpeg" ||
        cartonSample.extension == "jpg" ||
        cartonSample.extension == "png"
      ) {
        const getFileSize = Math.round(cartonSample.size / 1024);
        if (getFileSize > maxUploadFileSize) {
          Swal.fire({
            title: t("sizeExceededTitleAlert"),
            text: t("uploadFileTalidationText", {
              fileSize: maxUploadFileSize / 1024,
            }),
            // text: t("uploadFileWithinTextAlert1") + " " + (maxUploadFileSize / 1024) + " " + t("uploadFileWithinTextAlert2"),
            icon: "warning",
            button: t("okLabel"),
          });
        } else {
          let responseData = uploadImageApiCall("Carton", files);
          setCartonSampleImg(cartonSample.name);
        }
      } else {
        Swal.fire({
          title: t("wrongFileFormat"),
          text: t("validFileFormatsImages"),
          icon: "warning",
          button: t("okLabel"),
        });
      }
    });
  };
/****----------------- ****/ 

  /****------- Measurement Chart - Add Row ---------- ****/ 
  const addTableRows=()=>{
    setMeasurementChart([...measurementChart,measurementChart])
  };

    /****------- Measurement Chart - Remove Row ---------- ****/ 
  const deleteTableRows = (index)=>{
    const rows = [...measurementChart];
    rows.splice(index, 1);
    setMeasurementChart(rows);
  };
/****------- Getting Measurement Chart Data ---------- ****/ 
  const measurementChartData = () => {  
   var measureChart =[];
    for(let i=0;i<measurementChart.length;i++){
      var measurementChartRowData ={};
      measurementChartRowData['position'] = document.getElementById("position_"+i).value;
      measurementChartRowData['description'] = document.getElementById("description_"+i).value;
      measurementChartRowData['tolerance'] = document.getElementById("tolerance_"+i).value;
      size.map((sizeMapData)=>{
        measurementChartRowData[sizeMapData.name]=document.getElementById(i+"_size_id_"+sizeMapData.id).value;
      });
      measureChart.push(measurementChartRowData);
    }
    return measureChart;
  };

  // const sizeTotal = (value, index) => 
  // {
  //   var sum = 0;
  //   size.map((mapData) => 
  //   {
  //      sum += Number( document.getElementById(index+"_size_id_"+mapData.id).value)
  //   });

  //   document.getElementById("overall_total"+index).value  =  sum ? sum : "0";
  // };


  /****------- Inquiry Form Data Submission - Save ---------- ****/ 
  const submitInquiryForm = (e) => {  
    let retval = validation();
    if (Object.keys(retval).length == 0) {
      let measure_chart_array = measurementChartData();
      let sku = getQtyDetails();
      var inquiryFormInputParams = {};
      inquiryFormInputParams["company_id"] = getLoginCompanyId;
      inquiryFormInputParams["workspace_id"] = getWorkspaceId;
      inquiryFormInputParams["user_id"] = UserId;
      inquiryFormInputParams["article_id"] = article;
      inquiryFormInputParams["style_no"] = styleNo;
      inquiryFormInputParams["fabric_type_id"] = fabricCom;
      inquiryFormInputParams["fabric_type"]= fabricType;
      inquiryFormInputParams["fabric_GSM"] = fabricGSM;
      inquiryFormInputParams["yarn_count"] = yarnCount;
      inquiryFormInputParams["style_article_description"] = styleArtcileDesc;
      inquiryFormInputParams["special_finish"] = specialFinishes;
      inquiryFormInputParams["total_qty"] = totalQuantity;
      inquiryFormInputParams["patterns"] = patterns;
      inquiryFormInputParams["jurisdiction"] = placesOfJurisdiction;
      inquiryFormInputParams["customs_declaraion_document"] = customsDeclarationDoc;
      inquiryFormInputParams["penality"] = penalty;
      inquiryFormInputParams["print_image"] = printImage;
      inquiryFormInputParams["print_size"] = printSize;
      inquiryFormInputParams["print_type"] = printType;
      inquiryFormInputParams["print_no_of_colors"] = noOfColors;
      inquiryFormInputParams["main_lable"] = mainLabel;
      inquiryFormInputParams["washcare_lable"] = washCareLabel;
      inquiryFormInputParams["hangtag_lable"] = hangtag;
      inquiryFormInputParams["barcode_lable"] = barcodeStickers; 
      inquiryFormInputParams["trims_nominations"] = trimsNotification;
      inquiryFormInputParams["poly_bag_size"] = polybagSizeThickness;
      inquiryFormInputParams["poly_bag_material"] = polybagMaterial;
      inquiryFormInputParams["carton_bag_dimensions"] = cartonBoxDimension;
      inquiryFormInputParams["carton_color"] = cartonColors;
      inquiryFormInputParams["carton_material"] = cartonMaterial;
      inquiryFormInputParams["carton_edge_finish"] = cartonEdgeFinish;
      inquiryFormInputParams["carton_mark"] = cartonMarkDetails;
      inquiryFormInputParams["make_up"] = makeUp;
      inquiryFormInputParams["films_cd"] = flimsCD;
      inquiryFormInputParams["picture_card"] = pictureCard;
      inquiryFormInputParams["inner_cardboard"] = innerCardBoard;
      inquiryFormInputParams["shipping_size"] = shippingSize;
      inquiryFormInputParams["air_frieght"] = airFrieght;
      inquiryFormInputParams["estimate_delivery_date"] = estimatedDeliveryDate;
      inquiryFormInputParams["due_date"] = inquiryDueDate;
      inquiryFormInputParams["incoterms"] = incomeTerm;
      inquiryFormInputParams["payment_terms"] = paymentTerm;
      inquiryFormInputParams["target_price"] = targetPrice;
      inquiryFormInputParams["forbidden_substance_info"] = forbiddenSubstancesInfo;
      inquiryFormInputParams["testing_requirements"] = testingRequirement;
      inquiryFormInputParams["sample_requirements"] = sampleRequirement;
      inquiryFormInputParams["special_requests"] = specialRequest;
      inquiryFormInputParams["currency"] = currency;
      inquiryFormInputParams["sku_details"] = sku;
      inquiryFormInputParams["referenceId"] = referenceId.toString();
      inquiryFormInputParams['measurement_Chart']= measure_chart_array;
      axios
        .post(ServerUrl + "/save-inquiry", inquiryFormInputParams)
        .then((response) => {
          if (response.data.status_code === 200) {
            Swal.fire({
              title: t(response.data.message),
              icon: "success",
              button: t("okLabel"),
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/inquiry/viewinquiry";
              }
            });
          }
          if (response.data.status_code === 401) {
            Swal.fire({
              title:
                response.data.errors.article_id ||
                response.data.errors.style_no ||
                response.data.errors.fabric_type_id ||
                response.data.errors.total_qty,
              text: t("fieldMissing"),
              icon: "Warning",
              button: t("tryAgain"),
            });
          }
        });
    }
  };

  return (
    <Fragment>
      <Row className="pgbgcolor">
        <Breadcrumbs
          mainTitle={t("inquiry")}
          parent={t("inquiry")}
          title={t("inquiry")}
        />
      </Row>
      <Container fluid={true} className="general-widget topaln">
        <Col >
          <Card>
            {/* Tab Design */}
            <CardBody className="myHeader" id="myHeader">
            <Row className="u-steps" style={{ cursor: 'pointer' }}>        
              <Col  className="u-step activeTab" onClick={() => scrollToSection(basicinfo)}>               
                <div className="u-step-desc" >
                  <span className="u-step-title">
                  {t("basicInformation")}
                    </span>                 
                </div>
              </Col>
                 
              <Col  className="u-step activeTab"  onClick={() => scrollToSection(fabricinfo)}>                
                <div className="u-step-desc">
                  <span className="u-step-title">{t("fabricInformation")}</span>                 
                </div>
              </Col>
         
              <Col className="u-step activeTab" onClick={() => scrollToSection(printinfo)}>                
                <div className="u-step-desc"  >
                  <span className="u-step-title">{t("printInformation")}</span>
                </div>
              </Col>
              
              <Col className="u-step activeTab" onClick={() => scrollToSection(trimsinfo)}>                
                <div className="u-step-desc"  >
                  <span className="u-step-title">{t("trimsInformation")}</span>                 
                </div>
              </Col>
          
              <Col  className="u-step activeTab" onClick={() => scrollToSection(packinginfo)}>                
                <div className="u-step-desc"  >
                  <span className="u-step-title">{t("packingInformation")}</span>                  
                </div>
              </Col>

              <Col  className="u-step activeTab" onClick={() => scrollToSection(othersinfo)}>                
                <div className="u-step-desc"  >
                  <span className="u-step-title">{t("others")}</span>                  
                </div>
              </Col>
            </Row>
            </CardBody>

            <CardBody className="contenthb">            
              <Form>             
                <div ref={basicinfo} className="basicinfo m-t-20">
                <Row className="g-12">
                  <Col lg="12" md="12" sm="12" xs="12">
                    <span>
                      <H6 className="ordersubhead">{t("basicInfo")}</H6>
                    </span>
                  </Col>
                </Row>
                <Col lg="12">
                  <Row>
                    {/* Article Name, Style Number ,Sample Image*/}

                    <Col lg="4">
                      <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>
                          {t("articleName")}
                        </Label>
                        <sup className="font-danger">*</sup>
                        <InputGroup>
                          <Input
                            className=""
                            name="article"
                            type="select"
                            defaultValue=""
                            onChange={(e) => setArticle(e.target.value)}
                          >
                            <option Value="" disabled>
                              {t("selectArticle")}
                            </option>

                            {articles.map((article) => (
                              <option value={article.id}>{article.name}</option>
                            ))}
                          </Input>
                          <InputGroupText
                            style={{ cursor: "pointer" }}
                            onClick={toggleart}
                          >
                            {/* <span className="btn" onClick="" > */}
                            <img
                              src={addIcon}
                              width="15px"
                              height="15px"
                              onClick={toggleart}
                            ></img>
                            {/* </span> */}
                          </InputGroupText>

                          <AddArticleModal
                            modal={modalArt}
                            toggle={toggleart}
                            companyId={company_id}
                            workspaceId={workspace_id}
                            article={setArticles}
                          />
                        </InputGroup>
                        {validerrors.article && (
                          <span className="error-msg">
                            {validerrors.article}
                          </span>
                        )}
                      </FormGroup>
                    </Col>

                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("styleNo")}</Label>
                        <sup className="font-danger">*</sup>
                        <InputGroup>
                          <Input
                            className=""
                            name="style Number"
                            placeholder={t("enterStyleNumber")}
                            onChange={(e) => setStyleNo(e.target.value)}
                          ></Input>
                        </InputGroup>
                        {validerrors.styleNo && (
                          <span className="error-msg">
                            {validerrors.styleNo}
                          </span>
                        )}
                      </FormGroup>
                    </Col>

                    <Col lg="4">
                      <FormGroup>
                        <Label style={{ color: "#5F5F5F" }}>
                          {t("sampleFormat")}
                        </Label>
                        <InputGroup>
                          <Input
                            className=""
                            name="Sample Image"
                            value={sampleFormatImg ? sampleFormatImg : ""}
                            placeholder={t("attachSampleFormat")}
                            onchange={(e) => setSampleFormat(e.target.value)}
                            disabled
                          ></Input>

                          <Files
                            className="files-dropzone fileContainer"
                            accept=".png,.jpg,.jpeg"
                            multiple={false}
                            canCancel={false}
                            onChange={SampleFormatImg}                 
                            clickable
                          >
                            <InputGroupText className=" btn imgBackground">
                              <img
                                src={imgUpload}
                                width="25px"
                                height="25px"
                                type="file"
                              ></img>
                              
                            </InputGroupText>
                          </Files>
                          {/* {files.length > 0 ?
                                                            <span className="ritemargine" style={{ float: "Center" }} >

                                                                <Btn attrBtn={{ className: "mt-2", color: 'primary', type: "button", onClick: () => deleteFile(files) }} >
                                                                    {t("delete")}
                                                                </Btn></span> : " "}  */}
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                </div>
                {/* Fabric Composition,Fabric GSM, */}
                <div ref={fabricinfo} className="fabricinfo">
                <Row className="g-12">
                  <Col lg="12" md="12" sm="12" xs="12">
                    <span>
                      <H6 className="ordersubhead">{t("fabricInfo")}</H6>
                    </span>
                  </Col>
                </Row>
                <Col lg="12">
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("fabricComposition")}</Label>
                        <sup className="font-danger">*</sup>
                        <InputGroup>
                          <Input
                            className=""
                            name="fabric"
                            type="select"
                            defaultValue=""
                            onChange={(e) => setFabricCom(e.target.value)}
                          >
                            <option Value="" disabled>
                              {t("selectFabricComposition")}
                            </option>
                            {fabrics.map((fabric) => (
                              <option value={fabric.id}>{fabric.name}</option>
                            ))}
                          </Input>
                          <InputGroupText
                            style={{ cursor: "pointer" }}
                            onClick={togglefabric}
                          >
                            {/* <span className="btn" onClick="" > */}
                            <img
                              src={addIcon}
                              width="15px"
                              height="15px"
                              onClick={togglefabric}
                            ></img>
                            {/* </span> */}
                          </InputGroupText>
                        </InputGroup>
                        {validerrors.fabricCom && (
                          <span className="error-msg">
                            {validerrors.fabricCom}
                          </span>
                        )}
                        <AddFabricModal
                          modal={modalfabric}
                          toggle={togglefabric}
                          companyId={company_id}
                          workspaceId={workspace_id}
                          fabric={setFabrics}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("fabricGSM")}</Label>
                        <InputGroup>
                          <Input
                            className=""
                            name="Fabric GSM"
                            placeholder={t("enterFabricGSM")}
                            onChange={(e) => setFabricGSM(e.target.value)}
                          ></Input>
                          {/* <option Value="">Select Fabric GSM</option>
                    <option Value="">Mon</option> 
                    <option value=""> Tues</option>
                    </Input>
                    <InputGroupText >
                    
                      <img src={addIcon} width="15px" height="15px"></img>
                    
                    </InputGroupText> */}
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    {/* Sample Format Image Preview */}
                    <Col lg="4">
                      {fileSampleFormat.length > 0 ? 
                          fileSampleFormat.map((file) => (
                            <>
                              <div className="profile-pic">
                                <img
                                  src={awsUrl + file.filepath}
                                  width="100px"
                                  height="100px"
                                  className="m-10"
                                />
                                 <div className="edit m-t-30 m-r-30">
                                  <img 
                                    src={deleteIcon} 
                                    width="30px" 
                                    height="30px" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={()=>
                                      {
                                        deleteImageFiles("SampleFormat", file)
                                      }
                                      }
                                  />                               
                                 </div>
                              </div>                                                                                              
                            </>
                          ))
                      : (
                        <div>{''}</div>
                      )}
                    </Col>
                  </Row>
                </Col>

                {/* Fabric Type,Yarn Count,Target Price */}

                <Row>
                <Col lg="4">
                    <FormGroup>
                      <Label>{t("fabricType")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Yarn Count"
                          placeholder={t("enterFabricType")}
                          onChange={(e) => setFabricType(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("yarnCount")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Yarn Count"
                          placeholder={t("enterYarnCount")}
                          onChange={(e) => setYarnCount(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>

                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("inquiryDueDate")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Inquiry Due Date"
                          type="date"
                          placeholder={t("selectInquiryDueDate")}
                          onChange={(e) => setInquiryDueDate(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                {/* Incoterms,Payment Terms,Inquiry Due Date */}

                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("incomeTerms")}</Label>
                      <InputGroup>
                        <Input
                          type="select"
                          // placeholder={t("selectStatus")}
                          className="form-control digits selectheight"
                          name="Income Terms"
                          defaultValue=""
                          onChange={(e) => setIncomeTerm(e.target.value)}
                        >
                          <option Value="" disabled>
                            {t("selectIncomeTerms")}
                          </option>
                          {incomeTerms.map((incomeTerm) => (
                            <option
                              value={incomeTerm.id}
                              title={incomeTerm.description}
                            >
                              {incomeTerm.name}
                            </option>
                          ))}
                        </Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>                
                  <Col lg="4">
                    <FormGroup>
                      <Label> {t("currency")} </Label>
                      <InputGroup>
                        <Input
                          type="select"
                          className="form-control digits selectheight"
                          name="Currency"
                          defaultValue=""
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          <option value="" disabled>
                            {t("selectCurrency")}
                          </option>
                          {currencies.map((currency) => (
                            <option value={currency.symbol}>
                              {currency.symbol + " " + currency.name}
                            </option>
                          ))}
                        </Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("targetPrice")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Target Price"
                          placeholder={t("enterTargetPrice")}
                          onChange={(e) => setTargetPrice(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6" >
                    <FormGroup>
                      <Label className="form-label">{t("paymentTerms")}</Label>
                      <span
                        className="m-l-20"
                        style={{ cursor: "pointer" }}
                        value
                        onClick={() => {
                          checkedVal("PaymentTerms");
                        }}
                      >
                        {" "}
                        <img src={infoIcon} width="25px" height="25px"></img>
                      </span>
                      <CKEditors
                        className="p10 ck"
                        id="PaymentTerms"
                        name="PaymentTerms"
                        content={paymentTerm}
                        events={{
                          change: onChangePaymentTerms
                        }}
                        config={{
                          height: 100,
                          toolbar: [
                            [
                              "Bold",
                              "Italic",
                              "NumberedList",
                              "BulletedList",
                              "Strike"
                            ],
                            [
                              "Cut",
                              "Copy",
                              "Paste",
                              "Pasteasplaintext",
                              "FormattingStyles",
                              "Undo",
                              "Redo",
                            ],
                            [
                              "List",
                              "Indent",
                              "Blocks",
                              "Align",
                              "Bidi",
                              "Paragraph",
                            ],
                            [ 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor'],
                            ["Find", "Selection", "Spellchecker", "Editing"],
                          ],
                          
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* Style/Article Description,Special Finishers -if any */}

                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <Label className="form-label">
                        {t("styleArticleDescription")}
                      </Label>

                      <CKEditors
                        FontColor
                        activeclassName="p10"
                        content={styleArtcileDesc}
                        events={{
                          change: onChangeArticleDescription,
                        }}
                        rows="5"
                        // onchange ={(e) => setStyleArticleDesc(e.target.value)}
                        config={{
                          height: 100,
                          toolbar: [
                            [
                              "Bold",
                              "Italic",
                              "NumberedList",
                              "BulletedList",
                              "Strike",
                            ],
                            [
                              "Cut",
                              "Copy",
                              "Paste",
                              "Pasteasplaintext",
                              "FormattingStyles",
                              "Undo",
                              "Redo",
                            ],
                            [
                              "List",
                              "Indent",
                              "Blocks",
                              "Align",
                              "Bidi",
                              "Paragraph",
                            ],
                            ["Find", "Selection", "Spellchecker", "Editing"],
                          ],
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Label className="form-label">
                        {t("specialFinishers")}
                      </Label>

                      <CKEditors
                        activeclassName="p10"
                        events={{
                          change: onChangeSpecialFinshers,
                        }}
                        content={specialFinishes}
                        config={{
                          height: 100,
                          toolbar: [
                            [
                              "Bold",
                              "Italic",
                              "NumberedList",
                              "BulletedList",
                              "Strike",
                            ],
                            [
                              "Cut",
                              "Copy",
                              "Paste",
                              "Pasteasplaintext",
                              "FormattingStyles",
                              "Undo",
                              "Redo",
                            ],
                            [
                              "List",
                              "Indent",
                              "Blocks",
                              "Align",
                              "Bidi",
                              "Paragraph",
                            ],
                            ["Find", "Selection", "Spellchecker", "Editing"],
                          ],
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>

                  {/* Total Quantity,Color,Size */}
                  <Col lg="4">
                    <FormGroup>
                      <Label> {t("totalQuantity")}</Label>
                      <sup className="font-danger">*</sup>
                      <InputGroup>
                        <Input
                          className=""
                          name="Total Quantity"
                          placeholder={t("enterTotalQuantity")}
                          onChange={(e) => setTotalQuantity(e.target.value)}
                        ></Input>
                        <InputGroupText>                         
                          <img
                            src={quantity}
                            width="15px"
                            height="15px"
                            type="file"
                          ></img>                          
                        </InputGroupText>
                      </InputGroup>
                      {validerrors.totalQuantity && (
                        <span className="error-msg">
                          {validerrors.totalQuantity}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("color")}</Label>
                      <InputGroup>
                        <Input
                          type="select"
                          className="js-example-basic-single form-control"
                          isMulti
                          onChange={(e) => {
                            handleChangeColor(e);
                          }}
                        >
                          <option selected disabled>
                            {t("selectColor")}
                          </option>
                          {getColor.map((colorList) => (
                            <option key={colorList.id} value={colorList.id}>
                              {colorList.name}
                            </option>
                          ))}
                        </Input>
                        <InputGroupText
                          style={{ cursor: "pointer" }}
                          onClick={toggleclr}
                        >
                          <img
                            src={addIcon}
                            width="15px"
                            height="15px"
                            onClick={toggleclr}
                          ></img>
                        </InputGroupText>
                        <AddColorModal
                          modal={modalClr}
                          toggle={toggleclr}
                          inputParams={getInputParams}
                          color={setGetColor}
                        />
                      </InputGroup>
                    </FormGroup>
                    {showColor.map((colour, i) => (
                      <span
                        className="btn btn-primary m-r-5 m-t-5 p-b-10"
                        id={colour}
                        name={colour}
                        onClick={(e) => deleteColor(e)}
                      >
                        {colour}
                      </span>
                    ))}
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("size")}</Label>
                      <InputGroup>
                        <Input
                          type="select"
                          className="js-example-basic-single form-control"
                          onChange={(e) => {
                            handleChangeSize(e);
                          }}
                        >
                          <option selected disabled>
                            {t("selectSize")}
                          </option>
                          {getSize.map((sizeList) => (
                            <option
                              key={sizeList.id}
                              value={sizeList.id}
                              attr-name={sizeList.name}
                            >
                              {sizeList.name}
                            </option>
                          ))}
                        </Input>
                        <InputGroupText
                          style={{ cursor: "pointer" }}
                          onClick={togglesize}
                        >
                          <img
                            src={addIcon}
                            width="15px"
                            height="15px"
                            onClick={togglesize}
                          ></img>
                        </InputGroupText>
                        <AddSizeModal
                          modal={modalSize}
                          toggle={togglesize}
                          inputParams={getInputParams}
                          size={setGetSize}
                        />
                      </InputGroup>
                    </FormGroup>
                    {showSize.map((sizes) => (
                      <span
                        className="btn btn-primary m-r-5 m-t-5 p-b-20"
                        id={sizes}
                        onClick={(e) => deleteSize(e)}
                      >
                        {sizes}
                      </span>
                    ))}
                  </Col>
                </Row>

                {/* Color,Size table View */}

                {color.length > 0 && size.length > 0 ? (
                  <>
                    <Row className="g-12">
                      <Col lg="12" md="12" sm="12" xs="12">
                        <span className="subTitleLine3 f-left">
                          <H6 className="ordersubhead">
                            {t("addQuantityRatio")}
                          </H6>
                        </span>
                      </Col>
                    </Row>
                    <Row className="p-b-20">
                      <Col md="12" lg="12" sm="12">
                        <Row className="g-12">
                          <div className="table-responsive">
                            <form id="countQty">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th scope="col">
                                      {" "}
                                      {t("color/sizeLabel")}{" "}
                                    </th>
                                    {size.map((option) => {
                                      return (
                                        <th className="middle">
                                          {" "}
                                          {option.name}
                                        </th>
                                      );
                                    })}
                                    <th scope="col">{t("totalLabel")}</th>{" "}
                                  </tr>
                                </thead>
                                <tbody>
                                  {color.map((optionc) => {
                                    return (
                                      <tr>
                                        <th className="middle">
                                          {optionc.name}
                                        </th>
                                        {size.map((option) => {
                                          return (
                                            <th>
                                              <Row>
                                                <Row>
                                                  <Table className="table table-striped">
                                                    <tr>
                                                      <td>
                                                        <table>
                                                          <tbody className="f-w-600 text-center">
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  padding:
                                                                    "0.1em",
                                                                }}
                                                              >
                                                                <input
                                                                  style={{
                                                                    width:
                                                                      "90px",
                                                                  }}
                                                                  className=" form-control inpwidthsmall middle"
                                                                  name="userName"
                                                                  id={
                                                                    optionc.id +
                                                                    "#" +
                                                                    option.id
                                                                  }
                                                                  type="number"
                                                                  placeholder="0"
                                                                  autocomplete="off"
                                                                  min="0"
                                                                  onChange={(
                                                                    e
                                                                  ) => {
                                                                    addQty(e);
                                                                  }}
                                                                  onKeyDown={
                                                                    handleEnter
                                                                  }
                                                                  onKeyPress={(
                                                                    e
                                                                  ) =>
                                                                    handleKeyPress(
                                                                      e
                                                                    )
                                                                  }
                                                                />

                                                                <input
                                                                  type="hidden"
                                                                  style={{
                                                                    width:
                                                                      "90px",
                                                                  }}
                                                                  id={
                                                                    optionc.id +
                                                                    "+" +
                                                                    option.id
                                                                  }
                                                                  className=" form-control inpwidthsmall"
                                                                  readOnly
                                                                />
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  padding:
                                                                    "0.1em",
                                                                }}
                                                                className="showperqty"
                                                              >
                                                                <span
                                                                  id={
                                                                    optionc.id +
                                                                    "v" +
                                                                    option.id
                                                                  }
                                                                  className="showperqty"
                                                                ></span>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                      <td>
                                                        <input
                                                          type="hidden"
                                                          style={{
                                                            width: "90px",
                                                            marginLeft: "10px",
                                                          }}
                                                          id={
                                                            optionc.id +
                                                            "@" +
                                                            option.id
                                                          }
                                                          className=" form-control inpwidthsmall"
                                                          readOnly
                                                        />
                                                      </td>
                                                    </tr>
                                                  </Table>
                                                </Row>
                                              </Row>
                                            </th>
                                          );
                                        })}
                                        <th>
                                          <input
                                            className="form-control inpwidthsmall mt-3"
                                            name="totalQuantity"
                                            type="number"
                                            readOnly
                                            placeholder={t("totalQty")}
                                            id={"totqty_" + optionc.id}
                                          />
                                        </th>
                                      </tr>
                                    );
                                  })}

                                  <tr>
                                    <th></th>
                                    {size.map((data) => {
                                      return (
                                        <>
                                          <th>
                                            <input
                                              className="form-control inpwidthsmall"
                                              id={
                                                "SizeId_total_quantity" +
                                                data.id
                                              }
                                              type="number"
                                              placeholder="0"
                                              autocomplete="on"
                                              readOnly
                                              onKeyDown={handleEnter}
                                            />
                                          </th>
                                        </>
                                      );
                                    })}
                                    <th>
                                      <input
                                        className="form-control inpwidthsmall"
                                        id="Overall_total_quantity"
                                        type="number"
                                        placeholder="0"
                                        autocomplete="off"
                                        readOnly
                                      />
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </form>
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <div></div>
                )}

                {/* Measuement Show based on sku*/}
                {color.length > 0 && size.length > 0 ? (
                  <>
                  <Row  className="g-12">
                    <Col lg="12" md="12" sm="12" xs="12">
                      <span className="subTitleLine3 f-left">
                        <H6 className="ordersubhead">
                          {t("measurementChart")}
                        </H6>
                      </span>
                    </Col>
                  </Row>
                  <Row className="p-b-20">
                    <Col md="12" lg="12" sm="12">
                      <Row className="g-12">
                        <div className="table-responsive">
                        
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">{t("position")}</th>
                                  <th scope="col" colSpan="3">{t("description")}</th>
                                  <th scope="col">{t("tolerance")}</th>
                                  {size.map((option) => {
                                    return (
                                      <th scope="col">
                                        {" "}
                                        {option.name}
                                      </th>
                                    );
                                  })}
                                  <th>                       
                                    <div 
                                    className="btn btn-outline-success" 
                                    onClick={()=>addTableRows()}>+</div>
                                  
                                </th>
                                </tr>
                              </thead>
                                {measurementChart.map((measureChart, index)=>
                                {
                                const {position, 	description, tolerance} = measureChart;
                                return(
                                  <>
                                  <tbody id="measurementshow">
                                  <tr key={index}>
                                  <td>
                                    <input
                                        className="form-control "
                                        id={"position_"+index}
                                        type="text"
                                        autocomplete="on"
                                        value={position}
                                        onKeyDown={handleEnter}
                                      />
                                    </td>
                                  <td  colSpan="3">
                                    <input
                                      className="form-control "
                                      id={"description_"+index}
                                      type="text"
                                      autocomplete="on"
                                      value={description}
                                      onKeyDown={handleEnter}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control "
                                      id={"tolerance_"+index}
                                      type="text"
                                      autocomplete="on"
                                      value={tolerance}
                                      onKeyDown={handleEnter}
                                    />
                                  </td>
                                  {size.map((sizeMapData) => {
                                  
                                    return (
                                      <td>
                                      <input
                                        className="form-control "
                                        id={index+"_size_id_"+sizeMapData.id}
                                        type="text"
                                        autocomplete="on"
                                        onKeyDown={handleEnter}
                                      />
                                    </td>
                                    );
                                  })}
                                  <td>
                                    <div className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>-</div>
                                  </td>
                                </tr>
                              </tbody> 
                                  </>
                                  )
                                }
                                )}                                             
                            </table>
                          
                        </div>
                      </Row>
                    </Col>
                  </Row>
                  </>):(<div></div>)} 
                  <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label> {t("measurementSheet")} </Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Measurement Sheet"
                          value={measurementSheetImg ? measurementSheetImg : ""}
                          placeholder={t("attachMeasurementSheet")}
                          onChange={(e) => setMeasurementSheet(e.target.value)}
                          disabled
                        ></Input>
                        <Files
                          className="files-dropzone fileContainer"
                          accept=".docx,.doc,.xls,.xlsx,.txt,.pdf"
                          multiple={false}
                          canCancel={false}
                          onChange={MeasurementImg}
                          clickable
                        >
                          <InputGroupText className=" btn imgBackground">
                            <img
                              src={docIcon}
                              width="25px"
                              height="25px"
                              type="file"
                            ></img>
                          </InputGroupText>
                        </Files>
                      </InputGroup>
                    </FormGroup>
                  </Col>
</Row>
                {/* Patterns,Place of Jurisdiction,Customs Declaration Document */}

                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("patterns")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Patterns"
                          placeholder={t("enterPatterns")}
                          onChange={(e) => setPatterns(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>

                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("placeofJurisdiction")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Place of Jurisdiction"
                          placeholder={t("enterPlaceofJurisdiction")}
                          onChange={(e) =>
                            setPlaceOfJurisdiction(e.target.value)
                          }
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>

                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("customsDeclarationDocument")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Customs Declaration Document"
                          placeholder={t("enterCustomsDeclarationDocument")}
                          onChange={(e) =>
                            setCustomsDeclarationDoc(e.target.value)
                          }
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                {/* Penalty */}

                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("penaltyLabel")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Penalty"
                          placeholder={t("enterPenalty")}
                          onChange={(e) => setPenalty(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                </div>
                {/* Print Information:Print Type,Print Price,No of Colors */}
                <div ref={printinfo} className="printinfo">
                <Row className="g-12">
                  <Col lg="12" md="12" sm="12" xs="12">
                    <span>
                      <H6 className="ordersubhead">{t("printInformation")}</H6>
                    </span>
                  </Col>
                </Row>

                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("printType")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Print Type"
                          placeholder={t("enterPrintType")}
                          onChange={(e) => setPrintType(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("printSize")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Print Size"
                          placeholder={t("enterPrintSize")}
                          onChange={(e) => setPrintSize(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("noOfColors")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="No of Colors"
                          placeholder={t("enterNumberofcolors")}
                          onChange={(e) => setNoOfColors(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                {/* Print Information: Print Image */}

                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("printImage")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Print Image"
                          placeholder={t("attachPrintImage")}
                          value={printImg ? printImg : ""}
                          onChange={(e) => setPrintImage(e.target.value)}
                          disabled
                        ></Input>
                        <Files
                          className="files-dropzone fileContainer"
                          accept=".png,.jpg,.jpeg"
                          multiple={false}
                          canCancel={false}
                          onChange={PrintImage}
                          clickable
                        >
                          <InputGroupText className=" btn imgBackground">
                            <img
                              src={imgUpload}
                              width="25px"
                              height="25px"
                              type="file"
                            ></img>
                          </InputGroupText>
                        </Files>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    {filePrintImage.length > 0 ? (
                          filePrintImage.map((file) => (
                            <>
                             <div className="profile-pic">
                              <img
                                src={awsUrl + file.filepath}
                                width="100px"
                                height="100px"
                                className="m-10"
                              />
                              <div className="edit m-t-30 m-r-30">
                                  <img 
                                    src={deleteIcon} 
                                    width="30px" 
                                    height="30px" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={()=>
                                      {
                                        deleteImageFiles("PrintImage", file)
                                      }
                                      }
                                  />
                                
                                 </div>
                              </div>
                            </>
                          ))
                    ) : (
                      <div>{''}</div>
                    )}
                  </Col>
                  <Col lg="4"></Col>
                </Row>
                </div>
                {/* Trims Information: Main Label,Main Label Sample */}
                <div ref={trimsinfo} className="printinfo">
                <Row className="g-12">
                  <Col lg="12" md="12" sm="12" xs="12">
                    <span>
                      <H6 className="ordersubhead">{t("trimsInformation")}</H6>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("mainLabel")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Main Label"
                          placeholder={t("enterMainLabel")}
                          onChange={(e) => setMainLabel(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("mainLabelSample")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Main Label Sample"
                          placeholder={t("attachMainLabelSample")}
                          value={mainLabelSampleImg ? mainLabelSampleImg : ""}
                          onChange={(e) => {
                            setMainLabelSampleImg(e.target.value);
                          }}
                          disabled
                        ></Input>
                        <InputGroupText className=" btn imgBackground">
                          <Files
                            className="files-dropzone fileContainer"
                            accept=".png,.jpg,.jpeg"
                            multiple={false}
                            canCancel={false}
                            onChange={MainLabelSample}
                            clickable
                          >
                            <img
                              src={imgUpload}
                              width="25px"
                              height="25px"
                              type="file"
                            ></img>
                          </Files>
                        </InputGroupText>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    {fileMainLabel.length > 0 ? (
                     
                        fileMainLabel.map((file) => (
                          <>
                          <div className="profile-pic">
                            <img
                              src={awsUrl + file.filepath}
                              width="100px"
                              height="100px"
                              className="m-10"
                            />
                            <div className="edit m-t-30 m-r-30">
                                  <img 
                                    src={deleteIcon} 
                                    width="30px" 
                                    height="30px" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={()=>
                                      {
                                        deleteImageFiles("MainLabel", file)
                                      }
                                      }
                                  />                                
                            </div>
                          </div>
                          </>
                        ))
                     
                    ) : (
                      <div>{''}</div>
                    )}
                  </Col>
                </Row>

                {/* Trims Information : Wash Care Label,Wash Care Label Sample */}

                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("washCareLabel")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Wash Care Label"
                          placeholder={t("enterWashCareLabel")}
                          onChange={(e) => setWashCareLabel(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("washCareLabelSample")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Wash Care Label Sample"
                          placeholder={t("attachWashCareLabelSample")}
                          value={
                            washCareLabelSampleImg ? washCareLabelSampleImg : ""
                          }
                          onChange={(e) =>
                            setWashCareLabelSampleImg(e.target.value)
                          }
                          disabled
                        ></Input>
                        <Files
                          className="files-dropzone fileContainer"
                          accept=".png,.jpg,.jpeg"
                          multiple={false}
                          canCancel={false}
                          onChange={WashCareLabelSample}
                          clickable
                        >
                          <InputGroupText className=" btn imgBackground">
                            <img
                              src={imgUpload}
                              width="25px"
                              height="25px"
                              type="file"
                            ></img>
                          </InputGroupText>
                        </Files>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    {fileWashCareLabel.length > 0 ? (
                      
                        fileWashCareLabel.map((file) => (
                          <>
                          <div className="profile-pic">
                              <img
                                src={awsUrl + file.filepath}
                                width="100px"
                                height="100px"
                                className="m-10"
                              />
                              <div className="edit m-t-30 m-r-30">
                                    <img 
                                      src={deleteIcon} 
                                      width="30px" 
                                      height="30px" 
                                      style={{ cursor: 'pointer' }} 
                                      onClick={()=>
                                        {
                                          deleteImageFiles("WashCareLabel", file)
                                        }
                                        }
                                    />
                                  
                              </div>
                          </div>
                          </>
                        ))
                      
                    ) : (
                      <div>{''}</div>
                    )}
                  </Col>
                </Row>

                {/* Trims Information : Hangtag,Hangtag Sample */}
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("hangtag")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Hangtag"
                          placeholder={t("enterHangtag")}
                          onChange={(e) => setHangtag(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("hangtagSample")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Hangtag Sample"
                          placeholder={t("attachHangtagSample")}
                          value={hangtagSampleImg ? hangtagSampleImg : ""}
                          onChange={(e) => setHangtagSampleImg(e.target.value)}
                          disabled
                        ></Input>
                        <Files
                          className="files-dropzone fileContainer"
                          accept=".png,.jpg,.jpeg"
                          multiple={false}
                          canCancel={false}
                          onChange={HangtagSample}
                          clickable
                        >
                          <InputGroupText className=" btn imgBackground">
                            <img
                              src={imgUpload}
                              width="25px"
                              height="25px"
                              type="file"
                            ></img>
                          </InputGroupText>
                        </Files>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    {fileHangtag.length > 0 ? ( 
                        fileHangtag.map((file) => (
                          <>
                            <div className="profile-pic">
                              <img
                                src={awsUrl + file.filepath}
                                width="100px"
                                height="100px"
                                className="m-10"
                              />
                            <div className="edit m-t-30 m-r-30">
                                  <img 
                                    src={deleteIcon} 
                                    width="30px" 
                                    height="30px" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={()=>
                                      {
                                        deleteImageFiles("Hangtag", file)
                                      }
                                      }
                                  />
                                
                                 </div>
                            </div>
                          </>
                        ))
                     
                    ) : (
                      <div>{''}</div>
                    )}
                  </Col>
                </Row>

                {/* Trims Information : Barcode Stickers,Barcode Stickers Sample */}

                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("barcodeStickers")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Barcode Stickers"
                          placeholder={t("enterBarcodestickers")}
                          onChange={(e) => setBarcodeStickers(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("barcodeStickersSample")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Barcode Stickers Sample"
                          placeholder={t("attachBarcodeStickersSample")}
                          value={
                            barcodeStickersSampleImg
                              ? barcodeStickersSampleImg
                              : ""
                          }
                          onChange={(e) =>
                            setBarcodeStickersSampleImg(e.target.value)
                          }
                          disabled
                        ></Input>
                        <Files
                          className="files-dropzone fileContainer"
                          accept=".png,.jpg,.jpeg"
                          multiple={false}
                          canCancel={false}
                          onChange={BarcodeStickersSample}
                          clickable
                        >
                          <InputGroupText className=" btn imgBackground">
                            <img
                              src={imgUpload}
                              width="25px"
                              height="25px"
                              type="file"
                            ></img>
                          </InputGroupText>
                        </Files>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    {fileBarcodeStickers.length > 0 ? (
                    
                        fileBarcodeStickers.map((file) => (
                          <>
                            <div className="profile-pic">
                              <img
                                src={awsUrl + file.filepath}
                                width="100px"
                                height="100px"
                                className="m-10"
                              />
                              <div className="edit m-t-30 m-r-30">
                                  <img 
                                    src={deleteIcon} 
                                    width="30px" 
                                    height="30px" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={()=>
                                      {
                                        deleteImageFiles("BarcodeStickers", file)
                                      }
                                      }
                                  />
                                
                                 </div>
                              </div>
                           
                          </>
                        ))
                     
                    ) : (
                      <div>{''}</div>
                    )}
                  </Col>
                </Row>

                {/* Trims Notifications- Specify If any */}

                <Row>
                  <Col lg="8">
                    <FormGroup>
                      <Label className="form-label">
                        {t("trimsNotificationsSpecify")}
                      </Label>
                      <CKEditors
                        activeclassName="p10"
                        events={{
                          change: onChangeTrimsNotifications,
                        }}
                        content={trimsNotification}
                        config={{
                          height: 100,
                          toolbar: [
                            [
                              "Bold",
                              "Italic",
                              "NumberedList",
                              "BulletedList",
                              "Strike",
                            ],
                            [
                              "Cut",
                              "Copy",
                              "Paste",
                              "Pasteasplaintext",
                              "FormattingStyles",
                              "Undo",
                              "Redo",
                            ],
                            [
                              "List",
                              "Indent",
                              "Blocks",
                              "Align",
                              "Bidi",
                              "Paragraph",
                            ],
                            ["Find", "Selection", "Spellchecker", "Editing"],
                          ],
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
</div>
                {/* Packing Information: Polybag Size & thickness,Polybag Material,Print details on Polybag  */}
                <div ref={packinginfo} className="packinginfo">
                <Row className="g-12">
                  <Col lg="12" md="12" sm="12" xs="12">
                    <span>
                      <H6 className="ordersubhead">
                        {t("packingInformation")}
                      </H6>
                    </span>
                  </Col>
                </Row>

                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("polybagSizeThickness")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Polybag Size & thickness"
                          placeholder={t("enterPolybagSizeThickness")}
                          onChange={(e) =>
                            setPolybagSizeThickness(e.target.value)
                          }
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("polybagMaterial")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Polybag Material"
                          placeholder={t("enterPolybagMaterial")}
                          onChange={(e) => setPolybagMaterial(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("printDetailsPolybag")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Print Details on Polybag"
                          placeholder={t("enterPrintDetailsPolybag")}
                          onChange={(e) =>
                            setPrintDetailsPolybag(e.target.value)
                          }
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg ="4">
                    <FormGroup>
                      <Label>{t("PpolybagSampleImage")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Polybag Image"
                          placeholder= {t("attachPolybagSampleImage")}
                          value={
                            polybagSampleImg
                              ? polybagSampleImg
                              : ""
                          }
                          onChange={(e) =>
                            setPolybagSampleImg(e.target.value)
                          }
                          disabled
                        ></Input>
                        <Files
                          className="files-dropzone fileContainer"
                          accept=".png,.jpg,.jpeg"
                          multiple={false}
                          canCancel={false}
                          onChange={PolyBagSample}
                          clickable
                        >
                          <InputGroupText className=" btn imgBackground">
                            <img
                              src={imgUpload}
                              width="25px"
                              height="25px"
                              type="file"
                            ></img>
                          </InputGroupText>
                        </Files>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    {filePolybagImg.length > 0 ? (
                    
                    filePolybagImg.map((file) => (
                          <>
                            <div className="profile-pic">
                              <img
                                src={awsUrl + file.filepath}
                                width="100px"
                                height="100px"
                                className="m-10"
                              />
                              <div className="edit m-t-30 m-r-30">
                                  <img 
                                    src={deleteIcon} 
                                    width="30px" 
                                    height="30px" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={()=>
                                      {
                                        deleteImageFiles("Polybag", file)
                                      }
                                      }
                                  />
                                
                                 </div>
                              </div>
                           
                          </>
                        ))
                     
                    ) : (
                      <div>{''}</div>
                    )}
                  </Col>
                </Row>

                {/* Packing Information: Carton Box Dimensions,Carton Color,Carton Material */}

                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("cartonBoxDimensions")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Carton Box Dimensions"
                          placeholder={t("enterCartonBoxDimensions")}
                          onChange={(e) =>
                            setCartonBoxDimension(e.target.value)
                          }
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("cartonColor")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Carton Color"
                          placeholder={t("enterCartonColor")}
                          onChange={(e) => setCartonColors(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("cartonMaterial")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Carton Material"
                          placeholder={t("enterCartonMaterial")}
                          onChange={(e) => setCartonMaterial(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                {/* Packing Information: Carton Edge Finish,Carton Mark Details,Make-Up */}

                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("cartonEdgeFinish")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Carton Edge Finish"
                          placeholder={t("enterCartonEdgeFinish")}
                          onChange={(e) => setCartonEdgeFinish(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("cartonMarkDetails")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Carton Mark Details"
                          placeholder={t("enterCartonMarkDetails")}
                          onChange={(e) => setCartonMarkDetails(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="2">
                  <FormGroup>
                      <Label>{t("Carton Sample Image")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Carton Sample"
                          placeholder={t("attachCartonSampleImage")}
                          value={
                            cartonSampleImg
                              ? cartonSampleImg
                              : ""
                          }
                          onChange={(e) =>
                            setCartonSampleImg(e.target.value)
                          }
                          disabled
                        ></Input>
                        <Files
                          className="files-dropzone fileContainer"
                          accept=".png,.jpg,.jpeg"
                          multiple={false}
                          canCancel={false}
                          onChange={CartonSample}
                          clickable
                        >
                          <InputGroupText className=" btn imgBackground">
                            <img
                              src={imgUpload}
                              width="25px"
                              height="25px"
                              type="file"
                            ></img>
                          </InputGroupText>
                        </Files>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="2">
              
                    {fileCartonImg.length > 0 ? (
                    
                    fileCartonImg
                    .map((file) => (
                          <>
                            <div className="profile-pic">
                              <img
                                src={awsUrl + file.filepath}
                                width="100px"
                                height="100px"
                                className="m-10"
                              />
                              <div className="edit m-t-30 m-r-30">
                                  <img 
                                    src={deleteIcon} 
                                    width="30px" 
                                    height="30px" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={()=>
                                      {
                                        deleteImageFiles("Carton", file)
                                      }
                                      }
                                  />
                                
                                 </div>
                              </div>
                           
                          </>
                        ))
                     
                    ) : (
                      <div>{''}</div>
                    )}
                  
                  </Col>
                </Row>

                {/* Packing Information: Films/CD,Picture-Card,Inner Cardboard */}

                <Row>
                <Col lg="4">
                    <FormGroup>
                      <Label>{t("makeUp")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Make-Up"
                          placeholder={t("enterMakeUp")}
                          onChange={(e) => setMakeUp(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("filmsCD")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Films/CD"
                          placeholder={t("enterFilmsCD")}
                          onChange={(e) => setFlimsCD(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("pictureCard")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Picture-Card"
                          placeholder={t("enterPictureCard")}
                          onChange={(e) => setPictureCard(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                 
                </Row>

                {/* Packing Information: Estimated Delivery Date,Shipping Size,Air Freight */}
                <Row>
                <Col lg="4">
                    <FormGroup>
                      <Label>{t("innerCardboard")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Inner Cardboard"
                          placeholder={t("enterInnerCardboard")}
                          onChange={(e) => setInnerCardBoard(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("estimatedDeliveryDate")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Estimated Delivery Date"
                          placeholder={t("estimatedDeliveryDateETAETD")}
                          type="date"
                          onChange={(e) =>
                            setEstimatedDeliveryDate(e.target.value)
                          }
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>{t("shippingSize")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Shipping Size"
                          placeholder={t("enterShippingSize")}
                          onChange={(e) => setShippingSize(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                 
                </Row>
                <Row>
                <Col lg="4">
                    <FormGroup>
                      <Label>{t("airFreight")}</Label>
                      <InputGroup>
                        <Input
                          className=""
                          name="Air Freight"
                          placeholder={t("enterAirFreight")}
                          onChange={(e) => setAirFrieght(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
</div>
                {/* Others: Forbidden Substances Information,Testing Requirement */}
                <div ref={othersinfo} className="othersinfo">
                <Row className="g-12">
                  <Col lg="12" md="12" sm="12" xs="12">
                    <span>
                      <H6 className="ordersubhead">{t("others")}</H6>
                    </span>
                  </Col>
                </Row>

                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <Label className="form-label">
                        {t("forbiddenSubstancesInformation")}
                      </Label>
                      <CKEditors
                        activeclassName="p10"
                        events={{
                          change: onChangeForbiddenSubstancesInfo,
                        }}
                        content={forbiddenSubstancesInfo}
                        config={{
                          height: 100,
                          toolbar: [
                            [
                              "Bold",
                              "Italic",
                              "NumberedList",
                              "BulletedList",
                              "Strike",
                            ],
                            [
                              "Cut",
                              "Copy",
                              "Paste",
                              "Pasteasplaintext",
                              "FormattingStyles",
                              "Undo",
                              "Redo",
                            ],
                            [
                              "List",
                              "Indent",
                              "Blocks",
                              "Align",
                              "Bidi",
                              "Paragraph",
                            ],
                            ["Find", "Selection", "Spellchecker", "Editing"],
                          ],
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Label className="form-label">
                        {t("testingRequirement")}
                      </Label>
                      <CKEditors
                        activeclassName="p10"
                        events={{
                          change: onChangeTestingRequirement,
                        }}
                        content={testingRequirement}
                        onChange={(e) => setTestingRequirement(e.target.value)}
                        config={{
                          height: 100,
                          toolbar: [
                            [
                              "Bold",
                              "Italic",
                              "NumberedList",
                              "BulletedList",
                              "Strike",
                            ],
                            [
                              "Cut",
                              "Copy",
                              "Paste",
                              "Pasteasplaintext",
                              "FormattingStyles",
                              "Undo",
                              "Redo",
                            ],
                            [
                              "List",
                              "Indent",
                              "Blocks",
                              "Align",
                              "Bidi",
                              "Paragraph",
                            ],
                            ["Find", "Selection", "Spellchecker", "Editing"],
                          ],
                        }}
                      />
                    </FormGroup>
                  </Col>

                  {/* Others: Sample Requirements,Special Request -If any */}
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <Label className="form-label">
                        {t("SampleRequirements")}
                      </Label>
                      <CKEditors
                        activeclassName="p10"
                        events={{
                          change: onChangeSampleRequirement,
                        }}
                        content={sampleRequirement}
                        onChange={(e) => setSampleRequirement(e.target.value)}
                        config={{
                          height: 100,
                          toolbar: [
                            [
                              "Bold",
                              "Italic",
                              "NumberedList",
                              "BulletedList",
                              "Strike",
                            ],
                            [
                              "Cut",
                              "Copy",
                              "Paste",
                              "Pasteasplaintext",
                              "FormattingStyles",
                              "Undo",
                              "Redo",
                            ],
                            [
                              "List",
                              "Indent",
                              "Blocks",
                              "Align",
                              "Bidi",
                              "Paragraph",
                            ],
                            ["Find", "Selection", "Spellchecker", "Editing"],
                          ],
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Label className="form-label">
                        {t("specialRequestIfAny")}
                      </Label>
                      <CKEditors
                        activeclassName="p10"
                        events={{
                          change: onChangeSpecialRequest,
                        }}
                        content={specialRequest}
                        onChange={(e) => setSpecialRequest(e.target.value)}
                        config={{
                          height: 100,
                          toolbar: [
                            [
                              "Bold",
                              "Italic",
                              "NumberedList",
                              "BulletedList",
                              "Strike",
                            ],
                            [
                              "Cut",
                              "Copy",
                              "Paste",
                              "Pasteasplaintext",
                              "FormattingStyles",
                              "Undo",
                              "Redo",
                            ],
                            [
                              "List",
                              "Indent",
                              "Blocks",
                              "Align",
                              "Bidi",
                              "Paragraph",
                            ],
                            ["Find", "Selection", "Spellchecker", "Editing"],
                          ],
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                </div>
                <FormGroup className="f-right">
                  <Button
                    className="btn btn-primary "
                    onClick={() => {
                      submitInquiryForm();
                    }}
                  >
                   {t("save")}
                  </Button>
                </FormGroup>
              
              </Form>
            </CardBody>
          </Card>
          {/* Scroll To Top  */}
          
           <div className="top-to-btm" style={{ cursor: 'pointer' }}>
            {" "}
            {showTopBtn && (
              <img  src={scrollUpIcon}  className="icon-position icon-style"
              onClick={() => {
                window.scrollTo({top: 0, behavior: 'smooth'});
              }}
            >
            </img>
            )}{" "}
        </div>         
        </Col>
      </Container>
      <InfoCanvas
        modal={showInfoCanvas}
        toggle={toggleInfoCanvas}
        infoDetails={infoDetails}
        masterType={masterType}
        setPaymentTerm={setPaymentTerm}
        setShowInfoCanvas={setShowInfoCanvas}
        showInfoCanvas={showInfoCanvas}
        PaymentTerm={paymentTerm}
      />
    </Fragment>
  );
};
export default index;

/*************************Code By: R.AKSHAYA MOL************************/
