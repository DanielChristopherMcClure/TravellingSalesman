package com.tripco.t02.query;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t02.planner.Error;
import com.tripco.t02.planner.Place;
import com.tripco.t02.server.HTTP;
import spark.Request;


 /**
  *  This class is used to handle the request/response accessing the database.
  *
  *  @author   Joseph-Jonathan Salzano
  *  @version  1.0
  */
public class Query {
  private Error error = new Error();
  private DataBaseSearch search;

  /**
   * Does the conversion from Json to a Java class before accessing the database.
   * @param request request from client
   */
  public Query(Request request) {
    //System.out.println(HTTP.echoRequest(request));

    // extract the information from the body of the request.
    JsonParser jsonParser = new JsonParser();
    JsonElement requestBody = jsonParser.parse(request.body());

    System.out.println(requestBody);

    // convert the body of the request to a Java class.
    Gson gson = new Gson();
    search = gson.fromJson(requestBody, DataBaseSearch.class);

    search.process(error);
  }

  /**
   * Returns the response to the client.
   * @return String that contains the TFFI object of search results to give back to client.
   */
  public String getResults() {
    Gson gson = new Gson();
    String response = new String();
    if(!error.code.equals("200")) {
      response = gson.toJson(error);
    } else {
      response = gson.toJson(search);
    }
    return response;
  }

   public int getStatusCode() {
     return Integer.parseInt(error.code);
   }
}
