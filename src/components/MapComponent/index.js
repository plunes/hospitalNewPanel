import React from "react"
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapComponent extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        center:{
          lng:'77.2167',
          lat:'28.6643'
        }
      }
  }
    static defaultProps = {
        center: {
          lat: 28.6643,
          lng: 77.2167
        },
        zoom: 12
      }

      componentWillReceiveProps(nextProps){
        // if(!!nextProps.location){
        //   this.setState({
        //     location:{
        //       lat:nextProps.location.latitude,
        //       lng:nextProps.location.longitude
        //     }
        //   })
        // }
      }

      render() {
        console.log(this.state,"state in GoogleMap")
        console.log(this.props,"props in GoogleMap")
        return (
          // Important! Always set the container height explicitly
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAXz9PuBzPhMjAdUZmlyFdst6J8v6Vx1IU'}}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              defaultCenter={this.props.center}
              center={this.state.center}
              defaultZoom={this.props.zoom}
              onChildMouseEnter={()=>console.log()}
              onChildMouseLeave={()=>console.log()}
            >
              {/* <AnyReactComponent
                lat={this.state.location.latitude}
                lng={this.state.location.longitude}
                text="My Marker"
              /> */}
            </GoogleMapReact>
          </div>
        );
      }
    }

export default MapComponent