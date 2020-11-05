import Modal from 'react-modal';
import React from 'react'
const customStyles = {
    content : {
      top                   : '55%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      padding:'0px',
      boxShadow:"0px 3px 6px #00000029"
    }
  };
  

  class ModalComponent extends React.Component {
      constructor(props){
          super(props)
            this.state = {
                valid:true
            }
      }
      render(){
          return(
           
            <Modal
            isOpen={this.props.open}
          //   onAfterOpen={afterOpenModal}
            onRequestClose={this.props.handleClose}
            style={customStyles}
          //   contentLabel="Example Modal"
         >
          {this.props.no_cross?'':<div style={{padding:'.5rem'}} className="text-right"><button onClick={this.props.handleClose} className="cross no-border"><img src="/cross.png" alt="" className="covidCross"></img></button></div>} 
            <div className="bdu_content">{this.props.modalBody()}</div>
          </Modal>
         
          )
      }
  }

  export default ModalComponent