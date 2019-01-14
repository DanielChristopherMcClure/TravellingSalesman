
function isValidLat(lat){
    
  var latCheck = new RegExp(/^-?[0-9]{1,}(?:[.][0-9]+)?[d°°.:_\-]?\s*(?:[0-9]{1,}(?:[.][0-9]+)?\s*[\x82\x91\x92\u2018\u2019\u201A\u201B\u2032\u2035’'.:_\-]?)?\s*(?:[0-9]{1,}(?:[.][0-9]+)?\s*["”\x84\x93\x94\u201C\u201D\u201E\u201F\u2033\u2036]?)?\s*[nNsS]?\s*$/);
   /* console.log(lat);*/
    if(latCheck.exec(lat) !== null){
       return true;
       }
    return false;
  }
function isValidLong(long){
    
  var longCheck = new RegExp(/^-?[0-9]{1,}(?:[.][0-9]+)?[d°°.:_\-]?\s*(?:[0-9]{1,}(?:[.][0-9]+)?\s*[\x82\x91\x92\u2018\u2019\u201A\u201B\u2032\u2035’'.:_\-]?)?\s*(?:[0-9]{1,}(?:[.][0-9]+)?\s*["”\x84\x93\x94\u201C\u201D\u201E\u201F\u2033\u2036]?)?\s*[eEwW]?\s*$/);
   /* console.log(long);*/
    if(longCheck.exec(long) !== null){
       return true;
       }
    return false;
  }
