import React, { Fragment } from 'react';
import { Activity, Bell, CheckCircle, FileText, UserCheck } from 'react-feather';
import { Link } from 'react-router-dom';
import { LI, P, UL } from '../../../AbstractElements';
import factory from '../../../assets/images/dms/factory.svg'
import pcu from '../../../assets/images/dms/PCU.svg'
import buyer from '../../../assets/images/dms/onGoingList.svg'
import { getWorkspaceName, getWorkspaceType, getWorkspaces, getStaff, 
         getRoleName, getLoginUseName, getLoginUserType, getStaffPermission } from '../../../Constant/LoginConstant';
import { useTranslation } from 'react-i18next';
import { encode, decode } from '../../../helper';

const Notifications = () => {

    const { t } = useTranslation();
    let workspaces = JSON.parse(getWorkspaces);
    const handleClick = (workspaceId) => {

        for (let i = 0; i < workspaces.length; i++) {
            if (workspaces[i].workspace_id === workspaceId) {
                localStorage.setItem("companyId", encode(workspaces[i].company_id));
                localStorage.setItem("workspaceId", encode(workspaces[i].workspace_id));
                localStorage.setItem("workspaceName", encode(workspaces[i].workspaceName));
                localStorage.setItem("workspaceType", encode(workspaces[i].workspaceType));
                localStorage.setItem("roleId", encode(workspaces[i].roleId));
                localStorage.setItem("role", encode(workspaces[i].role));
                localStorage.setItem("permissions", encode(workspaces[i].permissions));
                localStorage.setItem("modules", encode(workspaces[i].modules));
                localStorage.setItem("userId", workspaces[i].user_id > 0 ? encode(workspaces[i].user_id) : 0);
                localStorage.setItem("staffId", encode(workspaces[i].staff_id));
                localStorage.setItem("userName", encode(workspaces[i].user_name));
                // console.log("Permissions", (workspaces[i].permissions))
                if (workspaces[i].dateformat != '' && workspaces[i].dateformat != null) {
                    localStorage.setItem("dateFormat", encode(workspaces[i].dateformat));
                } else {
                    localStorage.setItem("dateFormat", '');
                }

                // console.log("Permissions", decode("VTJGc2RHVmtYMThCL05ldzI4cGVPUVRwNm1EcHd0VWtHVTYvUStISUNKTjZFbVozQ1lUdXV0aHpWSm5lYWtkVW9XWUxiTDFGMFZ4VkZHVGM1a1pLVlZkZ2JiWkdkUk9zVUlzTHMxbm1mTXZyMFJNWm01aC9yMmlFSDM3eUxXMjVBU2V2T2t2bTRwdWdka0VEclU5VENOZWxDcS9JMmRyL3hxMExIRGdsTzI3TlVmWVBXSXYwNmNVcXQ1MHhndzh2WkFUY2trb2JaOUlGMFppQ3ZqVjVmUU96cG9WWE84L2lxL2Z4Y2N0cXViS0tqbXQxZGJkSWhSSUQ2eTB3NHliK3FQQktVMXZhLzFpTUFqSTJIaEJIS3ZYdjZKemJBYmh4K2RGcXdYRGhPbTdnUHhGKzU5Rzg4WmpUbTZHVXE3d2F5TDEyVTRiQ2gzUHd4NUo0ZWlRUHNCQ0Y5ZlVoV3I1K25NRG1BWFJMMlQ0eDZsWUluTWhMRURkVEcxSGkvb1JCTkhCc2dKcmxHMDhZdW94ejFzN2tHV3FzdDgrUG82dUdUeDlXcVFsZWpBZjdoZlFLZ3pCNG5DMlIyb0FCN0Jld2k4ZE5XMGFCeGJEcWZKZVFzUktYYmtobFRrQzJkTFVDQmhUODQweGozM0E9"));
                // console.log("Permissions-Encode", encode("Permissions Factory Edit,PCU Edit,Color Edit,Size Edit,Contacts Add,View Staff,Task Edit Template,Add Order,View All Orders,Edit Order,Add Roles,View Permissions,Add Permissions,View Data Input,Add Data Input,View Pending Task,View Calendar Configuration,Buyer Edit,View Price,Cancel Order,View Inquiry,Add Inquiry,Sent Inquiry,View Factory Inquiry"))
               
                getLoginUserType == "user" ?  getWorkspaceType != "Factory" ? 
                    window.location.href = `${process.env.PUBLIC_URL}/viewinquiry`  : 
                    window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry` 
                :
                (getWorkspaceType != "Factory") ?  
                    (getStaff == "Staff" && getStaffPermission.includes("View Inquiry")) || getStaff == null ?
                    window.location.href = `${process.env.PUBLIC_URL}/viewinquiry`
                    : 
                    window.location.href = `${process.env.PUBLIC_URL}/feedbackform` 
                :
                    (getStaff === "Staff" && getStaffPermission.includes("View Factory Inquiry")) || getStaff == null ? 
                        window.location.href = `${process.env.PUBLIC_URL}/factoryviewinquiry`
                         : 
                        window.location.href = `${process.env.PUBLIC_URL}/inquirycontacts`
            }
        }
    }

    return (
        <Fragment>
            <LI attrLI={{ className: 'onhover-dropdown' }} >
                <div className="notification-box">
                </div>
                <LI>
                    <div className="media">
                        {
                        getWorkspaceType === "Factory" ? <img src={factory} className="img-50 rightBarWorkspaceImg" />
                            :
                            getWorkspaceType === "Buyer" ? <img src={buyer} className="img-50 rightBarWorkspaceImg" />
                                :
                                getWorkspaceType === "PCU" ? <img src={pcu} className="img-50 rightBarWorkspaceImg" />
                                    : ""
                        }

                        <div className="media-body">
                            <span attrPara={{ className: 'f-12 light-font' }}> 
                                {getStaff != null ? 
                                <>
                                    <P> {getWorkspaceName}</P><span><b>{getLoginUseName}</b></span> 
                                    <span><i className="icofont icofont-caret-down"></i></span>
                                </> 
                                : 
                                <>
                                    <div className="rightBarText">
                                    <P>{getWorkspaceName}</P><span><b>{getLoginUseName}</b></span> 
                                    <span><i className="icofont icofont-caret-down"></i></span>
                                    </div>
                                </>}
                            </span>
                        </div>
                    </div>
                </LI>
                <UL attrUL={{ className: 'notification-dropdown onhover-show-div' }} >
                    {getStaff != null ? workspaces.map((workspace) => (
                        <LI attrLI={{ className: 'noti-primary', onClick: () => handleClick(workspace.workspace_id) }}>
                            {/* <Link to={`${process.env.PUBLIC_URL}/dashboard`} > */}
                            <div className="media" onClick={() => handleClick(workspace.workspace_id)}>
                                <div className="media-body">
                                    <P>{workspace.workspaceName}</P>
                                    <span><strong>{t('Role')}-{workspace.role}</strong></span>
                                </div>
                            </div>
                            {/* </Link> */}
                        </LI>
                    )) :
                        <LI attrLI={{ className: 'noti-primary' }} >
                            <Link to={`${process.env.PUBLIC_URL}/inquiryform`}>
                                <div className="media">
                                    <div className="media-body">
                                        <P>{getWorkspaceName}</P>
                                        {/* <span><strong>Role -Super Admin</strong></span> */}
                                    </div>
                                </div>
                            </Link>
                        </LI>}
                    {/* <LI attrLI={{ className: 'noti-secondary' }} >
                        <Link to={`${process.env.PUBLIC_URL}/app/email/mailbox`}>
                            <div className="media">
                                <div className="media-body">
                                    <P>WorkSpace2</P><span>Company 2</span>
                                </div>
                            </div>
                        </Link>
                    </LI> */}


                </UL>
            </LI>
        </Fragment>
    );
};

export default Notifications;