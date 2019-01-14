import React, {Component} from 'react';
import DestinationSearch from './query/DestinationSearch';
import LoadSave from './LoadSave'

/* Destinations reside in the parent object so they may be shared
 * with the Trip object.
 * Renders the current destination list.
 * Loads destinations from files.
 * Finds destinations in a database.
 * Displays the current number of destinations
 */
class Destinations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    }
    this.overwriteSelected = this.overwriteSelected.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  overwriteSelected() {
    this.setState({selected: {}});
  }

  setSelected(newSelected) {
    this.setState({selected: newSelected});
  }

  render() {
    return (
        <div id="destinations" className="mt-4">
          <div className="card-header csu-bg">
            Plan Your Trip
          </div>
          <div className="norm">
            <LoadSave trip={this.props.trip}
              updateDisplayedDistanceType={this.props.updateDisplayedDistanceType}
              assignDefaultValues={this.props.assignDefaultValues}
              upgradeVersion1={this.props.upgradeVersion1}
              updatePlan={this.props.updatePlan} cookies={this.props.cookies}
              updateTrip={this.props.updateTrip} plannedPlaces={this.props.plannedPlaces}
              overwriteSelected={this.overwriteSelected}/>
            <DestinationSearch updatePlan={this.props.updatePlan}
                                plannedPlaces={this.props.plannedPlaces}
                                trip={this.props.trip} config={this.props.config}
                                overwriteSelected={this.overwriteSelected}
                                setSelected={this.setSelected} selected={this.state.selected}/>
          </div>
      </div>
    )
  }
}

export default Destinations;
