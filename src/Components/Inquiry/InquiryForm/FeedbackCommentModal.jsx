import React, {useState,useRef,useMemo} from 'react';
import { Modal,
  ModalBody,
  ModalFooter,
  ModalHeader, Input, Label } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { Close, SaveChanges, ServerUrl } from '../../../Constant';
import  axios  from "axios";
import Swal from "sweetalert2";
import JoditEditor from 'jodit-react';


import {useTranslation} from "react-i18next";
import { apidecrypt, apiencrypt } from '../../../helper';

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
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?<span className='m-l-15 m-t-5'>{Feedback.lowest_price_comments}</span>:""}
          </>)) :""}
          {
      feedComments=="effiCommunication"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?Feedback.communication_comments:""}
         
          </>)) :""}
          {
      feedComments=="reliableTimeDelivery"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?Feedback.ontime_delivery_comments:""}
          </>)) :""}
          {
      feedComments=="lessQuantityIssues"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?Feedback.less_quality_issue_comments:""}
          </>)) :""}
          {
      feedComments=="vbRelations"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?Feedback.vendor_buyer_relation_comments:""}
          </>)) :""}
          {
      feedComments=="goodSell"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?Feedback.good_sell_through_comments:""}
          </>)) :""}
          {
      feedComments=="onTimeSampleSub"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?Feedback.sample_submission_comments:""}
          </>)) :""}
          {
      feedComments=="collabApproach"?   
        (factoryFeedbackView).map((Feedback) => (
          <>
          {Feedback.inquiry_id==inquiryNo && Feedback.factory_contact_id==factoryId ?Feedback.collaborative_approach_comments:""}
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