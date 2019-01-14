import React, {Component} from 'react';
import Option_Distances from './Option_Distances';
import Option_Optimizations from './Option_Optimizations';
import Option_Map from './Option_Map';

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
  constructor(props) {
    super(props);
    this.state = {
      saveOptions: false
    }
  	this.changeDistance = this.changeDistance.bind(this);
  	this.changeOptimization = this.changeOptimization.bind(this);
  	this.changeUserUnit = this.changeUserUnit.bind(this);
  	this.changeUserRadius = this.changeUserRadius.bind(this);
  	this.changeMap = this.changeMap.bind(this);
    this.changeOptions = this.changeOptions.bind(this);
    this.toggleSaveOptions = this.toggleSaveOptions.bind(this);
    this.defaultOptions = this.defaultOptions.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderSaveOptions = this.renderSaveOptions.bind(this);
  }

  defaultOptions() {
    this.setState({saveOptions: false});
    let defaults = {
        distance: "miles", userUnit: "", userRadius: 0.0, optimization: 0.0, map: "kml"
    };
    this.props.updateOptions(defaults, this.state.saveOptions);
  }

  changeOptions() {
    this.props.updateOptions(this.props.options, this.state.saveOptions);
  }

	changeDistance(name) {
    this.props.options.distance = name
    this.changeOptions();
	}
	changeMap(name) {
  	this.props.options.map = name;
    this.changeOptions();
	}

	changeUserUnit(name) {
    this.props.options.userUnit = name.target.value
    this.changeOptions();
	}

  changeUserRadius(radius) {
    let newUserRadius = null;
    if(radius.target.value.endsWith(".")
    || isNaN(radius.target.value)
    || radius.target.value == "") {
      newUserRadius = radius.target.value;
    } else if(parseFloat(radius.target.value) <=0 || isNaN(parseFloat(radius.target.value))) {
      newUserRadius = parseFloat("");
    } else {
      newUserRadius = parseFloat(radius.target.value);
    }
    this.props.options.userRadius = newUserRadius;
    this.changeOptions();
  }

	changeOptimization(arg) {
    let opt = parseFloat(arg.target.value);
    this.props.options.optimization = opt;
    this.changeOptions();
	}

  toggleSaveOptions() {
    this.setState({saveOptions: !(this.state.saveOptions)});
    this.changeOptions();
  }

  renderOptions() {
    return(
        [<div key="distances" className="col-12 col-lg-6">
          <Option_Distances config={this.props.config}
            options={this.props.options} changeDistance={this.changeDistance}
            changeUnit={this.changeUserUnit} changeRadius={this.changeUserRadius} />
        </div>,
        <div key="optimizations" className="col-12 col-md-6">
          <Option_Optimizations options={this.props.options} levels={this.props.levels}
            changeOptimization={this.changeOptimization} config={this.props.config}/>
        </div>,
        <div key="maps" className="col-12 col-md-6">
          <Option_Map options={this.props.options} config={this.props.config}
            changeMap={this.changeMap} />
        </div>]
    );
  }

  renderSaveOptions() {
    return(
      <div className="col-12">
        <div className="card">
          <div className="card-body norm">
            <div className="row">
              <div className="col-12 col-sm-6">
                <input type="checkbox" value={this.state.saveOptions}
                  onChange={this.toggleSaveOptions} checked={(this.state.saveOptions)?true:false} />
                &nbsp;Save These Options
              </div>
              <div className="col-12 col-sm-6" style={{textAlign: "right"}}>
                <button className="btn btn-csu" onClick={this.defaultOptions}>Default Options</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return(
      <div id="options" className="card">
        <div className="card-header csu-bg text-white">
          Choose Your Options
        </div>
        <div className="norm">
          <div className="row">
            {this.renderOptions()}
            {this.renderSaveOptions()}
          </div>
        </div>
      </div>
    )
  }
}

export default Options;
