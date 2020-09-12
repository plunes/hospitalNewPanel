import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { GoogleMapsAPI } from './client-config';
import LoaderComponent from "../functional/LoaderComponent"
import NewNotif from "../functional/NewNotif"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';
Geocode.setApiKey( GoogleMapsAPI );
Geocode.enableDebug();

class Map extends Component{
	constructor( props ){
		super( props );
		this.state = {
			address: '',
			city: '',
			area: '',
			state: '',
			mapPosition: {
				lat: !!this.props.location?this.props.location.coordinates[1]!==0?this.props.location.coordinates[1]:28.457523:28.457523,
				lng: !!this.props.location?this.props.location.coordinates[0]!==0?this.props.location.coordinates[0]:77.026344:77.026344
			},
			markerPosition: {
				lat: !!this.props.location?this.props.location.coordinates[1]!==0?this.props.location.coordinates[1]:28.457523:28.457523,
				lng: !!this.props.location?this.props.location.coordinates[0]!==0?this.props.location.coordinates[0]:77.026344:77.026344
			}
		}
	}



	componentWillReceiveProps(nextProps){
		if(!!nextProps.edit_location_ret){
			console.log(nextProps.edit_location_ret,"next")
			if(!!nextProps.edit_location_ret.success){
			  this.setState({
				ret:{
				  success:true,
    			  message:nextProps.edit_location_ret.message
				}
			  })
			  nextProps.edit_location_clr()
			  nextProps.set_user_info({
				location:{
					type:'Point',
					coordinates:[
					   this.state.markerPosition.lng,
					   this.state.markerPosition.lat
					]
				}
			  })
			  nextProps.set_location_toggler(false)
			}else{
				this.setState({
					ret:{
					  success:false,
					  message:nextProps.edit_location_ret.message
					}
				  })
			}
			nextProps.edit_location_clr()
		  }
	}



	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
		// console.log(this.props,"this.props in didMount MapComponent"
		Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
				      state = this.getState( addressArray );

				console.log( 'city', city, area, state );

				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
					state: ( state ) ? state : '',
				} )
			},
			error => {
				console.error( error );
			}
		);
	};
	/**
	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	 *
	 * @param nextProps
	 * @param nextState
	 * @return {boolean}
	 */
	shouldComponentUpdate( nextProps, nextState ){
		if (
			// this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address ||
			this.state.city !== nextState.city ||
			this.state.area !== nextState.area ||
			this.state.state !== nextState.state ||
			this.state.ret !== nextState.ret
		) {
			return true
		} else if ( this.props.center.lat === nextProps.center.lat ){
			return false
		}
		return false
	}
	/**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getCity = ( addressArray ) => {
		let city = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
				city = addressArray[ i ].long_name;
				return city;
			}
		}
	};
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getArea = ( addressArray ) => {
		let area = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0]  ) {
				for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
					if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
						area = addressArray[ i ].long_name;
						return area;
					}
				}
			}
		}
	};
	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getState = ( addressArray ) => {
		let state = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
					state = addressArray[ i ].long_name;
					return state;
				}
			}
		}
	};
	/**
	 * And function for city,state and address input
	 * @param event
	 */
	onChange = ( event ) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = ( event ) => {

	};

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = ( event ) => {
		let newLat = event.latLng.lat(),
		    newLng = event.latLng.lng();

		Geocode.fromLatLng( newLat , newLng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
					  state = this.getState( addressArray );
					  
					  if(!!this.props.no_save_changes){
						this.props.update_location({
							location:{
								type:'Point',
								coordinates:[
								   newLng,
								   newLat
								]
							},
							area:this.getArea( addressArray ),
							city:this.getCity( addressArray ),
							address:address
						})
						 }
				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
					state: ( state ) ? state : '',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
					// mapPosition: {
					// 	lat: newLat,
					// 	lng: newLng
					// },
				} )
			},
			error => {
				console.error(error);
			}
		);
	};

	/**
	 * When the user types an address in the search box
	 * @param place
	 */
	onPlaceSelected = ( place ) => {
		let newLat = '',
		    newLng = '';
		console.log( 'plc', place );
		Geocode.fromAddress(place.description).then(
			response => {
			  const { lat, lng } = response.results[0].geometry.location;
			  console.log(lat, lng);
			  newLat = lat
			  newLng = lng
			  Geocode.fromLatLng( newLat , newLng ).then(
				response => {
					const address = response.results[0].formatted_address,
						  addressArray =  response.results[0].address_components,
						  city = this.getCity( addressArray ),
						  area = this.getArea( addressArray ),
						  state = this.getState( addressArray );
						  
						  if(!!this.props.no_save_changes){
							this.props.update_location({
								location:{
									type:'Point',
									coordinates:[
										newLng,
										newLat
									]
								},
								area:this.getArea( addressArray ),
								city:this.getCity( addressArray ),
								address:address
							})
							 }
					this.setState( {
						address: ( address ) ? address : '',
						area: ( area ) ? area : '',
						city: ( city ) ? city : '',
						state: ( state ) ? state : '',
						markerPosition: {
							lat: newLat,
							lng: newLng
						},
						// mapPosition: {
						// 	lat: newLat,
						// 	lng: newLng
						// },
					} )
				},
				error => {
					console.log("some error")
					console.error(error);
				}
			);
			},
			error => {
			  console.error(error);
			}
		  )

    console.log("this works", newLat, newLng)
		
	};


	render(){
		console.log(this.props,"this.props in MapComponent")
		console.log(this.state," this.stae in MapComponent")
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<React.Fragment>
						<div>
						<div>
                   	<GooglePlacesAutocomplete
						onSelect={this.onPlaceSelected}
						componentRestrictions={{country: "in"}}
						placeholder = "Search Location"	
					/>
					</div>
					<GoogleMap 
					google={ this.props.google }
					defaultZoom={ this.props.zoom }
					defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
					>
									
						{/* InfoWindow on top of marker */}
						<InfoWindow
							onClose={this.onInfoWindowClose}
							position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
							</div>
						</InfoWindow>
						{/*Marker*/}
						<Marker google={this.props.google}
						        name={'Dolores park'}
						        draggable={true}
						        onDragEnd={ this.onMarkerDragEnd }
						        position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
						/>
						<Marker />
						{/* For Auto complete Search Box */}
						{/* <Autocomplete
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '2px'
							}}
							onPlaceSelected={ this.onPlaceSelected }
							types={['(regions)']}
							componentRestrictions={{country: "in"}}
						/> */}

					
					</GoogleMap>
					</div>
					</React.Fragment>
					
				)
			)
		);
		let map;
		if(true) {
			console.log("254>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
			map = <div style={{position:'relative'}}>
				{this.props.edit_location_loading && <LoaderComponent />}
				<NewNotif 
				ret = {this.state.ret}
				retClr = {()=>this.setState({ret:false})}
				/>
				<div>
					{!!!this.props.no_save_changes && 	<div className="text-center">
					 <span onClick={()=>{
						 this.props.edit_location({
							location:{
								type:'Point',
								coordinates:[
								   this.state.markerPosition.lng,
								   this.state.markerPosition.lat
								]
							},
							googleAddress:this.state.address
						 })
					 }} class="editmainbodymaxhospital cursor-pointer underline">Save Changes</span>
					 </div>}
					{/* <div className="form-group">
						<label htmlFor="">{!!this.props.label?this.props.label:'Location'}</label>
						<div><text>{this.state.address}</text></div>
						<input type="text" name="address" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
					</div> */}
				</div>

				<AsyncMap
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
					loadingElement={
						<div style={{ height: `100%` }} />
					}
					containerElement={
						<div style={{ height: this.props.height }} />
					}
					mapElement={
						<div style={{ height: `100%` }} />
					}
				/>
			</div>
		} else {
			console.log("289>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
			map = <div style={{height: this.props.height}} />
		}
		console.log("289>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
		return( map )
	}
}

export default Map
