package com.tripco.t02.query;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t02.planner.Error;
import com.tripco.t02.planner.Place;
import com.tripco.t02.server.HTTP;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import spark.Request;

/**
 * The Query class supports TFFI so it can easily be converted to/from Json by Gson.
 * The Database calls use the PreparedStatement class to help protect agaist SQL Injection.
 *
 *  @author   Joseph-Jonathan Salzano
 *  @version  1.0
 */
public class DataBaseSearch {
  // Sets up static variables based on if running in travis enviornment or not.
  private static final String dbDriver = "com.mysql.jdbc.Driver";
  private static final String dbUrl = (System.getenv("TRAVIS") != null)
                                        ? "jdbc:mysql://localhost/test_database"
                                        : "jdbc:mysql://faure.cs.colostate.edu/cs314";
  private static final String dbUsername = (System.getenv("TRAVIS") != null)
                                            ? "travis"
                                            : "jsalzano";
  private static final String dbPassword = (System.getenv("TRAVIS") != null)
                                            ? null
                                            : "828504342";

  // The variables in this class should reflect TFFI.
  public int version;
  public String type;
  public String query;
  public Place[] places;
  public Filter[] filters;
  public int limit;

  /**
   * Process the search process and fill the results.
   */
  public void process(Error error) {
    search(error);
  }

  private String buildSelectString() {
    return "SELECT airports.id,"
                  +"airports.name,"
                  +"airports.latitude,"
                  +"airports.longitude,"
                  +"airports.municipality,"
                  +"airports.type,"
                  +"region.name,"
                  +"country.name,"
                  +"continents.name ";
  }

  /**
  * Builds the query of the string. Uses ? for the PreparedStatement object.
  * @return the query as a String
  * @see PreparedStatement
  */
  private String buildQueryString() {
    return buildJoinString()
          +buildSearchString()
          +(filters!=null?buildFilterString():"")
          +buildOrderString()
          +((this.limit > 0)?"LIMIT "+this.limit+";":";");
  }

  private String buildJoinString() {
    return "FROM continents "
          +"INNER JOIN country ON continents.id = country.continent "
          +"INNER JOIN region ON country.id = region.iso_country "
          +"INNER JOIN airports ON region.id = airports.iso_region ";
  }

  /**
  * Builds the query of the string. Uses ? for the PreparedStatement object.
  * @return the query as a String
  * @see PreparedStatement
  */
  private String buildSearchString() {
    return "WHERE (airports.id like ?"
            +" or airports.name  like ?"
            +" or airports.municipality  like ?"
            +" or region.name  like ?"
            +" or country.name  like ?"
            +" or airports.type like ?) ";
  }

  private String buildFilterString() {
    String filterString = "";
    for(int attribute = 0; attribute < filters.length; attribute++) {
      String columnName = Filter.findFilterColumn(filters[attribute].attribute);
      if(columnName != null) {
        filterString += buildFilterColumn(attribute, columnName);
      }
    }
    return filterString;
  }

  private String buildFilterColumn(int attribute, String columnName){
    if(filters[attribute].values == null || filters[attribute].values.length < 1) {
      return "";
    }
    String filterString = "AND ("+columnName+"=? ";
    for(int value = 1; value < filters[attribute].values.length; value++) {
      filterString += "OR "+columnName+"=? ";
    }
    return filterString += ") ";
  }

  /**
  * Builds the query of the string. Uses ? for the PreparedStatement object.
  * @return the query as a String
  * @see PreparedStatement
  */
  private String buildOrderString() {
    return "ORDER BY continents.name,"
            +" country.name,"
            +" region.name,"
            +" airports.municipality,"
            +" airports.name ASC ";
  }

  /**
  * Uses the given connection and query string and builds a PreparedStatement object.
  * The object's paramerters are then set with the query being looked for.
  * This system is being used to prevent SQL injection attacks on the web server.
  *
  * @param connect The Connection object that is connected to the DB.
  * @param queryString The string that is the query to send to the DB.
  * @return SQL Injection safe PreparedStatement to execute the query.
  * @see PreparedStatement
  */
  private PreparedStatement buildStatement(Connection connect, String base) throws SQLException {
    PreparedStatement statement = connect.prepareStatement(base);
    for(int i = 1; i <= 6; i++) {
      statement.setString(i, "%"+query+"%");
    }
    if(filters != null) {
      buildFilterStatement(statement);
    }
    return statement;
  }

  private void buildFilterStatement(PreparedStatement statement) throws SQLException{
    int filterNum = 7;
    for(int attribute = 0; attribute < filters.length; attribute++) {
      int numVal = (filters[attribute].values == null)? 0 : filters[attribute].values.length;
      for(int value = 0; value < numVal; value++) {
        statement.setString(filterNum, filters[attribute].values[value]);
        filterNum++;
      }
    }
  }

  /**
  * Builds a SELECT query string and connects to the database.
  * Then executes the query on the database.
  *
  * @throws Exception When any error occures durring the database query.
  */
  private void search(Error error) {
    String countQuery = "SELECT count(*) "+buildQueryString();
    String dataQuery =  buildSelectString()+buildQueryString();

    try {
      Class.forName(dbDriver);
      try (Connection connect = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
            PreparedStatement countStatement = buildStatement(connect, countQuery);
            PreparedStatement dataStatement = buildStatement(connect, dataQuery);
            ResultSet countResult = countStatement.executeQuery();
            ResultSet dataResult = dataStatement.executeQuery();
            ) {
              countResult.next();
              int numResults = countResult.getInt(1);
              buildResults(numResults, dataResult);
            }
    } catch (Exception e) {
      System.err.println("Exception: "+e.getMessage());
      error.code = "400";
      error.message = "Error connecting to Destinations Database.";
    }
  }

  /**
  * Builds the array of places based on the data returned from the DB after a query.
  *
  * @param numResults The number of rows that the Select query found.
  * @param result The ResultSet which contains the data from the rows queried.
  */
  private void buildResults(int numResults, ResultSet result) throws SQLException {
    numResults = (numResults>this.limit && this.limit>0)?this.limit:numResults;
    places = new Place[numResults];
    for(int i = 0; i < numResults; i++) {
      result.next();
      String[] toBuild = new String[]{
        result.getString("airports.id"),
        result.getString("airports.name"),
        result.getString("airports.latitude"),
        result.getString("airports.longitude"),
        result.getString("airports.municipality"),
        result.getString("region.name"),
        result.getString("country.name"),
        result.getString("continents.name"),
        result.getString("airports.type")
      };
      places[i] = new Place(toBuild);
    }
  }

  /**
  * Takes a column name and returns all the distict values that it hold.
  *
  * @param column the column name
  * @return the array of possible values
  */
  public static String[] buildFilterValue(String column) {
    String[] toReturn = null;
    String[] columnTable = column.split("\\.");
    String countQuery = "SELECT COUNT(DISTINCT "+columnTable[1]+") FROM "+columnTable[0]+";";
    String dataQuery = "SELECT DISTINCT "+columnTable[1]+" FROM "+columnTable[0]+";";

    try {
      Class.forName(dbDriver);
      try (Connection connect = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
            Statement countStatement = connect.createStatement();
            Statement dataStatement = connect.createStatement();
            ResultSet countResult = countStatement.executeQuery(countQuery);
            ResultSet dataResult = dataStatement.executeQuery(dataQuery);
            ) {
              countResult.next();
              toReturn = buildFilterValueResults(countResult.getInt(1), dataResult);
            }
    } catch (Exception e) {
      System.err.println("Exception: "+e.getMessage());
    }
    return toReturn;
  }

  private static String[] buildFilterValueResults(int numResults, ResultSet result)
                                                                  throws SQLException {
    String[] values = new String[numResults];
    for(int i = 0; i < numResults; i++) {
      result.next();
      values[i] = result.getString(1);
    }
    return values;
  }
}
