package com.tripco.t02.planner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * Will compute the distances from everypoint to every other point.
 *
 *  @author   Joseph-Jonathan Salzano
 *  @version  1.0
 */
public class Distances {
  //private HashMap<Place,HashMap<Place,Integer>> distanceTable;
  private int[][] distanceTable;
  private double[][] locationTable;
  private double radius;
  private Place[] places;
  public int statusCode = 200;
  public String badPlaces = "";

  /**
   * Constructor which takes a refernce to a list of places and the radius in desired units.
   * Starts the algorithm to build the distance table.
   *
   * @param places array of places to calculatr distances between.
   * @param radius radius of the earth in given units.
   */
  public Distances(Place[] places, double radius) {
    distanceTable = new int[places.length][];
    locationTable = new double[places.length][2];
    this.radius = radius;
    this.places = places;
    parseLocations();
    computeTable();
  }

  /**
   * Loops through all the places in the list and builds a hash table for distances & coordinates.
   * Will remove invalid places from list.
   */
  private void parseLocations() {
    int index = 0;
    for(int i = 0; i < places.length; i++) {
      try {
        Double currLat = Coordinate.latitudeStringToDecimal(places[i].latitude);
        Double currLong = Coordinate.longitudeStringToDecimal(places[i].longitude);
        distanceTable[index] = new int[places.length];
        locationTable[index][0] = currLat;
        locationTable[index][1] = currLong;
        places[index] = places[i];
        index++;
      } catch(IOException e) {
        badCoord(e, i);
      }
    }
    places = Arrays.copyOf(places, index);
  }

  private void badCoord(IOException exeption, int index) {
    System.out.println(exeption);
    System.out.println(places[index].name + " has bad coordinates. Removing.");
    statusCode = 400;
    badPlaces += places[index].name + " has bad coordinates.\n";
  }

  private void computeTable() {
    for(int src = 0; src < places.length; src++) {
      for(int dest = src + 1; dest < places.length; dest++) {
        int dist = calculateDistance(locationTable[src][0], locationTable[src][1],
                                      locationTable[dest][0], locationTable[dest][1]);
        distanceTable[src][dest] = dist;
        distanceTable[dest][src] = dist;
      }
    }
  }

  /**
   * Returns the distance between 2 given points.
   *
   * @param src source point
   * @param dest destination point
   * @return the distance between the source and destination.
   */
  public int getDistanceBetween(int src, int dest) {
    return   distanceTable[src][dest];
  }

  /**
   * Prints out the table for the user.
   */
  public void dumpTable() {
    for(int i = 0; i < places.length; i++) {
      System.out.println("FROM: "+places[i].name);
      for(int j = 0; j < places.length; j++) {
        System.out.println("\tTO: "+places[j].name);
        System.out.println("\t\t"+distanceTable[i][j]);
      }
    }
  }

  /**
  * Gets the places array that the distance table holds.
  */
  public Place[] getPlaces() {
    return places;
  }

  /**
   * Computes the distance between two coordinates in either Miles or Kilometers.
   * @param latA Latitude of the origin coordinate.
   * @param lonA Longitude of the origin coordinate.
   * @param latB Latitude of the destination coordinate.
   * @param lonB Longitude of the destination coordinate.
   * @return int of the distance from Point A to Point B in units specified by the function call.
   */
  private int calculateDistance(double latA, double lonA, double latB, double lonB) {

    //From chord length formula
    double deltaX = Math.cos(Math.toRadians(latB)) * Math.cos(Math.toRadians(lonB))
                      - Math.cos(Math.toRadians(latA)) * Math.cos(Math.toRadians(lonA));
    double deltaY = Math.cos(Math.toRadians(latB)) * Math.sin(Math.toRadians(lonB))
                      - Math.cos(Math.toRadians(latA)) * Math.sin(Math.toRadians(lonA));
    double deltaZ = Math.sin(Math.toRadians(latB)) - Math.sin(Math.toRadians(latA));

    //"Great Circle Chord Length" is C
    double chordLen = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) + Math.pow(deltaZ, 2));

    //"Central Angle" is cA, converted from degrees to radians
    double centralAngle = (2 * Math.asin(chordLen/2));

    return (int)Math.round(radius * centralAngle);
  }
}
