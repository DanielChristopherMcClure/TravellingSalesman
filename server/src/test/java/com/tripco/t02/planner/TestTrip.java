package com.tripco.t02.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestTrip {
  Trip trip;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    trip = new Trip();
  }


  @Test
  public void testTrip() {
    // assertTrue checks if a statement is true
    //assertTrue(true == true);

    trip.title = "test1";
    trip.distances = new int[0];
    trip.options = new Option("miles", "", 3958.7613, 0.0);
    trip.type = "One Way";
    trip.map = "testMap";
    trip.type = "testType";
    trip.places = new Place[0];

    assertTrue(trip.valid() == true);
  }

  @Test
  public void test2DestinationsMiles() {
    trip.places = new Place[2];
    trip.distances = new int[0];
    trip.options = new Option("miles", "", 3958.7613, 0.0);

    trip.places[0] = new Place("foco","Fort Collins","40.5853° N","105.0844° W");
    trip.places[1] = new Place("estes","Estes Park","40.3772° N","105.5217° W");

    trip.plan(new Error());

    System.out.println(Arrays.toString(trip.distances));
    assertEquals(27, trip.distances[0]);
    assertEquals(27, trip.distances[1]);
  }

  @Test
  public void test3DestinationsMiles() {
    trip.places = new Place[3];
    trip.distances = new int[0];
    trip.options = new Option("miles", "", 3958.7613, 0.0);

    trip.places[0] = new Place("foco","Fort Collins","40.5853° N","105.0844° W");
    trip.places[1] = new Place("den","Denver","39.7392° N","104.9903° W");
    trip.places[2] = new Place("estes","Estes Park","40.3772° N","105.5217° W");

    trip.plan(new Error());

    System.out.println(Arrays.toString(trip.distances));
    assertEquals(59, trip.distances[0]);
    assertEquals(52, trip.distances[1]);
    assertEquals(27, trip.distances[2]);
  }

  @Test
  public void test2DestinationsKilometers() {
    trip.places = new Place[2];
    trip.distances = new int[0];
    trip.options = new Option("kilometers", "", 6371.0088, 0.0);

    trip.places[0] = new Place("foco","Fort Collins","40.5853° N","105.0844° W");
    trip.places[1] = new Place("den","Denver","39.7392° N","104.9903° W");

    trip.plan(new Error());

    System.out.println(Arrays.toString(trip.distances));
    assertEquals(94, trip.distances[0]);
    assertEquals(94, trip.distances[1]);
  }

  @Test
  public void test3DestinationsKilometers() {
    trip.places = new Place[3];
    trip.distances = new int[0];
    trip.options = new Option("kilometers", "", 6371.0088, 0.0);

    trip.places[0] = new Place("foco","Fort Collins","40.5853° N","105.0844° W");
    trip.places[1] = new Place("den","Denver","39.7392° N","104.9903° W");
    trip.places[2] = new Place("estes","Estes Park","40.3772° N","105.5217° W");

    trip.plan(new Error());

    System.out.println(Arrays.toString(trip.distances));
    assertEquals(94, trip.distances[0]);
    assertEquals(84, trip.distances[1]);
    assertEquals(44, trip.distances[2]);
  }

  @Test
  public void test3Destinations1AmbigousPositive() {
    trip.places = new Place[3];
    trip.distances = new int[0];
    trip.options = new Option("miles", "", 3958.7613, 0.0);

    trip.places[0] = new Place("foco","Fort Collins","40.5853° N","105.0844° W");
    trip.places[1] = new Place("den","Denver","39.7392° K","104.9903° W");
    trip.places[2] = new Place("estes","Estes Park","40.3772° N","105.5217° W");

    trip.plan(new Error());

    System.out.println(Arrays.toString(trip.distances));
    assertEquals(59, trip.distances[0]);
    assertEquals(52, trip.distances[1]);
    assertEquals(27, trip.distances[2]);
  }
}
