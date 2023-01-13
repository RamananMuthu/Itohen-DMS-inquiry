import React from "react";
export const validateField= (fieldvalue,fieldtype)=>{ 
    console.log(fieldvalue);
    switch(fieldtype) {
        case 'number':
             result = fieldvalue.replace(/[^0-9]/gi, '');
          break;
          case 'text':
             result = fieldvalue.replace(/[^a-z]/gi, '');
            
          break;
           default:
          break;
      }
  }