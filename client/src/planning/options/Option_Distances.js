import React, {Component} from 'react';

class Option_Distances extends Component{
  constructor(props) {
    super(props);
    this.buildSelector = this.buildSelector.bind(this);
    this.unitList = this.unitList.bind(this);
    this.customInput = this.customInput.bind(this);

  }

  buildSelector(name) {
    return(
      <label key={name} className={
      (this.props.options.distance==name)?"col-12 col-md-3 col-lg-12 col-xl-3 btn btn-csu-active"
                                          :"col-12 col-md-3 col-lg-12 col-xl-3 btn btn-csu"}>
        <input type="radio" id={name} name="distance" value={name} autcomplete="off"
          checked={(this.props.options.distance==name)?true:false}
          onChange={()=>this.props.changeDistance(name)}/>
        {(name=="user defined")?"custom":name}
      </label>
    );
  }

  unitList(units){
    let buttons = [];
    if(units != undefined) {
      for(var i = 0; i < this.props.config.units.length; i++){
        buttons.push(this.buildSelector(this.props.config.units[i]));
      }
    }
    return {buttons};
  }

  customInput(){
     let invalidClass = "col-11 ml-2 form-control is-invalid";
     let validClass = "col-11 ml-2 form-control ";
    return(
<div className="row">
<div className="col">
<br/>
<h5 className="card-subtitle">Unit Name:</h5>

     <input className={validClass}
               type="text"
               name="userUnits"
               onChange={this.props.changeUnit}
               value={this.props.options.userUnit}
               placeholder={this.props.options.userUnit} />
<br/>

<h5 className="card-subtitle">How many {this.props.options.userUnit} to the center of the earth?</h5>

    <input className={((this.props.options.userRadius > 0) ? validClass : invalidClass)}
               type="text"
               name="userRadius"
               id="radius"
               onChange={this.props.changeRadius}
               value={this.props.options.userRadius}
               placeholder={this.props.options.userRadius} />
</div>
</div>
    )
  }
  render() {
    let unit = this.unitList(this.props.config.units);
    return(
      <div className="card">
       <div className="card-body norm">
        <h5 className="card-title"><b>Units</b></h5>
        <p className="card-subtitle">Select a unit of measurement for distance.</p>
        <div className="row">
          <div className="col-12 d-block d-md-none d-lg-block d-xl-none btn-group-vertical btn-group-toggle" data-toggle="buttons" >
            {unit.buttons}
          </div>
          <div className="col-12 d-none d-md-block d-lg-none d-xl-block btn-group btn-group-toggle" data-toggle="buttons" >
            {unit.buttons}
          </div>
          <div className="col-12">
            {this.props.options.distance == "user defined" ?this.customInput() : ""}
          </div>
        </div>
       </div>
      </div>
    );
  }
}

export default Option_Distances;
