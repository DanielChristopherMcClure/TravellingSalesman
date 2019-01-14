import React, {Component} from 'react';
import PlanningLayout from './planning/PlanningLayout';
import ItineraryLayout from './itinerary/ItineraryLayout';
import StaffPageLayout from './StaffPageLayout';
import Settings from './settings/Settings';
import Config from './Config';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { withCookies, Cookies } from 'react-cookie';
import 'react-tabs/style/react-tabs.css';
import './custom.css'
var FontAwesome = require('react-fontawesome');

global.serverHost = location.host;

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            replan: false,
            displayedDistanceType: "miles",
            plannedPlaces: [],
            trip: {
                version: 3, type: "trip", title: "",
                options: {distance: "miles", userUnit: "", userRadius: 0.0, optimization: 0.0, map: "kml"},
                places: [], distances: [], map: "<svg> .?. </svg>"
            },
            config: {
                type: "config", version: 4, filters: [], maps: ["svg"],
                optimization: 1, optimizations: [{label:"None", description:"No Optimization"}], units: ["miles"]
            }
        }
        this.updateTrip = this.updateTrip.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.updateDisplayedDistanceType = this.updateDisplayedDistanceType.bind(this);
        this.updatePlan = this.updatePlan.bind(this);
        this.assignDefault = this.assignDefault.bind(this);
        this.assignDefaultValues = this.assignDefaultValues.bind(this);
        this.upgradeVersion1 = this.upgradeVersion1.bind(this);
        this.updateConfig = this.updateConfig.bind(this);
        this.cleanRadius = this.cleanRadius.bind(this);
        this.renderPlanning = this.renderPlanning.bind(this);
        this.renderItinerary = this.renderItinerary.bind(this);
        this.changeToItinerary = this.changeToItinerary.bind(this);
        this.changeReplan = this.changeReplan.bind(this);
        this.renderStaffPage = this.renderStaffPage.bind(this);
        new Config().config(this.updateConfig);
    }

  componentWillMount() {
    const { cookies } = this.props;
    this.state.trip.options = cookies.get('options') || this.state.trip.options;
    this.setState(this.state.trip.options);
  }

  componentDidUpdate() {
    if(this.state.replan) {
      document.getElementById("plan-trip-button").scrollIntoView();
      this.setState({replan: false})
    }
  }

    /*
     * Checks a field and returns it if field != null and the defaultValue if field == null
     */
    assignDefault(field, defaultValue) {
        if (field == null) {
            return defaultValue;
        }
        return field
    }

    /*
     * Assigns default values to a Trip
     */
    assignDefaultValues() {
        let defaultTrip = Object.assign({}, this.state.trip);
        defaultTrip.title = this.assignDefault(defaultTrip.title, "Unknown");
        defaultTrip.type = this.assignDefault(defaultTrip.type, "trip");
        defaultTrip.options = this.assignDefault(defaultTrip.options, {
            distance: "miles", userUnit: "", userRadius: 0.0, optimization: 0.0, map: "kml"
        });
        defaultTrip.options.distance = this.assignDefault(defaultTrip.options.distance, "miles");
        defaultTrip.options.userUnit = this.assignDefault(defaultTrip.options.userUnit, "");
        defaultTrip.options.userRadius = this.assignDefault(defaultTrip.options.userRadius, 0.0);
        defaultTrip.options.optimization = this.assignDefault(defaultTrip.options.optimization, 0.0);
        defaultTrip.options.map = this.assignDefault(defaultTrip.options.map, "kml");
        defaultTrip.places = this.assignDefault(defaultTrip.places, []);
        defaultTrip.distances = this.assignDefault(defaultTrip.distances, []);
        defaultTrip.map = this.assignDefault(defaultTrip.map, "<kml> .?. </kml>");
        this.setState(this.state.trip = defaultTrip);
    }

    /*
     * Callback to upgrade to Version 2 from 1
     */
    upgradeVersion1() {
        this.state.trip.version = 2;
        this.state.trip.options.optimization = 0.0
        this.setState(this.state.trip);
        alert("File has been upgraded to Version 2 to support optimizations.")
    }

    /*
     * Callback to update Trip
     */
    updateTrip(tffi) {
        this.state.trip = tffi;
        this.assignDefaultValues();
    }

    /*
     * Callback to update Units displayed
     */
    updateDisplayedDistanceType() {
        if (this.state.trip.options.distance == "user defined") {
            this.setState({displayedDistanceType: this.state.trip.options.userUnit});
        }
        else {
            this.setState({displayedDistanceType: this.state.trip.options.distance});
        }
    }

    updatePlan(places) {
        this.setState(this.state.plannedPlaces = places);
    }

    /*
     * Callback to update options
     */
updateOptions(options, save) {
    if(save) {
      const { cookies } = this.props;
      cookies.set('options', options, { path: '/' });
    }
  	this.setState(this.state.trip.options = options);
  }


    /*
     * Updates levels of Optimization by checking config from server
     */
    updateConfig(results) {
        this.setState({config: results});
    }


    cleanRadius() {
        var rad = parseFloat(this.state.trip.options.userRadius);
        if (this.state.trip.options.distance == "user defined" && rad > 0) {
            this.setState({userRadius: rad});
        } else if (this.state.trip.options.distance == "user defined") {
            alert("User Defined Unit Error: Using Radius of Earth");
            this.setState({userRadius: parseFloat("1")});
        }
    }

    changeToItinerary() {
        this.setState({tabIndex: 1});
    }

    changeReplan() {
      this.setState({tabIndex: 0, replan: true});
    }

    renderPlanning() {
        return (
            <PlanningLayout config={this.state.config}
                            trip={this.state.trip}
                            plannedPlaces={this.state.plannedPlaces}
                            updateDisplayedDistanceType={this.updateDisplayedDistanceType}
                            assignDefaultValues={this.assignDefaultValues}
                            upgradeVersion1={this.upgradeVersion1}
                            updatePlan={this.updatePlan}
                            updateTrip={this.updateTrip}
                            updateOptions={this.updateOptions}
                            cookies={this.props}
                            changeToItinerary={this.changeToItinerary}/>
        )
    }

    renderItinerary() {
        return (
            <ItineraryLayout trip={this.state.trip}
                             updateTrip={this.updateTrip}
                             displayedDistanceType={this.state.displayedDistanceType}
                             config={this.state.config}
                             changeReplan={this.changeReplan}
            />
        )
    }

    renderStaffPage() {
        return(
            <StaffPageLayout/>
        )
    }

    render() {
        return (
            <div id="application" className="container mt-4" style={{minHeight: "82vh"}}>
                <div className="row">
                    <Tabs className="col-12" selectedIndex={this.state.tabIndex}
                          onSelect={tabIndex => this.setState({tabIndex})}
                          forceRenderTabPanel={true}>
                        <TabList style={{margin: 0}}>
                            <Tab style={{width: "calc(50% - 40px)"}}><h5><b>Plan Trip</b></h5></Tab>
                            <Tab style={{width: "calc(50% - 40px)"}}><h5><b>Itinerary</b></h5></Tab>
                            <Tab style={{width: "40px"}}><h5 style={{marginLeft: "-5px"}}><b>
                              <FontAwesome name='cogs'/></b></h5></Tab>
                            <Tab style={{width: "40px"}}><h5 style={{marginLeft: "-5px"}}><b>
                              <FontAwesome name='users'/></b></h5></Tab>
                        </TabList>
                        <TabPanel>{this.renderPlanning()}</TabPanel>
                        <TabPanel>{this.renderItinerary()}</TabPanel>
                        <TabPanel><Settings updateConfig={this.updateConfig}/></TabPanel>
                        <TabPanel>{this.renderStaffPage()}</TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default withCookies(Application);
