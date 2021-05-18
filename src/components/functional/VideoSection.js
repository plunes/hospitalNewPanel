import React,{useState} from 'react'
import { Player } from 'video-react';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
 
const VideoSection = (props) => {
    const [isOpen, setOpen] = useState(false)

    console.log(props.data,"props.data in VideoSection")
    let data = props.data[0]
    return (
        <React.Fragment>
            <img src={data.thumbnail}  onClick={()=> setOpen(true)} className="thumbnail-video " /> 
            <Modal open={isOpen} onClose={()=>{
				setOpen(false)
	        	 }}>
             <div className="video-wrapper-videosection" >
            <Player>
                   <source src={data.videoUrl} />
            </Player>
            </div>
        </Modal>


        </React.Fragment>
    )
}

export default VideoSection