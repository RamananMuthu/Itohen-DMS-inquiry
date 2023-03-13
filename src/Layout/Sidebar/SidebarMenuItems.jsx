import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LI, UL, H6 } from '../../AbstractElements';
import { MENUITEMS } from './Menu';
import { Label } from 'reactstrap';
import dashboardIcon from "../../assets/images/dms/icons/dashboard-icon.svg";
import dashboardIconWhite from "../../assets/images/dms/icons/white-dashboard.svg";
import orderstatusIcon from "../../assets/images/dms/icons/orderstatus-icon.svg";
import orderstatusIconWhite from "../../assets/images/dms/icons/white-order.svg";
import taskIconWhite from "../../assets/images/dms/icons/white-task.svg";
import taskIcon from "../../assets/images/dms/icons/task-icon.svg";
import pendingtaskIcon from "../../assets/images/dms/icons/pendingtask-icon.svg";
import pendingtaskIconWhite from "../../assets/images/dms/icons/white-pending.svg";
import datainputIconWhite from "../../assets/images/dms/icons/white-datainput.svg";
import datainputIcon from "../../assets/images/dms/icons/datainput-icon.svg";
import usermgmtWhite from "../../assets/images/dms/icons/white-usermanagement.svg";
import usermgmt from "../../assets/images/dms/icons/usermanagement-icon.svg";
import staffIcon from "../../assets/images/dms/icons/staff.svg";
import staffIconWhite from "../../assets/images/dms/icons/staff_white.svg";
import rolesIconWhite from "../../assets/images/dms/icons/roles_white.svg";
import rolesIcon from "../../assets/images/dms/icons/roles.svg";
import companyIcon from "../../assets/images/dms/icons/company_profile.svg";
import companyIconWhite from "../../assets/images/dms/icons/company_white.svg";
import calendarIconWhite from "../../assets/images/dms/icons/Calendar_white.svg";
import calendarIcon from "../../assets/images/dms/icons/Calendar.svg";
import feedBackViewIcon from "../../assets/images/dms/icons/feedbackViewIIcon.svg";
import Viewinquiry from "../../assets/images/dms/icons/viewinquiry.svg";
import ViewinquiryActive from "../../assets/images/dms/icons/viewInquiryActive.svg";

import Feedback from "../../assets/images/dms/icons/feedback.svg";
import FeedbackActive from "../../assets/images/dms/icons/feedbackActive.svg";

import InquiryContacts from "../../assets/images/dms/icons/inquiryContacts.svg";
import InquiryContactsActive from "../../assets/images/dms/icons/inquiryContactsActive.svg";


import InquiryList from "../../assets/images/dms/icons/viewinquiry.svg";
import { getStaff, getModules } from '../../Constant/LoginConstant';
// import help from "../../assets/images/dms/icons/help.png";

const SidebarMenuItems = ({ setMainMenu, sidebartoogle, setNavActive }) => {
  // eslint-disable-next-line
  const { t } = useTranslation();

  const toggletNavActive = (item) => {

    if (!item.active) {
      MENUITEMS.map((a) => {
        a.Items.filter((Items) => {
          if (a.Items.includes(item)) Items.active = true;
          if (!Items.children) return true;
          Items.children.forEach((b) => {
            if (Items.children.includes(item)) {
              b.active = true;
            }
            if (!b.children) return true;
            b.children.forEach((c) => {
              if (b.children.includes(item)) {
                c.active = true;
              }
            });
          });
          return Items;
        });
        return a;
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  return (
    <Fragment>
      <UL attrUL={{ className: 'nav-menu custom-scrollbar' }}>
        <LI attrLI={{ className: 'back-btn' }}>
          <div className="mobile-back text-end"><span>Back</span><i className="fa fa-angle-right ps-2"></i></div>
        </LI>

        {MENUITEMS.map((Item, i) => (
          < Fragment key={i} >
            {/* <LI attrLI={{ className: 'sidebar-main-title' }} >
              <div>
                <H6>{t(Item.menutitle)}</H6>
              </div>
            </LI> */}
            {Item.Items.map((menuItem, i) => (
            menuItem.title!='' && menuItem.title!=null && menuItem.title!='null'?
              <LI attrLI={{ className: 'dropdown' }} key={i}>
                {menuItem.type === 'sub' && (
                  <a href="javascript"
                    id="nav-link"
                    className={`nav-link menu-title ${menuItem.active ? 'active' : ''}`}
                    onClick={(event) => {
                      event.preventDefault(); setNavActive(menuItem);
                    }} >
                    {menuItem.icon !== undefined && <menuItem.icon />}
                    <span>{t(menuItem.title)} </span>
                    <div className="according-menu">
                      {menuItem.active ? (
                        <i className="fa fa-angle-down"></i>
                      ) : (
                        <i className="fa fa-angle-right"></i>
                      )}
                    </div>
                  </a>
                )}
                {menuItem.type === 'link' && (
                  <Link
                    to={menuItem.path}
                    id="nav-link"
                    className={`nav-link menu-title ${menuItem.active ? 'active' : ''
                      }`}
                    onClick={() => toggletNavActive(menuItem)}
                  >
                    {(menuItem.title=='Dashboard' && (menuItem.active))?<img src={dashboardIconWhite}/>:(menuItem.title=='Dashboard')?<img src={dashboardIcon}/>:""}
                    {(menuItem.title=='Order Status' && (menuItem.active))?<img src={orderstatusIconWhite}/>:(menuItem.title=='Order Status')?<img src={orderstatusIcon}/>:""}
                    {(menuItem.title=='Task Update' && (menuItem.active))?<img src={taskIconWhite}/>:(menuItem.title=='Task Update')?<img src={taskIcon}/>:""}
                    {(menuItem.title=='Pending Tasks' && (menuItem.active))?<img src={pendingtaskIconWhite}/>:(menuItem.title=='Pending Tasks')?<img src={pendingtaskIcon}/>:""}
                    {(menuItem.title=='Data Input' && (menuItem.active))?<img src={datainputIconWhite}/>:(menuItem.title=='Data Input')?<img src={datainputIcon}/>:""}
                     {(menuItem.title=='User Settings' && (menuItem.active))?<img src={usermgmtWhite}/>:(menuItem.title=='User Settings')?<img src={usermgmt}/>:""}
                     {(menuItem.title=='Staff' && (menuItem.active))?<img src={staffIconWhite}/>:(menuItem.title=='Staff')?<img src={staffIcon}/>:""}
                     {(menuItem.title=='Roles' && (menuItem.active))?<img src={rolesIconWhite}/>:(menuItem.title=='Roles')?<img src={rolesIcon}/>:""}
                     {(menuItem.title=='Company Profile' && (menuItem.active))?<img src={companyIconWhite}/>:(menuItem.title=='Company Profile')?<img src={companyIcon}/>:""}
                     {(menuItem.title=='Calendar Configuration' && (menuItem.active))?<img src={calendarIconWhite} />:(menuItem.title=='Calendar Configuration')?<img src={calendarIcon}/>:""}
                    
                     {(menuItem.title=='View Inquiry' && (menuItem.active))?<img src={ViewinquiryActive} />:(menuItem.title=='View Inquiry')?<img src={Viewinquiry}/>:""}
                     {/* {(menuItem.title=='Inquiry List' && (menuItem.active))?<img src={InquiryList} />:(menuItem.title=='Inquiry List')?<img src={InquiryList}/>:""} */}
                     {(menuItem.title=='Feedback Form' && (menuItem.active))?<img src={FeedbackActive} />:(menuItem.title=='Feedback Form')?<img src={Feedback}/>:""}
                     {(menuItem.title=='Inquiry Contacts' && (menuItem.active))?<img src={InquiryContactsActive} />:(menuItem.title=='Inquiry Contacts')?<img src={InquiryContacts}/>:""}
                     {(menuItem.title=='Feedback View' && (menuItem.active))?<img  src={feedBackViewIcon} />:(menuItem.title=='Feedback View')?<img src={feedBackViewIcon}/>:""}
                    
                  {/* {(menuItem.title=='Order Status' && (menuItem.active))?<img src={orderstatusIcon}/>:<img src={orderstatusIcon}/>} */}
                        {/* {menuItem.icon !== undefined && <menuItem.icon />} */}
                    
                    <span>{t(menuItem.title)}</span>

                    {menuItem.badge && (
                      <Label className={menuItem.badge}>
                        {menuItem.badgetxt}
                      </Label>
                    )}
                  </Link>
                )}
                {menuItem.children && (
                  <UL attrUL={{
                    className: 'simple-list sidebar-submenu',
                    style:
                      menuItem.active
                        ? sidebartoogle
                          ? {
                            opacity: 1,
                            transition: 'opacity 500ms ease-in',
                          }
                          : { display: 'block' }
                        : { display: 'none' }
                  }}>
                    <UL attrUL={{ className: 'nav-submenu menu-content' }}>
                      {menuItem.children.map((childrenItem, index) => {
                        return (
                          <LI key={index}>
                            {childrenItem.type === 'sub' && (
                              <a href="javascript" className={`${childrenItem.active ? 'active' : ''}`}
                                onClick={(event) => {
                                  event.preventDefault();
                                  toggletNavActive(childrenItem);
                                }}>
                                {t(childrenItem.title)}
                                <div className="according-menu">
                                  {childrenItem.active ? (<i className="fa fa-caret-down"></i>) : (<i className="fa fa-caret-right"></i>)} </div>
                              </a>
                            )}
                            {childrenItem.type === 'link' && (
                              <Link
                                to={childrenItem.path} className={`${childrenItem.active ? 'active' : ''}`}
                                onClick={() => toggletNavActive(childrenItem)} >
                                {t(childrenItem.title)}
                              </Link>
                            )}
                            {childrenItem.children && (
                              <UL attrUL={{
                                className: 'simple-list nav-sub-childmenu submenu-content',
                                style: childrenItem.active
                                  ? { display: 'block' }
                                  : { display: 'none' }
                              }}>
                                {childrenItem.children.map(
                                  (childrenSubItem, key) => (
                                    <LI key={key}>
                                      {childrenSubItem.type === 'link' && (
                                        <Link
                                          to={childrenSubItem.path}
                                          className={`${childrenSubItem.active ? 'active' : ''}`}
                                          onClick={() => toggletNavActive(
                                            childrenSubItem)}>
                                          {t(childrenSubItem.title)}
                                        </Link>
                                      )}
                                    </LI>
                                  )
                                )}
                              </UL>
                            )}
                          </LI>
                          
                        );
                      })}
                      
                    </UL>
                  </UL>
                )}
              </LI>:''
            ))}
             
          </Fragment>
        ))
        }
      {/* <LI className="dropdown list-group-item">
        <a href={`${process.env.PUBLIC_URL}/DMS_Manual.pdf`} className="nav-link menu-title" target={"_blank"}>
          <img src={help} width="12" style={{  width: '25px'}}/>
          <span>{t("help")}</span> 
        </a>
      </LI> */}
      </UL>
    </Fragment>
  );
};
export default SidebarMenuItems;
