import React, {Component} from 'react';
import {withGoogleMap, GoogleMap, Marker, Polyline} from 'react-google-maps';

/* Map obtains and renders the map for the trip.
 * Might be an SVG or KML contained in the server response.
 */
class ItineraryMap extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let coordinateStart = this.props.map.indexOf("<coordinates>") + 13;
        let coordinateEnd = this.props.map.indexOf("</coordinates>");
        let coordinatesString = this.props.map.substring(coordinateStart, coordinateEnd);
        let coordinates = coordinatesString.split(" ");
        let polyLineCoords = [];
        for(let i = 0; i < coordinates.length; i++) {
            let coordPair = coordinates[i].split(',');
            if(coordPair.length == 2){
                polyLineCoords.push({
                    lat: Number(coordPair[1]),
                    lng: Number(coordPair[0])
                });
            }
        }
        return (
            <div id="map">
                <GoogleMap
                    defaultZoom={2}
                    defaultCenter={{lat: 15, lng: 0}}>
                    <Marker position={polyLineCoords[0]}/>
                    <Polyline options={{path: polyLineCoords}}/>
                </GoogleMap>
            </div>
        )
    }
}
export default withGoogleMap(ItineraryMap);
