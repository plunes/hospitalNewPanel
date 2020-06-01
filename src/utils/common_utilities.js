export  const isEmpty = (obj)  => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
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