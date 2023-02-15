import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { authRoutes } from './AuthRoutes';
import LayoutRoutes from '../Route/LayoutRoutes';
import PrivateRoute from './PrivateRoute';

const Routers = () => {
        const authValidate = localStorage.getItem("apiToken");
        return (
                <BrowserRouter basename='/' >
                        <>
                                <Suspense fallback={<Loader />}>
                                        <Routes>
                                                <Route path='/' element={<PrivateRoute />}>
                                                        {authValidate !== null ?
                                                                <Route exact
                                                                        path={`${process.env.PUBLIC_URL}`}
                                                                        element={<Navigate to={`${process.env.PUBLIC_URL}/viewinquiry`} />}
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