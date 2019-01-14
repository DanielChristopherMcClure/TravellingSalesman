class Calculator extends React.Component {
  constructor(props) {
    super(props);
    /* state variables */
    this.state = {
      sum: "",
      operand1: "",
      operand2: "",
      latA: "",
      longA: "",
      latB:"",
      longB:"",
      distance: [],
      legallatA: "",
      legallongA:"",
      legallatB: "",
      legallongB: "",
      isKilometers: 0
    };
    /* must bind all functions in constructor */
    this.calc = this.calc.bind(this);
    this.updateOperand1 = this.updateOperand1.bind(this);
    this.updateOperand2 = this.updateOperand2.bind(this);
    this.setUnit = this.setUnit.bind(this);

    //40°09'34" N,105°06'07" W      38°54'02" N, 107°55'33" W

  }

  updateOperand1(event) {
    /* update the value of operand 1.  needs validation */
    this.setState({operand1 : event.target.value});
   /* this.setState({sum : Number(event.target.value) + Number(this.state.operand2) });*/

    /*for testing purposes, additional functionality */
    this.setState({latA: event.target.value});
    this.setState({legallatA: isValidLat(event.target.value)?"legal":"Not Legal"});
  }

  updateOperand2(event) {
    /* update the value of operand 2.  needs validation */
    this.setState({operand2 : event.target.value});
   /* this.setState({sum : Number(this.state.operand1) + Number(event.target.value) })*/
    this.setState({longA: event.target.value});
    this.setState({legallongA: isValidLong(event.target.value)?"legal":"Not Legal"});
 }

  setUnit(event) {
      this.setState({isKilometers : event.target.value});
      if(this.state.sum != "Invalid Coordinates") {
        this.setState({sum : this.state.distance[this.state.isKilometers]});
      }
  }

  calc(event) {
    /* Operands are text.  Must convert to add rather than concatenate. */

	//if(isValidLat(this.state.latA) && isValidLat(this.state.latB) && isValidLong(this.state.longA) && isValidLong(this.state.longB)){
		var p1 = convertToDecimal(this.state.latA);
		var p2 = convertToDecimal(this.state.longA);

        if(!(isNaN(p1[0]) || isNaN(p2[0]))) {
		/*alert(calculateDistance(p1,p2));*/

    this.state.distance = calculateDistance(p1,p2);
		this.setState({sum : this.state.distance[this.state.isKilometers]});
		//alert("Called with\nlatA: "+this.state.latA+"\nlongA: "+this.state.longA+"\nlatB: "+this.state.latB+"\nlongB: "+this.state.longB+"\n(A,B): ("+p1+" , "+p2+")\nDistance: "+calculateDistance(p1,p2));

	}
	else {
        this.setState({sum:"Invalid Coordinates"});
    }
     event.preventDefault();
  }

  render() {
    /* a simple form with text input and a submit button  */
    return (
      <form className="form" onSubmit={this.calc}>
		    <div className="row">
  				<div className="col-xs-12 col-sm-4 col-md-4 col-xl-12">
  					<label for="inBox1">Origin</label>
  					<input type="text" id="inBox1" className="text-right form-control"
  					value={this.state.operand1} onChange={this.updateOperand1}/>
  					<label for="inBox2">Destination</label>
  					<input type="text" id="inBox2" className="text-right form-control"
  					value={this.state.operand2} onChange={this.updateOperand2}/>
  				</div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-xl-12">
            <label for="calcButton">Calculate Distance</label>
						<button id="calcButton" className="btn btn-primary col-12" type="submit" value="submit">-></button>
						<label for="distBox">Distance ({this.state.isKilometers==0?"Miles":"Kilometers"})</label>
						<input type="text" id="distBox" className={(this.state.sum == "Invalid Coordinates")?"text-right btn-outline-danger form-control":"text-right btn-outline-success form-control"}
						value={this.state.sum} disabled/>
					</div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-xl-12">
            <div onChange={this.setUnit.bind(this)}>
              <label for="calcButton">Unit Selection</label>
              <div className="form-group">
                <label for="radio100"><input name="group100" type="radio" id="radio100" value={Number(0)} checked={(this.state.isKilometers==0)?true:false}/>Miles</label><br />
                <label for="radio101"><input name="group100" type="radio" id="radio101" value={Number(1)} checked={(this.state.isKilometers==1)?true:false}/>Kilometers</label>
              </div>
            </div>
					</div>
        </div>
    </form>
    )
  }
}
class Header extends React.Component {
	render(){

		return(
			<div className="jumbotron">
				<h3>Bravo Coders</h3>
				<p>Distance Calculator</p>
				<hr/>
			</div>
		)
	}

}

class Application extends React.Component {
  render() {
    /* separate the page layout from the calculator function */
    return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<Header />
				</div>
			</div>
			<div className="row">
				<div className="card col-xs-12 col-sm-12 col-md-12 col-xl-3 mb-5">

					<Calculator />
				</div>
				<div className="card col-xs-12 col-sm-12 col-md-12 col-xl-9 mb-5">
					<BreweryDistances />
				</div>
			</div>
		</div>
    )
  }
}

ReactDOM.render(<Application  />, document.getElementById("root"));
