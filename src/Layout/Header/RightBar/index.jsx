
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
import { Card, Row, Col } from 'reactstrap';
import { LogOut } from 'react-feather';
import { getStaff, getStaffPermission, getLoginCompanyId, 
         getWorkspaceId, getLoginUserId, getLoginStaffId, getWorkspaceType, getLoginUserType  }
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


    // const planValidation = () => {
    //     axios.post(ServerUrl+'/validate-plan', apiencrypt(requestData))
    //     .then((response) => 
    //     {
    //         response.data = apidecrypt(response.data);
    //         if (response.data.status_code === 400)
    //         {
    //             Swal.fire({
    //               title: t(response.data.message),
    //               icon: "warning",
    //               button: "OK!",
    //               allowOutsideClick: false
    //             })
    //             .then( (result ) => 
    //             {
    //                 if( result.isConfirmed){
    //                     window.location.href = '/inquiryform';
    //                 }
    //             })
    //         }  
    //     });

    // }

    useEffect( () => {

        getWorkspaceType != "Factory" ?
        axios.post(ServerUrl+'/check-buyer-notification', apiencrypt(notifyParams))
        .then((response) => 
        {
            response.data = apidecrypt(response.data);
            setNotifyCount(response.data.notifications);             
        })
        :
        axios.post(ServerUrl+'/check-factory-notification', apiencrypt(notifyParams))
        .then((response) => 
        {
            response.data = apidecrypt(response.data);
            setNotifyFactCount(response.data.notifications);             
        })

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
            <Row className="nav-right col pull-right right-menu p-0">
            <UL attrUL={{ className: `simple-list d-flex flex-row nav-menus ${sidebarResponsive ? 'open' : ''}` }}>
                {/* <LI><a className="text-dark" href="#javascript" onClick={goFull}>
                    <Maximize />
                </a></LI> */}
                    
            <LI>

            {(getStaff === "Staff" && getStaffPermission.includes("Add Inquiry")) || getStaff == null ?
                    getWorkspaceType != "Factory" ?
                    <Link 
                        to={`${process.env.PUBLIC_URL}/inquiryform`}
                        className= 'btn-pill btn btn-outline-primary btn-md  btn-primary-light' >
                        <img src={plusicon} className="rightBarAddImg"/>
                            <span className="rightBarText" style={{ fontSize: '12px' }}>
                                {t('createNewInquiry')}
                            </span>   
                    </Link>
                    :
                    ""
                :
                ""}
            </LI>

            
    { getLoginUserType == "user" ?  
        getWorkspaceType != "Factory" ? 
            <div className="notification-box m-r-10">                   
                <img
                    src ={bell} 
                    onClick={()=>{ 
                    window.location.href = `${process.env.PUBLIC_URL}/viewinquiry`}} 
                    style={{ cursor: 'pointer' }}/>                   
                <span className="count-animated">
                    <Badges  attrBadge={{ className: 'badge-notify rounded-pill', pill: true }}>{notifyCount> 0 ? notifyCount:''}</Badges>
                </span>                  
            </div>  
            : 
            <div className="notification-box m-r-10">                   
                <img src ={bell} onClick={()=>{ 
                                window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry`}} 
                style={{ cursor: 'pointer' }}/>                   
                <span className="count-animated">
                    <Badges  attrBadge={{ className: 'badge-notify rounded-pill',pill: true }}>{notifyCount> 0 ? notifyCount:''}</Badges>
                </span>                  
            </div>
        :
        
        getWorkspaceType != "Factory" ?  
        (getStaff === "Staff" && getStaffPermission.includes("View Response")) || getStaff == null ? 
            <div className="notification-box m-r-10">                   
                <img src ={bell} onClick={()=>{ 
                window.location.href = `${process.env.PUBLIC_URL}/viewinquiry`}} 
                style={{ cursor: 'pointer' }}/>                   
                <span className="count-animated">
                    <Badges attrBadge={{ className: 'badge-notify rounded-pill', pill: true }}>
                    {notifyCount> 0 ? notifyCount:''}
                    </Badges>
                </span>                  
            </div> 
            :  
            ""
        :
        (getStaff === "Staff" && getStaffPermission.includes("View Factory Inquiry") && 
                                 getStaffPermission.includes("Add Response") ) || getStaff == null ? 
            <div className="notification-box m-r-10">                   
                <img src ={bell} onClick={()=>{ 
                window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry`}} 
                style={{ cursor: 'pointer' }}/>                   
                <span className="count-animated">
                    <Badges  attrBadge={{ className: 'badge-notify rounded-pill',pill: true }}>{notifyFactCount> 0 ? notifyFactCount:''}</Badges>
                </span>                  
            </div>
        : 
            ""}
                    {/* <Bookmarks /> */}
                    <Notifications />
                    <LanguageClass />
                    {/* <MoonLight /> */}
                    <MessageDrop />
                    {/* <LogoutClass /> */}
            </UL>
            </Row>
        </Fragment >
    );
};

export default Rightbar;