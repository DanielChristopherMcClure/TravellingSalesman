package com.tripco.t02.planner;

/**
 * Describes the places to visit in a trip in TFFI format.
 * There may be other attributes of a place, but these are required to plan a trip.
 */
public class Place {
  public String id;
  public String name;
  public String latitude;
  public String longitude;
  public String municipality;
  public String region;
  public String country;
  public String continent;
  public String type;


	/**
	* Place
	*  Constructor for Place, currently used for testing as GSON typically populates these
	* @param  id
	* @param  name
	* @param  latitude
	* @param  longitude
	* @return     this (implicitly as a constructor)
	*/
  public Place(String id, String name, String latitude, String longitude){
  	this.latitude = latitude;
  	this.longitude = longitude;
  	this.name = name;
  	this.id = id;
  }

  /**
  * Place constructor that takes array in specific order.
  *
  * @param dataArray Array of information about the place.
  */
  public Place(String[] dataArray){
    this.id = dataArray[0];
    this.name = dataArray[1];
    this.latitude = dataArray[2];
    this.longitude = dataArray[3];
    this.municipality = dataArray[4];
    this.region = dataArray[5];
    this.country = dataArray[6];
    this.continent = dataArray[7];
    this.type = dataArray[8];
  }
}
