package com.tripco.t02.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t02.server.HTTP;
import java.util.ArrayList;
import java.util.Arrays;
import java.io.IOException;
import java.io.*;//eventually we'll narrow the * down to just the readers needed...
import java.util.Collections;
import spark.Request;

/**
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
 *
 */
public class Trip {
  // The variables in this class should reflect TFFI.
  public int version;
  public String type;
  public String title;
  public Option options;
  public Place[] places;
  public int[] distances;
  public String map;

  /**
  * Upgrade TFFI version 1 to version 2.
  * Only optimization accepted for version 1 is "none" which is the same as "0.0";
  */
  public void upgradeVersion1() {
    System.out.println("Upgrading To TFFI Version 2...");
    options.optimization = "0.0";
  }
  /**
  * Downgrade TFFI back to version 1.
  */
  public void downgradeVersion1() {
    System.out.println("Downgrading To TFFI Version 1...");
    options.optimization = "none";
  }

  /**
  * The top level method that does planning.
  */
  public void plan(Error error) {
    try {
      long start = System.nanoTime();
      Distances distanceTable = new Distances(places, chooseRadius());
      places = distanceTable.getPlaces();
      int[] placesIndex = buildIndexArray();
      error.code = Integer.toString(distanceTable.statusCode);
      error.message = distanceTable.badPlaces;
      if(places.length > 1 && error.code.equals("200")) {
       applyOptimizations(distanceTable, placesIndex);
      } else {
        distances = new int[0];
      }
      getMap();
      long end = System.nanoTime();
      System.out.println("Planning Time: "+((end-start) / 1000000.0));
    } catch(IOException e) {
      error.code = "400";
      error.message = e.getMessage();
    } catch(Exception e) {
      error.code = "400";
      error.message = e.getMessage();
    }
  }

  /**
   *  Creates an int array where each element is the value of it's index.
   *
   * @return the newly created array.
   */
  private int[] buildIndexArray() {
    int[] indexArray = new int[places.length];
    for(int i = 0; i < places.length; i++) {
      indexArray[i] = i;
    }
    return indexArray;
  }

  /**
   *  applyOptimizations applies the necissary optimizations.
   *  broken out to help cognitive complexity.
   *
   * @param distanceTable Distances table to compute optimizations off of.
   * @param placesIndex Index array of places.
   */
  private void applyOptimizations(Distances distanceTable, int[] placesIndex) throws Exception{
    if(levelCheck(1.0)){
      Optimizer.optimize(placesIndex, distanceTable, levelCheck(2.0), levelCheck(3.0));
    }
    legDistances(distanceTable, placesIndex);
  }

  /**
   *  levelCheck checks if the optimization is high enough on the scale to preform the tier of
   *  optimization selected.
   *
   * @param tier Double, 1.0-NearestNeighbor, 2.0-2-opt
   * @return  True/False depending if the optimization should be applied
   */
  private boolean levelCheck(double tier){
    int levels = (new Config()).optimization;
    double optimization = Double.parseDouble(this.options.optimization);
    return (levels >= tier && optimization*100 >= (int)((1.0/((levels+1)-tier))*100));
  }

  /**
   * Returns the map.
   * Uses places
   * @return Planned Trip on Map of CO SVG
   */
  private void getMap() {
    Cartographer silent = new Cartographer();
    System.out.println(options.map);
    if(options.map.equals("kml")) {
      this.map = silent.getKmlMap(this.places);
    } else {
      this.map = silent.getSvgMap(this.places);
    }
  }

  /**
   * Calculates the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   */
  private void legDistances(Distances distanceTable, int[] placesIndex) {
    Place[] rearrangedPlaces = new Place[places.length];
    distances = new int[places.length];
    for(int i = 0; i < places.length - 1; i++) {
      rearrangedPlaces[i] = places[placesIndex[i]];
      distances[i] = distanceTable.getDistanceBetween(placesIndex[i],placesIndex[i+1]);
    }
    int last = places.length - 1;
    rearrangedPlaces[last] = places[placesIndex[last]];
    distances[last] = distanceTable.getDistanceBetween(placesIndex[last],placesIndex[0]);
    places = rearrangedPlaces;
  }

  /**
   * Checks if trip is valid.
   * @return True/False Whether the trip has initialized the required fields to be used
   */
  public boolean valid() {
    return type != null
            && this.options != null
            && this.distances != null
            && this.title != null
            && this.places != null
            && this.map != null;
  }

  /**
  * Chooses which radius units to used based on TFFI options.
  * If user defined, use the given radius that user supplies.
  */
  private double chooseRadius() throws IOException {
    double radius = 0.0;
    switch (options.distance) {
      case "miles":
        radius = 3958.7613;
        break;
      case "kilometers":
        radius = 6371.0088;
        break;
      case "nautical miles":
        radius = 3440.0695;
        break;
      case "user defined":
        radius = Double.parseDouble(options.userRadius);
        break;
      default:
        throw new IOException("Invalid Unit Type Given.");
    }
    return radius;
  }
}
