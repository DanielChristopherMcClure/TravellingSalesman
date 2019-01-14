class BreweryDistances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distanceTypes: ["mi", "km"],
      selectedDistanceType: 0,
      results: [],
      totalDistances: [0,0]
    };

    this.runDistanceTest = this.runDistanceTest.bind(this);
    this.changeDistanceType = this.changeDistanceType.bind(this);
  }

  changeDistanceType(event) {
    this.state.selectedDistanceType = (this.state.selectedDistanceType + 1) % 2;
    this.setState();
  }

  runDistanceTest(breweries) {
    this.state.results = [];
    this.state.totalDistances = [0,0];
    var startPoint = 0;
    var endPoint = breweries.length-1;
    var point1 = convertToDecimal(breweries[startPoint].coordinates);
    var point2;
    while(isNaN(point1[0])) {
      alert(breweries[startPoint].name + " does not have valid coordinates. Skipping...");
      startPoint++;
      point1 = convertToDecimal(breweries[startPoint].coordinates);
    }

    for (var i = startPoint; i < endPoint;) {
      point1 = convertToDecimal(breweries[i].coordinates);
      var nextValid = i+1;
      point2 = convertToDecimal(breweries[nextValid].coordinates);
      while(isNaN(point2[0]) && nextValid < endPoint) {
        alert(breweries[nextValid].name + " does not have valid coordinates. Skipping...");
        nextValid++;
        point2 = convertToDecimal(breweries[nextValid].coordinates);
      }
      var distances = calculateDistance(point1,point2);
      this.state.totalDistances[0] += distances[0];
      this.state.totalDistances[1] += distances[1];
      var localTotal = [this.state.totalDistances[0],this.state.totalDistances[1]];
      this.state.results.push({source: breweries[i].name, destination: breweries[nextValid].name, distance: distances, totalDistance: localTotal});
      i = nextValid;
    }
    point1 = convertToDecimal(breweries[endPoint].coordinates);
    while(isNaN(point1[0]) && endPoint > startPoint) {
      endPoint--;
      point1 = convertToDecimal(breweries[endPoint].coordinates);
    }
    point2 = convertToDecimal(breweries[startPoint].coordinates);
    var distances = calculateDistance(point1,point2);
    this.state.totalDistances[0] += distances[0];
    this.state.totalDistances[1] += distances[1];
    var localTotal = [this.state.totalDistances[0],this.state.totalDistances[1]];
    this.state.results.push({source: breweries[endPoint].name, destination: breweries[startPoint].name, distance: distances, totalDistance: localTotal});

    this.setState();
  }

  render() {
    return (
      <div className="p-1">
        <JSONUploader onJSONParsed={this.runDistanceTest} />
        <label><input type='checkbox' onChange={this.changeDistanceType} /> Use Kilometers</label>
        <table className="table" id="display">
          <tr>
            <td>Number of legs: {this.state.results.length}</td>
            <td>Round Trip Distance: {this.state.totalDistances[this.state.selectedDistanceType]} ({this.state.distanceTypes[this.state.selectedDistanceType]})</td>
          </tr>
        </table>
        <div className="table-responsive">
          <table className="table table-bordered" id="display">
            <tr>
              <td>Source</td>
              <td>Destination</td>
              <td>Distance ({this.state.distanceTypes[this.state.selectedDistanceType]})</td>
              <td>Cumulative Distance ({this.state.distanceTypes[this.state.selectedDistanceType]})</td>
            </tr>
      {this.state.results.map((result, index) => (
            <tr>
                <td>{result.source}</td>
                <td>{result.destination}</td>
                <td>{result.distance[this.state.selectedDistanceType]} ({this.state.distanceTypes[this.state.selectedDistanceType]})</td>
                <td>{result.totalDistance[this.state.selectedDistanceType]} ({this.state.distanceTypes[this.state.selectedDistanceType]})</td>
              </tr>
              ))}
          </table>
        </div>
      </div>
    )
  }
}
