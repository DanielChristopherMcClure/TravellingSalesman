import React, {Component} from 'react';
var FontAwesome = require('react-fontawesome');

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicChoicesAll: ["id","latitude","longitude"],
      dynamicChoices: {id: false, latitude: false, longitude: false},
      moreInfoIndex: null
    }
    this.createTable = this.createTable.bind(this);
    this.updateDynamicChoices = this.updateDynamicChoices.bind(this);
    this.buildItineraryDestination = this.buildItineraryDestination.bind(this);
    this.setNewDestination = this.setNewDestination.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderDynamicChoice = this.renderDynamicChoice.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
    this.updateAvailableDynamicChoices = this.updateAvailableDynamicChoices.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.trip.places.length > 0){
      if (this.state.dynamicChoicesAll.length !== Object.keys(nextProps.trip.places[0]).length) {
        this.updateAvailableDynamicChoices(Object.keys(nextProps.trip.places[0]));
      }
    }
  }

  updateAvailableDynamicChoices(keys) {
    this.state.dynamicChoicesAll = [];
    this.state.dynamicChoices = {};
    for(let i = 0; i < keys.length; i++)
    {
      if(keys[i] != "name") {
        this.state.dynamicChoicesAll.push(keys[i]);
        this.state.dynamicChoices[keys[i]] = false
      }
    }
    this.setState();
  }

  /*
  * Reverses the trip
  */
  reverseTrip() {
      if(this.props.trip.distances != null
        && this.props.trip.places != null
        && this.props.trip.distances.length > 1
        && this.props.trip.places.length > 1) {
          this.props.trip.distances.reverse();
          var newPlaces = [];
          for (var i = 1; i < this.props.trip.places.length; i++) {
              newPlaces.push(this.props.trip.places[i]);
          }
          newPlaces.reverse();
          newPlaces.unshift(this.props.trip.places[0]);
          this.props.trip.places = newPlaces;
          this.props.updateTrip(this.props.trip);
      } else {
          //console.log("Unable to reverse trip");
          alert("Reverse trip was unsuccessful.");
      }
  }

  updateDynamicChoices (event) {
    this.state.dynamicChoices[event.target.value] = event.target.checked;
    this.setState(this.state.dynamicChoices);
  }

  buildItineraryDestination(item, index) {
    let destinationTab = [<b key={"DestTab"+item.name}>{item.name}</b>];
    let choices = this.state.dynamicChoices;
    this.state.dynamicChoicesAll.forEach(function(choice) {
      if(choices[choice]){
        destinationTab.push(<i key={"Dynamic"+item+choice}><br />{choice}: {item[choice]}</i>);
      }
    });
    if(index != 0) {
      destinationTab.push(<b key={"NewOrigin"+item.name}>
                            <a style={{fontSize:"x-small",cursor:"pointer"}}
                              onClick={()=>{if(confirm('Change the Start Point?'))
                              {this.setNewDestination(index)};}}><br />{"use as start"}
                            </a>
                          </b>);
    }
    return destinationTab;
  }

  setNewDestination (rowIndex) {
    let newEnding = this.props.trip.places.splice(0, rowIndex);
    this.props.trip.places = this.props.trip.places.concat(newEnding);
    newEnding = this.props.trip.distances.splice(0, rowIndex);
    this.props.trip.distances = this.props.trip.distances.concat(newEnding);
    this.props.updateTrip(this.props.trip);
  }

  createTable () {
    let rows = [];
    let distance = 0;
    let units = this.props.displayedDistanceType;
    let dests = this.props.trip.places.map((item, index) => <td>
                  {this.buildItineraryDestination(item, index)}</td>);
    let dists = this.props.trip.distances.map((item) => <td>{item}</td>);
    let cumulativeDist = []
    for(var legIndex = 0; legIndex < this.props.trip.distances.length; legIndex++) {
      distance += this.props.trip.distances[legIndex];
      cumulativeDist.push(<td>{distance}</td>);
    }
    if(dests.length > 0){
      dests.push(<td>
        {this.buildItineraryDestination(this.props.trip.places[0], 0)}
      </td>)
      dists.unshift(<td>{"Start"}</td>);
      cumulativeDist.unshift(<td>{0}</td>);
    }
    for(var i = 0; i < dests.length; i++){
      rows.push(<tr key={i}>{dests[i]}{dists[i]}{cumulativeDist[i]}</tr>);
    }
    return {distance, units, rows};
  }

  renderTable() {
    let table = this.createTable();
    return(
      <div>
        <h4>Round trip distance of {table.distance} {table.units}. </h4>
        <div style={{ 'maxHeight': '400px',
                        'overflow':'auto'}}>
          <table className="table table-hover table-bordered">
            <thead>
            <tr className="text-white">
              <th className="col-6 align-middle">Destination</th>
              <th className="col-3 align-middle">Leg Distance ({table.units})</th>
              <th className="col-3 align-middle">Total Distance ({table.units})</th>
            </tr>
            </thead>
            <tbody>
              {table.rows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderDynamicChoice(value) {
    return(
      <div key={value} className="col-12">
        <label>
          <input type="checkbox" value={value} onChange={this.updateDynamicChoices}/> {value}
        </label>
      </div>
    )
  }

  renderDynamicChoices() {
    let toRender = [];
    for(let i = 0; i < this.state.dynamicChoicesAll.length; i++)
    {
      toRender.push(this.renderDynamicChoice(this.state.dynamicChoicesAll[i]));
    }
    return toRender;
  }

    render() {
        return(
            <div id="itinerary" style={{marginTop: `10px`}}>
                <div className="row">
                    <div className="col-12 col-md-8">
                        {this.renderTable()}
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="row">
                            <div className="col-12">
                               <h5> Show More Info:</h5>
                            </div>
                            <button className="btn btn-csu col-12" title="Reverse path of trip."
                              onClick={this.reverseTrip} type="button">
                                Reverse Trip</button>
                            {this.renderDynamicChoices()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Itinerary;
