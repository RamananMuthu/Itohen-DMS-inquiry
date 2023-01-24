import React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { firebase_app, auth0 } from '../Config/Config';

import Loader from '../Layout/Loader';
import { authRoutes } from './AuthRoutes';
import LayoutRoutes from '../Route/LayoutRoutes';
import Signin from '../Auth/Signin';
import PrivateRoute from './PrivateRoute';

// setup fake backend

const Routers = () => {
        const [currentUser, setCurrentUser] = useState(false);
         const authValidate =localStorage.getItem("apiToken");

        // let cookies = document.cookie
        //                 .split(';')
        //                 .map( cookie => cookie.split('='))
        //                 .reduce((accumulator, [Key, value]) => 
        //                 ({ ...accumulator, [Key.trim()] : decodeURIComponent(value)}), {});

        // const authValidate = cookies.apiToken;

        return (
                        <BrowserRouter basename='/' >
                                <>
                                        <Suspense fallback={<Loader />}>
                                                <Routes>
                                                        <Route path='/' element={<PrivateRoute />}>
                                                        {authValidate !== null ?
                                                               
                                                                        <Route exact
                                                                                path={`${process.env.PUBLIC_URL}`}
                                                                                element={<Navigate to={`${process.env.PUBLIC_URL}/inquiry/viewinquiry`} />}
                                                                        /> : ''}
                                                                <Route path={`/*`} element={<LayoutRoutes />} />
                                                        </Route>
                                                     
                                                       
                                                        {authRoutes.map(({ path, Component }, i) => (
                                                                <Route path={path} element={Component} key={i} />
                                                        ))}
                                                </Routes>
                                        </Suspense>
                                </>
                        </BrowserRouter>
               
        );
};

export default Routers;