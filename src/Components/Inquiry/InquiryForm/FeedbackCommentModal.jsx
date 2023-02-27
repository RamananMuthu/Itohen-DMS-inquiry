import React, {useState,useRef,useMemo} from 'react';
import { Modal,
  ModalBody,
  ModalFooter,
  ModalHeader} from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import parse from 'html-react-parser';
import {useTranslation} from "react-i18next";

const FeedbackCommentModal = ({ modal, toggle,factoryFeedbackView,inquiryNo,factoryId,feedComments}) =>{
  const { t } = useTranslation();

  return (
     
    <Modal  isOpen={modal} toggle={toggle} centered  >
     
      <ModalHeader className="bg-primary "  >
     
     <span className='Commentsmodal'>{t("inquiryNoTitle")} {inquiryNo}</span>
         
        {/* {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?Feedback.factory:""} */}
      
        </ModalHeader>
      
       
      <ModalBody  id="htmljoditListCSS">
        <div className='f-15'><strong>Comments </strong></div>
      {(factoryFeedbackView).length > 0 ?
      <>
      {
      feedComments=="lowestPrice"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?parse(Feedback.lowest_price_comments):""}
          </>)) :""}
          {
      feedComments=="effiCommunication"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?parse(Feedback.communication_comments):""}
         
          </>)) :""}
          {
      feedComments=="reliableTimeDelivery"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?parse(Feedback.ontime_delivery_comments):""}
          </>)) :""}
          {
      feedComments=="lessQuantityIssues"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?parse(Feedback.less_quality_issue_comments):""}
          </>)) :""}
          {
      feedComments=="vbRelations"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?parse(Feedback.vendor_buyer_relation_comments):""}
          </>)) :""}
          {
      feedComments=="goodSell"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?parse(Feedback.good_sell_through_comments):""}
          </>)) :""}
          {
      feedComments=="onTimeSampleSub"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?parse(Feedback.sample_submission_comments):""}
          </>)) :""}
          {
      feedComments=="collabApproach"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?parse(Feedback.collaborative_approach_comments):""}
          </>)) :""}
          
     </>:""}

      </ModalBody>
      <ModalFooter >
        <Btn attrBtn={{ color: "btn secondaryBtn btn-sm", onClick: toggle }}>{t("close")}</Btn>
        {/* <button className='btn btn-primary' onClick={()=>{onSaveHandle()}}>{t("save")}</button> */}
      </ModalFooter>
    </Modal>
   
  );
};

export default FeedbackCommentModal;