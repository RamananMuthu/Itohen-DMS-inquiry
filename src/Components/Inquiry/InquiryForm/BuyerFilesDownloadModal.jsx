import React, {} from 'react';
import { Modal,
  ModalBody,
  ModalFooter,
  ModalHeader } from 'reactstrap';
import download_icon from"../../../assets/images/dms/icons/download_icon.svg";
import {useTranslation} from "react-i18next";

const BuyerFilesDownloadModal = ({ 
  toggleFactoryDownload, downloadFileDetails,
  downloadMsSheetDetails, setViewFactoryDownload, 
  viewFactoryDownload, inquiryNo}) =>{
  const {t} = useTranslation();
  return (
    <>
    <Modal  isOpen={viewFactoryDownload} toggle={toggleFactoryDownload} centered backdrop="static">
      <ModalHeader >
        {t("inquiryNoTitle")} {inquiryNo} <span className='m-l-10'> {t("filesDownload")} </span>
      </ModalHeader>
      <ModalBody  id="htmljoditListCSS">
        {
         (downloadFileDetails != undefined)?
         <>
          <ul>
              <li>
                <a href={downloadFileDetails.inq_pdf} target="_blank"> <span className="m-l-5 m-t-5">
                  <span className="link"> {"IN-"+inquiryNo}{" . pdf"}</span>  
                    <img
                    width="29px"
                    style={{ cursor: "pointer" }}
                    className="m-r-30 p-1 m-l-10" 
                    src={download_icon}
                    />
                  </span>
                </a>
              </li>
              {
                (downloadMsSheetDetails).length > 0 ?
                <>
                <li className="m-t-15">&nbsp;{t("measurementSheets")}</li>
                  {
                  (downloadMsSheetDetails).map((mapData) => (
                  <li> 
                    <a href={downloadFileDetails.serverURL+mapData.filepath} target="_blank"> 
                    <span className="m-l-5 m-t-5">
                      <span className="link">{mapData.orginalfilename}</span>  
                      <img
                      width="29px"
                      style={{ cursor: "pointer" }}
                      className="m-r-30 p-1 m-l-10" 
                      src={download_icon}
                      />
                    </span></a></li>
                  )) }</> : 
                <li>&nbsp;{t("measSheetNotAvail")}</li>
                }
          </ul>
          </>
          :""
        }
        
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-secondary" onClick={ () => {
          setViewFactoryDownload(!viewFactoryDownload)
        }}>{t("close")}</button>
      </ModalFooter>
    </Modal>
    </>
  );
};

export default BuyerFilesDownloadModal;