import React, {Component} from 'react';
var FontAwesome = require('react-fontawesome');

/* Trip computes the map an intinerary based on a set of destinations and options.
 * The destinations and options reside in the parent object so they may be set by
 * the Destinations and Options classes.
 * The map and itinerary reside in this object so they can be passed to child classes.
 */
class PlanTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planning: false
    }
    this.handleResponse = this.handleResponse.bind(this);
    this.plan = this.plan.bind(this);
  }

  validatePlan() {
    let valid = true;
    var acceptable = ["version","type","title","options","places","distances","map"];
    Object.keys(this.props.trip).forEach(function(tripField) {
      if(!acceptable.includes(tripField)) {
        alert("Invalid TFFI file. Field \""+tripField+"\" is not valid.");
        valid=false;
      }
    });
    return valid;
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */
  fetchResponse(){
    this.props.trip.places = this.props.plannedPlaces;
    let requestBody = this.props.trip;
    return fetch('http://' + global.serverHost + '/plan', {
        method: "POST",
        body: JSON.stringify(requestBody),
        header: {'Access-Control-Allow-Origin':'*'}
    });
  }

  async handleResponse(serverResponse) {
    if(serverResponse.status == 200) {
      let tffi = await serverResponse.json();
      this.props.updateTrip(tffi);
      this.props.updatePlan(tffi.places.slice());
      this.props.updateDisplayedDistanceType(tffi.options.distance.name);
    } else {
      let errorText = await serverResponse.text();
      alert("Error Planning:\n"+errorText);
    }
  }

  async plan() {
    if(this.validatePlan()) {
      await this.setState({planning: true})
      try {
        let serverResponse = await this.fetchResponse();
        this.handleResponse(serverResponse);
      } catch(err) {
        console.error(err);
      }
      await this.setState({planning: false});
      await this.props.changeToItinerary();
    }
  }

  /* Renders the buttons, map, and itinerary.
   * The title should be specified before the plan or save buttons are valid.
   */
  render(){
    return(
      <div id="plan-trip-button" className="col-12">
        <div className="input-group" role="group">
          <button className="btn btn-csu col-12" title="Plan the trip with given options."
            style={{fontWeight:"bold",fontSize:26,minHeight:53}} disabled={(this.state.planning)?true:false}
                  onClick={this.plan} type="button">
            {(this.state.planning)? <FontAwesome name='circle-notch' spin/> : (<span><FontAwesome name='check-square'/> Plan Trip</span>)}</button>
        </div>
      </div>
    )
  }
}

export default PlanTrip;
