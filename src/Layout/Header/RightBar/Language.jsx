import React, { Fragment, useState,useEffect } from 'react';
import { English, Deutsch, Español, Français, Português, 简体中文,India,Japan,GeneralSettingsLabel, Option, ServerUrl } from '../../../Constant';
import { useTranslation } from 'react-i18next';
import { LI } from '../../../AbstractElements';
import axios from "axios";
import {
    getLoginToken,
    getLoginUserType,
    getLoginCompanyId,
    getLoginUserId,
    getLoginStaffId,
    getWorkspaceId,getStaff,
  } from "../../../Constant/LoginConstant";
import { apiencrypt,apidecrypt } from '../../../helper';



const LanguageClass = () => {
    const [langdropdown, setLangdropdown] = useState(false);
    const { t,i18n} = useTranslation();
    const [selected, setSelected] = useState(i18n.language=='jp'?'jp':'en');
    const [language, setlanguage] = useState([]);
//console.log("loadLanguages",i18n.language);

      const changeLanguage = (lng,id) => {
        i18n.changeLanguage(lng);
        setSelected(lng);
        if(getWorkspaceId>0){
        onSubmitHandler(lng,id);
        }
      };

    const LanguageSelection = (language) => {
        if (language) {
            setLangdropdown(!language);
        } else {
            setLangdropdown(!language);
        }
    };




    const onSubmitHandler = (lng,id) => {
       
        let getNofiySetting = {};
    getNofiySetting["companyId"] = getLoginCompanyId;
    getNofiySetting["userId"] = getLoginUserId;
    getNofiySetting["staffId"] = getLoginStaffId;
    getNofiySetting["workspaceId"] = getWorkspaceId;
    getNofiySetting["languageId"] = id;
    
        if (getStaff !== "Staff") {
          axios.post(ServerUrl + "/user-preference", apiencrypt(getNofiySetting)).then((response) => {
         
          });
        } else {
          axios.post(ServerUrl + "/staff-preference", apiencrypt(getNofiySetting)).then((response) => {
     
          });
        }
      };
      useEffect(() => { 
        axios.get(ServerUrl + "/get-languages").then((language) => {
            language.data = apidecrypt(language.data)
            setlanguage(language.data.data);
          });
       }, []);
    return (
        <Fragment>
            <LI attrLI={{ className: 'onhover-dropdown' }} >
                <div className={`translate_wrapper ${langdropdown ? 'active' : ''}`}>
                    <div className="current_lang">
                        <div className="lang d-flex" onClick={() => LanguageSelection(langdropdown)}>
                            <i className={`flag-icon flag-icon-${selected === 'en' ? 'us' : selected === 'du' ? 'de' : selected}`}></i>
                           <span className="lang-txt">{selected}</span> <span><i className="icofont icofont-caret-down"></i></span>
                        </div>
                    </div>
                   
                    <div className={`more_lang onhover-show-div ${langdropdown ? 'active' : ''}`}>
                      
                    {/* <div className="lang" onClick={() => changeLanguage('bd')}><i className="flag-icon flag-icon-bd"></i><span className="lang-txt">Bengali</span></div> */}
                        {/* <div className="lang" onClick={() => changeLanguage('en')}><i className="flag-icon flag-icon-us"></i><span className="lang-txt">English</span></div>
                        <div className="lang" onClick={() => changeLanguage('jp')}><i className="flag-icon flag-icon-jp"></i><span className="lang-txt">{Japan}</span></div> */}

{language.map((language) =>
                    
                   
                         <div className="lang" onClick={() => changeLanguage(language.lang_code,language.id)}><i className={`flag-icon flag-icon-${language.lang_code === 'en' ? 'us' : language.lang_code}`}></i><span className="lang-txt">{language.name}</span></div> 
                    
                    )}

                        

                        
                </div>
                </div>
            </LI>
        </Fragment>
    );
};

export default LanguageClass;