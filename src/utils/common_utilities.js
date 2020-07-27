export const  get_initials =  (name) => {
  var parts = name.split(' ')
  var initials = ''
  if(parts.length < 2){
    return parts[0].substring(0,2).toUpperCase()
  }else{
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== '') {
        initials += parts[i][0].toUpperCase()
      }
    }
    return initials
  }
  }


  export const  getDateFormat =(value)=>{
    let currentDate = new Date(value);
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    return  (month+1) + "/" + date + "/" + year;
  }
  



export const  objectEquals = (x, y) => {
  'use strict';

  if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
  // after this just checking type of one would be enough
  if (x.constructor !== y.constructor) { return false; }
  // if they are functions, they should exactly refer to same one (because of closures)
  if (x instanceof Function) { return x === y; }
  // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
  if (x instanceof RegExp) { return x === y; }
  if (x === y || x.valueOf() === y.valueOf()) { return true; }
  if (Array.isArray(x) && x.length !== y.length) { return false; }

  // if they are dates, they must had equal valueOf
  if (x instanceof Date) { return false; }

  // if they are strictly equal, they both need to be object at least
  if (!(x instanceof Object)) { return false; }
  if (!(y instanceof Object)) { return false; }

  // recursive object equality check
  var p = Object.keys(x);
  return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
      p.every(function (i) { return objectEquals(x[i], y[i]); });
}


export const for_loop = (data, callback) => {
  for (var i = 0, len = data.length; i < len; i++) {
        callback(data[i])
  }
}


export const paginate_data = (data, options) => {
  console.log(data,"data in paginate_data")
  console.log(data.length,'data.length')
     if(data.length === 0){
       return {
         data:[],
         parameters:{
           limit:options.limit,
           total:0,
           next:false,
           total_pages:0,
           page:0,
           search:''
         }
       }
     }
     let arr = []
     let new_arr = [[]]
     let  i= 0
     let serviceId = data[data.length -1].serviceId
     console.log(options,"options in paginate data")
     console.log(serviceId,"serviceId in paginate data")
      for_loop(data,(item)=>{
        console.log(item,i," Item , i in for loop on data")
        if(item.serviceId === serviceId){
              arr.push(item)
              new_arr.push(arr)
        } else if(i<parseInt(options.limit, 10)){
                arr.push(item)
                i++
            }else{
              new_arr.push(arr)
              arr = []
              arr.push(item)
              i=1
            }
     })
     console.log(new_arr,"new_arr")
     let total_pages = Math.ceil(parseInt(data.length,10)/options.limit)
     return {
       data:new_arr,
       parameters : {
        limit:options.limit,
        total:data.length,
        next:total_pages !== 1,
        total_pages:total_pages,
        page:1,
        search:''
       }
     }
     
}



export const get_notif_time = (value) => {

  let currentDate = new Date();
  let previousDate = new Date(value)
  let current = {
    seconds:currentDate.getSeconds(),
    minutes:currentDate.getMinutes(),
    hour: currentDate.getHours(),
    date: currentDate.getDate(),
    month: currentDate.getMonth(),
    year:currentDate.getFullYear()
  }

  let previous ={
    seconds:previousDate.getSeconds(),
    minutes:previousDate.getMinutes(),
    hour: previousDate.getHours(),
    date: previousDate.getDate(),
    month: previousDate.getMonth(),
    year:previousDate.getFullYear()
  }
  var d = Math.abs(currentDate - previousDate) / 1000;
  var r = {};
  var s = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
  };

  Object.keys(s).forEach(function(key){
      r[key] = Math.floor(d / s[key]);
      d -= r[key] * s[key];
  });

if(r.year!==0){
    return `${previous.date}-${previous.month}-${previous.year}`
}else if(r.month!==0){
    return `${previous.date}-${previous.month}-${previous.year}`
}else if(r.day!==0 && r.day <7){
  if(r.day===1){
    return `Yesterday`
  }else{
      return `${r.day} days ago`
  }
}else if(r.day>6){
    return `${previous.date}-${previous.month}-${previous.year}`
}else if(r.day===0 && r.hour===0){
  if(r.minute!==0){
    if(r.minute===1){
        return `${r.minute} minute ago`
    }else{
        return `${r.minute} minutes ago`
    }
  }else {
      return `${r.second} seconds ago`
  }
}else{
  if(r.hour===1){
    return `${r.hour} hour ago`
  }else{
      return `${r.hour} hours ago`
  }

}
}






export const  get_circular_progress_data = () =>{
  let arr = []
  let  i = 0
   while(i<51){
     arr.push(`${i}%`)
     i++
   }
   return arr
}

export const get_slider_labels = (data) => {
  return  {
    0: data.lower,
    100: data.upper
  }
}

export const get_url = () =>{
  let baseUrl = "https://devapi.plunes.com/v5"
  const pathLocation = window.location.host;
    if(!!pathLocation) {
          
        if(pathLocation === 'analytics.plunes.com') {
          
    // Production baseUrl
          baseUrl = 'https://api.plunes.com/v5'
              }else{
        baseUrl = "https://devapi.plunes.com/v5"
    // BaseUrl = 'http://10.5.48.232:3000/api/v1/'
      }
  }
      return baseUrl
}

export const  only_alphabets = (value) =>{
  if(value.toString()===""){
  return true
  }else if (value.toString().match(/^[A-Za-z ]+$/)){
    return true;
  }else{
          return false;
      }
  }

export const config_error = (msg) =>{
  function  MyError(message){
    this.message = message;
  }
  MyError.prototype = new Error()

  return MyError(msg)
}

export  const isEmpty = (obj)  => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


export const is_valid_pan =(value) =>{
  if (value.toString().match(/[A-Z]{5}[0-9]{4}[A-Z]{1}$/))
   return true;
  else
   return false;
}

export const is_positive_number =(value) =>{
  if (value.toString().match(/^((?!(=))[0-9]*)$/g))
   return true;
  else
   return false;
}

export const is_positive_real_number = (value) =>{
  console.log(value,"value in handle_real_submit")
  if(value===""){
    console.log("I am getting called")
    return true
  }
      if (value.toString().match(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/)){
          if(value[0]==="0" && value.length===1){
            return true
          }else if(value[0]==="0"&&value[1]!=='.')
            {
              return false
            }else{
              return true
            }
      }
      else{
          return false;
      }
}

export const is_positive_whole_number = (value) =>{
  if(value===""){
    return true
  }
      if (value.toString().match(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/)){
        if(value==='0')
         return false
         return true
      }
      else{
          return false;
      }
}

export const  generateSlotsFormat = (data) =>{
    let slots = JSON.parse(JSON.stringify(data || []))
    let arr = []
    slots.forEach((item,i)=>{
      let obj = {}
      obj = {
        closed:item.closed,
        day:item.day,
        slots:[`${timeToString(item.slots.morning.from)}-${timeToString(item.slots.morning.to)}`,`${timeToString(item.slots.evening.from)}-${timeToString(item.slots.evening.to)}`]
      }
      arr.push(obj)
    })
    return arr   
}

export const getDay = (i) =>{
    switch (i) {
     case 0:
       return 'Sunday'
       break;
     case 1:
       return 'Monday'
       break;
     case 2:
       return 'Tuesday'
       break;
     case 3:
       return 'Wednesday'
       break;
     case 4:
       return 'Thursday'
       break;
     case 5:
      return 'Friday'
      break;
     case 6:
      return 'Saturday'
      break;
    
      default:
        break;
    }
 }

 export const  timeToString = (time) =>{
    let  hour =  time.hour>12?time.hour-12:time.hour
    let minutes = time.minutes<10?`0${time.minutes}`:time.minutes
    let timeString = `${hour}:${minutes} ${time.hour>12?'PM':'AM'}`
    return timeString
 }

 export const  stringToTime = (str)=>{
    let arr = str.split('-')
    let fromMinute = arr[0].split(" ")[0].split(':')[1]
    let fromHour = arr[0].split(" ")[0].split(':')[0]
    let fromAmpm = arr[0].split(" ")[1]
    let toMinutes = arr[1].split(" ")[0].split(':')[1]
    let toHour = arr[1].split(" ")[0].split(':')[0]
    let toAmPm = arr[1].split(" ")[1]
let obj =   {
        from:{
          hour:fromAmpm==="PM"?12+parseInt(fromHour,10):parseInt(fromHour,10),
          minutes:parseInt(fromMinute,10)
        },
        to:{
          hour:toAmPm==="PM"?12+parseInt(toHour,10):parseInt(toHour,10),
          minutes:parseInt(toMinutes,10)
        }
    }
       return obj
    }

    export const get_url_params = (sParam) => {
      let sPageURL = window.location.search.substring(1)
      let sURLVariables = sPageURL.split('&')
      for (let i = 0; i < sURLVariables.length; i++){
          let sParameterName = sURLVariables[i].split('=');
          if (sParameterName[0] == sParam)
          return sParameterName[1]
      }
    }