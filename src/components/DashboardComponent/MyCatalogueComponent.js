import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
//import "./AvailabilityComponent.css";
import "./MyCatalogueComponent.css";
import { getUserCatalogue } from '../../actions/userActions'
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

// import history from '../../history';

class MyCatalogueComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loader : true,
            rowsToDisplay: 20,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        await this.props.getUserCatalogue()
    }
    
    handleClick() {
        this.setState({
            rowsToDisplay: this.state.rowsToDisplay + 5
        })
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <DashboardHeader />
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        <SidebarComponent />
                    </div>
                    <div className='col-md-6 catalogueComponent'>
                        <div className='row justify-content-center'>
                            <p className='catalogue'>Catalogue</p>
                        </div>
                        <div className='row listOfService'>
                              <div className='col-md-4 text-center'>
                                 <a href=""><img src="./upload.svg" alt=""></img>
                                 <p className="uploadCata">Upload File</p></a>
                              </div>
                              <div className='col-md-4 text-center'>
                                 <a href=""><img src="./down.svg" alt=""></img>
                                 <p className="uploadCata">Download Sample</p></a>
                              </div>
                              <div className='col-md-4 text-center'>
                                 <a href=""><img src="./edit.svg" alt=""></img>
                                 <p className="uploadCata">Edit Catalogue</p></a>
                              </div>
                        </div>
                        <div className="text-center">
                            <input type="text" placeholder="Name the procedure or test here." name="search" className='catalogueSearchbar'></input>
                        </div>
                        <div className='listOfService'>
                            <div className='row listOfServiceHeading'>
                                <div className='col-md-6'>
                                    Test Name
                                    </div>
                                <div className='col-md-3'>
                                    Price
                                </div>
                                <div className='col-md-3'>
                                    Variance
                                </div>
                            </div>
                        </div>
                        {
                            this.props.catalogues.length > 0 ? this.props.catalogues.slice(0, this.state.rowsToDisplay).map( (c, i) => (
                            <div>
                            <div className = 'row listOfService' key = {i}>
                                <div className='col-md-6'>{c.service}</div>
                                <div className='col-md-3'>Rs. {c.price[0]}</div>
                                <div className='col-md-3 catalogueVariance'>{c.variance}%</div>
                            </div>
                            <div className = 'row listOfService'>
                                 <div className='col-md-8'><hr></hr></div>
                                 <div className='col-md-4'></div>
                            </div>
                            </div>
                            )) : 
                            <div>
                                 {
                                   this.state.loader ? <div className="Loader">
                                                            <Loader
                                                                type="Oval"
                                                                color="#00BFFF"
                                                                height={200}
                                                                width={200}
                                                            // timeout={3000} //3 secs
                                                            />
                                                    </div> : <div>No Catalogue</div>
                                 }
                            </div>
                           
                        }
                        <div className='text-center'>
                            <button onClick={this.handleClick} className="catalogueViewMore">View more</button>
                        </div>
                    </div>
                    <div className='col-md-3'></div>
                </div>
                <br />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    catalogues: state.user.catalogues
})

export default connect(mapStateToProps, { getUserCatalogue })(MyCatalogueComponent);
