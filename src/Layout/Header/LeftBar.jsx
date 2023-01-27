import React, { useContext, useState, Fragment } from 'react';
import { AlignCenter } from 'react-feather';
import { Link } from 'react-router-dom';
import { Image } from '../../AbstractElements';
import CheckContext from '../../_helper/Customizer';
import dmslogtag from "../../assets/images/dms/dms-log-with-tag.png" ;

const Leftbar = () => {

    const { mixLayout, toggleSidebar } = useContext(CheckContext);
    const [toggle, setToggle] = React.useState(false);

    const openCloseSidebar = () => {
       // console.log("openCloseSidebar");
        setToggle(!toggle);
        toggleSidebar(toggle); 
        //addEventListener('mouseout', (event) => { console.log("hhh===>>",event);});
       // console.log("eeee==>",e);
        setTimeout(() => {
             
           setToggle(toggle);
           toggleSidebar(!toggle); 
          }, 8500);
    };

   // const menuMouseOver = () => {
        // const concernedElement = document.querySelector(".sidemenub");

        // document.addEventListener("mouseover", (event) => {
        //   if (concernedElement.contains(event.target)) {
        //     console.log("Clicked Inside");
        //     //return true;
        //   } else {
        //     if(toggle==true){
        //     // setToggle(toggle);
        //     // toggleSidebar(!toggle); 
        //     }
        //     console.log("Clicked Outside / Elsewhere");
        //    //return false;
          
        //   }
        // });

  //  }
//     if(toggle==true){
//       let con= menuMouseOver();
//       if(con==false){
//         setToggle(toggle);
//         toggleSidebar(!toggle); 
//       }
// }
// const concernedElement = document.querySelector(".sidemenub");

// document.addEventListener("mouseover", (event) => {
//     console.log("concernedElement.contains(event.target) ",  concernedElement.contains(event.target));
//   if (concernedElement.contains(event.target)) {
//     // setToggle(!toggle);
//     setTimeout(() => {
//         // setToggle(!toggle);
//         toggleSidebar(toggle);
//                 }, 2000);
//     console.log("Clicked Inside");
//   }
//   else{
//     // setToggle(toggle); 
//     console.log("Clicked Outside / Elsewhere");
//     setTimeout(() => {
//         // setToggle(toggle)
//         toggleSidebar(!toggle); 
//                 }, 2000);
//   }
// //    else {
// //     if(toggle===true){
// //          setTimeout(() => {
             
// //            setToggle(!toggle);
// //            toggleSidebar(toggle); 
          
            
// //         }, 4000);
// //         console.log("Clicked Outside / Elsewhere");
// //             }
// //   }
// });

    return (
        <Fragment>
            <div className="main-header-left">
                {mixLayout ?
                    <div className="logo-wrapper">
                        <Link to={`${process.env.PUBLIC_URL}/inquiry/viewinquiry`}>
                        <img src={dmslogtag} width="150"/>
                         
                        </Link>
                    </div>
                    :
                    <div className="dark-logo-wrapper">
                        <Link to={`${process.env.PUBLIC_URL}/inquiry/viewinquiry`}>
                        <img src={dmslogtag} width="80"/>
                          
                        </Link>
                    </div>
                }
                <div className="toggle-sidebar" onClick={() => openCloseSidebar()}>
                    <AlignCenter className="status_toggle middle" id="sidebar-toggle" />
                </div>
            </div>
        </Fragment >
    );
};

export default Leftbar;