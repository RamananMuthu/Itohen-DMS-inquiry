
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {ServerUrl} from '../../../Constant/index';
import { useContext } from 'react';
import { Maximize } from 'react-feather';
import { LI, UL,Btn } from '../../../AbstractElements';
import CustomizerContext from '../../../_helper/Customizer';
import Bookmarks from './Bookmark';
import LanguageClass from './Language';
import LogoutClass from './Logout';
import MessageDrop from './MessageDrop';
import MoonLight from './MoonLight';
import Notifications from './Notifiations';
import { Link } from 'react-router-dom';
import plusicon from '../../../assets/images/dms/icons/plus.svg'
import Swal from 'sweetalert2';
import { Card } from 'reactstrap';
import { LogOut } from 'react-feather';
import { getStaff, getStaffPermission, getLoginCompanyId, 
         getWorkspaceId, getLoginUserId, getLoginStaffId }
          from '../../../Constant/LoginConstant';
import { useTranslation } from 'react-i18next';
import { apidecrypt, apiencrypt } from '../../../helper';

const Rightbar = () => {
    const { sidebarResponsive } = useContext(CustomizerContext);
    // const [ planValidation, setPlanValidation ] = useState("");
    const [isDisabled, setIsDisabled ] = useState(false);
    const { t } = useTranslation();
    //full screen function
    var requestData;

    const inputParamsUser = {};
    inputParamsUser['company_id']=getLoginCompanyId;
    inputParamsUser['workspace_id']=getWorkspaceId;
    inputParamsUser['user_id']=getLoginUserId;
    inputParamsUser['type']='Order';

    const inputParamsStaff = {};
    inputParamsStaff['company_id']=getLoginCompanyId;
    inputParamsStaff['workspace_id']=getWorkspaceId;
    inputParamsStaff['user_id']=getLoginUserId;
    inputParamsStaff['staff_id']=getLoginStaffId;
    inputParamsStaff['type']='Order';

    {getStaff === "Staff" ? requestData=inputParamsStaff : requestData=inputParamsUser}


    const planValidation = () => {
        axios.post(ServerUrl+'/validate-plan', apiencrypt(requestData))
        .then((response) => 
        {
           // console.log(" RESPONSE ", response)
            response.data = apidecrypt(response.data);
            if (response.data.status_code === 400)
            {
                Swal.fire({
                  title: t(response.data.message),
                  icon: "warning",
                  button: "OK!",
                  allowOutsideClick: false
                })
                .then( (result ) => 
                {
                    if( result.isConfirmed){
                        window.location.href = '/inquiryform';
                    }
                })
            }  
        });

    }

    // useEffect( () => {
        // axios.post(ServerUrl+'/validate-plan', requestData)
        // .then((response) => 
        // {
        //     // console.log(" Response ", t(response.data.message));
        //     if (response.data.status_code === 401)
        //     {
        //         Swal.fire({
        //           title: t(response.data.message),
        //           icon: "success",
        //           button: "OK!",
        //           allowOutsideClick: false
        //         })
        //     }    
        // });

    // },[]);

    function goFull() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    return (
        <Fragment>
            <div className="nav-right col pull-right right-menu p-0">
            <UL attrUL={{ className: `simple-list d-flex flex-row nav-menus ${sidebarResponsive ? 'open' : ''}` }} >
                    {/* <LI><a className="text-dark" href="#javascript" onClick={goFull}>
                        <Maximize />
                    </a></LI> */}
                    
            <LI>
                {(getStaff === "Staff" && getStaffPermission.includes("Add Order"))
                ||
                getStaff == null
                ?
                // <Link 
                // to={`${process.env.PUBLIC_URL}/createorder`}
                //  onClick={ () => { planValidation() }} 
                //  className="btn-pill btn btn-outline-primary btn-md" >
                // <img src={plusicon}/>  {t('addNewOrder')} 
                //  </Link>

                <Link to={`${process.env.PUBLIC_URL}/inquiryform`}
                onClick={ () => { planValidation() }} className= 'btn-pill btn btn-outline-primary btn-md  btn-primary-light' >
                <img src={plusicon}/>
                    {/* {t('addNewOrder')}  */}
                    Create New Inquiry 
                </Link>
                :
                ""}
            </LI>
                  
                    {/* <Bookmarks /> */}
                    <Notifications />
                    <LanguageClass />
                    {/* <MoonLight /> */}
                    <MessageDrop />
                    {/* <LogoutClass /> */}
                </UL>
            </div>
        </Fragment >
    );
};

export default Rightbar;