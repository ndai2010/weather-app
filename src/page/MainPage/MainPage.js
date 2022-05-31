import React, { Component } from 'react';
import './MainPage.scss'
import { connect } from 'react-redux'
import { Search, Thermostat } from '@mui/icons-material'
import * as action from '../../redux/action'
class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            nameLocation: '',
            weatherIcon: '',
            temp: '',
            country: ''
        }
    }
    onChangeInput = (event, id) => {
        let coppyState = { ...this.state }
        coppyState[id] = event.target.value
        this.setState({
            ...coppyState
        })
    }
    componentDidMount() {
        try {
            let { data } = this.props
            this.props.getDataStart()
            this.setState({
                nameLocation: data.location.name,
                weatherIcon: data.current.condition.icon,
                temp: data.current.temp_c,
                country: data.location.country
            })
        } catch (e) {
            console.log(e);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data !== this.props.data) {
            let { data } = this.props
            this.setState({
                nameLocation: data.location.name,
                weatherIcon: data.current.condition.icon,
                temp: data.current.temp_c,
                country: data.location.country
            })
        }
    }
    SearchAddressWeather = () => {
        if (this.state.address !== '') {
            this.props.getDataWithAddress(this.state.address)
        }
    }
    render() {
        let { weatherIcon, nameLocation, temp, country } = this.state
        return (
            <div className='main-page'>
                <div className='content container'>
                    <div className='search-box'>
                        <input type='search' placeholder='Search location' onChange={(event) => this.onChangeInput(event, 'address')}></input>
                        <Search className='icon' onClick={() => this.SearchAddressWeather()} />
                    </div>
                    <div className='weather-title container'>
                        <div className='temp-image'>
                            <div className='temp'>
                                <Thermostat className='icon' />
                                <h3>{temp}</h3>
                            </div>
                            <div className='image-box'>
                                <img className='image' src={weatherIcon} alt=''></img>
                            </div>
                        </div>
                        <div className='location-name'><h3>{nameLocation}, {country}</h3></div>
                    </div>
                    <div className='weather-info container'>
                        <span className='title'>Weather info</span>
                        <div className='info-content'>
                            <div className='item'>1</div>
                            <div className='item'>2</div>
                            <div className='item'>3</div>
                            <div className='item'>4</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.dataWeather
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDataStart: () => dispatch(action.getDataStart()),
        getDataWithAddress: (address) => dispatch(action.getDataWithAddress(address))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);