import React, { useState , useEffect } from "react"
import {  useToasts } from 'react-toast-notifications'

const TimeSlot = (props) => {
        console.log(props,"props in TimeSlot")
        const [ hour, setHour ] = useState()
        const [ minutes, setMinutes ] = useState()
        const {addToast} = useToasts()

        useEffect(() => {
            setHour((props.selectedSlot[props.selectedType])['hour'])
            setMinutes((props.selectedSlot[props.selectedType])['minutes'])
          }, [])

          console.log(props,"props in TimeSlots Component")
      const  getTimeOptions = (shift) =>{
            if(shift==='morning'){
                return (
                    <React.Fragment>
                <ul className="tme_d1">
                      {/* <li onClick= {()=>setHour(7)} className={hour===7?'active cursor-pointer':'cursor-pointer'} >7</li> */}
                    <li onClick= {()=>setHour(0)} className={hour===0?'active cursor-pointer':'cursor-pointer'} >12</li>
                    <li onClick= {()=>setHour(1)} className={hour===1?'active cursor-pointer':'cursor-pointer'} >1</li>
                    <li onClick= {()=>setHour(2)} className={hour===2?'active cursor-pointer':'cursor-pointer'} >2</li>
                    <li onClick= {()=>setHour(3)} className={hour===3?'active cursor-pointer':'cursor-pointer'} >3</li>
                    <li onClick= {()=>setHour(4)} className={hour===4?'active cursor-pointer':'cursor-pointer'} >4</li>
                    <li onClick= {()=>setHour(5)} className={hour===5?'active cursor-pointer':'cursor-pointer'} >5</li>
                    <li onClick= {()=>setHour(6)} className={hour===6?'active cursor-pointer':'cursor-pointer'} >6</li>
                    <li onClick= {()=>setHour(7)} className={hour===7?'active cursor-pointer':'cursor-pointer'} >7</li>
                    <li onClick= {()=>setHour(8)} className={hour===8?'active cursor-pointer':'cursor-pointer'} >8</li>
                    <li onClick= {()=>setHour(9)} className={hour===9?'active cursor-pointer':'cursor-pointer'} >9</li>
                    <li onClick= {()=>setHour(10)} className={hour===10?'active cursor-pointer':' cursor-pointer'}>10</li>
                    <li onClick= {()=>setHour(11)} className={hour===11?'active cursor-pointer':'cursor-pointer'}>11</li>
                    <li onClick= {()=>setHour(12)} className={hour===12?'active cursor-pointer':'cursor-pointer'} >12</li>
                    <li onClick= {()=>setHour(13)} className={hour===13?'active cursor-pointer':' cursor-pointer'}>13</li>
                    <li onClick= {()=>setHour(14)} className={hour===14?'active cursor-pointer':' cursor-pointer'}>14</li>
                    <li onClick= {()=>setHour(15)} className={hour===15?'active cursor-pointer':'cursor-pointer'} >15</li>
                    <li onClick= {()=>setHour(16)} className={hour===16?'active cursor-pointer':'cursor-pointer'}>16</li>
                    <li onClick= {()=>setHour(17)} className={hour===17?'active cursor-pointer':'cursor-pointer'}>17</li>
                    <li onClick= {()=>setHour(18)} className={hour===18?'active cursor-pointer':'cursor-pointer'}>18</li>
                    <li onClick= {()=>setHour(19)} className={hour===19?'active cursor-pointer':' cursor-pointer'}>19</li>
                    <li onClick= {()=>setHour(20)} className={hour===20?'active cursor-pointer':' cursor-pointer'}>20</li>
                    <li onClick= {()=>setHour(21)} className={hour===21?'active cursor-pointer':' cursor-pointer'}>21</li>
                    <li onClick= {()=>setHour(22)} className={hour===22?'active cursor-pointer':' cursor-pointer'}>22</li>
                    <li onClick= {()=>setHour(23)} className={hour===23?'active cursor-pointer':' cursor-pointer'}>23</li>
                    
                </ul>
             <ul className="tme_d">
                        <li onClick= {()=>setMinutes(0)} className={minutes===0?'active cursor-pointer':' cursor-pointer'}>00</li>
                        <li onClick= {()=>setMinutes(3)} className={minutes===3?'active cursor-pointer':' cursor-pointer'}>03</li>
                        <li onClick= {()=>setMinutes(5)} className={minutes===5?'active cursor-pointer':' cursor-pointer'}>05</li>
                        <li onClick= {()=>setMinutes(7)} className={minutes===7?'active cursor-pointer':' cursor-pointer'}>07</li>
                        <li onClick= {()=>setMinutes(10)} className={minutes===10?'active cursor-pointer':' cursor-pointer'}>10</li>
                        <li onClick= {()=>setMinutes(12)} className={minutes===12?'active cursor-pointer':' cursor-pointer'}>12</li>
                        <li onClick= {()=>setMinutes(15)} className={minutes===15?'active cursor-pointer':' cursor-pointer'}>15</li>
                        <li onClick= {()=>setMinutes(18)} className={minutes===18?'active cursor-pointer':' cursor-pointer'}>18</li>
                        <li onClick= {()=>setMinutes(20)} className={minutes===20?'active cursor-pointer':' cursor-pointer'}>20</li>
                        <li onClick= {()=>setMinutes(23)} className={minutes===23?'active cursor-pointer':' cursor-pointer'}>23</li>
                        <li onClick= {()=>setMinutes(25)} className={minutes===25?'active cursor-pointer':' cursor-pointer'}>25</li>
                        <li onClick= {()=>setMinutes(27)} className={minutes===27?'active cursor-pointer':' cursor-pointer'}>27</li>
                        <li onClick= {()=>setMinutes(30)} className={minutes===30?'active cursor-pointer':'cursor-pointer'}>30</li>
                        <li onClick= {()=>setMinutes(33)} className={minutes===33?'active cursor-pointer':' cursor-pointer'}>33</li>
                        <li onClick= {()=>setMinutes(35)} className={minutes===35?'active cursor-pointer':' cursor-pointer'}>35</li>
                        <li onClick= {()=>setMinutes(38)} className={minutes===38?'active cursor-pointer':' cursor-pointer'}>38</li>
                        <li onClick= {()=>setMinutes(40)} className={minutes===40?'active cursor-pointer':' cursor-pointer'}>40</li>
                        <li onClick= {()=>setMinutes(43)} className={minutes===43?'active cursor-pointer':' cursor-pointer'}>43</li>
                        <li onClick= {()=>setMinutes(45)} className={minutes===45?'active cursor-pointer':' cursor-pointer'}>45</li>
                        <li onClick= {()=>setMinutes(48)} className={minutes===48?'active cursor-pointer':' cursor-pointer'}>48</li>
                        <li onClick= {()=>setMinutes(50)} className={minutes===50?'active cursor-pointer':'cursor-pointer'}>50</li>
                        <li onClick= {()=>setMinutes(53)} className={minutes===53?'active cursor-pointer':'cursor-pointer'}>53</li>
                        <li onClick= {()=>setMinutes(55)} className={minutes===55?'active cursor-pointer':'cursor-pointer'}>55</li>
                        <li onClick= {()=>setMinutes(59)} className={minutes===59?'active cursor-pointer':'cursor-pointer'}>59</li>
             </ul>
                    </React.Fragment>
                )
            }else{
                return (
                    <React.Fragment>
                    <ul className="tme_d1">
                     <li onClick= {()=>setHour(0)} className={hour===0?'active cursor-pointer':'cursor-pointer'} >0</li>
                     <li onClick= {()=>setHour(1)} className={hour===1?'active cursor-pointer':'cursor-pointer'} >1</li>
                     <li onClick= {()=>setHour(2)} className={hour===2?'active cursor-pointer':'cursor-pointer'} >2</li>
                     <li onClick= {()=>setHour(3)} className={hour===3?'active cursor-pointer':'cursor-pointer'} >3</li>
                     <li onClick= {()=>setHour(4)} className={hour===4?'active cursor-pointer':'cursor-pointer'} >4</li>
                     <li onClick= {()=>setHour(5)} className={hour===5?'active cursor-pointer':'cursor-pointer'} >5</li>
                     <li onClick= {()=>setHour(6)} className={hour===6?'active cursor-pointer':'cursor-pointer'} >6</li>
                     <li onClick= {()=>setHour(7)} className={hour===7?'active cursor-pointer':'cursor-pointer'} >7</li>
                     <li onClick= {()=>setHour(8)} className={hour===8?'active cursor-pointer':'cursor-pointer'} >8</li>
                     <li onClick= {()=>setHour(9)} className={hour===9?'active cursor-pointer':'cursor-pointer'} >9</li>
                     <li onClick= {()=>setHour(10)} className={hour===10?'active cursor-pointer':' cursor-pointer'}>10</li>
                     <li onClick= {()=>setHour(11)} className={hour===11?'active cursor-pointer':'cursor-pointer'}>11</li>
                     <li onClick= {()=>setHour(12)} className={hour===12?'active cursor-pointer':'cursor-pointer'} >12</li>
                     <li onClick= {()=>setHour(13)} className={hour===13?'active cursor-pointer':' cursor-pointer'}>13</li>
                     <li onClick= {()=>setHour(14)} className={hour===14?'active cursor-pointer':' cursor-pointer'}>14</li>
                     <li onClick= {()=>setHour(15)} className={hour===15?'active cursor-pointer':'cursor-pointer'} >15</li>
                     <li onClick= {()=>setHour(16)} className={hour===16?'active cursor-pointer':'cursor-pointer'}>16</li>
                     <li onClick= {()=>setHour(17)} className={hour===17?'active cursor-pointer':'cursor-pointer'}>17</li>
                     <li onClick= {()=>setHour(18)} className={hour===18?'active cursor-pointer':'cursor-pointer'}>18</li>
                     <li onClick= {()=>setHour(19)} className={hour===19?'active cursor-pointer':' cursor-pointer'}>19</li>
                     <li onClick= {()=>setHour(20)} className={hour===20?'active cursor-pointer':' cursor-pointer'}>20</li>
                     <li onClick= {()=>setHour(21)} className={hour===21?'active cursor-pointer':' cursor-pointer'}>21</li>
                     <li onClick= {()=>setHour(22)} className={hour===22?'active cursor-pointer':' cursor-pointer'}>22</li>
                     <li onClick= {()=>setHour(23)} className={hour===23?'active cursor-pointer':' cursor-pointer'}>23</li>
                    </ul>
                 <ul className="tme_d">
                        <li onClick= {()=>setMinutes(0)} className={minutes===0?'active cursor-pointer':' cursor-pointer'}>00</li>
                        <li onClick= {()=>setMinutes(3)} className={minutes===3?'active cursor-pointer':' cursor-pointer'}>03</li>
                        <li onClick= {()=>setMinutes(5)} className={minutes===5?'active cursor-pointer':' cursor-pointer'}>05</li>
                        <li onClick= {()=>setMinutes(7)} className={minutes===7?'active cursor-pointer':' cursor-pointer'}>07</li>
                        <li onClick= {()=>setMinutes(10)} className={minutes===10?'active cursor-pointer':' cursor-pointer'}>10</li>
                        <li onClick= {()=>setMinutes(12)} className={minutes===12?'active cursor-pointer':' cursor-pointer'}>12</li>
                        <li onClick= {()=>setMinutes(15)} className={minutes===15?'active cursor-pointer':' cursor-pointer'}>15</li>
                        <li onClick= {()=>setMinutes(18)} className={minutes===18?'active cursor-pointer':' cursor-pointer'}>18</li>
                        <li onClick= {()=>setMinutes(20)} className={minutes===20?'active cursor-pointer':' cursor-pointer'}>20</li>
                        <li onClick= {()=>setMinutes(23)} className={minutes===23?'active cursor-pointer':' cursor-pointer'}>23</li>
                        <li onClick= {()=>setMinutes(25)} className={minutes===25?'active cursor-pointer':' cursor-pointer'}>25</li>
                        <li onClick= {()=>setMinutes(27)} className={minutes===27?'active cursor-pointer':' cursor-pointer'}>27</li>
                        <li onClick= {()=>setMinutes(30)} className={minutes===30?'active cursor-pointer':'cursor-pointer'}>30</li>
                        <li onClick= {()=>setMinutes(33)} className={minutes===33?'active cursor-pointer':' cursor-pointer'}>33</li>
                        <li onClick= {()=>setMinutes(35)} className={minutes===35?'active cursor-pointer':' cursor-pointer'}>35</li>
                        <li onClick= {()=>setMinutes(38)} className={minutes===38?'active cursor-pointer':' cursor-pointer'}>38</li>
                        <li onClick= {()=>setMinutes(40)} className={minutes===40?'active cursor-pointer':' cursor-pointer'}>40</li>
                        <li onClick= {()=>setMinutes(43)} className={minutes===43?'active cursor-pointer':' cursor-pointer'}>43</li>
                        <li onClick= {()=>setMinutes(45)} className={minutes===45?'active cursor-pointer':' cursor-pointer'}>45</li>
                        <li onClick= {()=>setMinutes(48)} className={minutes===48?'active cursor-pointer':' cursor-pointer'}>48</li>
                        <li onClick= {()=>setMinutes(50)} className={minutes===50?'active cursor-pointer':'cursor-pointer'}>50</li>
                        <li onClick= {()=>setMinutes(53)} className={minutes===53?'active cursor-pointer':'cursor-pointer'}>53</li>
                        <li onClick= {()=>setMinutes(55)} className={minutes===55?'active cursor-pointer':'cursor-pointer'}>55</li>
                        <li onClick= {()=>setMinutes(59)} className={minutes===59?'active cursor-pointer':'cursor-pointer'}>59</li>
                 </ul>
                        </React.Fragment>
                )
            }
        }

        // if(((!!props.setAvailabilityRet && (props.i === 0)))){
        //     if(!!props.setAvailabilityRet.success){
        //       addToast(props.setAvailabilityRet.message, {appearance: 'success', autoDismiss:true}) 
              
        //     }else{
        //       addToast(props.setAvailabilityRet.message, {appearance: 'error', autoDismiss:true})
        //     }
        //     props.setAvailabilityClr()
        //     props.loadingOff()
        // }

        const submit = () =>{
            let slot = props.selectedSlot
            let type = props.selectedType
            let shift = props.selectedshift
            let selecteDaySlots = props.selecteDaySlots
            let test = {}
            let other_shift = shift==='morning'?selecteDaySlots.evening:selecteDaySlots.morning
            console.log(other_shift,"other_shift in Submit")
            let error = false
            let message = ""
            if(type==="from"){
                test = slot.to
                if(hour>test.hour){
                    error=true
                    message = "Invalid time"
                }else if(hour===test.hour){
                    if(minutes>test.minutes){
                        error=true
                        message = "Invalid time"
                    }
                }else if(shift==='evening'){
                    if(hour<other_shift.to.hour){
                        error=true
                        message = "Invalid time"
                    }else if(hour===other_shift.to.hour){
                        if(minutes<other_shift.to.minutes){
                            error=true
                            message = "Invalid time"
                        }
                    }
                }
            }else{
                test = slot.from
                if(hour<test.hour){
                    error=true
                    message = "Invalid time"
                }else if(hour===test.hour){
                    if(minutes<test.minutes){
                        error=true
                        message = "Invalid time"
                    }
                }else if(shift==='morning'){
                    if(hour>other_shift.from.hour){
                        error=true
                        message = "Invalid time"
                    }else if(hour===other_shift.from.hour){
                        if(minutes>other_shift.from.minutes){
                            error=true
                            message = "Invalid time"
                        }
                    }
                }
            }
           
            if(!!error){
              addToast(message, {appearance: 'error', autoDismiss:true})
            }else{
               
                props.submit({
                    hour, minutes
                })
            }
        }
    return (
        <div className ='modal-wrapper-small_ris'>
        <div className="modal-heading_ris set_u_t">Set your Time</div>
        <div className="row modal-p_ris margin-top-small_ris text-center">
    <div className="modal-p_ris col-lg-12 time_s text-center"><h2>{hour>12?hour-12:hour===0?12:hour}:{minutes<10?'0'+minutes:minutes}<small>{hour>=12?hour===24?'AM':'PM':'AM'}</small></h2>
        </div>
       <div className="new_scr2">
        <div className="new_scrol">
            {getTimeOptions(props.selectedshift)}
          </div>
       </div>
        </div>
      <div className="text-center">
            <button onClick={()=>submit()}
            className="common-button margin-top-small_ris">Choose</button>
         </div>
      </div>         
    )
}

 export default TimeSlot