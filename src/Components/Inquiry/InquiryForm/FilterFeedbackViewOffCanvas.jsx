import React , {useState}from "react";infoDetails
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

const FilterFeedbackViewOffCanvas = ({ modal, toggle,FeedbackFactory,feedbackInquiryId,setFilterInquiryIdDetailsDetails,setFilterFeedbackFactoryDetails,
  setFilterStartDateDetails,setFilterEndDateDetails,
  FeedbackFactoryDetails,factoryFeedback,feedbackInquiryIddetails
}) => {
  const [workspace_id, setworkspace_id] = useState(getWorkspaceId);
  const [company_id, setcompany_id] = useState(getLoginCompanyId);
  const { t } = useTranslation();
  const [days, setDay] = useState("");
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [factoryDetails, setFactoryDetails] = useState("0");
  const [inquiryIdDetails, setInquiryIdDetails] = useState("0");
  const submitFunction = ()=>{
    
    var getInputParams = {};
    getInputParams["company_id"] = getLoginCompanyId;
    getInputParams["workspace_id"] = getWorkspaceId;

    getInputParams["inquiry_id"] = inquiryIdDetails !="0"? inquiryIdDetails : "";
    getInputParams["factory_id"] = factoryDetails != "0"?factoryDetails:"";
    getInputParams["from_date"] = startDate;
    getInputParams["to_date"] = endDate;
    setFilterEndDateDetails(endDate)
    setFilterStartDateDetails(startDate)
    setFilterInquiryIdDetailsDetails(inquiryIdDetails)
    setFilterFeedbackFactoryDetails(factoryDetails)
    axios
    .post(ServerUrl + "/factory-feedback", apiencrypt(getInputParams))
    .then((response) => {
      response.data = apidecrypt(response.data);
      factoryFeedback(response.data.data);
      FeedbackFactoryDetails(response.data.factories);
      feedbackInquiryIddetails(response.data.inquiries);
      toggle()

    });
  };
 
  const clearFunction=()=>{
    setStartDate("")
    setEndDate("")
    setFactoryDetails("0")
    setInquiryIdDetails("0")
    var getInputParams = {};
    getInputParams["company_id"] = getLoginCompanyId;
    getInputParams["workspace_id"] = getWorkspaceId;

    getInputParams["inquiry_id"] = inquiryIdDetails !="0"? inquiryIdDetails : "";
    getInputParams["factory_id"] = factoryDetails != "0"?factoryDetails:"";
    getInputParams["from_date"] = startDate;
    getInputParams["to_date"] = endDate;
    setFilterEndDateDetails(endDate)
    setFilterStartDateDetails(startDate)
    setFilterInquiryIdDetailsDetails(inquiryIdDetails)
    setFilterFeedbackFactoryDetails(factoryDetails)
    axios
    .post(ServerUrl + "/factory-feedback", apiencrypt(getInputParams))
    .then((response) => {
      response.data = apidecrypt(response.data);
      factoryFeedback(response.data.data);
      FeedbackFactoryDetails(response.data.factories);
      feedbackInquiryIddetails(response.data.inquiries);
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
                <Input type="select" 
                defaultValue={factoryDetails} name="factory" id="factory" 
                onChange={(e)=>setFactoryDetails(e.target.value)}
                >
                <option value="0" selected disabled>{t("selectFactory")}</option>
                {
                (FeedbackFactory).length > 0 ?
                <>
                {(FeedbackFactory).map((Factory)=>(
                <option  value={Factory.id} selected>{Factory.factory}</option> 
                ))} </>
                :
                ""}
                </Input>
            </Col>
        </Row>
        <Row className="p-2">
            <Col md={12}>
                <Label>{t("inquiryId")}</Label>
                <Input type="select" 
                 defaultValue={inquiryIdDetails} name="articleName" id="articleName" 
                 onChange={(e)=>setInquiryIdDetails(e.target.value)}
                >
                <option value="0" selected disabled>{t("selectInquiryId")}</option>
                {(feedbackInquiryId).length > 0 ? 
                <>
                {feedbackInquiryId.map((inquiryId)=>(
                <option  value={inquiryId.id} selected>{t("inquiryNoTitle")}{inquiryId.id}</option> ))}
                </>:"" }
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

export default FilterFeedbackViewOffCanvas;
