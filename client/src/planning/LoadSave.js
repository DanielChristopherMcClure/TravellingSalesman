import React, {Component} from 'react';
var FontAwesome = require('react-fontawesome');

/* Trip computes the map an intinerary based on a set of destinations and options.
 * The destinations and options reside in the parent object so they may be set by
 * the Destinations and Options classes.
 * The map and itinerary reside in this object so they can be passed to child classes.
 */
class LoadSave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      append: false
    }
    this.loadTFFI = this.loadTFFI.bind(this);
    this.onLoadFile = this.onLoadFile.bind(this);
    this.onAppendFile = this.onAppendFile.bind(this);
    this.saveTFFI = this.saveTFFI.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.dontOverwritePlan = this.dontOverwritePlan.bind(this);
    this.dontOverwriteOptions = this.dontOverwriteOptions.bind(this);
    this.toggleAppend = this.toggleAppend.bind(this);
  }

  dontOverwritePlan() {
    return ((this.props.trip.places.length > 0 || this.props.plannedPlaces.length > 0)
      && !confirm('Loading a file will overwrite the current plan, proceed?'));
  }

  dontOverwriteOptions() {
    const { cookies } = this.props.cookies;
    return (cookies.get('options')
      && !confirm('Overwrite saved options with file options?'));
  }

  onLoadFile(e) {
    var contents = e.target.result;
    if (contents.length == 0) {
      alert("File is empty");
      return;
    }
    if(this.dontOverwritePlan()) {
      return;
    }
    try{
      var fileData = JSON.parse(contents);
    } catch (e) {
      alert("Unable to parse JSON\n"+e);
      return;
    }
    if(this.dontOverwriteOptions()) {
      fileData.options = cookies.get('options');
    }
    this.props.updateTrip(fileData);
    this.props.updatePlan(this.props.trip.places.slice());
    if (this.props.trip.version != 2) {
        this.props.upgradeVersion1();
    }
    this.props.assignDefaultValues(); //Fills empty fields
    this.props.updateDisplayedDistanceType();
    this.props.overwriteSelected();
  }

  onAppendFile(e) {
    var contents = e.target.result;
    if (contents.length == 0) {
      alert("File is empty");
      return;
    }
    try{
      var fileData = JSON.parse(contents);
    } catch (e) {
      alert("Unable to parse JSON\n"+e);
      return;
    }

    //console.log(this.props.plannedPlaces.length);
    let newPlannedPlaces = this.props.plannedPlaces.concat(fileData.places);
    //console.log(this.props.plannedPlaces.length);
    this.props.updatePlan(newPlannedPlaces);
  }

  loadTFFI(event) {
    if(event.target.files != null) {
        var file = event.target.files[0];
        if (file) {
            var fReader = new FileReader();
            event.target.value = null;
        } else {
            alert("Failed to load file");
        }
        if(this.state.append){
          fReader.onload = this.onAppendFile;
        } else {
          fReader.onload = this.onLoadFile;
        }
        fReader.readAsText(file);
    }
  }

  /* Saves the map and itinerary to the local file system.
   */
  saveTFFI(){
    var toSaveData = JSON.stringify(this.props.trip, null, '  ');
    var toSaveElement = document.createElement('a');
    toSaveElement.setAttribute('href', 'data:application/json;charset=utf-8,'
                                        + encodeURIComponent(toSaveData));
    toSaveElement.setAttribute('download', this.props.trip["title"].replace(/\s+/g,"")
                                          + ".json");
    document.body.appendChild(toSaveElement);
    toSaveElement.click();
  }

  /* Changes the Title for both the TFFI object as well as for saving.
   */
  changeTitle(event) {
    this.props.trip["title"] = event.target.value;
    this.props.updateTrip(this.props.trip);
  }

  toggleAppend() {
    this.setState({append: !(this.state.append)});
  }

  /*
  * To Load or Save a trip.
  */
  render(){
    return(
      <div id="DestinationSearch" className="row">
        <div className="col-12 col-sm-6">
          <b>Load From File:</b>
          &nbsp;&nbsp;<input type="file" onChange={this.loadTFFI} id="loadtffibutton" hidden/>
          <label title="Load trip from file." className="btn btn btn-csu btn-csu-icons form-control font-awesome-label-load" htmlFor="loadtffibutton"></label>
          <input onClick={this.saveTFFI} id="savetffibutton" hidden/>
          <br/><input type="checkbox" onChange={this.toggleAppend} checked={(this.state.append)?true:false} />
            &nbsp;Append loaded destinations to existing plan.&nbsp;
        </div>
        <div className="col-12 col-sm-6">
          <b>Save To File:</b>
          &nbsp;&nbsp;<label title="Save trip to file." className="btn btn btn-csu btn-csu-icons form-control font-awesome-label-save" htmlFor="savetffibutton"></label>
          <input type="text" className="col-12 form-control" onChange={this.changeTitle}
            value={this.props.trip.title} placeholder="Trip Name"/>
        </div>
      </div>
    )
  }
}

export default LoadSave;
