package com.tripco.t02.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;
import java.io.IOException;

/*
  This class contains tests for the Cartagrapher class.
 */
@RunWith(JUnit4.class)
public class TestCartographer {
  Trip trip;
  Cartographer cartographer;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    trip = new Trip();
    cartographer = new Cartographer();
  }

  @Test
  public void testCoordX() {
    assertTrue(cartographer.pointX(0).equals("512.0"));
  }

   @Test
  public void testCoordY() {
    assertTrue(cartographer.pointY(0).equals("256.0"));
  }

  @Test
  public void testBadInject() {
    Place[] coords = new Place[1];
    coords[0] = new Place("id1","name1","141","109.03");
    String inject = cartographer.getInject(coords);
    String expected = "<polyline points='' fill='none' stroke-width='2' stroke='blue' id='svg_7'/>";
    assertEquals(expected, inject);
  }

  @Test
  public void testEmptyInject() {
    Place[] coords = new Place[0];
    String inject = cartographer.getInject(coords);
    String expected = "<polyline points='' fill='none' stroke-width='2' stroke='blue' id='svg_7'/>";
    assertEquals(expected, inject);
  }

  @Test
  public void testCoordS() {
    Place Place1 = new Place("place1", "Place One", "41", "109");
    String coord = cartographer.getCoord(Place1, new double[]{0.0,0.0}).trim();
    System.out.println(coord);
    String test = cartographer.pointX(109)+","+cartographer.pointY(41);
    System.out.println(test);
    assertTrue(coord.equals(test));
  }

  @Test
  public void testBadCoordsLong() {
    Place Place1 = new Place("place1", "Place One", "41", "-190");
    String coord = cartographer.getCoord(Place1, new double[]{0.0,0.0}).trim();
    assertEquals("", coord);
  }

  @Test
  public void testBadCoordsLat() {
    Place Place1 = new Place("place1", "Place One", "99", "109");
    String coord = cartographer.getCoord(Place1, new double[]{0.0,0.0}).trim();
    assertEquals("", coord);
  }
}
