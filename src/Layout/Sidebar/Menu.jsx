import { Home, Clock, Folder,  Star, Trash2,Key,Users,Calendar,Sliders,PieChart, Settings} from 'react-feather';
import { getStaff, getModules, getStaffPermission, getWorkspaceType } from '../../Constant/LoginConstant';
// import { useLocation } from "react-router-dom";
// const location = useLocation();
// console.log("path==>>",location.pathname);
export const MENUITEMS = [
    {
        menutitle: 'DMS',
        menucontent: 'Dashboards,Widgets',
        Items: [
             getWorkspaceType == "Buyer" &&  getWorkspaceType != "PCU" ? 
            { 
                path: `${process.env.PUBLIC_URL}/inquiry/viewinquiry`, type: 'link', active: false, title: 'Inquiry List'
            } 
             : {},

             getWorkspaceType == "Factory" &&  getWorkspaceType != "PCU" ? 
            { 
                path: `${process.env.PUBLIC_URL}/factoryviewinquiry`, type: 'link', active: false, title: 'Factory View Inquiry'
            }  
            : {},

            getWorkspaceType == "Buyer" &&  getWorkspaceType != "PCU" ? 
            { 
                path: `${process.env.PUBLIC_URL}/feedbackform`, type: 'link', active: false, title: 'Feedback Form'
            }  
            : {}
        ]
    },
]