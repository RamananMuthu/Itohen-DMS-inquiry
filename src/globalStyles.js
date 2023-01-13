import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

.lightGrayBgColor {
    background-color : "#f8f8f8 !important" ;
    font-size : 12px;
}
.viewFormDetails{
    padding: 10px 3px !important;
    background-color: #eaeaea !important;
}
 .weekoffcolor{
    background-color: #FFD1D1!important;
    color:#000000 !important;
}
.fc-event-main-frame{
    text-align: center  !important;
}

.holi_day_list{
    background-color:#E9ECEF!important;
    color:#000000 !important;
    text-align: center  !important;
}
.holi_day_lists{
    background-color: #F6F6F6 !important;
    color: #000000 !important;
    text-align: center !important;

}

.holi_day_lists .fc-event-title{
   
    color: #000000 !important;
}

}
.holi_day{
    background-color: #DEF0EF  !important;
    color:#008E80 !important;
    text-align: center  !important;
}
.fc-event-time, .fc-daygrid-event-dot{ display:none}

.pendingTaskCount{
    position: relative;
    z-index: 1;
    display: inline-block;
    width: 36px;
    height: 36px;
    line-height: 32px;
    color: #d22d3d;
    text-align: center;
    background: #fbd1d1;
    border: 2px solid #ffdade;
    border-radius: 50%;
    font-size: 16px;
}
.card-highlighted-text{
    background-color: #CCEAE7 ;
    color: #4E90DE;
}
.fc-button-primary, .fc-event, .fc-event-dot{
    border:none !important
}
.contact-head{
    background-color: #E9E9E9  ;
}
.filesfnt{
    font-family: "Arial" !important ;
}

.fc-event-title{
    font-weight: normal !important;
}

.test{
    z-index: '+100 !important';
    background-color: '#abcdef !important';
}
}
`;
export default GlobalStyle;