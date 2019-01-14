import React, {Component} from 'react';
var FontAwesome = require('react-fontawesome');

/**
  * Class that contains code to add a custom destination to plan.
  */
class CustomDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
        enteredId: "",
        enteredName: "",
        enteredLat: "",
        enteredLong: "",
        valid: {
          enteredId: true,
          enteredName: true,
          enteredLat: true,
          enteredLong: true,
        },
        errorMessage: ""
    }
    this.renderInput = this.renderInput.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.getPattern = this.getPattern.bind(this);
    this.coordinateToDecimal = this.coordinateToDecimal.bind(this);
    this.parseCoordinate = this.parseCoordinate.bind(this);
    this.checkNegation = this.checkNegation.bind(this);
    this.onEarth = this.onEarth.bind(this);
    this.checkCoordinate = this.checkCoordinate.bind(this);
    this.createDest = this.createDest.bind(this);
  }

  /**
  * Renders an input box with styles and designated Labeling and name
  */
  renderInput(label, name, value, maxLength) {
    let invalidClass = "col-11 ml-2 form-control is-invalid";
    let validClass = "col-11 ml-2 form-control";
    return(
      <div className="form-group col-12 px-4 pt-1">
        <div className="row">
          <label className="col-12 control-label">
            {label}:
          </label>
          <input className={(this.state.valid[name] ? validClass : invalidClass)}
                type="text" name={name}
                maxLength={maxLength}
                onChange={this.updateInput}
                value={value} placeholder={label}/>
        </div>
      </div>
    );
  }

  /**
  * If there is an error message present this renders it.
  */
  renderError() {
    return(
      <small className="text-danger">
        {this.state.errorMessage}
      </small>
    );
  }

  /**
  * Renders the button to add the destination to the plan.
  */
  renderButton() {
    let readyForAdd = this.state.enteredId != ""
        && this.state.enteredName != ""
        && this.state.enteredLat != ""
        && this.state.enteredLong != ""
        && this.state.errorMessage == "";
    return(
      <div className="col-12">
        <div className="">
          <button className="btn btn-csu btn-csu-icons"
                  title="Add custom trip to plan."
                  onClick={this.createDest} type="button"
                  disabled={(readyForAdd ? false : true)}>
                  <FontAwesome name='plus-square'/> Add Custom Location
          </button>
        </div>
      </div>
    );
  }

  /**
  * Updates the coorect variable with the given input.
  * Then checks the validity of the coordinates.
  */
  updateInput(e) {
    this.state.errorMessage = "";
    // Don't allow the id to contain spaces.
    if(e.target.name == "enteredId" && e.target.value[e.target.value.length-1] == ' ') {
      return;
    }
    this.state[e.target.name] = e.target.value;
    if(this.state.enteredLat != "") {
      this.checkCoordinate("enteredLat", "Nn", "Ss");
    }
    if(this.state.enteredLong != "") {
      this.checkCoordinate("enteredLong", "Ew", "Ww");
    }
    this.setState(this.state);
  }

  /**
  * RegEx pattern that the coordinate must match
  */
  getPattern(directions){
    let number = "[\\d]+(?:[.][\\d]+)?";
    let pattern = "-?(?:("
        +number
        +")\\s*(?:[^\\d'.\"\\s"+directions+"])?\\s*)(?:("
        +number
        +")\\s*(?:[^\\d\".\\s"+directions+"])\\s*)?(?:("
        +number
        +")\\s*(?:[^\\d'.\\s"+directions+"])\\s*)?"
        +"(["
        +directions
        +"])?";
    return new RegExp(pattern);
  }

  /**
  * Take a coordinate as a string and convert to a decimal value.
  */
  coordinateToDecimal(coordinate, positiveDirections, negativeDirections) {
    let pattern = this.getPattern(positiveDirections+negativeDirections);
    let result = null;
    let matches = coordinate.match(pattern);
    if(matches) {
      result = this.parseCoordinate(matches);
      result = this.checkNegation(result, coordinate, negativeDirections);
    } else {
      result = null;
    }
    return result;
  }

  /**
  * Take the matched array and parse into decimal.
  */
  parseCoordinate(matches) {
    let result = parseFloat(matches[1])
    + (parseFloat((matches[2]!=null)?matches[2]:0)/60.0)
    + (parseFloat((matches[3]!=null)?matches[3]:0)/3600.0);
    return result;
  }

  /**
  * takes the result and negates it if the coordinate string stars with '-'.
  * Also negates if string contains the negative direction character.
  */
  checkNegation(result, coordinate, negativeDirections) {
    if(coordinate[0] == '-') {
      result *= -1.0;
    }
    if(coordinate.match(new RegExp(".*["+negativeDirections+"]{1}.*"))) {
      result *= -1.0;
    }
    return result;
  }

  /**
  * Checks if the decimal value of the coordinate is in colorado or not.
  */
  onEarth(isLat, decimalVal) {
    let isOn = false;
    if(isLat && decimalVal >= -90.0 && decimalVal <= 90.0) {
      isOn = true;
    }
    else if(!isLat && decimalVal >= -180.0 && decimalVal <= 180.0) {
      isOn = true;
    }
    return isOn;
  }

  /**
  * Checks the given coordinate to make sure it is both valid and in Colorado.
  */
  checkCoordinate(coordinate, posDir, negDir) {
    this.state.valid[coordinate] = true;
    let decimal = this.coordinateToDecimal(this.state[coordinate], posDir, negDir);
    if(decimal == null) {
      this.state.valid[coordinate] = false;
      this.state.errorMessage = "Coordinate not valid input.";
      return;
    }
    if(!this.onEarth((coordinate == "enteredLat"), decimal)) {
      this.state.valid[coordinate] = false;
      this.state.errorMessage = "Coordinate not on Earth.";
    }
  }

  /**
  * Add the custom destination to the planned array.
  */
  createDest() {
    this.props.plannedPlaces.push({
      id: this.state.enteredId,
      name: this.state.enteredName,
      latitude: this.state.enteredLat,
      longitude: this.state.enteredLong
    });
    this.props.updatePlan(this.props.plannedPlaces);
  }

  render() {
    return (
        <div id="destinations" >
          <small>
            Valid Latitude falls between 90 degrees N and 90 degrees S.<br />
            Valid Longitude falls between 180 degrees E and 180 degrees W.<br />
          </small>
          {this.renderError()}
          <div className="row">
            {this.renderInput("ID", "enteredId", this.state.enteredId, "10")}
            {this.renderInput("Name", "enteredName", this.state.enteredName, "")}
            {this.renderInput("Latitude", "enteredLat", this.state.enteredLat, "")}
            {this.renderInput("Longitude", "enteredLong", this.state.enteredLong, "")}
            {this.renderButton()}
          </div>
      </div>
    )
  }
}

export default CustomDestination;
