import React, {Component} from 'react';

/* Renders a text footer below the application with copyright
 * and other useful information.
 */
class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="footer" className="row csu-bg px-4">
        <div className="col-6">
          <div style={{marginTop:15}} className="text-white">© TripCo t{this.props.number} {this.props.name} 2018</div>
        </div>
        <div className="col-6">
          <img style={{height:50,float:"right"}} className="" src="http://www.cs.colostate.edu/~cs314/images/CSU-Official-wrdmrk-357-617_Rev.png" />
        </div>
      </div>
    )
  }
}

export default Footer;
