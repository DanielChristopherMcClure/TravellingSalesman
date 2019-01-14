/* Determines whether a decimal coordinate is in Colorado */
function inColorado(lat, long) {
  return lat >= 37 && lat <= 41 && long >= -109 && long <= -102;
}

/* This functions will take a single string of two coordinates and convert them to decimal, ex: convertToDecimal("40°26′46″N 40°26'46"W") will return an array with 40.446, 40.446 in it. */
function convertToDecimal(coordinate) {
    
    var first = "";
    var second = "";  
    
    var move = false;
    for(var i = 0; i < coordinate.length; i++) {
      var c = coordinate.toLowerCase()[i];
      //console.log(c,/\s/.test(c));
      if(/\s/.test(c)) {
        if(!coordinate.includes("°")) {
          move = true;
          continue;
        } else {
          continue;
        }
      }
      if(!move) {
        if(c == 'w' || c == 'n' || c == 'e' || c == 's') {
          move = true;
          first += c;
        } else {
          first += c;
        }
      } else {
        second += c;
      }
    }
  
  
    console.log("Sending to validate: ",first, second,first.length,second.length);   
  
    if(!isValidLat(first) || !isValidLong(second) || first.length == 0 || second.length == 0) {
       console.log("Invalid Input: ",first,second);
       return [NaN, NaN];
    }  
    
    if(coordinate.includes("°")) {      
      coordinate = coordinate.trim().replace(/\s+/g,""); //Removes Whitespace
    } 
    
    /*console.log(coordinate);*/
    //South and West need to be negative
  
    var numbers = [];
    var directions = [];
    
    var currentNumber = "";
    for(var i = 0; i < coordinate.length; i++) {
      if(coordinate.charAt(i) != ' ' && !isNaN(parseInt(coordinate.charAt(i), 10)) || coordinate.charAt(i) == '.' || coordinate.charAt(i) == '-') {        
        currentNumber += coordinate.charAt(i);
      } else {  
        if(currentNumber != "") {
          //console.log(Number(currentNumber));
          numbers.push(Number(currentNumber));
          currentNumber = "";
        }  
        //console.log(coordinate.charAt(i));
        var c = coordinate.toLowerCase().charAt(i);
        if(c == 's' || c == 'n' || c == 'w' || c == 'e') {
          directions.push(c);
        }
      }
    }
  
    if(currentNumber != "") {
       numbers.push(Number(currentNumber));
       currentNumber = "";
    }
  
    //console.log(numbers.length);
    //console.log(numbers);
  
    var c_one, c_two;
    switch(numbers.length) {
      case 6:
        c_one = Number(Number(numbers[0]) + (Number(numbers[1])/60) + (Number(numbers[2])/3600));
        c_two = Number(Number(numbers[3]) + (Number(numbers[4])/60) + (Number(numbers[5])/3600));
        break;
      case 4:
        c_one = Number(Number(numbers[0]) + (Number(numbers[1])/60));
        c_two = Number(Number(numbers[2]) + (Number(numbers[3])/60));
        break;
      case 2:
        c_one = Number(numbers[0]);
        c_two = Number(numbers[1]);  
        break;
    }  
  
  for(var i = 0; i < directions.length; i++) {
    var s = directions[i];
    if(s == 's' || s == 'w') {
      if(i == 0) {
        c_one = c_one*-1;
      } else if(i == 1) {
        c_two = c_two*-1;
      }
    }
  }
  
  //console.log(inColorado(Number(c_one),Number(c_two)));
  if(!inColorado(Number(c_one),Number(c_two))) {
    return "ERR_OB";    
  }
  
  return [Number(c_one),Number(c_two)];
}
