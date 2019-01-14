package com.tripco.t02.server;

import com.tripco.t02.planner.Option;
import com.tripco.t02.planner.Plan;
import com.tripco.t02.query.Query;

import spark.Request;
import spark.Response;
import spark.Spark;
import static spark.Spark.*;


/** A simple micro-server for the web.  Just what we need, nothing more.
 *
 */
public class MicroServer {

  private int    port;
  private String name;
  private String path = "/public";

  /** Creates a micro-server to load static files and provide REST APIs.
   *
   * @param port
   * @param name
   */
  MicroServer(int port, String name) {
    this.port = port;
    this.name = name;

    port(this.port);

    // serve the static files: index.html and bundle.js
    Spark.staticFileLocation(this.path);
    get("/", (req, res) -> {res.redirect("index.html"); return null;});

    // register all micro-services and the function that services them.
    // start with HTTP GET
    get("/about", this::about);
    get("/echo", this::echo);
    get("/hello/:name", this::hello);
    get("/team", this::team);
    // client is sending data, so a HTTP POST is used instead of a GET
    post("/plan", this::plan);
    post("/query", this::query);
    get("/config",this::config);

    System.out.println("\n\nServer running on port: " + this.port + "\n\n");
  }

  MicroServer() {
    System.out.println("Starting Testing Server");
  }

  /** A REST API that describes the server.
   *
   * @param request
   * @param response
   * @return
   */
  protected String about(Request request, Response response) {

    response.type("text/html");

    return "<html><head></head><body><h1>"+name+" Micro-server on port "+port+"</h1></body></html>";
  }

  /** A REST API that returns levels of optimization.
   *
   * @param request
   * @param response
   * @return
   */
  protected String config(Request request, Response response) {
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    return (new Option()).getLevels();
  }

  /** A REST API that echos the client request.
   *
   * @param request
   * @param response
   * @return
   */
  protected String echo(Request request, Response response) {

    response.type("application/json");

    return HTTP.echoRequest(request);
  }

  /** A REST API demonstrating the use of a parameter.
   *
   * @param request
   * @param response
   * @return
   */
  protected String hello(Request request, Response response) {

    response.type("text/html");

    return Greeting.html(request.params(":name"));
  }


  /** A REST API to support trip planning.
   *
   * @param request
   * @param response
   * @return
   */
  protected String plan(Request request, Response response) {
    Plan plan = new Plan(request);
    response.status(plan.getStatusCode());
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    return plan.getTrip();
  }

  /** A REST API to find values in the DB.
   *
   * @param request
   * @param response
   * @return
   */
  protected String query(Request request, Response response) {
    Query query = new Query(request);
    response.status(query.getStatusCode());
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    return query.getResults();
  }

  /** A REST API that returns the team information associated with the server.
   *
   * @param request
   * @param response
   * @return
   */
  protected String team(Request request, Response response) {

    response.type("text/plain");

    return name;
  }
}
