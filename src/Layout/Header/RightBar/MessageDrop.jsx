import React, { Fragment } from "react";
import { MessageSquare } from "react-feather";
import { Link } from "react-router-dom";
import { Image, LI, P, UL } from "../../../AbstractElements";
import headericon from "../../../assets/images/dms/user-avatar.png";
import axios from 'axios';
import { ServerUrl } from '../../../Constant';
import { getStaff, getRoleName, getLoginUserType, getLoginUserId, getLoginStaffId, getFirstLoginStaffId } from '../../../Constant/LoginConstant';
import { useTranslation } from 'react-i18next';
import { apidecrypt, apiencrypt, decode } from "../../../helper";

const MessageDrop = () => {
  const { t } = useTranslation();
  const Logout = () => {
    var dataToSend = {};
    decode(localStorage.getItem("staff")) === "Staff" ?
    dataToSend= {
      staff_id : getFirstLoginStaffId
    }: dataToSend = {
      user_id : getLoginUserId
    };
    axios.post(ServerUrl + '/logout',apiencrypt(dataToSend))
      .then((response) => {
        response.data = apidecrypt(response.data);
        if (response.data.status_code === 200) {
          const cookies = document.cookie.split(";");
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            document.cookie = cookie.split('=')[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }
          localStorage.removeItem("apiToken");
          localStorage.removeItem("loginType");
          localStorage.removeItem("companyId");
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
          localStorage.removeItem("staffId");
          localStorage.removeItem("workspaceId");
          localStorage.removeItem("dateFormat");
          localStorage.removeItem("workspaceName");
          localStorage.removeItem("workspaceType");
          // history(`${process.env.PUBLIC_URL}/userlogin`);
          // window.location.href = '/userlogin';
          if (decode(localStorage.getItem("staff")) === "Staff") {
            localStorage.removeItem("staff");
            localStorage.removeItem("role");
            localStorage.removeItem("roleId");
            localStorage.removeItem("permissions");
            localStorage.removeItem("workspaces");
            localStorage.removeItem("modules");
            localStorage.clear();
            window.location.href = `${process.env.PUBLIC_URL}/stafflogin`;
          }
          else {
            localStorage.clear();
            window.location.href = `${process.env.PUBLIC_URL}/stafflogin`;
          }
        }
      })
  };
  return (
    <Fragment>
      <LI attrLI={{ className: "onhover-dropdown" }}>
        <span>
          {" "}
          <img src={headericon} width="30" />
          <i className="icofont icofont-caret-down"></i>
        </span>

        <UL attrUL={{ className: "chat-dropdown onhover-show-div" }}>
          {/* <LI>
            <div className="media">
              <Link to={`${process.env.PUBLIC_URL}/user-settings`}>
                <div className="media-body">
                  <span>Settings</span>
                </div>
              </Link>
            </div>
          </LI> */}
          <LI>
            <div className="media">
              <Link to='#'>
                <div className="media-body">
                  {getStaff != null ? <>
                    <span><b>{t("role")} - {getRoleName}</b></span>

                  </> : <>
                    <span><b>{t("role")} - {t("superAdmin")}</b></span>

                  </>}
                </div>
              </Link>

            </div>
          </LI>
          <LI>
            <div className="media">
              <Link to='#'>
                <div className="media-body">
                  <span>{t("loginType")} - {getLoginUserType == 'staff' ? t("Staff") : t("admin")}</span>
                </div>
              </Link>
            </div>
          </LI>
          <LI attrLI={{ onClick: Logout }}>
            <div className="media">
              <Link to={`${process.env.PUBLIC_URL}/logout`} >
                <div className="media-body">
                  <span>{t("logout")}</span>
                </div>
              </Link>
            </div>
          </LI>
        </UL>
      </LI>
    </Fragment>
  );
};

export default MessageDrop;
