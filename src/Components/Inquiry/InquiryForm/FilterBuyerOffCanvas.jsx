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

const FilterBuyerOffCanvas = ({ modal, toggle,InquiryfactorieDetails,InquiryarticlesDetails,InquiryDetails,TotalInquiryListSet,links,pageNumber,InquiryDownloadPath, Article,Inquiryarticles,Inquiryusers,
  setFilterEndDateDetails,setFilterStartDateDetails,setFilterArticleDetails,setFilterFactoryDetails}) => {
  const [workspace_id, setworkspace_id] = useState(getWorkspaceId);
  const [company_id, setcompany_id] = useState(getLoginCompanyId);
  const { t } = useTranslation();
  const [days, setDay] = useState("");
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [factoryDetails, setFactoryDetails] = useState("0");
  const [articlesDetails, setArticlesDetails] = useState("0");
  //const [pageNumber, setPageNumber] = useState("1");
  const submitFunction = ()=>{
    // var getInputParams = {};
    // getInputParams["company_id"] = getLoginCompanyId;
    // getInputParams["workspace_id"] = getWorkspaceId;
    // getInputParams["factory_id"] = getLoginUserId;
    // getInputParams["page"] =     pageNumber;
    
    // getInputParams["article_id"] = articleName !="0"? articleName : "";
    // getInputParams["user_id"] = BuyerPCU != "0"?BuyerPCU:"";
    // getInputParams["from_date"] =     startDate;
    // getInputParams["to_date"] =     endDate;
    // setFilterEndDateDetails(endDate)
    // setFilterStartDateDetails(startDate)
    // setFilterArticleDetails(articleName)
    // setFilterBuyerDetails(BuyerPCU)
    // axios
    // .post(ServerUrl + "/factory-get-inquiry", apiencrypt(getInputParams))
    // .then((response) => {
    //   response.data = apidecrypt(response.data);
    //   InquiryResponse(response.data.response);
    //   TotalFactList(response.data.data.last_page);
    //   links(response.data.data.links);
    //   InquiryDetails(response.data.data.data);
    //   pageNumber(pageNumber);
    //   toggle()
    // }) 
    
    var getInputParams = {};
    getInputParams["company_id"] = getLoginCompanyId;
    getInputParams["workspace_id"] = getWorkspaceId;
    getInputParams["user_id"] = getLoginUserId;
    getInputParams["page"] =     pageNumber;

    getInputParams["article_id"] = articlesDetails !="0"? articlesDetails : "";
    getInputParams["factory_id"] = factoryDetails != "0"?factoryDetails:"";
    getInputParams["from_date"] = startDate;
    getInputParams["to_date"] = endDate;
    setFilterEndDateDetails(endDate)
    setFilterStartDateDetails(startDate)
    setFilterArticleDetails(articlesDetails)
    setFilterFactoryDetails(factoryDetails)
    axios
    .post(ServerUrl + "/get-inquiry", apiencrypt(getInputParams))
    .then((response) => {
      response.data = apidecrypt(response.data);
      // setInquiryDetails(response.data.data);
      InquiryDownloadPath(response.data.pdfpath);
      InquiryDetails(response.data.data.data);
      TotalInquiryListSet(response.data.data.last_page);
      links(response.data.data.links);
      pageNumber(pageNumber);
      toggle()

    });
  };
 
  const clearFunction=()=>{

    setStartDate("")
    setEndDate("")
    setFactoryDetails("0")
    setArticlesDetails("0")
    var getInputParams = {};
    getInputParams["company_id"] = getLoginCompanyId;
    getInputParams["workspace_id"] = getWorkspaceId;
    getInputParams["user_id"] = getLoginUserId;
    getInputParams["page"] =     pageNumber;
    axios
    .post(ServerUrl + "/get-inquiry", apiencrypt(getInputParams))
    .then((response) => {
      response.data = apidecrypt(response.data);
      // setInquiryDetails(response.data.data);
      InquiryDownloadPath(response.data.pdfpath);
      InquiryDetails(response.data.data.data);
      TotalInquiryListSet(response.data.data.last_page);
      links(response.data.data.links);
      pageNumber(pageNumber);
      toggle()

    });
 
    
   
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
            
            
              <Label>{t("factory")}</Label>
                <Input type="select" defaultValue={factoryDetails} name="factory" id="factory" 
                onChange={(e)=>setFactoryDetails(e.target.value)}
                >
                <option value="0" selected disabled>{t("selectFactory")}</option>
                {InquiryfactorieDetails.map((factoryDetails)=>(
                <option  value={factoryDetails.id} selected>{factoryDetails.factory}</option> 
               
                ))}
                </Input>
               
                
            </Col>
        </Row>
        <Row className="p-2">
            <Col md={12}>
                <Label>{t("articleName")}</Label>
                <Input type="select"  defaultValue={articlesDetails} name="articleName" id="articleName" 
                 onChange={(e)=>setArticlesDetails(e.target.value)}
                >
                <option value="0" selected disabled>{t("selectArticleName")}</option>

                {InquiryarticlesDetails.map((factory)=>(
                <option  value={factory.id} selected>{factory.name}</option> 
               
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

export default FilterBuyerOffCanvas;
/* Code By : Rithanesh */