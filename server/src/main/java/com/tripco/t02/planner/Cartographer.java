package com.tripco.t02.planner;

import java.io.*;
import java.net.URL;
import java.util.ArrayList;

// import de.micromata.jak;

/**
 * To take a list of Place and return a SVG with all of the points drawn onto the map
 *
 * @author Sean Thunquest
 * @see         Place
 */
public class Cartographer {
	private static double xPad= 0;
	private static double yPad =0;
	private static double width = 1024;
	private static double height = 512;

  /**
	* Takes a list of Place and returns an KML with all of the points drawn on the map.
	*
	* @param  places   locations in the trip
	* @return          the kml file as a string.
	* @see             Place
	*/
	public String getKmlMap(Place[] places){
    String kmlHead = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?>"
                        +"<kml xmlns='http://www.opengis.net/kml/2.2' "
                        +"xmlns:atom='http://www.w3.org/2005/Atom' "
                        +"xmlns:xal='urn:oasis:names:tc:ciq:xsdschema:xAL:2.0' "
                        +"xmlns:gx='http://www.google.com/kml/ext/2.2'>"
                        +"<Document>"
                          +"<Style id=\"line_style\">"
                          	+"<LineStyle>"
                          		+"<color>ff0000ff</color>"
                          		+"<width>2</width>"
                            +"</LineStyle>"
                          +"</Style>"
                          +"<Placemark>"
                            +"<styleUrl>#line_style</styleUrl>"
                            +"<LineString>"
                              +"<tessellate>1</tessellate>"
                              +"<altitudeMode>clampToGround</altitudeMode>"
                              +"<coordinates>";
    String kmlBody =            getKmlCoordinates(places);
    String kmlTail =          "</coordinates>"
                            +"</LineString>"
                          +"</Placemark>"
                        +"</Document>"
                      +"</kml>";
    return kmlHead+kmlBody+kmlTail;
	}

  /**
  * Takes a list of Place and returns a list of coordinates.
  *
  * @param  places   locations in the trip
  * @return          Coordinate to inject into KML.
  */
  public String getKmlCoordinates(Place[] places){
    String mapBody = "";
    if(places.length > 0) {
  		for(int i = 0; i < places.length; i++) {
  			mapBody += getKmlCoord(places[i]);
  		}
  		mapBody += getKmlCoord(places[0]);
  	}
  	return mapBody;
  }

  /**
  	* Takes a Place and returns the coordinates
  	*
  	* @param  place        The location to get its coordinates translated to a point on the map
  	* @return              String of an ordered pair of coordinates that should be on the map.
  	* @throws IOException  From Coordinate
  	* @see                 Coordinate
  	*/
  public String getKmlCoord(Place place) {
  	String pair = "";
    int wrappedAround = 0;
    try{
      double latitude = Coordinate.latitudeStringToDecimal(place.latitude);
      double longitude = Coordinate.longitudeStringToDecimal(place.longitude);
      pair = longitude+","+latitude+" ";
  	} catch(IOException e) {
			System.out.println(e.getMessage());
  	}
  	return pair;
  }

	/**
	* Takes a list of Place and returns an SVG with all of the points drawn on the map.
	*
	* @param  places   locations in the trip
	* @return          the svg image with the path of the drip drawn in.
	*/
	public String getSvgMap(Place[] places){
    String baseSvg = getBaseSvg();
    return baseSvg+getInject(places)+"</svg>";
	}

/**
	* Takes a list of Place and returns an SVG of the trip scaled to fit on map.
	*
	* @param  places   locations in the trip
	* @return          SVG of the Path of the trip scaled to the map of CO
	*/
  public String getInject(Place[] places){
  	return "<polyline points='"
            +getCoords(places)
            +"' fill='none' stroke-width='2' stroke='blue' id='svg_7'/>";
  }


	/**
	* getCoords
	* Takes a list of Place and returns a list of coordinates sclaed to fit on the map.
	*
	* @param  places   locations in the trip
	* @return          Coordinate scaled for SVG.
	*/
public String getCoords(Place[] places){
  String mapBody = "";
	// Iterate through the places and get their coordinates adjusted to fit on the map
  double[] lastLatLong = {0.0, 0.0};
  if(places.length > 0) {
		for(int i = 0; i < places.length; i++) {
			mapBody += getCoord(places[i], lastLatLong);
		}
		mapBody += getCoord(places[0], lastLatLong);
	}
	return mapBody;
}

/**
	* Takes a Place and returns the coordinates that place should be in a map of CO
	*
	* @param  place        The location to get its coordinates translated to a point on the map
	* @return              "String of an ordered pair of coordinates that should be on the map.
	* @throws IOException  From Coordinate
	*/
  public String getCoord(Place place, double[] lastLatLong) {
  	String pair = "";
    int wrappedAround = 0;
    try{
      double latitude = Coordinate.latitudeStringToDecimal(place.latitude);
      double longitude = Coordinate.longitudeStringToDecimal(place.longitude);
      if(longitude > 0 && lastLatLong[0] < 0 && longitude - lastLatLong[0] > 180) {
        wrappedAround = -1;
      } else if (longitude < 0 && lastLatLong[0] > 0 && lastLatLong[0] - longitude  > 180) {
        wrappedAround = 1;
      }
      double translatedLong = longitude + (wrappedAround * 360);
      pair =  pointX(translatedLong)+","+pointY(latitude)+" ";
      if(wrappedAround != 0.0) {
        pair +=  pointX(translatedLong)+",-1 "
        +pointX(lastLatLong[0] + wrappedAround * -1 * 360)+",-1 "
        +pointX(lastLatLong[0] + wrappedAround * -1 * 360)+","+pointY(lastLatLong[1])+" "
        +pointX(longitude)+","+pointY(latitude)+" ";
      }
      lastLatLong[0] = longitude;
      lastLatLong[1] = latitude;
  	} catch(IOException e) {
			System.out.println(e.getMessage());
  	}
  	return pair;
  }

  /**
	* Converts the Longitude into an X coordinate onto the map scale.
	*
	* @param  longitude The longitude to scale to map
	* @return     X value for coordinate on map
	*/
  public String pointX(double longitude){
  	double lon = longitude + 180;
		lon = ((lon/360) * width) + yPad;
  	return Double.toString(lon);
  }

  /**
	* Converts the Latitude into a Y coordinate onto the map scale.
	*
	* @param  latitude The latitude to scale to map
	* @return     Y value for coordinate on map (zero at top, counts up as you go down)
	*/
  public String pointY(double latitude){
    double lat = latitude + 90;
    lat = height - ((lat/180) * height) + xPad;
    return Double.toString(lat);
  }

	/**
	* opens file and reads BaseSVG.svg into a string and returns it.
	*
	* @return  Contents of BaseSVG.svg.
	* @see 		getFileStream
	*/
  private String getBaseSvg(){
  	String contents = "";
  	String line;
  	try{
  		BufferedReader bufReader = new BufferedReader(new InputStreamReader(
																getClass().getResourceAsStream("/BaseSVG.svg")));
			while((line = bufReader.readLine()) != null ){
  			contents += line;
  		}
  		bufReader.close();
  	}
  	catch(FileNotFoundException e){
  		System.out.println("\n\nUnable to open SVG file.\n\n");
  		return "<svg></svg>";
  	}
  	catch(IOException e){
  		System.out.println(e);
  	}
  	return contents;
  }
}
