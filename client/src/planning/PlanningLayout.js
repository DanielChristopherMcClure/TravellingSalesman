import React, {Component} from 'react';
import LoadSave from './LoadSave'
import Options from './options/Options';
import Destinations from './Destinations';
import PlanTrip from './PlanTrip';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class PlanningLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.renderDestinations = this.renderDestinations.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderPlanTrip = this.renderPlanTrip.bind(this);
  }

  renderDestinations() {
    return(
      <Destinations trip={this.props.trip} plannedPlaces={this.props.plannedPlaces}
        updateDisplayedDistanceType={this.props.updateDisplayedDistanceType}
        assignDefaultValues={this.props.assignDefaultValues}
        upgradeVersion1={this.props.upgradeVersion1}
        updatePlan={this.props.updatePlan} cookies={this.props.cookies}
        updateTrip={this.props.updateTrip} config={this.props.config}/>
    )
  }

  renderOptions() {
    return(
      <Options  options={this.props.trip.options}
        levels={this.props.config.optimization}
        config={this.props.config}
        updateOptions={this.props.updateOptions}/>
    )
  }

  renderPlanTrip() {
    return(
    <PlanTrip trip={this.props.trip} plannedPlaces={this.props.plannedPlaces}
      displayedDistanceType={this.props.displayedDistanceType}
      updateDisplayedDistanceType={this.props.updateDisplayedDistanceType}
      updatePlan={this.props.updatePlan} updateTrip={this.props.updateTrip}
      cleanRadius={this.props.cleanRadius}
      changeToItinerary={this.props.changeToItinerary}/>
    )
  }

  render() {
    return(
      <div className="col-12 card" style={{borderRadius:0,borderTop:0,borderColor:"#aaa",padding:0}}>
        <div className="card-body col-12" style={{padding:0}}>
          {this.renderDestinations()}
          {this.renderOptions()}
          {this.renderPlanTrip()}
        </div>
      </div>
    )
  }
}

export default PlanningLayout;
