import React, { Fragment } from 'react';
import { Activity, Bell, CheckCircle, FileText, UserCheck } from 'react-feather';
import { Link } from 'react-router-dom';
import { LI, P, UL } from '../../../AbstractElements';
import factory from '../../../assets/images/dms/factory.svg'
import pcu from '../../../assets/images/dms/PCU.svg'
import buyer from '../../../assets/images/dms/onGoingList.svg'
import { getWorkspaceName, getWorkspaceType, getWorkspaces, getStaff, getRoleName, getLoginUseName } from '../../../Constant/LoginConstant';
import { useTranslation } from 'react-i18next';
import { encode } from '../../../helper';

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
                if (workspaces[i].dateformat != '' && workspaces[i].dateformat != null) {
                    localStorage.setItem("dateFormat", encode(workspaces[i].dateformat));
                } else {
                    localStorage.setItem("dateFormat", '');
                }
                window.location.href = "/inquiry/inquiryform";
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
                        {getWorkspaceType === "Factory" ? <img src={factory} className="img-50" />
                            :
                            getWorkspaceType === "Buyer" ? <img src={buyer} className="img-50" />
                                :
                                getWorkspaceType === "PCU" ? <img src={pcu} className="img-50" />
                                    : ""
                        }

                        <div className="media-body">
                            <span attrPara={{ className: 'f-12 light-font' }} > {getStaff != null ? <>
                                <P> {getWorkspaceName}</P><span><b>{getLoginUseName}</b></span>
                                <span><i className="icofont icofont-caret-down"></i></span>
                            </> : <>
                                <P> {getWorkspaceName}</P><span><b>{getLoginUseName}</b></span>
                                <span><i className="icofont icofont-caret-down"></i></span>
                            </>}</span>
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
                            <Link to={`${process.env.PUBLIC_URL}/inquiry/inquiryform`}>
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