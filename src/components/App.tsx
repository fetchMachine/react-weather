import { Weather } from "../types/Weather"
import { Info } from "./Info"
import { Component } from "react"
import { getDay } from "./utils/getDay"
import { getDate } from "./utils/getDate"
import { getTime } from "./utils/getTime"
import { Input } from "./Input/Input"
import { Select } from "./Select/Select"
import { Units } from "../types/Units"
import { ErrorBoundary } from "./ErrorBoundary"
// import { Loader } from "./Loader"
import css from "./app.module.css"
import humIcon from "../img/humidity-icon.svg"
import pressureIcon from "../img/pressure.svg"
import windIcon from "../img/wind-icon.svg"
import debounce from 'lodash/debounce';

interface AppState {
    weather: Weather;
    search: string;
    isError: boolean;
    isSelect: Units;
    units: { value: Units, label: string }[];
    // isLoading: boolean;
}

const myFetch = (url: string) => {
    return fetch(url).then((data) => {
        if (data.ok) {
            return data.json();
        }
        throw Error("oops");
    });
};


export class App extends Component<{}, AppState> {
    state: AppState = {
        weather: {
            main: { temp: 0, feels_like: 0, humidity: 0, sea_level: 0, pressure: 0 },
            wind: { speed: 0 },
            name: "",
            weather: [{ icon: "04n" }],
        },
        search: "Minsk",

        isError: false,
        isSelect: "metric",
        units: [
            { value: 'metric', label: 'Metric, °C' },
            { value: 'imperial', label: 'Imperial, °F' },
            { value: 'standard', label: 'Standard, K' },
        ],
        // isLoading: true,
    }

    isOffline = true;




    componentDidMount() {
        if (this.isOffline) {
            return
        }
        // this.setState({isLoading: true});
        myFetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.search}&appid=${process.env.REACT_APP_OPEN_WEATHER_TOKEN}&units=${this.state.isSelect}`)
            .then((weather) => this.setState({ weather }))
            .catch(() => { this.setState({ isError: true }) })
        // .finally(() => {
        //     this.setState({ isLoading: false });
        // });
       
    }


    fetchWeatherDebounced = debounce(this.componentDidMount, 1500)

    componentDidUpdate(prevProps: {}, prevState: AppState): void {
        if (prevState.search !== this.state.search) {
            this.fetchWeatherDebounced();
        }
        this.state.isSelect === "imperial" ? this.infoItems[2].unit = ' miles/hour' : this.infoItems[2].unit = ' m/s'
        this.componentDidMount()
    }

    infoItems: { icon?: any; label: string; key: string; unit: string }[] = [
        {
            icon: humIcon,
            label: "Humidity",
            key: 'humidity',
            unit: ' %'
        },
        {
            icon: pressureIcon,
            label: "Pressure",
            key: 'pressure',
            unit: ' gPa'
        },
        {
            icon: windIcon,
            label: "Wind",
            key: 'speed',
            unit: ' m/s'
        },
    ];

    isSelectLabels = {
        metric: "°C",
        imperial: "°F",
        standard: "K",
    }

    render() {
        return (
            // this.state.isLoading ? <Loader/> :
            <div className={css.main}>
                <div className={css.container_left}>
                    <div className={css.logo}>
                        <img className={css.weatherIcon} src={`https://openweathermap.org/img/wn/${this.state.weather.weather[0].icon}@2x.png`} alt='weather icon' />
                    </div>
                    <div className={css.infoWeather}>
                    
                        <p className={css.temperature}>
                        
                            {Math.round(this.state.weather?.main.temp!)} {this.isSelectLabels[this.state.isSelect]}
                            
                        </p>
                        
                            <span className={css.temp_feel}>
                                feels like {Math.round(this.state.weather?.main.feels_like!)} {this.isSelectLabels[this.state.isSelect]}
                            </span>
                            <p className={css.date}>{getDate()}</p>
                            <p className={css.day}>
                                {getDay()} {getTime()}
                            </p>
                            <ErrorBoundary fallback={<span>Произошла ошибка, попробуйте позже </span>}>
                            <ul className={css.list}>
                                {this.infoItems.map((item) => (
                                    <Info
                                        key={item.key}
                                        icon={item.icon}
                                        label={item.label}
                                        // @ts-ignore
                                        value={this.state.weather?.main[item.key] | this.state.weather.wind.speed}
                                        unit={item.unit}
                                    />
                                    
                                ))}
                            </ul>
                            </ErrorBoundary>
                    </div>
                </div>
                <div className={css.container_right}>
                    <Input value={this.state.search} onChange={(search) => this.setState({ search })} />
                    <Select value={this.state.isSelect} units={this.state.units} onChange={(e) => this.setState({ isSelect: e.target.value })} />

                </div>
            </div>
        )
    }
}
