import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '../../AbstractElements';
import logo from '../../assets/images/dms/dms-log-with-tag.png';
import { getWorkspaceType } from '../../Constant/LoginConstant';

const SidebarLogo = () => {

  return (
    <div className="logo-icon-wrapper">

      {
        getWorkspaceType == "Buyer" ? 
        <Link to={`${process.env.PUBLIC_URL}/inquiry/viewinquiry/default`}>
          <Image
            attrImage={{ className: 'img-fluid for-dark', src: `${logo}`, alt: '' }} />
        </Link> : 
        ""
      }

      {
        getWorkspaceType == "Factory" ? 
        <Link to={`${process.env.PUBLIC_URL}/factoryviewinquiry/default`}>
          <Image
            attrImage={{ className: 'img-fluid for-dark', src: `${logo}`, alt: '' }} />
        </Link> : 
        ""
      }

      {
        getWorkspaceType == "PCU" ? 
        <Link to={`${process.env.PUBLIC_URL}/inquiry/viewinquiry/default`}>
          <Image
            attrImage={{ className: 'img-fluid for-dark', src: `${logo}`, alt: '' }} />
        </Link> : 
        ""
      }

    </div>
  );
};

export default SidebarLogo;