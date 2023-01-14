
import { Navigate, Outlet,Route,Redirect } from 'react-router-dom';
import axios from 'axios';

axios.interceptors.request.use((config) => {
   
    document.body.classList.add('loading-indicator');
   if(config.data==null || config.data==undefined || config.data==''){
    document.body.classList.remove('loading-indicator');
   }

    return config;
  }, (error) => {
   // console.log("error==>",error.data);
    document.body.classList.remove('loading-indicator');
    return Promise.reject(error);
    
  });

axios.interceptors.response.use(function (response) {
     document.body.classList.remove('loading-indicator');
    return response
   }, function(error) {
   // if(error.response.data.message!=''){
      document.body.classList.remove('loading-indicator');
   // }
    if (error.response.data.status_code === 401 && error.response.data.error === 'Unauthenticated.') {

        localStorage.clear();
        // return "";
        return window.location.href =`${process.env.PUBLIC_URL}/inquiry/adminlogin
        `
       // Route.push('/userlogin');
       // return <Navigate exact to={`${process.env.PUBLIC_URL}/userlogin`} />
       // return <Redirect to={`${process.env.PUBLIC_URL}/userlogin`} />
      
    }
    //console.log("Success...");
    //return Promise.reject(error.response.data)
   })
   
const PrivateRoute = () => {
    const authValidate =localStorage.getItem("apiToken");
    // console.log("###", document.cookie.split(';').map(cookie => cookie.split('=')));
    // let cookies = document.cookie
    //                .split(';')
    //                .map( cookie => cookie.split('='))
    //                .reduce((accumulator, [Key, value]) => 
    //                      ({ ...accumulator, [Key.trim()] : decodeURIComponent(value)}), {});

    // const authValidate = cookies.apiToken;

    return (
        authValidate !== null  ?
       
             <Outlet />
             :
             <Navigate exact to={`${process.env.PUBLIC_URL}/inquiry/stafflogin`} />
        
    );
}

export default PrivateRoute;

