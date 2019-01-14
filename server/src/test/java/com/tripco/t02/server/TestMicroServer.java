package com.tripco.t02.server;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.After;
import org.junit.Rule;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestMicroServer {
  private Client client;
  MicroServer server = new MicroServer();

  @Rule
  public final SparkServerRule SPARK_SERVER = new SparkServerRule(http -> {
    http.port(31402);
    http.post("/plan", (request, response) -> server.plan(request,response));
    http.post("/query", (request, response) -> server.query(request,response));
    http.get("/config", (request, response) -> server.config(request,response));
  });

  @After
  public void tearDown() {
      Optional.ofNullable(client).ifPresent(Client::close);
  }

  @Test
  public void testConfig() {
    client = ClientBuilder.newBuilder().build();
    Response response = client.target(URI.create("http://localhost:31402/config"))
            .request()
            .get();
    JsonObject jsonObject = new JsonParser()
              .parse(response.readEntity(String.class))
              .getAsJsonObject();
    assertEquals(jsonObject.get("type").getAsString(), "config");
    assertEquals(jsonObject.get("version").getAsInt(), 4);
    assertEquals(jsonObject.get("optimization").getAsInt(), 3);
    assertEquals(jsonObject.get("units").getAsJsonArray().size(), 4);
    assertEquals(jsonObject.get("maps").getAsJsonArray().size(), 2);
  }

  @Test
  public void testQuery() {
    client = ClientBuilder.newBuilder().build();
    String payload = "{version: 3,"
      +"type:\"Search\","
      +"query:\"Greeley\","
      +"places: [],"
      +"filters: [],"
      +"limit: 0}";
    Response response = client.target(URI.create("http://localhost:31402/query"))
            .request(MediaType.APPLICATION_JSON_TYPE)
            .post(Entity.json(payload));
    JsonObject jsonObject = new JsonParser()
              .parse(response.readEntity(String.class))
              .getAsJsonObject();
    assertEquals(jsonObject.get("places").getAsJsonArray().size(), 6);
  }

  @Test
  public void testPlan() {
    client = ClientBuilder.newBuilder().build();
    String payload = "{version:3,"
      +"type:\"trip\","
      +"title:\"Testing Trip\","
      +"places:["
      +"{id:\"foco\",name:\"Fort Collins\",latitude:\"40.5853° N\",longitude:\"105.0844° W\"},"
      +"{id:\"den\",name:\"Denver\",latitude:\"39.7392° N\",longitude:\"104.9903° W\"},"
      +"{id:\"estes\",name:\"Estes Park\",latitude:\"40.3772° N\",longitude:\"105.5217° W\"}],"
      +"options:{"
      +"  distance: \"kilometers\","
      +"  map: \"svg\","
      +"  optimization: 0.0"
      +"}}";
    Response response = client.target(URI.create("http://localhost:31402/plan"))
            .request(MediaType.APPLICATION_JSON_TYPE)
            .post(Entity.json(payload));
    JsonObject jsonObject = new JsonParser()
              .parse(response.readEntity(String.class))
              .getAsJsonObject();
    assertEquals(jsonObject.get("distances").getAsJsonArray().get(0).getAsInt(), 94);
    assertEquals(jsonObject.get("distances").getAsJsonArray().get(1).getAsInt(), 84);
    assertEquals(jsonObject.get("distances").getAsJsonArray().get(2).getAsInt(), 44);
  }
}
