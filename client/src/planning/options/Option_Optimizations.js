import React, {Component} from 'react';

class Option_Optimizations extends Component{
  constructor(props) {
    super(props);
    this.renderSlider = this.renderSlider.bind(this);
  }
  renderSlider(){
    return(
        <input className="ram-slider"
                    type="range"
                    value={this.props.options.optimization}
                    disabled={(this.props.levels >1 )?false:true}
                    min="0"
                    max="1"
                    step={(this.props.levels > 0)?(1/(this.props.levels)):(1)}
                    onChange={this.props.changeOptimization}/>
    )
  }

  render() {
    let level = Number.parseInt(Math.round(this.props.options.optimization * this.props.levels)) - 1;
    let defined = this.props.config.optimizations != undefined
                  && this.props.config.optimizations.length == this.props.levels
                  && this.props.config.optimizations[level] != undefined
    let label = "";
    if(defined && this.props.options.optimization > 0 ){
      label = this.props.config.optimizations[level].description;
    }
    return(
      <div className="card">
        <div className="card-body norm">
            <h5 className="card-title"><b>Optimization</b></h5>
            <p className="card-subtitle">{(this.props.levels > 1)?
              "More optimization takes time.":"No optimization available."}</p>
            <p className="card-text">
            {(defined)?this.props.config.optimizations[0].label:"None"}
            {this.renderSlider()}
            {(defined)?
              this.props.config.optimizations[this.props.config.optimizations.length-1].label:
              "Most"}</p>
            <p className="card-text">{label}</p>
        </div>
      </div>
    )
  }
}

export default Option_Optimizations;
