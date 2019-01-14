import React, {Component} from 'react';
import DestinationSearch_Table from './DestinationSearch_Table';
import CustomDestination from '../CustomDestination';
import Filters from './Filters';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
var FontAwesome = require('react-fontawesome');

class DestinationSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      selectedInds: {},
      selectedToRemove: {},
      searchItem: "",
      filters: [],
      limit: 100
    }

    this.createTable = this.createTable.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFoundClick = this.handleFoundClick.bind(this);
    this.handleSelectedClick = this.handleSelectedClick.bind(this);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.searchRequest = this.searchRequest.bind(this);
    this.changeSearchItem = this.changeSearchItem.bind(this);
    this.search = this.search.bind(this);
    this.resetSelected = this.resetSelected.bind(this);
    this.resetTable = this.resetTable.bind(this);
    this.resetPlan = this.resetPlan.bind(this);
    this.checkForEnter = this.checkForEnter.bind(this);
    this.handleAddAll = this.handleAddAll.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.renderSearching = this.renderSearching.bind(this);
    this.renderSearchingButtons = this.renderSearchingButtons.bind(this);
    this.renderPlannedButtons = this.renderPlannedButtons.bind(this);
    this.changeLimit = this.changeLimit.bind(this);
  }

  resetPlan() {
    if(confirm('Delete all planned locations?')) {
      this.resetTable("found");
      this.resetTable("plan");
      this.props.overwriteSelected();
      this.setState({
        selectedInds: {},
        selectedToRemove: {},
      });
      this.props.updatePlan([]);
    }
  }

  resetTable(tableName) {
    document.getElementsByName(tableName).forEach(function (element) {
      element.style.backgroundColor = "";
    });
  }

  resetSelected(place) {
    this.props.selected[place.id + "" + place.name] = true;
  }

  createTable(placeArray, clickFunction, tableName) {
    this.props.plannedPlaces.forEach(this.resetSelected, this);
    let rows = placeArray.map((dest, i) => {
      return (
        <tr key={i} id={i} className="text-black" name={tableName} onClick={clickFunction}>
          <td id={i}><span>{dest.name}<br/><small><i>
            City: {(dest.municipality!=null)?dest.municipality:"Unknown"}&nbsp;
            Region: {(dest.region!=null)?dest.region:"Unknown"}&nbsp;
            Country: {(dest.country!=null)?dest.country:"Unknown"}</i></small></span></td>
          <td id={i}>{dest.id}</td>
        </tr>
      );
    });
    return {rows};
  }

  handleFoundClick(e) {
    this.handleClick(e, "#C8C372", this.state.selectedInds);
  }

  handleSelectedClick(e) {
    this.handleClick(e, "#C8C372", this.state.selectedToRemove);
  }

  handleClick(e, color, selectedArray) {
    let target = e.target;
    while(target.tagName != "TR"){
      //console.log(target.tagName);
      target = target.parentElement;
    }
    let arr = Object.assign({}, selectedArray);
    if (target.style.backgroundColor === "") {
      target.style.backgroundColor = color;
      selectedArray[target.id] = true;
    } else {
      target.style.backgroundColor = "";
      delete selectedArray[target.id];
    }
    this.setState(selectedArray);
  }

  handleAddButton() {
    let arr = this.props.plannedPlaces;
    let index;
    for (let selectedIndex in this.state.selectedInds) {
      let index = parseInt(selectedIndex);
      let toAdd = this.state.destinations[index];
      if (typeof this.props.selected[toAdd.id + "" + toAdd.name] == "undefined") {
        arr.push(toAdd);
        this.props.selected[toAdd.id + "" + toAdd.name] = true;
        this.props.setSelected(this.props.selected);
      }
    }
    this.setState({selectedInds: {}});
    this.resetTable("found");
    this.props.updatePlan(arr);
  }

  handleAddAll() {
    //console.log("Adding all destinations");
    let arr = this.props.plannedPlaces;
    for (let i = 0; i < this.state.destinations.length; i++) {
      let toAdd = this.state.destinations[i];
      if (typeof this.props.selected[toAdd.id + "" + toAdd.name] == "undefined") {
        arr.push(toAdd);
        this.props.selected[toAdd.id + "" + toAdd.name] = true;
        this.props.setSelected(this.props.selected);
      }
    }
    this.setState({selectedInds: {}});
    this.resetTable("found");
    this.props.updatePlan(arr);
  }

  handleRemoveButton() {
    let arr = this.props.plannedPlaces;
    let totalRemoved = 0;
    for (let selectedIndex in this.state.selectedToRemove) {
      let index = parseInt(selectedIndex) - totalRemoved;
      let toRemove = arr[index];
      delete this.props.selected[toRemove.id + "" + toRemove.name];
      this.props.setSelected(this.props.selected);
      arr.splice(index, 1);
      totalRemoved++;
    }
    this.setState({selectedToRemove: {}});
    this.resetTable("plan");
    this.props.updatePlan(arr);
  }

  async searchRequest() {
    this.setState({selectedInds: {}});
    let data = await this.search();
    let arr = data.places;
    //console.log(arr);
    this.setState({destinations: arr});
  }

  changeSearchItem(e) {
    this.setState({searchItem: e.target.value});
  }


  fetchResponse() {
    let requestBody = {
      version: 2,
      type: "Search",
      query: this.state.searchItem,
      places: [],
      filters: this.state.filters,
      limit: this.state.limit
    };
    return fetch('http://' + global.serverHost + '/query', {
      method: "POST",
      body: JSON.stringify(requestBody),
      header: {'Access-Control-Allow-Origin':'*'}
    });
  }

  async search() {
    try {
      let serverResponse = await this.fetchResponse();
      if (serverResponse.status == 200) {
        let results = await serverResponse.json();
        return await results;
      } else {
        let errorText = await serverResponse.text();
        alert("Error Searching:\n" + errorText);
      }
    } catch (err) {
      console.error(err);
    }
    return null;
  }

  checkForEnter(e) {
    if (e.key == 'Enter') {
      this.searchRequest();
    }
  }

  updateFilters(updatedFilters) {
    this.setState({filters: updatedFilters});
  }

  changeLimit(e) {
    let num = Number(e.target.value);
    if(num > -1 && num < 10000) {
      this.setState({limit:e.target.value});
    }
  }

  renderSearching() {
    let foundTable = this.createTable(this.state.destinations, this.handleFoundClick, "found");
    return(<div>
      <div className="input-group" role="group">
        <input type="text" className="form-control" onSubmit={this.searchRequest}
          onChange={this.changeSearchItem}
          onKeyPress={this.checkForEnter}
          placeholder="Search for Destination..."/>
        <button className="btn btn-csu btn-csu-icons" title="Search Database."
          onClick={this.searchRequest} type="button">
          <FontAwesome name='search'/>
        </button>
        <Filters filters={this.state.filters} updateFilters={this.updateFilters}
          limit={this.state.limit} updateLimit={this.changeLimit}
          config={this.props.config}/>
      </div>
      <DestinationSearch_Table rows={foundTable.rows}/>
        {this.renderSearchingButtons()}
    </div>)
  }

  renderSearchingButtons() {
    return(
      <div>
        <button className="btn btn-csu btn-csu-icons "
          title="Add selected locations to plan." onClick={this.handleAddButton} type="button">
          <FontAwesome name='plus-square'/>
        </button>
        <button className="btn btn-csu btn-csu-icons "
          title="Add all found locations to plan." onClick={this.handleAddAll} type="button">
          <FontAwesome name='plus-square'/> All
        </button>
      </div>
    )
  }

  renderPlannedButtons() {
    return(
      <div>
        <button className="btn btn-csu btn-csu-icons " id="2"
          title="Remove selected locations from plan." onClick={this.handleRemoveButton} type="button">
          <FontAwesome name='minus-square'/>
        </button>
        <button className="btn btn-csu btn-csu-icons " id="5"
          title="Remove all planned locations." onClick={this.resetPlan} type="button">
          <FontAwesome name='trash-alt'/>
        </button>
      </div>
    )
  }

  render() {
    let plannedTable = this.createTable(
      this.props.plannedPlaces, this.handleSelectedClick, "plan");
    return (<div id="DestinationSearch" style={{marginTop:"40px"}} className="row">
      <div className="col-12 col-lg-6">
      <Tabs forceRenderTabPanel={true}>
        <TabList style={{margin:0}}>
          <Tab style={{width:"50%"}}>Search</Tab>
          <Tab style={{width:"50%"}}>Custom</Tab>
        </TabList>
        <TabPanel>
        {(this.props.config.version >= 2)?this.renderSearching()
          :<div class="alert alert-warning" role="alert">
            Sorry, No Support for Searchable Destinations Destinations on this Server</div>}
        </TabPanel>
        <TabPanel>
          <CustomDestination updatePlan={this.props.updatePlan}
            plannedPlaces={this.props.plannedPlaces}/>
        </TabPanel>
      </Tabs>
      </div>
      <div className="col-12 col-lg-6">
        <h5>There are {this.props.plannedPlaces.length} destinations being planned.</h5> <br/>
        <DestinationSearch_Table rows={plannedTable.rows}/>
        {this.renderPlannedButtons()}
      </div>
    </div>)
  }
}

export default DestinationSearch;
