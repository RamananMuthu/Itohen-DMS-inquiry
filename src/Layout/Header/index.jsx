import React, { Fragment, useState, useEffect, useLayoutEffect } from "react";
import { MoreHorizontal } from "react-feather";
import Leftbar from "./LeftBar";
import Rightbar from "./RightBar";
import Searchbar from "./Search";
import { Row } from "reactstrap";
import { useContext } from "react";
import CustomizerContext from "../../_helper/Customizer";
import { Route, Link, Routes, useLocation } from "react-router-dom";
import {
  getLoginToken,
  getLoginUserType,
  getLoginCompanyId,
  getLoginUserId,
  getLoginStaffId,
  getWorkspaceId,
} from "../../Constant/LoginConstant";

const Header = () => {
  const authCompanyId = "";
  const [sidebartoogle, setSidebartoogle] = useState(true);
  const { toggleIcon, toggleSidebarResponsive, toggleSidebar } =
    useContext(CustomizerContext);
  const [toggle, setToggle] = useState(true);

  const location = useLocation();

  // console.log('hash', location.hash);
  // console.log('pathname==>', location.pathname);
  // console.log('com==>', authCompanyId);
  // console.log('search', location.search);

  /* If Company Setting ID Empty.Redirect to Company Setting Page */
  if (
    getLoginCompanyId == "" &&
    getLoginUserType == "user" &&
    location.pathname !== "/companysetting"
  ) {
    window.location.href = "/companysetting";
    return false;
  } else if (
    (getWorkspaceId === "null" || getWorkspaceId == "" || getWorkspaceId ==0) &&
    getLoginUserType == "user" && getLoginCompanyId != "" &&
    location.pathname !== "/workspace"
  ) {
    window.location.href = "/workspace";
    return false;
  }

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      //  if (window.innerWidth <= 991) {
        if (window.innerWidth <= 1200) {
          toggleSidebar(true);
        } else {
          toggleSidebar(true);
        
        }

   
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }
  // eslint-disable-next-line
  const [width] = useWindowSize();

  useEffect(() => {}, [toggleSidebar]);

  const toggleResp = (value) => {
    setToggle(value);
    toggleSidebarResponsive(toggle);
  };

  

  return (
    <Fragment>
      <div className={`page-main-header ${toggleIcon ? "close_icon" : ""}`}>
        <Row className="main-header-right m-0">
          <Leftbar
            sidebartoogle={sidebartoogle}
            setSidebartoogle={setSidebartoogle}
          />

          <Rightbar />
          <div
            className="d-lg-none mobile-toggle pull-right w-auto"
            onClick={() => toggleResp(!toggle)}
          >
            <MoreHorizontal />
          </div>
        </Row>
      </div>
    </Fragment>
  );
};

export default Header;
