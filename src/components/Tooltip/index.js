import React from 'react';
import ReactTooltip from "react-tooltip"
import "./index.css"
class ToolTip extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  componentWillUnmount() {
    console.log("componentWillUnmount of tooltip components")
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <React.Fragment>
        <ReactTooltip id={this.props.id}
          getContent={(dataTip) =>(
            <div className="tooltip-wrapper">
              <div className="tooltip-body">
              <text className='catalogue_note'><text className='bold'>Note :</text> These are real Time requests from Patients near you who are looking for Procedures and are viewing your Profiles. Make sure to take action on the insights to achieve successful conversion.</text>
              </div>
            </div>
          )
          }
          effect='solid'
          delayHide={8888888888888888888}
          delayShow={500}
          delayUpdate={500}
          place={this.props.place}
          border={true}
          type={'light'}
        />
        </React.Fragment>
      
    );
  }
}

ToolTip.defaultProps = {
  place: 'top'
}

export default ToolTip;


