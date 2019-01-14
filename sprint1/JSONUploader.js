class JSONUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breweries: []
    };
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  handleFileSelect(event) {
    var input = document.getElementById("fileUpload");
    // if (input.files[0].type != "application/json") {
    //   alert("File is not in JSON format.");
    // }
    // else {
      var file = input.files[0];
      var fr = new FileReader();
      const uploader = this;
      var onLoadFile = function(){
        uploader.state.breweries = [];
        try {
          var JSONObject = JSON.parse(fr.result);
          JSONObject.forEach(function(brewery) {
            var newBrewery = {
              name: brewery.name,
              coordinates: brewery.latitude + " " + brewery.longitude
            };
            uploader.state.breweries.push(newBrewery);
          });
          this.props.onJSONParsed(uploader.state.breweries);
        } catch (e) {
          alert("Unable to Parse JSON\n" + e);
        }
      };
      fr.onload = onLoadFile.bind(this);
      fr.readAsText(file);
    // }
  }

  render() {
    return (
      <div>
        <input type="file" id="fileUpload" onChange={this.handleFileSelect} hidden/>
        <label type="button" htmlFor="fileUpload" className="btn btn-default"><b>Upload JSON File</b></label>
      </div>
    )
  }
}
