import React, { Fragment, useState, useEffect, useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import {
  Form, Label, Card, CardBody, Col, Row, Input, InputGroup,
  InputGroupText, Button, FormGroup, Container, Table,
} from "reactstrap";
import axios from "axios";
import {
  getLoginCompanyId, getWorkspaceId, getLoginUserId,
  getWorkspaceType, getStaff, getStaffPermission, getLoginStaffId, getLoginUserType
} from "../../../Constant/LoginConstant";
import { apiencrypt, apidecrypt,decode,encode } from "../../../helper";
import addIcon from "../../../assets/images/dms/icons/addIcon.svg";
import imgUpload from "../../../assets/images/dms/icons/imgUpload.svg";
import quantity from "../../../assets/images/dms/icons/quantity.svg";
import docIcon from "../../../assets/images/dms/icons/inquiryDocIcon.svg";
import infoIcon from "../../../assets/images/dms/icons/inquiryInfoIcon.svg";
import deleteIcon from "../../../assets/images/dms/inquiryDelIcon.svg";
import scrollUpIcon from "../../../assets/images/dms/inquiryScrollUpIcon.svg";
import addBlueIcon from "../../../assets/images/dms/inquiryAddBlueIcon.svg";
import editBlueIcon from "../../../assets/images/dms/inquiryEditBlueIcon.svg";
import { Breadcrumbs, H6, } from "../../../AbstractElements";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { maxUploadFileSize, ServerUrl } from "../../../Constant";
import Files from "react-files";
import AddArticleModal from "./AddArticleModal";
import AddColorModal from "./AddColorModal";
import AddSizeModal from "./AddSizeModal";
import AddFabricModal from "./AddFabricModal";
import AddNewDropdownModal from "./AddNewDropdownModal";
import InfoCanvas from "./InquiryInfoOffCanvas";
import JoditEditor from 'jodit-react';
import StyleArticleDescription from "./StyleArticleDescription";
import SpecialFinishers from "./SpecialFinishers";
import TrimsNotificationsSpecify from "./TrimsNotificationsSpecify";
import ForbiddenSubstancesInformation from "./ForbiddenSubstancesInformation";
import TestingRequirement from "./TestingRequirement";
import SampleRequirements from "./SampleRequirements";
import SpecialRequest from "./SpecialRequest";
import parse from 'html-react-parser';
import { useSearchParams, } from "react-router-dom";
import PaymentinstructionsModal from "./PaymentinstructionsModal";
const editInquiryForm = () => {
  const { t } = useTranslation();
  const editor = useRef(null); // **** Using for jodit Editor**//
  const workspace_id = getWorkspaceId;
  const company_id = getLoginCompanyId;
  const UserId = getLoginUserId;
  const dataToSendAtStarting = {
    company_id: company_id,
    workspace_id: workspace_id,
  };
  const[inquiryFormDtl,setInquiryFormDtl]=React.useState([]);
 // const[ editReferenceId,setEditReferenceId]=React.useState("");
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
  const [filePolybagImg, setFilePolyBagImg] = useState([]);
  const [fileCartonImg, setFileCartonImg] = useState([]);
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
  const [measurementSheet, setMeasurementSheet] = useState("");
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
  const [washCareLabelSampleImg, setWashCareLabelSampleImg] = React.useState("");
  const [hangtagSampleImg, setHangtagSampleImg] = React.useState("");
  const [barcodeStickersSampleImg, setBarcodeStickersSampleImg] = React.useState("");
  const [polybagSampleImg, setPolybagSampleImg] = React.useState("");
  const [cartonSampleImg, setCartonSampleImg] = React.useState("");
  const [referenceId, setReferenceId] = useState(Date.now());
  const [awsUrl, setAwsUrl] = useState();
  const [infoDetails, setInfoDetails] = useState([]);
  const [masterType, setMasterType] = useState();
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState("");
  const [measurementChart, setMeasurementChart] = useState([]);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [paymentTermList,setPaymentTermList]= useState([]);
  const [printTypeList,setPrintTypeList]= useState([]);
  const[noOfPlyList,setNoOfPlyList] = useState([]);
  const[cartonEdgeFinishList,setCartonEdgeFinishList] = useState([]);
  const [patternList,setPatternList]=useState([]);
  const [selected, setSelected] = useState("");
  const [paymentinstructionsDesc, setPaymentinstructionsDesc] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [inquiry_id, setOrderId] = useState(decode(searchParams.get("id")));
  const toggleart = () => setModalArt(!modalArt);
  const togglefabric = () => setModalfabric(!modalfabric);
  const toggleclr = () => setModalClr(!modalClr);
  const togglesize = () => setModalSize(!modalSize);

  const [validerrors, setValiderros] = React.useState({});

  const [showAddNew, setShowAddNew] = useState(false);
  const toggleAddNew = () => setShowAddNew(!showAddNew);

  const [showInfoCanvas, setShowInfoCanvas] = useState(false);
  const toggleInfoCanvas = () => setShowInfoCanvas(!showInfoCanvas);

  const [showArticleModal, setShowArticleModal] = useState(false);
  const togglearticle = () => setShowArticleModal(!showArticleModal);

  const [specialFinishersModal, setSpecialFinishersModal] = useState(false);
  const toggleFinishersModal = () => setSpecialFinishersModal(!specialFinishersModal);

  const [trimsNotificationsModal, setTrimsNotificationsModal] = useState(false);
  const toggleTrimsNotifications = () => setTrimsNotificationsModal(!trimsNotificationsModal);

  const [substancesInformationModal, setSubstancesInformationModal] = useState(false);
  const toggleSubstances = () => setSubstancesInformationModal(!substancesInformationModal);

  const [testingRequirementModal, setTestingRequirementModal] = useState(false);
  const toggletesting = () => setTestingRequirementModal(!testingRequirementModal);

  const [sampleRequirementsModal, setSampleRequirementsModal] = useState(false);
  const toggleRequirement = () => setSampleRequirementsModal(!sampleRequirementsModal);

  const [specialRequestsModal, setSpecialRequestModal] = useState(false);
  const togglespecialRequest= () => setSpecialRequestModal(!specialRequestsModal);

  const [paymentinstructionsModal, setpaymentinstructionsModal] = useState(false);
  const togglepaymentinstructions = () => setpaymentinstructionsModal(!paymentinstructionsModal);
  var measurementSheetData = [];
  var sampleFormatData = [];
  var printImageData = [];
  var washCareData = [];
  var mainLableData = [];
  var hangtagData = [];
  var barcodeStickersData = [];
  var cartonData = [];
  var polybagData = [];
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
  const placeholder = null;
  const basicInfoValidation = useRef(null);
  const totalQtyValidation = useRef(null);
  const currencyValidation = useRef(null);
  const inquiryDueDateValidation = useRef(null);

  const [ basicStyle, setBasicStyle ] = useState('u-step');
  const [ fabricStyle, setFabricStyle ] = useState('u-step');
  const [ printStyle, setPrintStyle ] = useState('u-step');
  const [ trimsStyle, setTrimsStyle ] = useState('u-step');
  const [ packingStyle, setPackingStyle ] = useState('u-step');
  const [ othersStyle, setOthersStyle ] = useState('u-step');
  /****------- Tab Scroll ---------- ****/
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    })
  }
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

  /****------- Payment Terms modal - Checked Value ---------- ****/
  const checkedVal = (valueType) => {

    var params = {};
    params["type"] = valueType;
    params["referenceId"] =  referenceId
    axios.post(ServerUrl + "/get-inquiry-master", apiencrypt(params)).then((response) => {
      response.data = apidecrypt(response.data);
      setInfoDetails(response.data.data);
    });
    setMasterType(valueType);
    toggleInfoCanvas();
  };

  const dropVal = (valueType) => {

    setMasterType(valueType);
    toggleAddNew();
    if(valueType ==="PaymentTerms")
    {document.getElementById("paymentTermsId").value = "";}
    else if(valueType ==="Patterns")
    {document.getElementById("PatternsId").value = "";}
    else if(valueType ==="PrintType")
    {document.getElementById("PrintTypeId").value = "";}
    else if(valueType ==="NoofPly")
    {document.getElementById("NoofPlyId").value = "";}
    else if(valueType ==="CartonEdgeFinish")
    {document.getElementById("cartonEdgeFinishId").value = "";}
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
    if (!inquiryDueDate) {
      validerrors.inquiryDueDate = t("enterInquiryDueDate");
    }
    if (!currency) {

      validerrors.currency = t("enterCurrency");
    }
    if (!totalQuantity) {
      validerrors.totalQuantity = t("enterTotQty");
    }
    else if (!/^[0-9]+$/.test(totalQuantity)) {
      validerrors.totalQuantity = t("numbersOnlyAllowed");
    }
    if( validerrors.article ){
      scrollToSection(basicInfoValidation);
      selectedTab("basicStyleInfo")
    } else if( validerrors.styleNo ){
      scrollToSection(basicInfoValidation)
      selectedTab("basicStyleInfo")
    } else if( validerrors.fabricCom ){
      scrollToSection(fabricinfo)
      selectedTab("fabricStyleInfo")
    } else if( validerrors.inquiryDueDate ){
      scrollToSection(inquiryDueDateValidation);
      selectedTab("fabricStyleInfo")
    } else if( validerrors.currency ) {
      scrollToSection(currencyValidation);
      selectedTab("fabricStyleInfo")
    } else if( validerrors.totalQuantity ){
      scrollToSection(totalQtyValidation);
      selectedTab("fabricStyleInfo")
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
/************* Show Color Size***********/ 
  const showSkuQty = ( skuData, colorData, sizeData ) => {
    let overallTotal = 0;
    skuData.forEach((data) => {
      const id = data.color_id + "#" + data.size_id;
      document.getElementById(id).value = data.quantity;
      overallTotal += data.quantity; 
    })
    document.getElementById("Overall_total_quantity").value = overallTotal;
    
    Object.values(colorData).map((colorMapData) => 
    {
      let colorTotal = 0;
      (sizeData).map((sizeMapData) => 
      {
        const id = colorMapData.id + "#" + sizeMapData.id;
        colorTotal += Number(document.getElementById(id).value);
      });
        document.getElementById("totqty_"+colorMapData.id).value = colorTotal;
    });

    (sizeData).map((sizeMapData) => 
    {
      let sizeTotal = 0;
      Object.values(colorData).map((colorMapData) => 
      {
        const id = colorMapData.id + "#" + sizeMapData.id;
        sizeTotal += Number(document.getElementById(id).value);
      })
      document.getElementById("SizeId_total_quantity"+sizeMapData.id).value = sizeTotal;
    });

  };
  const showColorSize = ( colorData, sizeData ) => {
    Object.values(colorData).map((mapData) => 
    {
      setShowColor(oldArray => [...oldArray, mapData.name]);
      setColor(oldArray => [...oldArray, mapData]);
    });

    (sizeData).map((mapData) => 
    {
      setShowSize(oldArray => [...oldArray, mapData.name]);
      setSize(oldArray => [...oldArray, mapData]);
    });
  };
  /* Bottom Scroll Option*/ 
  const scrollSticky=()=> {
    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } if(window.pageYOffset < 108) {
      header.classList.remove("sticky");
    }
  };
  const apiCall = () => {
      var editInquiryFormInputParams = {};
      editInquiryFormInputParams["inquiry_id"] =inquiry_id;
      axios
        .post(ServerUrl + "/inquiry-details", apiencrypt(editInquiryFormInputParams))
        .then((response) => {
          response.data = apidecrypt(response.data);
          setInquiryFormDtl(response.data.data[0]);
          setReferenceId(response.data.data[0].media_reference_id);
          setStyleNo(response.data.data[0].style_no);
          setArticle(response.data.data[0].article_id);
          setFabricCom(response.data.data[0].fabric_type_id);
          setFabricType(response.data.data[0].fabric_type);
          setFabricGSM(response.data.data[0].fabric_GSM);
          setYarnCount(response.data.data[0].yarn_count);
          setStyleArticleDesc(response.data.data[0].style_article_description);
          setSpecialFinishes(response.data.data[0].special_finish);
          setTotalQuantity(response.data.data[0].total_qty);
          setPatterns(response.data.data[0].patterns);
          setPlaceOfJurisdiction(response.data.data[0].jurisdiction);
          setCustomsDeclarationDoc(response.data.data[0].customs_declaraion_document);
          setPenalty(response.data.data[0].penality);
          setPrintImage(response.data.data[0].print_image);
          setPrintSize(response.data.data[0].print_size);
          setPrintType(response.data.data[0].print_type);
          setNoOfColors(response.data.data[0].print_no_of_colors);
          setMainLabel(response.data.data[0].main_lable);
          setWashCareLabel(response.data.data[0].washcare_lable);
          setHangtag(response.data.data[0].hangtag_lable);
          setBarcodeStickers(response.data.data[0].barcode_lable);
          setTrimsNotification(response.data.data[0].trims_nominations);
          setPolybagSizeThickness(response.data.data[0].poly_bag_size);
          setPolybagMaterial(response.data.data[0].poly_bag_material);
          setCartonBoxDimension(response.data.data[0].carton_bag_dimensions);
          setCartonColors(response.data.data[0].carton_color);
          setCartonMaterial(response.data.data[0].carton_material);
          setCartonEdgeFinish(response.data.data[0].carton_edge_finish);
          setCartonMarkDetails(response.data.data[0].carton_mark);
          setPictureCard(response.data.data[0].picture_card);
          setInnerCardBoard(response.data.data[0].inner_cardboard);
          setShippingSize(response.data.data[0].shipping_size);
          setAirFrieght(response.data.data[0].air_frieght);
          setEstimatedDeliveryDate(response.data.data[0].estimate_delivery_date);
          setInquiryDueDate(response.data.data[0].due_date);
          setPaymentTerm(response.data.data[0].payment_terms);
          setTargetPrice(response.data.data[0].target_price);
          setForbiddenSubstancesInfo(response.data.data[0].forbidden_substance_info);
          setTestingRequirement(response.data.data[0].testing_requirements);
          setSampleRequirement(response.data.data[0].sample_requirements);
          setSpecialRequest(response.data.data[0].special_requests);
          setPaymentinstructionsDesc(response.data.data[0].payment_instructions);
          setCurrency(response.data.data[0].currency)
          setMakeUp(response.data.data[0].make_up);
          setFlimsCD(response.data.data[0].films_cd);
          setPictureCard(response.data.data[0].picture_card);
          setPrintDetailsPolybag(response.data.data[0].poly_bag_print);
          dropDownfn(response.data.data[0].media_reference_id);
         // setHangtag(response.data.data[0].hangtag_lable);
          });
      // ********** API call for SKU Quantity Ratio ************
      axios
      .post(ServerUrl + "/inquiry-sku", apiencrypt(editInquiryFormInputParams))
      .then((response) => {
        response.data = apidecrypt(response.data);
        showColorSize( response.data.data.colors, response.data.data.sizes);
        showSkuQty(response.data.data.sku, response.data.data.colors, response.data.data.sizes);
      })
      axios
      .post(ServerUrl + "/inquiry-media", apiencrypt(editInquiryFormInputParams))
      .then((response) => {
        response.data = apidecrypt(response.data);
      // Check the media type for showing the PDF
       (response.data.data.files).map((mapData) => {
        if (mapData.media_type == "MeasurementSheet") {
          var getMeasurementDetails = mapData;
          measurementSheetData.push(getMeasurementDetails);
          setFileMeasurementSheet(measurementSheetData)
          setAwsUrl(response.data.data.serverURL)
        }
        // Check the media type for showing the Image
        if (mapData.media_type == "SampleFormat") {

          var getDetails = mapData;
          sampleFormatData.push(getDetails);
          setFileSampleFormat(sampleFormatData);
          setAwsUrl(response.data.data.serverURL);
        }
        if (mapData.media_type == "PrintImage") {
          var getDetails = mapData;
          printImageData.push(getDetails);
          setFilePrintImage(printImageData);
          setAwsUrl(response.data.data.serverURL);
        }
        if (mapData.media_type == "MainLabel") {
          var getDetails = mapData;
          mainLableData.push(getDetails);
          setFileMainLabel(mainLableData);
          setAwsUrl(response.data.data.serverURL);
        }
        if (mapData.media_type == "WashCareLabel") {
          var getDetails = mapData;
          washCareData.push(getDetails);
          setFileWashCareLabel(washCareData);
          setAwsUrl(response.data.data.serverURL);
        }
        if (mapData.media_type == "Hangtag") {
          var getDetails = mapData;
          hangtagData.push(getDetails);
          setFileHangtag(hangtagData);
          setAwsUrl(response.data.data.serverURL);
        }
        if (mapData.media_type == "BarcodeStickers") {
          var getDetails = mapData;
          barcodeStickersData.push(getDetails);
          setFileBarcodeStickers(barcodeStickersData);
          setAwsUrl(response.data.data.serverURL);
        }
        if (mapData.media_type == "Polybag") {
          var getDetails = mapData;
          polybagData.push(getDetails);
          setFilePolyBagImg(polybagData);
          setAwsUrl(response.data.data.serverURL);
        }
        if (mapData.media_type == "Carton") {
          var getDetails = mapData;
          cartonData.push(getDetails);
          setFileCartonImg(cartonData);
          setAwsUrl(response.data.data.serverURL);
        }
      })
    })

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
    axios
      .get(ServerUrl + "/get-income-terms").then((response) => {
        response.data = apidecrypt(response.data);
        setIncomeTerms(response.data.data);
      });
    axios
      .get(ServerUrl + "/get-currencies").then((response) => {
        response.data = apidecrypt(response.data);
        setCurrencies(response.data.data);
      });    
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  };
  /* SEPERATE DROP DOWN FUNCTION CALL - TO SET REFERENCE ID AFTER SET */
 const dropDownfn = (ref) =>{
    axios
    .post(ServerUrl + "/get-inquiry-master", apiencrypt({type: "PaymentTerms",referenceId:  ref}))
    .then((response) => {
      response.data = apidecrypt(response.data);
      setPaymentTermList(response.data.data);
    });
    axios
    .post(ServerUrl + "/get-inquiry-master", apiencrypt({type: "PrintType",referenceId:  ref}))
    .then((response) => {
      response.data = apidecrypt(response.data);
      console.log("PRINT tYPE",response.data);
      setPrintTypeList(response.data.data);
    });
    axios
    .post(ServerUrl + "/get-inquiry-master", apiencrypt({type: "NoofPly",referenceId:  ref}))
    .then((response) => {
      response.data = apidecrypt(response.data);
      setNoOfPlyList(response.data.data);
    });
    axios
    .post(ServerUrl + "/get-inquiry-master", apiencrypt({type: "CartonEdgeFinish",referenceId:  ref}))
    .then((response) => {
      response.data = apidecrypt(response.data);
      setCartonEdgeFinishList(response.data.data);
    });
    axios
    .post(ServerUrl + "/get-inquiry-master", apiencrypt({type: "Patterns",referenceId:  ref}))
    .then((response) => {
      response.data = apidecrypt(response.data);
      setPatternList(response.data.data);
    });      
  }

  useEffect(() => {
    getLoginUserType == "user" ? getWorkspaceType != "Factory" ? apiCall() :
      window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry`
      //  window.location.href='/inquiry/factoryviewinquiry'
      :
      getWorkspaceType != "Factory" ?
        (getStaff === "Staff" && getStaffPermission.includes("Add Inquiry")) || getStaff == null ?
          apiCall() :
          (getStaff === "Staff" && getStaffPermission.includes("View Inquiry")) || getStaff == null ?
            window.location.href = `${process.env.PUBLIC_URL}/viewinquiry`
            //  window.location.href='/viewinquiry' 
            :
            window.location.href = `${process.env.PUBLIC_URL}/feedbackform`
        //  window.location.href='/feedbackform'
        :
        (getStaff === "Staff" && getStaffPermission.includes("View Factory Inquiry")) || getStaff == null ?
          window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry` :
          //  window.location.href='/inquiry/factoryviewinquiry' :  
          window.location.href = `${process.env.PUBLIC_URL}/inquirycontacts`
    //  window.location.href='/inquiry/inquirycontacts' 

        
    window.addEventListener("scroll", () => {
      scrollSticky();
      if (window.scrollY > 400) {
          setShowTopBtn(true);
      } else {
          setShowTopBtn(false);
      }
  });  
  }, []);

/***************Measurement Sheet Radio Button OnChange**********/
  const changeHandlerRadio = e => {
    setSelected(e.target.value);
    // if(e.target.value=="1" && measurementSheet != null) {
    //   let get= document.getElementById("radioinline2")
    //   get.disabled = true;
    // }
    // else{
    //   let get= document.getElementById("radioinline2")
    //   get.disabled = false;
    // }
    
  };
 /****------- Image Upload API Call ---------- ****/
 const uploadImageApiCall = (imageType, file) => {
  axios
    .post(
      ServerUrl + "/inquiry-file-upload",
      {
        type: imageType,
        referenceId:  referenceId,
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
          let sampleFormatFileData = response.data.files;
          setFileSampleFormat(sampleFormatFileData.files);
          setAwsUrl(sampleFormatFileData.serverURL);
            { sampleFormatFileData.files.length > 0 ?
              (sampleFormatFileData.files).map((mapData) => {setSampleFormatImg(mapData.orginalfilename);}) 
              : 
              setSampleFormatImg(() => "");
            }
        } else if (imageType == "MeasurementSheet") {
          let measurementSheetData = response.data.files;
          setFileMeasurementSheet(measurementSheetData.files);
          setAwsUrl(measurementSheetData.serverURL);
          {
            measurementSheetData.files.length >0 ?
            (measurementSheetData.files).map((mapData)=>{
              setMeasurementSheetImg(mapData.orginalfilename)
              let get= document.getElementById("radioinline2")
               get.disabled = true;
              ;})
            :
            setMeasurementSheetImg(()=>"");
          }
        } else if (imageType == "PrintImage") {
          let printImageData = response.data.files;
          setFilePrintImage(printImageData.files);          
          setAwsUrl(printImageData.serverURL);
          {
            printImageData.files.length >0 ?
            (printImageData.files).map((mapData)=>{setPrintImg(mapData.orginalfilename);})
            :
            setPrintImg(()=>"");
          }
        } else if (imageType == "MainLabel") {
          let mainLabelData = response.data.files;
          setFileMainLabel(mainLabelData.files);
          setAwsUrl(mainLabelData.serverURL);
          {
            mainLabelData.files.length >0 ?
            (mainLabelData.files).map((mapData)=>{setMainLabelSampleImg(mapData.orginalfilename);})
            :
            setMainLabelSampleImg(()=>"");
          }
        } else if (imageType == "WashCareLabel") {
          let washCareData = response.data.files;
          setFileWashCareLabel(washCareData.files);
          setAwsUrl(washCareData.serverURL);
          {
            washCareData.files.length >0 ?
            (washCareData.files).map((mapData)=>{setWashCareLabelSampleImg(mapData.orginalfilename);})
            :
            setWashCareLabelSampleImg(()=>"");
          }
        } else if (imageType == "Hangtag") {
          let hangtagData = response.data.files;
          setFileHangtag(hangtagData.files);
          setAwsUrl(hangtagData.serverURL);
          {
            hangtagData.files.length >0 ?
            (hangtagData.files).map((mapData)=>{setHangtagSampleImg(mapData.orginalfilename);})
            :
            setHangtagSampleImg(()=>"");
          }
        } else if (imageType == "BarcodeStickers") {
          let barcodeStickersData = response.data.files;
          setFileBarcodeStickers(barcodeStickersData.files);
          setAwsUrl(barcodeStickersData.serverURL);
          {
            barcodeStickersData.files.length >0 ?
            (barcodeStickersData.files).map((mapData)=>{setBarcodeStickersSampleImg(mapData.orginalfilename);})
            :
            setBarcodeStickersSampleImg(()=>"");
          }
        } else if (imageType == "Polybag") {
          let polybagData = response.data.files;
          setFilePolyBagImg(polybagData.files);
          setAwsUrl(polybagData.serverURL);
          {
            polybagData.files.length >0 ?
            (polybagData.files).map((mapData)=>{setPolybagSampleImg(mapData.orginalfilename);})
            :
            setPolybagSampleImg(()=>"");
          }
        } else if (imageType == "Carton") {
          let cartonData = response.data.files;
          setFileCartonImg(cartonData.files);
          setAwsUrl(cartonData.serverURL);
          {
            cartonData.files.length >0 ?
            (cartonData.files).map((mapData)=>{setCartonSampleImg(mapData.orginalfilename);})
            :
            setCartonSampleImg(()=>"");
          }
        }
      }
    });
};

  /****------- Delete Image  ---------- ****/
  const deleteImageFiles = (imageType, file) => {
    var media = {};
    media["media_id"] = file.media_id ? file.media_id : file.id;
    if (imageType == "MeasurementSheet") {
      Swal.fire({
        title: t("deleteConfirmationTitleAlert"),
        text: t("cantRevertBack"),
        icon: "warning",
        showCancelButton: true,
        button: t("okLabel"),
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(ServerUrl + "/delete-inquiry-media", apiencrypt(media))
            .then((response) => {
              response.data = apidecrypt(response.data);
              if (response.data.status_code == 200) {
                Swal.fire({
                  title: t(response.data.meassage),
                  icon: "success",
                  showCancelButton: true,
                  button: t("okLabel"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    uploadImageApiCall(imageType, file);
                  }
                }
                )
              }
            })
        }
      });

    }
    else {
      Swal.fire({
        title: t("areYouSureToDeleteThisImage"),
        text: t("cantRevertBack"),
        icon: "warning",
        showCancelButton: true,
        button: t("okLabel"),
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(ServerUrl + "/delete-inquiry-media", apiencrypt(media))
            .then((response) => {
              response.data = apidecrypt(response.data);
              if (response.data.status_code == 200) {
                Swal.fire({
                  title: t(response.data.meassage),
                  icon: "success",
                  showCancelButton: true,
                  button: t("okLabel"),

                }).then((result) => {
                  if (result.isConfirmed) {
                    uploadImageApiCall(imageType, file);
                  }
                }
                )
              }
            })
        }
      });
    }
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
            timer: 2500,
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
          timer: 2500,
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
            timer: 2500,
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
          timer: 2500,
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
            timer: 2500,
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
          timer: 2500,
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
            timer: 2500,
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
          timer: 2500,
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
            timer: 2500,
          });
        } else {
          let responseData = uploadImagmakeUpeApiCall("WashCareLabel", files);
          setWashCareLabelSampleImg(washCareLabelSample.name);
        }
      } else {
        Swal.fire({
          title: t("wrongFileFormat"),
          text: t("validFileFormatsImages"),
          icon: "warning",
          button: t("okLabel"),
          timer: 2500,
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
            timer: 2500,
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
          timer: 2500,
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
            timer: 2500,
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
          timer: 2500,
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
            timer: 2500,
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
          timer: 2500,
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
            timer: 2500,
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
          timer: 2500,
        });
      }
    });
  };
  /****----------------- ****/

  /****------- Measurement Chart - Add Row ---------- ****/
  const addTableRows = () => {
    setMeasurementChart([...measurementChart, measurementChart])
  };

  /****------- Measurement Chart - Remove Row ---------- ****/
  const deleteTableRows = (index) => {
    const rows = [...measurementChart];
    rows.splice(index, 1);
    setMeasurementChart(rows);
  };
  /****------- Getting Measurement Chart Data ---------- ****/
  const measurementChartData = () => {

    var measureChart = [];
    for (let i = 0; i < measurementChart.length; i++) {
      var measurementChartRowData = {};
      measurementChartRowData['position'] = document.getElementById("position_" + i).value;
      measurementChartRowData['description'] = document.getElementById("description_" + i).value;
      measurementChartRowData['tolerance'] = document.getElementById("tolerance_" + i).value;
      size.map((sizeMapData) => {
        measurementChartRowData[sizeMapData.name] = document.getElementById(i + "_size_id_" + sizeMapData.id).value;
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
      inquiryFormInputParams["staff_id"] = getLoginStaffId;
      inquiryFormInputParams["user_id"] = UserId;
      inquiryFormInputParams["inquiry_id"] =inquiry_id;
      inquiryFormInputParams["article_id"] = article;
      inquiryFormInputParams["style_no"] = styleNo;
      inquiryFormInputParams["fabric_type_id"] = fabricCom;
      inquiryFormInputParams["fabric_type"] = fabricType;
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
      inquiryFormInputParams["referenceId"] =  referenceId;
      inquiryFormInputParams["poly_bag_print"]=printDetailsPolybag;
     // inquiryFormInputParams['measurement_Chart'] = measure_chart_array;
      inquiryFormInputParams['payment_instructions']=paymentinstructionsDesc;
      axios
        .post(ServerUrl + "/edit-inquiry", apiencrypt(inquiryFormInputParams))
        .then((response) => {
          response.data = apidecrypt(response.data);
          if (response.data.status_code === 200) {
            Swal.fire({
              title: t("inquiryUpdateSuccess"),
              icon: "success",
              button: t("okLabel"),
               allowOutsideClick: false,
              //timer: 1000,
            }).then((result) => {
              if (result.isConfirmed) {
                setTimeout(() => {
                  window.location.href = `${process.env.PUBLIC_URL}/viewinquiry`
                }, 100);
                // window.location.href = "/inquiry/viewinquiry";
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
              timer: 2500,
            });
          }
        });
    }
  };

  const selectedTab = ( name ) => 
  {
        if(name == "basicStyleInfo"){
                setBasicStyle("u-step current"), 
                setFabricStyle( () => "u-step"), 
                setPrintStyle( () => "u-step"), 
                setTrimsStyle( () => "u-step"), 
                setPackingStyle( () => "u-step"), 
                setOthersStyle( () => "u-step")
                scrollToSection(basicinfo)
        } if(name == "fabricStyleInfo"){
                setBasicStyle("u-step"), 
                setFabricStyle( () => "u-step current"), 
                setPrintStyle( () => "u-step"), 
                setTrimsStyle( () => "u-step"), 
                setPackingStyle( () => "u-step"), 
                setOthersStyle( () => "u-step"),
                scrollToSection(fabricinfo)
        } if(name == "printStyleInfo"){
                  setBasicStyle("u-step"), 
                  setFabricStyle( () => "u-step"), 
                  setPrintStyle( () => "u-step current"), 
                  setTrimsStyle( () => "u-step"), 
                  setPackingStyle( () => "u-step"), 
                  setOthersStyle( () => "u-step"),
                  scrollToSection(printinfo)
        } if(name == "trimsStyleInfo"){
          setBasicStyle("u-step"), 
          setFabricStyle( () => "u-step"), 
          setPrintStyle( () => "u-step"), 
          setTrimsStyle( () => "u-step current"), 
          setPackingStyle( () => "u-step"), 
          setOthersStyle( () => "u-step"),
          scrollToSection(trimsinfo)
        } if( name == "packingStyleInfo" ){
        setBasicStyle("u-step"), 
        setFabricStyle( () => "u-step"), 
        setPrintStyle( () => "u-step"), 
        setTrimsStyle( () => "u-step"), 
        setPackingStyle( () => "u-step current"), 
        setOthersStyle( () => "u-step"),
        scrollToSection(packinginfo)
        } if( name == "othersStyleInfo" ){
          setBasicStyle("u-step"), 
          setFabricStyle( () => "u-step"), 
          setPrintStyle( () => "u-step"), 
          setTrimsStyle( () => "u-step"), 
          setPackingStyle( () => "u-step"), 
          setOthersStyle( () => "u-step current"),
          scrollToSection(othersinfo)
        }
  };
  /************************* ONLY NUMBERS VALIDATION (INPUT FIELD) *************/
  function handleKeyPress(e) {
    var key = e.key;
    var regex = /[0-9]/;
    if( !regex.test(key) ) {
        e.preventDefault();
    }
  }
  return (
    <Fragment>
      <Row className="pgbgcolor hdbgfixed" >
        <Breadcrumbs
          mainTitle={t("editInquiry") + " " + "IN-"+ inquiry_id}
          parent={t("editInquiry") + " " + "IN-"+ inquiry_id}
          title={t("editInquiry") + " " + "IN-"+ inquiry_id}
        />
      </Row>
      <Container fluid={true} className="general-widget topaln">
        <Col >
        {/************Tab to Scroll***************************/}
          <Card id="htmljoditListCSS">
          <div className="myHeader inquiry_create" id="myHeader">
              <Row className="u-steps" style={{ cursor: 'pointer' }}>
                <Col className={basicStyle} onClick={() => { 
                  selectedTab("basicStyleInfo")
                }}>
                  <div className="u-step-desc">
                    <span className="u-step-title">{t("basicInformation")}</span>
                  </div>
                </Col>

                <Col className={fabricStyle}  onClick={() => {
                  selectedTab("fabricStyleInfo")
                  }}>
                  <div className="u-step-desc">
                    <span className="u-step-title">{t("fabricInformation")}</span>
                  </div>
                </Col>

                <Col className={printStyle} onClick={() => { 
                  selectedTab("printStyleInfo")
                  }}>
                  <div className="u-step-desc"  >
                    <span className="u-step-title">{t("printInformation")}</span>
                  </div>
                </Col>

                <Col className={trimsStyle} onClick={() => {
                  selectedTab("trimsStyleInfo")
                  }}>
                  <div className="u-step-desc"  >
                    <span className="u-step-title">{t("trimsInformation")}</span>
                  </div>
                </Col>

                <Col className={packingStyle} onClick={() => {
                  selectedTab("packingStyleInfo")
                  }}>
                  <div className="u-step-desc"  >
                    <span className="u-step-title">{t("packingInformation")}</span>
                  </div>
                </Col>

              <Col className={othersStyle} onClick={() => {
                selectedTab("othersStyleInfo")
                }}>
                <div className="u-step-desc"  >
                  <span className="u-step-title">{t("others")}</span>
                </div>
              </Col>
            </Row>
          </div>

            <CardBody className="contenthb"> 
            <div ref={basicInfoValidation}></div>
              <Form>
                <div ref={basicinfo} className="basicinfo m-t-20">
                <Row className="g-12">
                  <Col lg="12" md="12" sm="12" xs="12">
                    <span>
                      <H6 className="ordersubhead">{t("basicInformation")}</H6>
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
                              <option value="" disabled>
                                {t("selectArticle")}
                              </option>
                          {articles.map((article) =>
                            (
                              inquiryFormDtl.article_id == article.id ?
                                <option value={article.id} selected > {article.name}</option> :
                                <option value={article.id}> {article.name}</option>
                            )
                            )}
                              {/* {articles.map((article) => (
                                <option value={article.id}>{article.name}</option>
                              ))} */}

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
                              defaultValue ={styleNo}
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
                        <H6 className="ordersubhead">{t("fabricInformation")}</H6>
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
                              <option value="" disabled>
                                {t("selectFabricComposition")}
                              </option>                        
                              {fabrics.map((fabric) => (
                                inquiryFormDtl.fabric_type_id == fabric.id ?
                                <option value={fabric.id} selected>{fabric.name}</option>:

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
                            type="tel"
                             maxLength="3"
                              className=""
                              name="Fabric GSM"
                              defaultValue={fabricGSM}
                              onKeyPress={(e) => handleKeyPress(e)}
                              placeholder={t("enterFabricGSM")}
                              onChange={(e) => setFabricGSM(e.target.value)}
                            ></Input>
                           
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
                                    onClick={() => {
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

                  {/* Fabric Type,Yarn Count,Inquiry Due Date */}
                <div ref={inquiryDueDateValidation}></div>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("fabricType")}</Label>
                        <InputGroup>
                          <Input
                            className=""
                            name="Yarn Count"
                            defaultValue={fabricType}
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
                            defaultValue={yarnCount}
                            placeholder={t("enterYarnCount")}
                            onChange={(e) => setYarnCount(e.target.value)}
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("inquiryDueDate")}</Label><sup className="font-danger">*</sup>
                        <InputGroup>
                          <Input
                            className=""
                            name="Inquiry Due Date"
                            type="date"
                            defaultValue={inquiryDueDate}
                            min={new Date().toISOString().split('T')[0]}
                          placeholder={t("selectInquiryDueDate")}
                            onChange={(e) => setInquiryDueDate(e.target.value)}
                          ></Input>
                        </InputGroup>
                        {validerrors.inquiryDueDate && (
                          <span className="error-msg">
                            {validerrors.inquiryDueDate}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* Incoterms,Currency,Target Price */}
                <div ref={currencyValidation}></div>
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
                            // defaultValue={incomeTerm}
                            onChange={(e) => setIncomeTerm(e.target.value)}
                          >
                            <option value="" disabled>
                              {t("selectIncomeTerms")}
                            </option>
                            {incomeTerms.map((incomeTerm) => (
                                inquiryFormDtl.incoterms==incomeTerm.id ?
                                <option
                                value={incomeTerm.id}
                                title={incomeTerm.description}
                                selected>
                                {incomeTerm.name}
                              </option>:
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
                        <Label>{t("currency")}</Label>
                        <sup className="font-danger">*</sup>
                        <InputGroup>
                          <Input
                            type="select"
                            className="form-control digits selectheight"
                            name="Currency"
                            onChange={(e) => setCurrency(e.target.value)}
                          >
                            <option value="" disabled>
                              {t("selectCurrency")}
                            </option>
                            {currencies.map((curncy) => (
                               inquiryFormDtl.currency==curncy.symbol ?
                               <option value={curncy.name} selected>
                                {curncy.symbol + " " + curncy.name}
                              </option> :
                              <option value={curncy.symbol}>
                                {curncy.symbol + " " + curncy.name}
                              </option>
                            ))}
                          </Input>
                        </InputGroup>
                        {validerrors.currency && (
                          <span className="error-msg">
                            {validerrors.currency}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("targetPrice")}</Label>
                        <InputGroup>
                          <Input
                            className=""
                            name="Target Price"
                            defaultValue={targetPrice}
                            placeholder={t("enterTargetPrice")}
                            onChange={(e) => setTargetPrice(e.target.value)}
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    
                  </Row>

                   {/* ,Payment Terms,Payment Instructions */}
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("paymentTerms")}</Label>
                        <InputGroup>
                          <Input
                            id="paymentTermsId"
                            type="select"
                            // placeholder={t("selectStatus")}
                            className="form-control digits selectheight"
                            name="Payment Terms"
                            //defaultValue=""
                            onChange={(e) => {
                              e.target.value!="addNew"?
                              setPaymentTerm(e.target.value): dropVal("PaymentTerms")}}
                          >
                            <option value="" disabled>
                              {t("selectPaymentTerms")}
                            </option>
                            {paymentTermList.map((payTerm) => (
                                inquiryFormDtl.payment_terms==payTerm.content?<option
                                value={payTerm.content}
                                title={payTerm.content}
                              selected>
                                {payTerm.content}
                              </option>
                              :
                              <option
                                value={payTerm.content}
                                title={payTerm.content}
                              >
                                {payTerm.content}
                              </option>
                              
                            ))}
                            <option value="addNew">+{t("addNew")}</option>
                          </Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col lg="8">
                      <FormGroup>
                        <Label className="form-label">
                          {t("paymentinstructions")}
                        </Label>
                        <span
                          className="m-l-20"
                          style={{ cursor: "pointer" }}
                          value
                          onClick={() => {
                            togglepaymentinstructions ();
                          }}
                          >
                          {paymentinstructionsDesc=="" ?   <img 
                                src={addBlueIcon}
                                width="25px"
                                height="25px"
                                
                              ></img>:<img 
                              src={editBlueIcon}
                              width="25px"
                              height="25px"
                              
                            ></img>}    
                        
                          {/* <img src={infoIcon} width="25px" height="25px"></img> */}
                        </span>
                        <PaymentinstructionsModal
                              modal={paymentinstructionsModal}
                              toggle={togglepaymentinstructions}
                              paymentinstructionsDesc={paymentinstructionsDesc}
                              setPaymentinstructionsDesc={setPaymentinstructionsDesc}
                              setpaymentinstructionsModal={setpaymentinstructionsModal}
                              paymentinstructionsModal={paymentinstructionsModal}
                            />
                          {paymentinstructionsDesc=="" ?   ""
                          :
                          <Card>
                            <CardBody> {parse(paymentinstructionsDesc)}</CardBody>
                            </Card>}  
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
                        <span
                          className="m-l-20"
                          style={{ cursor: "pointer" }}
                          value
                          onClick={() => {
                            togglearticle ();
                          }}
                          >
                          {styleArtcileDesc=="" ?   <img 
                                src={addBlueIcon}
                                width="25px"
                                height="25px"
                                
                              ></img>:<img 
                              src={editBlueIcon}
                              width="25px"
                              height="25px"
                              
                            ></img>}    
                        
                          {/* <img src={infoIcon} width="25px" height="25px"></img> */}
                        </span>
                        <StyleArticleDescription
                              modal={showArticleModal}
                              toggle={togglearticle}
                              styleArtcileDesc={styleArtcileDesc}
                              setStyleArticleDesc={setStyleArticleDesc}
                              setShowArticleModal={setShowArticleModal}
                              showArticleModal={showArticleModal}
                            />

                          {styleArtcileDesc=="" ?   ""
                          :
                          <Card>
                            <CardBody> {parse(styleArtcileDesc)}</CardBody>
                            </Card>}  
                        {/* <JoditEditor
                          ref={editor}
                          value={styleArtcileDesc}
                          config={config}
                          tabIndex={1}
                          onChange={(newContent) => setStyleArticleDesc(newContent)}
                        /> */}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Label className="form-label">
                          {t("specialFinishers")}
                        </Label>
                        <span
                          className="m-l-20"
                          style={{ cursor: "pointer" }}
                          value
                          onClick={() => {
                            toggleFinishersModal ();
                          }}
                        >
                        {specialFinishes=="" ?   <img 
                                src={addBlueIcon}
                                width="25px"
                                height="25px"
                                
                              ></img>:<img 
                              src={editBlueIcon}
                              width="25px"
                              height="25px"
                              
                            ></img>} 
                        </span>
                        <SpecialFinishers
                              modal={specialFinishersModal}
                              toggle={toggleFinishersModal}
                              specialFinishes={specialFinishes}
                              setSpecialFinishes={setSpecialFinishes}
                              setSpecialFinishersModal={setSpecialFinishersModal}
                              specialFinishersModal={specialFinishersModal}
                            />
                            {specialFinishes=="" ?   ""
                          :
                          <Card>
                            <CardBody> {parse(specialFinishes)}</CardBody>
                            </Card>} 
                       
                      </FormGroup>
                    </Col>
                </Row>
                

                   {/* Total Quantity,Color,Size */}
                  <div ref={totalQtyValidation}></div>
                <Row>
                  <Col lg="4">
                      <FormGroup>
                        <Label> {t("totalQuantity")}</Label>
                        <sup className="font-danger">*</sup>
                        <InputGroup>
                          <Input
                            className=""
                            type="number"
                            name="Total Quantity"
                            defaultValue={totalQuantity}
                            placeholder={t("enterTotalQuantity")}
                            onChange={(e) => setTotalQuantity(e.target.value)}
                          ></Input>
                          {/* <InputGroupText>
                            <img
                              src={quantity}
                              width="15px"
                              height="15px"
                              type="file"
                            ></img>
                          </InputGroupText> */}
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
                       {/* MeasuementSheet Radio Button*/}
                        {/* <Row>
                         <Col lg="12" md="12" sm="12" xs="12">                          
                                <FormGroup className="m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                                <span className="subTitleLine3 f-left">
                            <H6 className="ordersubhead">
                            {t("measurementSheet")} 
                            </H6>
                          </span>
                                    <div className="radio radio-primary">
                                        <Input id="radioinline1" type="radio" name="radio1" value="1" checked={selected === "1"} onChange={changeHandlerRadio}  />
                                        <Label className="mb-0" for="radioinline1">{t("upload")}</Label>
                                    </div>
                                    <div className="radio radio-primary">
                                        <Input id="radioinline2" type="radio" name="radio1" value="2" checked={selected === "2"} onChange={changeHandlerRadio}  />
                                        <Label className="mb-0" for="radioinline2">{t("create")}</Label>
                                    </div>
                                </FormGroup>
                            </Col>
                          </Row> */}
                  {/* Measuement Show based on sku*/}
                  
                  {/* <Row aria-hidden={selected !== "2" ? true : false}>
                  {color.length > 0 && size.length > 0 ? (
                    <>                   
                      <Row className="g-12">
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
                                        onClick={() => addTableRows()}>+</div>

                                    </th>
                                  </tr>
                                </thead>
                                {measurementChart.map((measureChart, index) => {
                                  const { position, description, tolerance } = measureChart;
                                  return (
                                    <>
                                      <tbody id="measurementshow">
                                        <tr key={index}>
                                          <td>
                                            <input
                                              className="form-control "
                                              id={"position_" + index}
                                              type="text"
                                              autocomplete="on"
                                              value={position}
                                              onKeyDown={handleEnter}
                                            />
                                          </td>
                                          <td colSpan="3">
                                            <input
                                              className="form-control "
                                              id={"description_" + index}
                                              type="text"
                                              autocomplete="on"
                                              value={description}
                                              onKeyDown={handleEnter}
                                            />
                                          </td>
                                          <td>
                                            <input
                                              className="form-control "
                                              id={"tolerance_" + index}
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
                                                  id={index + "_size_id_" + sizeMapData.id}
                                                  type="text"
                                                  autocomplete="on"
                                                  onKeyDown={handleEnter}
                                                />
                                              </td>
                                            );
                                          })}
                                          <td>
                                            <div className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>-</div>
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
                     
                    </>) : (<div></div>)}
                    </Row> */}
                  {/* Measuement Sheet Upload*/}
                  {/* <Row aria-hidden={selected !== "1" ? true : false}> */}
                    <Col lg="4"  >
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

                    <Row>
                      {fileMeasurementSheet.length > 0 ?
                        <Row className="m-t-15 taskUpdate-table-sideHeader">
                          <Row>
                            {fileMeasurementSheet.map((file) => (
                              <Col md="3" lg="3" sm="6" xs="12" className="m-5">
                                <table className="" cellPadding="4px" width="100%">
                                  <tr>
                                    <td className="" width="5%">
                                      <i className="fa fa-file-o f-30"></i>
                                    </td>
                                    <td className="">
                                      <p className="f-left f-12 f-w-600">{(file.orginalfilename)}<br /></p>
                                    </td>
                                    <td className="m-l-6">
                                      <img
                                        src={deleteIcon}
                                        width="30px"
                                        height="30px"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                          deleteImageFiles("MeasurementSheet", file)
                                        }
                                        }
                                      />
                                    </td>

                                  </tr>
                                </table>
                              </Col>
                            ))}
                          </Row>
                        </Row>
                        : ""}
                    </Row>
                  {/* </Row> */}
                  {/* Patterns,Place of Jurisdiction,Customs Declaration Document */}
                  <Row className="m-t-10">
                  <Col lg="4">
                      <FormGroup>
                        <Label>{t("patterns")}</Label>
                        <InputGroup>
                          <Input
                            type="select"
                            id ="PatternsId"
                            className="form-control digits selectheight"
                            name="Patterns"
                            defaultValue=""
                            //onClick={()=>{inquiryMaster("PrintType")}}
                            onChange={(e) =>{ 
                              e.target.value!="addNew"?
                              setPatterns(e.target.value):dropVal("Patterns")}}
                          >
                            <option value="" disabled>
                              {t("selectPatterns")}
                            </option>
                            { patternList.length > 0 ? 
                            patternList.map((patternLists) => (
                                inquiryFormDtl.patterns==patternLists.content ? 
                                <option
                                value={patternLists.content}
                                title={patternLists.content}
                              selected>
                                {patternLists.content}
                              </option>:
                              <option
                                value={patternLists.content}
                                title={patternLists.content}
                              >
                                {patternLists.content}
                              </option>
                            )):""}
                            <option value="addNew">+{t("addNew")}</option>
                          </Input>
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
                            defaultValue={placesOfJurisdiction}
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
                        <span
                          className="m-l-20"
                          style={{ cursor: "pointer" }}
                          value
                          onClick={() => {
                            checkedVal("CustomsDeclarationDocument");
                          }}
                          >
                           {customsDeclarationDoc =="" ?   <img 
                                src={addBlueIcon}
                                width="25px"
                                height="25px"
                                
                              ></img>:<img 
                              src={editBlueIcon}
                              width="25px"
                              height="25px"
                              
                            ></img>} 
                        
                          {/* <img src={infoIcon} width="25px" height="25px"></img> */}
                        </span>
                        {customsDeclarationDoc=="" ?   ""
                          :
                          <Card>
                            <CardBody> {parse(customsDeclarationDoc)}</CardBody>
                            </Card>}     
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
                            defaultValue={penalty}
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
                            type="select"
                            id="PrintTypeId"
                            className="form-control digits selectheight"
                            name="Print Type"
                            defaultValue=""
                            //onClick={()=>{inquiryMaster("PrintType")}}
                            onChange={(e) =>{ 
                              e.target.value!="addNew"?
                              setPrintType(e.target.value):dropVal("PrintType")}}
                          >
                            <option value="" disabled>
                              {t("selectPrintType")}
                            </option>
                            { printTypeList.length > 0 ? 
                            printTypeList.map((printTypeLists) => (
                                inquiryFormDtl.print_type==printTypeLists.content ?
                                <option
                                value={printTypeLists.content}
                                title={printTypeLists.content}
                              selected>
                                {printTypeLists.content}
                              </option> :
                              <option
                                value={printTypeLists.content}
                                title={printTypeLists.content}
                              >
                                {printTypeLists.content}
                              </option>
                            )):""}
                          <option value="addNew">+{t("addNew")}</option>
                          </Input>
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
                            defaultValue={printSize}
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
                            defaultValue={noOfColors}
                            placeholder={t("enterNumberofcolors")}
                            onChange={(e) => setNoOfColors(e.target.value)}
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* Print Information: Print Artwork */}

                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("printArtwork")}</Label>
                        <InputGroup>
                          <Input
                            className=""
                            name="Print Image"
                            placeholder={t("attachPrintArtwork")}
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
                                  onClick={() => {
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
                        <span
                          className="m-l-20"
                          style={{ cursor: "pointer" }}
                          value
                          onClick={() => {
                            checkedVal("MainLabel");
                          }}
                          >
                           {mainLabel =="" ?   <img 
                                src={addBlueIcon}
                                width="25px"
                                height="25px"
                                
                              ></img>:<img 
                              src={editBlueIcon}
                              width="25px"
                              height="25px"
                              
                            ></img>} 
                        
                          {/* <img src={infoIcon} width="25px" height="25px"></img> */}
                        </span>
                        {mainLabel=="" ?   ""
                          :
                          <Card>
                            <CardBody> {parse(mainLabel)}</CardBody>
                            </Card>}     
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
                                  onClick={() => {
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
                            defaultValue={washCareLabel}
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
                                  onClick={() => {
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
                            defaultValue={hangtag}
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
                                  onClick={() => {
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
                            defaultValue={barcodeStickers}
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
                                  onClick={() => {
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
                        <span
                          className="m-l-20"
                          style={{ cursor: "pointer" }}
                          value
                          onClick={() => {
                            toggleTrimsNotifications ();
                          }}
                        >
                         {trimsNotification=="" ?   <img 
                                src={addBlueIcon}
                                width="25px"
                                height="25px"
                                
                              ></img>:<img 
                              src={editBlueIcon}
                              width="25px"
                              height="25px"
                              
                            ></img>} 
                        </span>
                        <TrimsNotificationsSpecify
                              modal={trimsNotificationsModal}
                              toggle={toggleTrimsNotifications}
                              trimsNotification={trimsNotification}
                              setTrimsNotification={setTrimsNotification}
                              setTrimsNotificationsModal={setTrimsNotificationsModal}
                              trimsNotificationsModal={trimsNotificationsModal}
                            />
                       {/* <JoditEditor
                          ref={editor}
                          value={trimsNotification}
                          config={config}
                          tabIndex={1}
                          onChange={(newContent) => setTrimsNotification(newContent)}
                        /> */}
                       {trimsNotification=="" ?   ""
                          :
                          <Card>
                            <CardBody> {parse(trimsNotification)}</CardBody>
                            </Card>}         
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
                            defaultValue={polybagSizeThickness}
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
                            defaultValue={polybagMaterial}
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
                            defaultValue={printDetailsPolybag}
                            placeholder={t("enterPrintDetailsPolybag")}
                            onChange={(e) =>
                              setPrintDetailsPolybag(e.target.value)
                            }
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* Packing Information: Polybag Print Artwork  */}
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("polybagPrintArtwork")}</Label>
                        <InputGroup>
                          <Input
                            className=""
                            name="Polybag Image"
                            placeholder={t("attachPolybagPrintArtwork")}
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
                                  onClick={() => {
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

                  {/* Packing Information: Carton Box Dimensions,Carton Color,Carton Material(No of Ply) */}

                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("cartonBoxDimensions")}</Label>
                        <InputGroup>
                          <Input
                            className=""
                            name="Carton Box Dimensions"
                             defaultValue={cartonBoxDimension}
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
                            defaultValue={cartonColors}
                            placeholder={t("enterCartonColor")}
                            onChange={(e) => setCartonColors(e.target.value)}
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("noOfPly")}</Label>
                        <InputGroup>
                          <Input
                            type="select"
                            id="NoofPlyId"
                            // placeholder={t("selectStatus")}
                            className="form-control digits selectheight"
                            name="No Of Ply"
                            defaultValue=""
                            onChange={(e) => {
                              e.target.value!="addNew"?
                              setCartonMaterial(e.target.value):dropVal("NoofPly")}}
                          >
                            <option value="" disabled>
                              {t("selectNoOfPly")}
                            </option>
                            {noOfPlyList.map((plyList) => (
                                inquiryFormDtl.carton_material==plyList.content ? 
                                <option
                                value={plyList.content}
                                title={plyList.content}
                              selected>
                                {plyList.content}
                              </option>     :
                              <option
                                value={plyList.content}
                                title={plyList.content}
                              >
                                {plyList.content}
                              </option>                              
                            ))}
                            <option value="addNew">+{t("addNew")}</option>
                          </Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* Packing Information: Carton Edge Finish,Carton Mark Details */}

                  <Row>
                  <Col lg="4">
                      <FormGroup>
                        <Label>{t("cartonEdgeFinish")}</Label>
                        <InputGroup>
                          <Input
                            type="select"
                            id="cartonEdgeFinishId"
                            // placeholder={t("selectStatus")}
                            className="form-control digits selectheight"
                            name="Carton Edge Finish"
                            //defaultValue=""
                            onChange={(e) => {
                              e.target.value!="addNew"?
                              setCartonEdgeFinish(e.target.value):dropVal("CartonEdgeFinish")}}
                          >
                            <option value="" disabled>
                              {t("selectCartonEdgeFinish")}
                            </option>
                            {cartonEdgeFinishList.map((cartonEdgeFinList) => (
                                inquiryFormDtl.carton_edge_finish==cartonEdgeFinList.content ? 
                                <option
                                value={cartonEdgeFinList.content}
                                title={cartonEdgeFinList.content}
                                selected>
                                {cartonEdgeFinList.content}
                              </option>:
                              <option
                                value={cartonEdgeFinList.content}
                                title={cartonEdgeFinList.content}
                              >
                                {cartonEdgeFinList.content}
                              </option>
                            ))}
                            <option value="addNew">+{t("addNew")}</option>
                          </Input>
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
                            defaultValue={cartonMarkDetails}
                            placeholder={t("enterCartonMarkDetails")}
                            onChange={(e) => setCartonMarkDetails(e.target.value)}
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    {/* <Col lg="2">
                      <FormGroup>
                        <Label>{t("cartonMarkImg")}</Label>
                        <InputGroup>
                          <Input
                            className=""
                            name="Carton Sample"
                            placeholder={t("attachCartonMarkImage")}
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
                                    onClick={() => {
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

                    </Col> */}
                  </Row>
<Row>
<Col lg="4">
                      <FormGroup>
                        <Label>{t("cartonMarkImg")}</Label>
                        <InputGroup>
                          <Input
                            className=""
                            name="Carton Sample"
                            placeholder={t("attachCartonMarkImage")}
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
                    <Col lg="4">

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
                                    onClick={() => {
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
                  {/* Packing Information: MakeUp,Films/CD,Picture-Card */}

                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("makeUp")}</Label>
                        <InputGroup>
                          <Input
                            className=""
                            name="Make-Up"
                            defaultValue={makeUp}
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
                            defaultValue={flimsCD}
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
                            defaultValue={pictureCard}
                            placeholder={t("enterPictureCard")}
                            onChange={(e) => setPictureCard(e.target.value)}
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>

                  </Row>

                  {/* Packing Information: Inner Cardboard,Estimated Delivery Date,Shipping Size*/}
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("innerCardboard")}</Label>
                        <InputGroup>
                          <Input
                            className=""
                            name="Inner Cardboard"
                            defaultValue={innerCardBoard}
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
                            defaultValue={estimatedDeliveryDate}
                            placeholder={t("estimatedDeliveryDateETAETD")}
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
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
                            defaultValue={shippingSize}
                            placeholder={t("enterShippingSize")}
                            onChange={(e) => setShippingSize(e.target.value)}
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  {/***************Air Freight **********/}
                  </Row>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label>{t("airFreight")}</Label>
                        <InputGroup>
                          <Input
                            className=""
                            name="Air Freight"
                            defaultValue={airFrieght}
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
                        <span
                          className="m-l-20"
                          style={{ cursor: "pointer" }}
                          value
                          onClick={() => {
                            toggleSubstances ();
                          }}
                        >
                         {forbiddenSubstancesInfo =="" ?   <img 
                                src={addBlueIcon}
                                width="25px"
                                height="25px"
                                
                              ></img>:<img 
                              src={editBlueIcon}
                              width="25px"
                              height="25px"
                              
                            ></img>} 
                        </span>
                        <ForbiddenSubstancesInformation
                              modal={substancesInformationModal}
                              toggle={toggleSubstances}
                              setForbiddenSubstancesInfo={setForbiddenSubstancesInfo}
                              forbiddenSubstancesInfo={forbiddenSubstancesInfo}
                              setSubstancesInformationModal={setSubstancesInformationModal}
                              substancesInformationModal={substancesInformationModal}
                            />
                           {forbiddenSubstancesInfo=="" ?   ""
                          :
                          <Card>
                            <CardBody> {parse(forbiddenSubstancesInfo)}</CardBody>
                            </Card>} 
                      {/* <JoditEditor
                          ref={editor}
                          value={forbiddenSubstancesInfo}
                          config={config}
                          tabIndex={1}
                          onChange={(newContent) => setForbiddenSubstancesInfo(newContent)}
                        /> */}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Label className="form-label">
                          {t("testingRequirement")}
                        </Label>

                        <span
                          className="m-l-20"
                          style={{ cursor: "pointer" }}
                          value
                          onClick={() => {
                            toggletesting ();
                          }}
                        >
                        {testingRequirement =="" ?   <img 
                                src={addBlueIcon}
                                width="25px"
                                height="25px"
                                
                              ></img>:<img 
                              src={editBlueIcon}
                              width="25px"
                              height="25px"
                              
                            ></img>} 
                        </span>
                        <TestingRequirement
                              modal={testingRequirementModal}
                              toggle={toggletesting}
                              setTestingRequirement={setTestingRequirement}
                              testingRequirement={testingRequirement}
                              setTestingRequirementModal={setTestingRequirementModal}
                              testingRequirementModal={testingRequirementModal}
                            />
                          {testingRequirement=="" ?   ""
                          :
                          <Card>
                            <CardBody> {parse(testingRequirement)}</CardBody>
                            </Card>} 
                       {/* <JoditEditor
                          ref={editor}
                          value={testingRequirement}
                          config={config}
                          tabIndex={1}
                          onChange={(newContent) => setTestingRequirement(newContent)}
                        /> */}
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
                        <span
                          className="m-l-20"
                          style={{ cursor: "pointer" }}
                          value
                          onClick={() => {
                            toggleRequirement ();
                          }}
                        >
                          {sampleRequirement =="" ?   <img 
                                src={addBlueIcon}
                                width="25px"
                                height="25px"
                                
                              ></img>:<img 
                              src={editBlueIcon}
                              width="25px"
                              height="25px"
                              
                            ></img>} 
                        </span>
                        <SampleRequirements
                              modal={sampleRequirementsModal}
                              toggle={toggleRequirement}
                              setSampleRequirement={setSampleRequirement}
                              sampleRequirement={sampleRequirement}
                              setSampleRequirementsModal={setSampleRequirementsModal}
                              sampleRequirementsModal={sampleRequirementsModal}
                            />
                           {sampleRequirement=="" ?   ""
                          :
                          <Card>
                            <CardBody> {parse(sampleRequirement)}</CardBody>
                            </Card>}  
                       {/* <JoditEditor
                          ref={editor}
                          value={sampleRequirement}
                          config={config}
                          tabIndex={1}
                          onChange={(newContent) => setSampleRequirement(newContent)}
                        /> */}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Label className="form-label">
                          {t("specialRequestIfAny")}
                        </Label>
                        <span
                          className="m-l-20"
                          style={{ cursor: "pointer" }}
                          value
                          onClick={() => {
                            togglespecialRequest ();
                          }}
                        >
                           {specialRequest =="" ?   <img 
                                src={addBlueIcon}
                                width="25px"
                                height="25px"
                                
                              ></img>:<img 
                              src={editBlueIcon}
                              width="25px"
                              height="25px"
                              
                            ></img>} 
                        </span>
                        <SpecialRequest
                              modal={specialRequestsModal}
                              toggle={togglespecialRequest}
                              setSpecialRequest={setSpecialRequest}
                              specialRequest={specialRequest}
                              setSpecialRequestModal={setSpecialRequestModal}
                              specialRequestsModal={specialRequestsModal}
                            />
                            {specialRequest=="" ?   ""
                          :
                          <Card>
                            <CardBody> {parse(specialRequest)}</CardBody>
                            </Card>}  
                       {/* <JoditEditor
                          ref={editor}
                          value={specialRequest}
                          config={config}
                          tabIndex={1}
                          onChange={(newContent) => setSpecialRequest(newContent)}
                        /> */}
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
              <img src={scrollUpIcon} className="icon-position icon-style"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
              </img>
            )}{" "}
          </div>
        </Col>
      </Container>
      { /*****CustomsDeclarationDocument,MainLabel - Modal*****/ }
      <InfoCanvas
        modal={showInfoCanvas}
        toggle={toggleInfoCanvas}
        infoDetails={infoDetails}
        setInfoDetails={setInfoDetails}
        masterType={masterType}
        setPaymentTerm={setPaymentTerm}
        setShowInfoCanvas={setShowInfoCanvas}
        showInfoCanvas={showInfoCanvas}
        PaymentTerm={paymentTerm}
        setCustomsDeclarationDoc={setCustomsDeclarationDoc}
        customsDeclaration ={customsDeclarationDoc}
        setMainLabel={setMainLabel}
        mainLabel={mainLabel}
        referenceId={ referenceId}
      />
      { /*****PaymentTerms,penalty,No of ply,Patterns,Carton Edge Finish Drop Down "+Add More" ****/ }
      <AddNewDropdownModal
      modal={showAddNew}
      toggle={toggleAddNew}
      infoDetails={infoDetails}
      setInfoDetails={setInfoDetails}
      masterType={masterType}
      referenceId={ referenceId}
      setPaymentTermList={setPaymentTermList}
      setPrintTypeList={setPrintTypeList}
      setNoOfPlyList={setNoOfPlyList}
      setCartonEdgeFinishList={setCartonEdgeFinishList}
      setPatternList={setPatternList}
      setPaymentTerm={setPaymentTerm}
      />
    </Fragment>
  );
};
export default editInquiryForm;

/*************************Code By: R.AKSHAYA MOL************************/
/*************************Updated By: P.Praveen************************/
/*************************Updated By: R.Ramanan ************************/

