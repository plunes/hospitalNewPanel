export const get_url = () =>{
  let baseUrl = "https://devapi.plunes.com/v5"
  const pathLocation = window.location.host;
    if(!!pathLocation) {
            console.log('pathLocation : ', pathLocation);
        if(pathLocation === 'hospital.plunes.com') {
            console.log('PROD');
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
    console.log(this,"this in myerror")
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
  if(value===""){
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