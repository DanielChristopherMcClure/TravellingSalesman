import React, {Component} from 'react';
import Itinerary from './Itinerary';
import ItineraryMap from './ItineraryMap';
import SVGMap from './SVGMap';
var FontAwesome = require('react-fontawesome');

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class ItineraryLayout extends Component {
  constructor(props){
    super(props);
    this.state = {}
    if(this.props.config.maps.length > 1) {
        this.props.trip.options.map = "kml";
    }
    this.downloadMap = this.downloadMap.bind(this);
  }

  downloadMap() {
      if(this.props.trip.map != null) {
          //console.log("Saving Map Type: ", this.props.trip.options.map);
          var toSaveData = this.props.trip.map;
          var toSaveElement = document.createElement('a');
          toSaveElement.setAttribute('href', 'data:application/json;charset=utf-8,'
              + encodeURI(toSaveData.replace(/%23/g, "#")));
          toSaveElement.setAttribute('download', this.props.trip.title+"_map"+"."+this.props.trip.options.map);
          document.body.appendChild(toSaveElement);
          toSaveElement.click();
      } else {
          alert("Map is null, no trip planned");
      }
  }

  render() {
    const count = this.props.trip.places.length;
    return(
      <div className="col-12 card" style={{borderRadius:0,borderTop:0,borderColor:"#aaa",padding:0}}>
        <div className="card-body norm">
        <h5 className="col-12">There are {count} destinations in the trip.</h5><br/>
        <div className="col-12" style={{marginBottom: `40px`}}>{
          this.props.trip.map.toLocaleLowerCase().indexOf("<kml") >= 0 ?
            <ItineraryMap
                containerElement={<div style={{ height: `400px` }} ></div>}
                mapElement={<div style={{ height: `100%` }} ></div>}
                map={this.props.trip.map}
            />
            : <SVGMap trip={this.props.trip} />
        }</div>
        <button className="btn btn-csu col-6" title="Go back to planning page."
          onClick={this.props.changeReplan} type="button">
          <FontAwesome name='redo-alt'/> Re-plan Trip</button>
        <button className="btn btn-csu col-6" title="Download map." 
          onClick={this.downloadMap} type="button">
          <FontAwesome name='download'/> Map</button>
        <Itinerary  className="col-12"
                    updateTrip={this.props.updateTrip}
                    displayedDistanceType={this.props.displayedDistanceType}
                    trip={this.props.trip} />
        </div>
      </div>
    )
  }
}

export default ItineraryLayout;
