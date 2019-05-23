import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items : []
    };
  }

  componentDidMount() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Yogyakarta,id&mode=json&appid=c2d4d0d1e7e657a4350ffc7fded03b6e&units=metric")
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.list.map(data => (
        {
          dateTime: `${data.dt_txt}` ,
          temp: `${data.main.temp}` ,
          tempMin: `${data.main.temp_min}` ,
          tempMax: `${data.main.temp_max}` ,
          weather: `${data.weather[0].main}` ,
          id: `${data.dt}` ,

        }
      )))
      .then(items => this.setState({
        items,
        isLoaded: false
      }))
      .catch(error => console.log('parsing failed', error))
  }
  render() {
    const {items} = this.state;

    return (
      <div className="container">
        <div className="row">
          <h1 className="text-center mb-3 w-100">Prakiraan Cuaca Yogyakarta</h1>
          <table className="table table-hover table-hover">
            <thead className="thead-light">
              <tr>
                <th>Date Time</th>
                <th>Temp</th>
                <th>Temp Min</th>
                <th>Temp Max</th>
                <th>Weather</th>
              </tr>
            </thead>
            <tbody>
              {
                items.length > 0 ? items.map(item => {
                  const {id, dateTime, temp, tempMax, tempMin, weather} = item;
                  return(
                    <tr key={id}>
                      <th>{dateTime}</th>
                      <td>{temp}</td>
                      <td>{tempMax}</td>
                      <td>{tempMin}</td>
                      <td>{weather}</td>
                    </tr>
                  );
                }) : null
              }
            </tbody>
          </table>
          
        </div>
      </div>
    );
  }
}

export default App;
