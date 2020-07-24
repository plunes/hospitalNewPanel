import React, { Component } from "react"


const AnimatedMount = ({ unmountedStyle, mountedStyle }) => {
    return (Wrapped) => class extends Component {
      constructor(props) {
        super(props);
        this.state = {
          style: unmountedStyle,
        };
      }
  
      componentWillMount(callback) {
        this.onTransitionEnd = callback;
        setTimeout(() => {
          this.setState({
            style: mountedStyle,
          });
        }, 20);
      }
  
      componentWillUnmount(callback) {
        this.onTransitionEnd = callback;
        this.setState({
          style: unmountedStyle,
        });
      }
  
      render() {
        return <div
          style={this.state.style}
          onTransitionEnd={this.onTransitionEnd}
        >
          <Wrapped { ...this.props } />
        </div>
      }
    }
  };


  export default AnimatedMount