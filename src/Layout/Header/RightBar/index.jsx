
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {ServerUrl} from '../../../Constant/index';
import { useContext } from 'react';
import { Maximize } from 'react-feather';
import { LI, UL,Btn,Badges } from '../../../AbstractElements';
import CustomizerContext from '../../../_helper/Customizer';
import Bookmarks from './Bookmark';
import LanguageClass from './Language';
import LogoutClass from './Logout';
import MessageDrop from './MessageDrop';
import MoonLight from './MoonLight';
import Notifications from './Notifiations';
import { Link } from 'react-router-dom';
import plusicon from '../../../assets/images/dms/icons/plus.svg'
import bell from '../../../assets/images/dms/inquiryBellIcon.svg'
import Swal from 'sweetalert2';
import { Card } from 'reactstrap';
import { LogOut } from 'react-feather';
import { getStaff, getStaffPermission, getLoginCompanyId, 
         getWorkspaceId, getLoginUserId, getLoginStaffId, getWorkspaceType }
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

    const notifyParams ={};
    notifyParams['user_id']=getLoginUserId;

    const [notifyCount,setNotifyCount]= useState('');
    
    const [notifyFactCount,setNotifyFactCount]= useState('');

    {getStaff === "Staff" ? requestData=inputParamsStaff : requestData=inputParamsUser}


    const planValidation = () => {
        axios.post(ServerUrl+'/validate-plan', apiencrypt(requestData))
        .then((response) => 
        {
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

    useEffect( () => {
        { getWorkspaceType != "Factory" ?
        axios.post(ServerUrl+'/check-buyer-notification', notifyParams)
        .then((response) => 
        {
            setNotifyCount(response.data.notifications);             
        })
        :
        axios.post(ServerUrl+'/check-factory-notification', notifyParams)
        .then((response) => 
        {
            setNotifyFactCount(response.data.notifications);             
        })
    }

        

    },[]);

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
                
                     getWorkspaceType != "Factory" ?
                    <Link to={`${process.env.PUBLIC_URL}/inquiryform`}
                    onClick={ () => { planValidation() }} className= 'btn-pill btn btn-outline-primary btn-md  btn-primary-light' >
                    <img src={plusicon}/>
                        {t('createNewInquiry')}  
                    </Link>
                    :
                    ""
                :
                ""}
            </LI>
                { getWorkspaceType != "Factory" ?
                   <div className="notification-box m-r-10">                   
                     <img src ={bell} onClick={()=>{ window.location.href="/inquiry/viewinquiry"}} style={{ cursor: 'pointer' }}/>                   
                     <span className="count-animated"><Badges  attrBadge={{ className: 'badge-notify rounded-pill',backgroundColor:'#D4313C', pill: true }}>{notifyCount> 0 ? notifyCount:''}</Badges></span>                  
                   </div>
                  : 
                  <div className="notification-box m-r-10">                   
                     <img src ={bell} onClick={()=>{ window.location.href="/inquiry/factoryviewinquiry"}} style={{ cursor: 'pointer' }}/>                   
                     <span className="count-animated"><Badges  attrBadge={{ className: 'badge-notify rounded-pill',backgroundColor:'#D4313C', pill: true }}>{notifyFactCount> 0 ? notifyFactCount:''}</Badges></span>                  
                   </div>}
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