import React, { Fragment } from 'react';
import { Card } from 'reactstrap';
import { Btn, LI } from '../../../AbstractElements';
import { firebase_app } from '../../../Config/Config';
import { LogOut } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';

const LogoutClass = () => {
    const history = useNavigate();
    const Logout = () => {
      
localStorage.removeItem("apiToken");
localStorage.removeItem("loginType");
localStorage.removeItem("companyId");
localStorage.removeItem("userId");
localStorage.removeItem("staffId");
localStorage.removeItem("workspaceId");
        history(`${process.env.PUBLIC_URL}/adminlogin`);
    };

    return (
        <Fragment>
            <LI attrLI={{ className: 'onhover-dropdown p-0', onClick: Logout }} >
                <Btn attrBtn={{ as: Card.Header, className: 'btn btn-primary-light', color: 'default' }} >
                    <Link to={`${process.env.PUBLIC_URL}/adminlogin`}>
                        <LogOut />
                        Log out
                    </Link>
                </Btn>
            </LI>
        </Fragment>
    );
};

export default LogoutClass;