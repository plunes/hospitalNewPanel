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
            loader : true
        }
    }

    async componentDidMount() {
        await this.props.getUserCatalogue()
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
                            <h3>Catalogue</h3>
                            <h4>Search(Don't design)</h4>
                        </div>
                        <div className='row'>
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
                        {
                            this.props.catalogues.length > 0 ? this.props.catalogues.map( (c, i) => (
                            <div className = 'row' key = {i}>
                                <div className='col-md-6'>{c.service}</div>
                                <div className='col-md-3'>{c.price[0]}</div>
                                <div className='col-md-3'>{c.variance}</div>
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
