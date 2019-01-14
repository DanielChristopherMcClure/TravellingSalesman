import React, {Component} from 'react';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div id="header" className="row csu-bg">
        <img className="img-fluid" style={{maxHeight:"125px"}} src="http://www.cs.colostate.edu/~cs314/images/CompSci-NS-CSU-1-Hrev.png" />
        </div>
    )
  }
}

export default Header;
