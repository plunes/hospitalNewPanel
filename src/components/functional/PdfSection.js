import React,{useState} from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
 
const PdfSection = (props) => {
    const [isOpen, setOpen] = useState(false)

    console.log(props.data,"props.data in VideoSection")
    let data = props.data[0]
    return (
        <React.Fragment>
            <img src="https://service-family-images.s3.ap-south-1.amazonaws.com/website-images/stock_file.jpeg"  onClick={()=> setOpen(true)} className="thumbnail-video " /> 
            <Modal open={isOpen} onClose={()=>{
				setOpen(false)
	        	 }}>
             <div className="pdf-wrapper-videosection" >
             <PDFViewer
            document={{
                url:data.reportUrl,
                headers:{
                    'Access-Control-Allow-Credentials': true
                }
            }}
             />
            </div>
        </Modal>


        </React.Fragment>
    )
}

export default PdfSection