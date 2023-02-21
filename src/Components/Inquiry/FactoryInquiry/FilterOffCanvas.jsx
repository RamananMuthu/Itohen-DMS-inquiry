import React , {useState}from "react";
import { Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,  Card, CardBody, Row ,Col,Input,Label, Button } from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { getLoginCompanyId, getWorkspaceId, getLoginUserId, getWorkspaceType, getStaff,getStaffPermission, getLoginStaffId } from "../../../Constant/LoginConstant";
import { Close, SaveChanges , ServerUrl} from "../../../Constant";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import moment from "moment/moment";
import { apidecrypt, apiencrypt } from "../../../helper";

const FilterOffCanvas = ({ modal, toggle, Article,Inquiryarticles,Inquiryusers,
  InquiryDetails,InquiryResponse,TotalFactList,links,pageNumber,setFilterEndDateDetails,setFilterStartDateDetails,setFilterArticleDetails,setFilterBuyerDetails}) => {
  const [workspace_id, setworkspace_id] = useState(getWorkspaceId);
  const [company_id, setcompany_id] = useState(getLoginCompanyId);
  const { t } = useTranslation();
  const [days, setDay] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [BuyerPCU, setBuyerPCU] = useState("0");
  const [articleName, setArticleName] = useState("0");
  //const [pageNumber, setPageNumber] = useState("1");


 
  const submitFunction = ()=>{
  
   
   
 
    // dataToSend.type = type;
    // filterType(type);
    // if(styleNo!= "0" ){
    //   dataToSend.BuyerPCU = BuyerPCU;
    //   filterStyleNo(BuyerPCU);         
    // }
    // let startDates = document.getElementById("startDate").value;
    // let endDates = document.getElementById("endDate").value;
    // if(startDates != "" && endDates != ""){
    //   dataToSend.startDate = document.getElementById("startDate").value;
    //   dataToSend.endDate = document.getElementById("endDate").value;
    //   filterStartDate(startDates);
    //   filterEndDate(endDates);
    // }

    var getInputParams = {};
    getInputParams["company_id"] = getLoginCompanyId;
    getInputParams["workspace_id"] = getWorkspaceId;
    getInputParams["factory_id"] = getLoginUserId;
    getInputParams["page"] =     pageNumber;
    
    getInputParams["article_id"] = articleName !="0"? articleName : "";
    getInputParams["user_id"] = BuyerPCU != "0"?BuyerPCU:"";
    getInputParams["from_date"] =     startDate;
    getInputParams["to_date"] =     endDate;
    setFilterEndDateDetails(endDate)
    setFilterStartDateDetails(startDate)
    setFilterArticleDetails(articleName)
    setFilterBuyerDetails(BuyerPCU)
    axios
    .post(ServerUrl + "/factory-get-inquiry", apiencrypt(getInputParams))
    .then((response) => {
      response.data = apidecrypt(response.data);
      // setInquiryDetails(response.data.data);
      InquiryResponse(response.data.response);
      TotalFactList(response.data.data.last_page);
      links(response.data.data.links);
      InquiryDetails(response.data.data.data);
      pageNumber(pageNumber);
      toggle()
    })
     
        
  };
 
  // const submitFunction = ()=>{
  //   let type = [];
  //   // let operators = document.getElementById("operator").value;
  //   // let style = document.getElementById("styleNo").value;
  //   // let day = document.getElementById("days").value;
  //   let cut = document.getElementById("cut").checked;
  //   let sew = document.getElementById("sew").checked;
  //   let pack = document.getElementById("pack").checked;
  //   if(cut)
  //     type.push("Cut");
  //   if(sew)
  //     type.push("Sew");
  //   if(pack)
  //     type.push("Pack");
  //   let dataToSend ;
  //   getStaff === "Staff" ?  dataToSend = {
  //       company_id: company_id,
  //       workspace_id: workspace_id,
  //       staff_id : getLoginStaffId,
  //       statusFilter : statusFilter,
  //   } : dataToSend = {
  //       company_id: company_id,
  //       workspace_id: workspace_id,
  //       statusFilter : statusFilter,
  //       user_id : getLoginUserId,
  //   } 
  //   if(getWorkspaceType === "Buyer"){
  //     dataToSend.factory_id = factory;
  //     dataToSend.pcu_id = pcu;
  //   }
  //   else if(getWorkspaceType === "PCU"){
  //     dataToSend.factory_id = factory;
  //     dataToSend.buyer_id = buyer;
  //   }
  //   else if(getWorkspaceType === "Factory"){
  //     dataToSend.buyer_id = buyer;
  //     dataToSend.pcu_id = pcu;
  //   }
  //   if(days != "" && operator !=""){
  //     dataToSend.no_of_delay = days;
  //     dataToSend.operator_symb = operator;
  //     filterOperator(operator);
  //     filterDaysDelay(days);
  //   }
  //   dataToSend.type = type;
  //   filterType(type);
  //   if(styleNo!= "0" ){
  //     dataToSend.styleNo = styleNo;
  //     filterStyleNo(styleNo);         
  //   }
  //   let startDates = document.getElementById("startDate").value;
  //   let endDates = document.getElementById("endDate").value;
  //   if(startDates != "" && endDates != ""){
  //     dataToSend.startDate = document.getElementById("startDate").value;
  //     dataToSend.endDate = document.getElementById("endDate").value;
  //     filterStartDate(startDates);
  //     filterEndDate(endDates);
  //   }

  //   axios.post(ServerUrl + "/get-production-report", apiencrypt(dataToSend))
  //   .then((response) =>{
  //     response.data = apidecrypt(response.data)
  //       taskDetails(response.data.data.productionData);
  //       toggle();
  //       })
  // };
  const clearFunction=()=>{

    setStartDate("")
    setEndDate("")
    setBuyerPCU("0")
    setArticleName("0")
    var getInputParams = {};
    getInputParams["company_id"] = getLoginCompanyId;
    getInputParams["workspace_id"] = getWorkspaceId;
    getInputParams["factory_id"] = getLoginUserId;
    getInputParams["page"] =     pageNumber;
   
    axios
    .post(ServerUrl + "/factory-get-inquiry", apiencrypt(getInputParams))
    .then((response) => {
      response.data = apidecrypt(response.data);
      // setInquiryDetails(response.data.data);
      InquiryResponse(response.data.response);
      TotalFactList(response.data.data.last_page);
      links(response.data.data.links);
      InquiryDetails(response.data.data.data);
      pageNumber(pageNumber);
      toggle()
    })
 
    
   
  };
  return (
    <Offcanvas isOpen={modal} toggle={toggle}  direction={"end"}>
      <OffcanvasHeader className="bg-primary offcanvas-header"><i className="fa fa-filter f-24"></i> {t("filter")} 
        <span className="f-right cursor-pointer" onClick={toggle}>X</span>
      </OffcanvasHeader> 
      <OffcanvasBody>
            <Row className="p-2">
            <Row className="p-2">
            <Col md={12}>
            
            
              <Label>{t("BuyerPCU")}</Label>
                <Input type="select" defaultValue={BuyerPCU} name="articleName" id="Buyerpcu" 
                onChange={(e)=>setBuyerPCU(e.target.value)}
                >
                <option value="0" selected disabled>{t("selectBuyerPCU")}</option>
                {Inquiryusers.map((article)=>(
                <option  value={article.id} selected>{article.name}</option> 
               
                ))}
                </Input>
               
                
            </Col>
        </Row>
        <Row className="p-2">
            <Col md={12}>
                <Label>{t("articleName")}</Label>
                <Input type="select"  defaultValue={articleName} name="articleName" id="articleName" 
                 onChange={(e)=>setArticleName(e.target.value)}
                >
                <option value="0" selected disabled>{t("selectArticleName")}</option>

                {Inquiryarticles.map((article)=>(
                <option  value={article.id} selected>{article.name}</option> 
               
                ))}
                </Input>
            </Col>
        </Row>
            <Col md={6}>
                <Label>{t("startDate")}</Label>
                <Input type="date" id="startDate"
                onChange={(e)=>{
                  setStartDate(e.target.value);
                  document.getElementById("endDate").setAttribute("min",e.target.value);
                  let targetDate = moment(e.target.value).add(3,"months").format("YYYY-MM-DD");
                  document.getElementById("endDate").setAttribute("max",targetDate);
                }}
                onKeyDown={(e) => {
                e.preventDefault();
                }}
                defaultValue={startDate}
                >
                </Input>
            </Col>
            <Col md={6}>
                <Label>{t("endDate")}</Label>
                <Input type="date" id="endDate" 
                onChange={(e)=>{
                  setEndDate(e.target.value);
                }}
                onKeyDown={(e) => {
                    e.preventDefault();
                    }}
                defaultValue={endDate}
                > 
                </Input>
            </Col>
            </Row>
            <br></br>
      </OffcanvasBody>
      <footer className="m-20 p-2">
        <Button  className="btn secondaryBtn" 
         onClick={ ()=>clearFunction() }
        >
          {t("clear")}
        </Button>
        <div className="f-right">
          <Btn attrBtn={{ color: "primary",
           onClick : ()=>submitFunction()  
          }}
          >
            {t("apply")}
          </Btn>
        </div>
      </footer>
    </Offcanvas>
  );
};

export default FilterOffCanvas;
/* Code By : Rithanesh */