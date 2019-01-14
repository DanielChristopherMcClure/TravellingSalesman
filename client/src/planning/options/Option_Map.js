import React, {Component} from 'react';

class Option_Map extends Component{
  constructor(props) {
    super(props);
    this.buildSelector = this.buildSelector.bind(this);
    this.mapList = this.mapList.bind(this);

  }

  buildSelector(name) {
    let UserFriendlyName = name;
    if(name == "svg") {
      UserFriendlyName = "Static Image";
    } else if(name == "kml") {
      UserFriendlyName = "Google Map";
    }
    return(
      <label key={name} className={(this.props.options.map==name)?"btn btn-csu-active":"btn btn-csu"}>
        <input type="radio" id={name} name="map" value={name} autcomplete="off"
          checked={(this.props.options.map==name)?true:false}
          onChange={()=>this.props.changeMap(name)}/> {UserFriendlyName}
      </label>
    );
  }

  mapList(maps){
    let buttons = [];
    if(maps != undefined) {
      for(var i = 0; i < this.props.config.maps.length; i++){
        buttons.push(this.buildSelector(this.props.config.maps[i]));
      }
    }
    return {buttons};
  }

  render() {
    let map = this.mapList(this.props.config.maps);
    return(
      <div className="card">
       <div className="card-body norm">
        <h5 className="card-title"><b>Map Type</b></h5>
        <div className="btn-group btn-group-toggle" data-toggle="buttons" >
          {map.buttons}
        </div>
       </div>
      </div>
    );
  }
}

export default Option_Map;
