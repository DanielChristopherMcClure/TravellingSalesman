package com.tripco.t02.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t02.server.HTTP;
import spark.Request;

import java.util.ArrayList;

/**
 * This class handles to the conversions of the trip request/resopnse,
 * converting from the Json string in the request body to a Trip object,
 * planning the Trip, and
 * converting the resulting Trip object back to a Json string
 * so it may returned as the response.
 */
public class Plan {
  private Error error = new Error();
  private Trip trip;

  /** Handles trip planning request, creating a new trip object from the trip request.
   * Does the conversion from Json to a Java class before planning the trip.
   * @param request
   */
  public Plan (Request request) {
    // first print the request
    // System.out.println(HTTP.echoRequest(request));

    // extract the information from the body of the request.
    JsonParser jsonParser = new JsonParser();
    JsonElement requestBody = jsonParser.parse(request.body());

    // convert the body of the request to a Java class.
    Gson gson = new Gson();
    trip = gson.fromJson(requestBody, Trip.class);

    if(trip.version == 0) {
      trip.upgradeVersion1();
    }
    // plan the trip.
    trip.plan(error);
    if(trip.version == 0) {
      trip.downgradeVersion1();
    }
  }

  /** Handles the response for a Trip object.
   * Does the conversion from a Java class to a Json string.*
   */
  public String getTrip () {
    Gson gson = new Gson();
    String response = new String();
    if(!error.code.equals("200")) {
      response = error.message;
    } else {
      response = gson.toJson(trip);
    }
    return response;
  }

  public int getStatusCode() {
    return Integer.parseInt(error.code);
  }
}
