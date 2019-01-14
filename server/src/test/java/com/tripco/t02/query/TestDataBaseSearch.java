package com.tripco.t02.query;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

import com.tripco.t02.planner.Error;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestDataBaseSearch {
  DataBaseSearch search;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    search = new DataBaseSearch();
  }

  @Test
  public void testGreeleySize() {
    search.type = "query";
    search.query = "Greeley";

    search.process(new Error());

    assertEquals(6, search.places.length);
  }

  @Test
  public void testGreeleySizeWithLimit() {
    search.type = "query";
    search.query = "Greeley";
    search.limit = 2;

    search.process(new Error());

    assertEquals(2, search.places.length);
  }

  @Test
  public void testGreeleyCOSize() {
    search.type = "query";
    search.query = "Greeley";
    search.filters = new Filter[] {new Filter("Region", new String[]{"Colorado"})};

    search.process(new Error());

    for(int i = 0; i < search.places.length; i++) {
      assertEquals("Colorado", search.places[i].region);
    }
  }

  @Test
  public void testHellipadGreeleyCOSize() {
    search.type = "query";
    search.query = "Greeley";
    search.filters = new Filter[] { new Filter("region", new String[]{"Colorado"}),
                                    new Filter("type", new String[]{"heliport"})};

    search.process(new Error());
    for(int i = 0; i < search.places.length; i++) {
      assertEquals("Colorado", search.places[i].region);
      assertEquals("heliport", search.places[i].type);
    }
  }

  @Test
  public void testGreeleyEmptyFilters() {
    search.type = "query";
    search.query = "Greeley";
    search.filters = new Filter[] { new Filter("region", null),
                                    new Filter("type", null)};

    search.process(new Error());

    assertEquals(6, search.places.length);
  }

  @Test
  public void testGreeleyId() {
    search.type = "query";
    search.query = "KGXY";

    search.process(new Error());

    assertEquals("Greeley–Weld County Airport", search.places[0].name);
  }

  @Test
  public void testEmpty() {
    search.type = "query";
    search.query = "";
    search.limit = 2;

    search.process(new Error());

    assertEquals(2, search.places.length);
  }
}
