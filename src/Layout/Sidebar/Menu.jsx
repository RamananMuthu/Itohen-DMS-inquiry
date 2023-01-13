import { Home, Clock, Folder,  Star, Trash2,Key,Users,Calendar,Sliders,PieChart, Settings} from 'react-feather';
import { getStaff, getModules, getStaffPermission } from '../../Constant/LoginConstant';
// import { useLocation } from "react-router-dom";
// const location = useLocation();
// console.log("path==>>",location.pathname);
export const MENUITEMS = [
    {
        menutitle: 'DMS',
        menucontent: 'Dashboards,Widgets',
        Items: [
            { path: `${process.env.PUBLIC_URL}/inquiry/inquiryform`, icon: Home, type: 'link', active: false, title: 'Inquiry List'},
            { path: `${process.env.PUBLIC_URL}/inquiry/factoryviewinquiry`, icon: Home, type: 'link', active: false, title: 'Factory View Inquiry'},
        ]
    },
]