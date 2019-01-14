package com.tripco.t02.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

/**
 * Describes the options to apply when planning a trip in TFFI format.
 * At this point we are only using the values provided.
 */
public class Option {
  public String distance;
  public String userUnit;
  public String userRadius;
  public String optimization;
  public String map = "svg";

	/**
	* Option
	* constuctor typically for testing as GSON populates these
	*
	* @param  distance DistanceType object
	* @param optimization floating point to select optimization
	*/
  public Option(String distance, String userUnit, String userRadius, String optimization) {
    this.distance = distance;
    this.userUnit = userUnit;
    this.userRadius = userRadius;
    this.optimization = optimization;
  }

  public Option(String distance, String userUnit, double userRadius, double optimization) {
    this(distance, userUnit, ""+userRadius, ""+optimization);
  }

  public Option() {
  }

    /**
     * getLevels
     * for returning config object holding version and levels of optimization
     * @return Config object.
     */
  public String getLevels(){
      Gson gson = new Gson();
      return gson.toJson(new Config());
  }
}
