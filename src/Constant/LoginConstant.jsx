

/* Get Login Details*/

import { apidecrypt, decode } from "../helper";

export const getLoginToken=localStorage.getItem("apiToken");
export const getLoginUserType=localStorage.getItem("loginType")!= null?decode(localStorage.getItem("loginType")): null;
export const getLoginCompanyId=localStorage.getItem("companyId")!=null?decode(localStorage.getItem("companyId")):null;
export const getLoginUserId=decode(localStorage.getItem("userId"));
export const getLoginUseName=decode(localStorage.getItem("userName"));
export const getLoginStaffId=localStorage.getItem("staffId")!=null?decode(localStorage.getItem("staffId")): 0;
export const getFirstLoginStaffId=localStorage.getItem("firstLoginStaffId")!=null?decode(localStorage.getItem("firstLoginStaffId")) : null;
export const getWorkspaceId=localStorage.getItem("workspaceId")!=0?decode(localStorage.getItem("workspaceId")):0;
export const getWorkspaceName=localStorage.getItem("workspaceName")!=""?decode(localStorage.getItem("workspaceName")):"";
export const getWorkspaceType=localStorage.getItem("workspaceType")!=""?decode(localStorage.getItem("workspaceType")):"";
export const getDateFormat=()=>{
    let dateFormat = localStorage.getItem("dateFormat")!=""?decode(localStorage.getItem("dateFormat")):"";
    return dateFormat;};
export const getStaff=localStorage.getItem("staff")!=null?decode(localStorage.getItem("staff")): null;
export const getRoleName=localStorage.getItem("role")!=null?decode(localStorage.getItem("role")): null;
export const getRoleId=localStorage.getItem("roleId")!=null?decode(localStorage.getItem("roleId")): null;
export const getStaffPermission=localStorage.getItem("permissions")!=null?decode(localStorage.getItem("permissions")): null;
export const getStaffWorkspaces=localStorage.getItem( "workspaces")!=null?apidecrypt(localStorage.getItem("workspaces")): null;
export const getModules=localStorage.getItem("modules")!=null?decode(localStorage.getItem("modules")): null;
export const getWorkspaces=localStorage.getItem( "workspaces")!=null?apidecrypt(localStorage.getItem("workspaces")): null;
export const getLanguage=localStorage.getItem("LangCode");
export const i18nextLng=localStorage.getItem("i18nextLng");


// export const getLoginToken=localStorage.getItem("apiToken");
// export const getLoginUserType=localStorage.getItem("loginType")!= null?(localStorage.getItem("loginType")): null;
// export const getLoginCompanyId=localStorage.getItem("companyId")!=null?(localStorage.getItem("companyId")):null;
// export const getLoginUserId=(localStorage.getItem("userId"));
// export const getLoginUseName=(localStorage.getItem("userName"));
// export const getLoginStaffId=localStorage.getItem("staffId")!=null?(localStorage.getItem("staffId")): 0;
// export const getFirstLoginStaffId=localStorage.getItem("firstLoginStaffId")!=null?(localStorage.getItem("firstLoginStaffId")) : null;
// export const getWorkspaceId=localStorage.getItem("workspaceId")!=0?(localStorage.getItem("workspaceId")):0;
// export const getWorkspaceName=localStorage.getItem("workspaceName")!=""?(localStorage.getItem("workspaceName")):"";
// export const getWorkspaceType=localStorage.getItem("workspaceType")!=""?(localStorage.getItem("workspaceType")):"";
// export const getDateFormat=()=>{
//     let dateFormat = localStorage.getItem("dateFormat")!=""?(localStorage.getItem("dateFormat")):"";
//     return dateFormat;};
// export const getStaff=localStorage.getItem("staff")!=null?(localStorage.getItem("staff")): null;
// export const getRoleName=localStorage.getItem("role")!=null?(localStorage.getItem("role")): null;
// export const getRoleId=localStorage.getItem("roleId")!=null?(localStorage.getItem("roleId")): null;
// export const getStaffPermission=localStorage.getItem("permissions")!=null?(localStorage.getItem("permissions")): null;
// export const getStaffWorkspaces=localStorage.getItem( "workspaces")!=null?apidecrypt(localStorage.getItem("workspaces")): null;
// export const getModules=localStorage.getItem("modules")!=null?(localStorage.getItem("modules")): null;
// export const getWorkspaces=localStorage.getItem( "workspaces")!=null?apidecrypt(localStorage.getItem("workspaces")): null;
// export const getLanguage=localStorage.getItem("LangCode");
// export const i18nextLng=localStorage.getItem("i18nextLng");

