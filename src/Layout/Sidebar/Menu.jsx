import { Home, Clock, Folder,  Star, Trash2,Key,Users,Calendar,Sliders,PieChart, Settings} from 'react-feather';
import { getStaff, getModules, getStaffPermission, getWorkspaceType } from '../../Constant/LoginConstant';
// import { useLocation } from "react-router-dom";
// const location = useLocation();
// console.log("path==>>",location.pathname);

// {console.log("Workspace Type", getWorkspaceType )}
 
export const MENUITEMS = [
    {

        menutitle: 'DMS',
        menucontent: 'Dashboards,Widgets',
        Items: [
            (getStaff === "Staff"&&getModules.includes("Inquiry")&&(getStaffPermission.includes('View Inquiry')))||getStaff == null?
                getWorkspaceType == "Buyer" ||  getWorkspaceType == "PCU" &&  getWorkspaceType != "Factory" ? 
                {path: `${process.env.PUBLIC_URL}/viewinquiry`, type: 'link', active: false, title: 'View Inquiry'} 
                : {}
            :
            {},
            
            getWorkspaceType == "Buyer" ||  getWorkspaceType == "PCU" && getWorkspaceType != "Factory"? 
            { 
                path: `${process.env.PUBLIC_URL}/feedbackform`, type: 'link', active: false, title: 'Feedback Form'
            }  
            : {},
              
            getWorkspaceType == "Buyer" ||  getWorkspaceType == "PCU" && getWorkspaceType != "Factory"?  
            { 
                // path: `${process.env.PUBLIC_URL}/inquiry/factoryviewinquiry`, type: 'link', active: false, title: 'View Inquiry'
                 path: `${process.env.PUBLIC_URL}/feedbackview`,  type: 'link', active: false, title: 'Feedback View'
            }  
            : {},
            (getStaff === "Staff"&&getModules.includes("Inquiry-Factory")&&(getStaffPermission.includes('View Factory Inquiry')))||getStaff == null?
            getWorkspaceType == "Factory" &&  getWorkspaceType != "PCU" && getWorkspaceType != "Buyer" ? 
            { 
                path: `${process.env.PUBLIC_URL}/factoryviewinquiry`, type: 'link', active: false, title: 'View Inquiry'
            }  
            : {}
            : {},

            
            getWorkspaceType == "Factory" &&  getWorkspaceType != "PCU" && getWorkspaceType != "Buyer" ? 
            { 
                // path: `${process.env.PUBLIC_URL}/inquiry/factoryviewinquiry`, type: 'link', active: false, title: 'View Inquiry'
                 path: `${process.env.PUBLIC_URL}/inquirycontacts`,  type: 'link', active: false, title: 'Inquiry Contacts'
            }  
            : {},
          

        ]
    },
]