import React, {Component} from 'react';

class DestinationSearch_Table extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return(
      <div style={{ 'maxHeight': '400px',
                      'overflow':'auto'}}>
        <table className="table table-hover table-bordered">
          <thead>
          <tr className="text-white">
            <th className="col-10 align-middle">Name</th>
            <th className="col-2 align-middle">Id</th>
          </tr>
          </thead>
          <tbody style={{'cursor': 'pointer'}}>
            {this.props.rows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DestinationSearch_Table;
