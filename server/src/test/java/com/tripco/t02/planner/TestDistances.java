package com.tripco.t02.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestDistances {

  @Test
  public void test3Miles() {
    Place[] places = new Place[3];
    Place foco = new Place("foco","Fort Collins","40.5853° N","105.0844° W");
    Place den = new Place("den","Denver","39.7392° N","104.9903° W");
    Place estes = new Place("estes","Estes Park","40.3772° N","105.5217° W");
    places[0] = foco;
    places[1] = den;
    places[2] = estes;
    Distances distanceTable = new Distances(places, 3958.7613);
    assertEquals(59, distanceTable.getDistanceBetween(0,1));
    assertEquals(52, distanceTable.getDistanceBetween(1,2));
    assertEquals(27, distanceTable.getDistanceBetween(2,0));
  }

  @Test
  public void test3Kilometers() {
    Place[] places = new Place[3];
    Place foco = new Place("foco","Fort Collins","40.5853° N","105.0844° W");
    Place den = new Place("den","Denver","39.7392° N","104.9903° W");
    Place estes = new Place("estes","Estes Park","40.3772° N","105.5217° W");
    places[0] = foco;
    places[1] = den;
    places[2] = estes;
    Distances distanceTable = new Distances(places, 6371.0088);
    assertEquals(94, distanceTable.getDistanceBetween(0,1));
    assertEquals(84, distanceTable.getDistanceBetween(1,2));
    assertEquals(44, distanceTable.getDistanceBetween(2,0));
  }

  @Test
  public void test3with2Bad() {
    Place[] places = new Place[3];
    Place foco = new Place("foco","Fort Collins","140.5853° K","105.0844° W");
    Place den = new Place("den","Denver","139.7392° K","104.9903° W");
    Place estes = new Place("estes","Estes Park","40.3772° N","105.5217° W");
    places[0] = foco;
    places[1] = den;
    places[2] = estes;
    places = new Distances(places, 3958.7613).getPlaces();
    assertEquals(1, places.length);
  }

  @Test
  public void testDumpTable() {
    Place[] places = new Place[3];
    Place foco = new Place("foco","Fort Collins","40.5853° N","105.0844° W");
    Place den = new Place("den","Denver","39.7392° N","104.9903° W");
    Place estes = new Place("estes","Estes Park","40.3772° N","105.5217° W");
    places[0] = foco;
    places[1] = den;
    places[2] = estes;
    Distances distanceTable = new Distances(places, 3958.7613);
    distanceTable.dumpTable();
    assertTrue(1==1);
  }
}
