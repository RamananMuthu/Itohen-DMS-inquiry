import FileSaver from 'file-saver';
import Moment from 'moment';
import { object } from 'prop-types';
import { getDateFormat } from './Constant/LoginConstant';
import Encryption from './Encryption.js';
var CryptoJS = require('crypto-js');


export const sizeConvertor = (size) => {
  let fileSize;
  if (size === 0) {
    fileSize = 0;
  }
  if (size > 0 && size < 1024) {
    fileSize = size + ' B';
  }
  else if (size >= 1024 && size < 1048576) {
    fileSize = (size / 1024).toFixed(2);
    fileSize = fileSize + ' KB';
  }
  else if (size >= 1048576 && size < 1073741824) {
    fileSize = (size / 1048576).toFixed(2);
    fileSize = fileSize + ' MB';
  }
  return fileSize;
}

export const allowedExtensions =
  /(\.jpeg|\.jpg|\.png|\.svg|\.tif|\.pdf|\.doc|\.docx|\.html|\.htm|\.xls|\.xlsx|\.txt|\.ppt|\.pptx|\.odp|\.key|\.ods|\.csv|\.rtf|\.odt)$/i;
export const allowedExtensionsUpload =
  /(\.jpeg|\.jpg|\.png|\.pdf|\.doc|\.docx|\.xls|\.xlsx|\.txt|\.ppt|\.pptx|\.odp|\.ods|\.csv|\.odt)$/i;

export const allowedUploadFormat = '.jpeg,.jpg,.png,.pdf,.doc,.docx,.xls,.xlsx,.txt,.ppt,.pptx,.odp,.ods,.csv,.odt';
export const allowedIconExtensions = /(\.jpeg|\.jpg|\.png)$/i;
export const allowedIconExtensionsUpload = /(\.jpeg|\.jpg|\.png)$/i;
export const allowedLogoFormat = ".jpeg,.jpg,.png";

/********* ENCODE URL PARAMS [Order-Id, Quantity] ********/
export const encode = (toEncode) => {
  // let encodedValue = btoa(toEncode);
  // return encodedValue;
  return btoa(CryptoJS.AES.encrypt(toEncode.toString(), 'ITOHENDMS').toString());
}

/********* DECODE URL PARAMS [Order-Id, Quantity] ********/
export const decode = (toDecode) => {
  // let decodedValue = atob(toDecode);
  // return decodedValue;
  var bytes = CryptoJS.AES.decrypt(atob(toDecode), 'ITOHENDMS');
  let decodedValue = bytes.toString(CryptoJS.enc.Utf8);
  return decodedValue;
}

export const DownloadFile = (file, fileName) => {
  FileSaver.saveAs(file, fileName);
}


export const calculateDateDiffCountFromCurrentDate = (date) => {
  if (date != '') {
    var given = Moment(date, "YYYY-MM-DD");
    // console.log("Moment==>",given);
    //var given = date;
    var current = Moment().startOf('day');
    //Difference in number of days
    var d = Moment.duration(given.diff(current)).asDays();
    return d;
  }
}

export const calculateDateDiffCountFromTwoDates = (sdate, edate) => {
  if (sdate != '' && edate != '') {
    var given1 = Moment(sdate, "YYYY-MM-DD");
    var given2 = Moment(edate, "YYYY-MM-DD");
    // console.log("Moment==>",given);
    //var given = date;
    // var current = Moment().startOf('day');
    //Difference in number of days
    var d = Moment.duration(given1.diff(given2)).asDays();
    return d;
  } else {
    return "0";
  }
}

export const getConvertDateFormat = (date) => {
  if (getDateFormat != '' && getDateFormat !== null) {
    return Moment(date).format(getDateFormat);
    //return date;
  } else {
    return date;
  }

}

/* Function to convert PHP date formats to JS date formats*/
export const PHPtoJSFormatConversion = function (global) {

  let P = { lang: 'en-GB' };

  // Format tokens and functions
  let tokens = {

    // DAY
    // day of month, pad to 2 digits
    d: d => pad(d.getDate()),
    // Day name, first 3 letters
    D: d => getDayName(d).substr(0, 3),
    // day of month, no padding
    j: d => d.getDate(),
    // Full day name
    l: d => getDayName(d),
    // ISO weekday number (1 = Monday ... 7 = Sunday)
    N: d => d.getDay() || 7,
    // Ordinal suffix for day of the month
    S: d => getOrdinal(d.getDate()),
    // Weekday number (0 = Sunday, 6 = Saturday)
    w: d => d.getDay(),
    // Day of year, 1 Jan is 0
    z: d => {
      let Y = d.getFullYear(),
        M = d.getMonth(),
        D = d.getDate();
      return Math.floor((Date.UTC(Y, M, D) - Date.UTC(Y, 0, 1)) / 8.64e7);
    },
    // ISO week number of year
    W: d => getWeekNumber(d)[1],
    // Full month name
    F: d => getMonthName(d),
    // Month number, padded
    m: d => pad(d.getMonth() + 1),
    // 3 letter month name
    M: d => getMonthName(d).substr(0, 3),
    // Month number, no pading
    n: d => d.getMonth() + 1,
    // Days in month
    t: d => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(),
    // Return 1 if d is a leap year, otherwise 0
    L: d => new Date(d.getFullYear(), 1, 29).getDate() == 29 ? 1 : 0,
    // ISO week numbering year
    o: d => getWeekNumber(d)[0],
    // 4 digit year
    Y: d => {
      let year = d.getFullYear();
      if (year < 0) {
        year = '-' + ('000' + Math.abs(year)).slice(-4);
      }
      return year;
    },
    // 2 digit year
    y: d => {
      let year = d.getFullYear();
      if (year >= 0) {
        return ('0' + year).slice(-2);
      } else {
        year = Math.abs(year);
        return - + ('0' + year).slice(-2);
      }
    },
    // Lowercase am or pm
    a: d => d.getHours() < 12 ? 'am' : 'pm',
    // Uppercase AM or PM
    A: d => d.getHours() < 12 ? 'AM' : 'PM',
    // Swatch internet time
    B: d => (((+d + 3.6e6) % 8.64e7) / 8.64e4).toFixed(0),
    // 12 hour hour no padding
    g: d => (d.getHours() % 12) || 12,
    // 24 hour hour no padding
    G: d => d.getHours(),
    // 12 hour hour padded
    h: d => pad((d.getHours() % 12) || 12),
    // 24 hour hour padded
    H: d => pad(d.getHours()),
    // Minutes padded
    i: d => pad(d.getMinutes()),
    // Seconds padded
    s: d => pad(d.getSeconds()),
    // Microseconds padded - always returns 000000
    u: d => '000000',
    // Milliseconds
    v: d => padd(d.getMilliseconds()),
    // Timezone identifier: UTC, GMT or IANA Tz database identifier - Not supported
    e: d => void 0,
    // If in daylight saving: 1 yes, 0 no
    I: d => d.getTimezoneOffset() == getOffsets(d)[0] ? 0 : 1,
    // Difference to GMT in hours, e.g. +0200
    O: d => minsToHours(-d.getTimezoneOffset(), false),
    // Difference to GMT in hours with colon, e.g. +02:00
    P: d => minsToHours(-d.getTimezoneOffset(), true),
    // Timezone abbreviation, e.g. AEST. Dodgy but may work…
    T: d => d.toLocaleString('en', { year: 'numeric', timeZoneName: 'long' }).replace(/[^A-Z]/g, ''),
    // Timezone offset in seconds, +ve east
    Z: d => d.getTimezoneOffset() * -60,

    // ISO 8601 format - UTC
    // c: d => d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) +
    //        'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) +
    //        '+00:00',

    // ISO 8601 format - local
    c: d => P.format(d, 'Y-m-d\\TH:i:sP'),
    // RFC 2822 formatted date, local timezone
    r: d => P.format(d, 'D, d M Y H:i:s O'),
    // Seconds since UNIX epoch (same as ECMAScript epoch)
    U: d => d.getTime() / 1000 | 0
  };

  // Helpers
  // Return day name for date
  let getDayName = d => d.toLocaleString(P.lang, { weekday: 'long' });
  // Return month name for date
  let getMonthName = d => d.toLocaleString(P.lang, { month: 'long' });
  // Return [std offest, DST offset]. If no DST, same offset for both
  let getOffsets = d => {
    let y = d.getFullYear();
    let offsets = [0, 2, 5, 9].map(m => new Date(y, m).getTimezoneOffset());
    return [Math.max(...offsets), Math.min(...offsets)];
  }
  // Return ordinal for positive integer
  let getOrdinal = n => {
    n = n % 100;
    let ords = ['th', 'st', 'nd', 'rd'];
    return (n < 10 || n > 13) ? ords[n % 10] || 'th' : 'th';
  };
  // Return ISO week number and year
  let getWeekNumber = d => {
    let e = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    e.setUTCDate(e.getUTCDate() + 4 - (e.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(e.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((e - yearStart) / 86400000) + 1) / 7);
    return [e.getUTCFullYear(), weekNo];
  };
  // Return true if o is a Date, otherwise false
  let isDate = o => Object.prototype.toString.call(o) == '[object Date]';
  // Convert numeric minutes to +/-HHMM or +/-HH:MM
  let minsToHours = (mins, colon) => {
    let sign = mins < 0 ? '-' : '+';
    mins = Math.abs(mins);
    let H = pad(mins / 60 | 0);
    let M = pad(mins % 60);
    return sign + H + (colon ? ':' : '') + M;
  };
  // Pad single digits with a leading zero
  let pad = n => (n < 10 ? '0' : '') + n;
  // Pad single digits with two leading zeros, double digits with one leading zero
  let padd = n => (n < 10 ? '00' : n < 100 ? '0' : '') + n;
  // To be completed...
  let parse = s => 'not complete';

  P.parse = parse;

  // Format date using token string s
  function format(date) {
    if (date == null || date == "" || date == "Invalid Date") {
      return "";
    }
    let s;
    let v = getDateFormat();
    if (v === '' || v === null) {
      s = "d M Y";
      //return date;
    } else {
      s = getDateFormat();
    }
    // Minimal input validation
    if (!isDate(date) || typeof s != 'string') {
      return; // undefined
    }

    return s.split('').reduce((acc, c, i, chars) => {
      // Add quoted characters to output
      if (c == '\\') {
        acc += chars.splice(i + 1, 1);
        // If character matches a token, use it
      } else if (c in tokens) {
        acc += tokens[c](date);
        // Otherwise, just add character to output
      } else {
        acc += c;
      }
      return acc;
    }, '');
  }
  P.format = format;

  return P;
}(this)


/* Get SKU Color and Size Qty*/
export const getColorSizeQty = (array, colorid, sizeid) => {
  let aryqty = [];
  array.map((obj) => {
    // let tqty= (obj.sku_color_id == colorid &&  obj.sku_size_id==sizeid)?obj.sku_quantity:0;
    let tqty = (obj.sku_color_id === colorid && obj.sku_size_id === sizeid);
    if (tqty == true) {
      //  console.log("tqty==>",obj.sku_quantity,colorid,sizeid);
      aryqty.push(obj.sku_quantity,)
      // return obj;     
    }
    //  else return 1;
  });
  return aryqty;
}

/* Get SKU Color and Size Qty for Inquiry*/
export const getColorSizeQtyInquiry = (array, colorid, sizeid) => {
  let aryqty = [];
  array.map((obj) => {
    let colorSizeqty = (obj.color_id === colorid && obj.size_id === sizeid);
    if (colorSizeqty == true) {
      aryqty.push(obj.quantity);
    }
  });
  return aryqty;

}

export const truncate = (str) => {
  const n = 22;
  return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
};

// Encryption Decryption starts
let nonceValue = 'ITOHENDMS';
let encryption = new Encryption;
export const apiencrypt = (str) => {
  return encryption.encrypt(JSON.stringify(str), nonceValue)
};
export const apidecrypt = (str) => {
  var bytes = encryption.decrypt(str, nonceValue);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
};
    // Encryption Decryption End