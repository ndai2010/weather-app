import React, { Component } from 'react';
import './MainPage.scss'
import { connect } from 'react-redux'
import { Search, Thermostat, Air, Opacity, Explore, LocalDrink } from '@mui/icons-material'
import * as action from '../../redux/action'
class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            nameLocation: '',
            weatherIcon: '',
            temp: '',
            country: '',

            wind: '',
            humidity: '',
            Precipitation: '',
            Wind_direction: ''
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
                country: data.location.country,

                wind: data.current.wind_kph,
                humidity: data.current.humidity,
                Precipitation: data.current.precip_mm,
                Wind_direction: data.current.wind_dir
            })
        }
    }
    SearchAddressWeather = () => {
        if (this.state.address !== '') {
            this.props.getDataWithAddress(this.state.address)
        }
    }
    render() {
        let { weatherIcon, nameLocation, temp, country,
            wind,
            humidity,
            Precipitation,
            Wind_direction } = this.state
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

                                <h3><Thermostat className='icon' />{temp}°C</h3>
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
                            <div className='item'>
                                <Air className='icon' />
                                <div className='title-data'>
                                    <h5>{wind} km/h</h5>
                                    <span>Wind speed</span>
                                </div>

                            </div>
                            <div className='item'>
                                <Opacity className='icon' />
                                <div className='title-data'>
                                    <h5>{humidity} %</h5>
                                    <span>Humidity</span>
                                </div>

                            </div>
                            <div className='item'>
                                <LocalDrink className='icon' />
                                <div className='title-data'>
                                    <h5>{Precipitation} mm</h5>
                                    <span>Humidity</span>
                                </div>
                            </div>
                            <div className='item'>
                                <Explore className='icon' />
                                <div className='title-data'>
                                    <h5>{Wind_direction}</h5>
                                    <span>Wind direction</span>
                                </div>
                            </div>
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