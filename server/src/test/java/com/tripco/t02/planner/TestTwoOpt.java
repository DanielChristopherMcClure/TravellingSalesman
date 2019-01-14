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
public class TestTwoOpt {
    @Test
    public void TestTooSmall() {
      Place[] places = new Place[3];
      places[0] = new Place("1","one","38","-108");
      places[1] = new Place("2","two","38.5","-108");
      places[2] = new Place("3","three","38","-106");
      Distances distanceTable = new Distances(places, 3958.7613);

      int[] order = new int[]{0,1,2};
      NNeighbor nnObject = new NNeighbor(0, order, distanceTable, true, false);
      nnObject.call();
      order = nnObject.getPlacesArray();
      assertEquals(0, order[0]);
      assertEquals(1, order[1]);
      assertEquals(2, order[2]);
    }

    @Test
    public void TestTwoOpt() {
      Place[] places = new Place[6];
      places[0] = new Place("1","one","38","-108");
      places[1] = new Place("2","two","38.5","-108");
      places[2] = new Place("3","three","38","-106");
      places[3] = new Place("4","four","38.5","-106");
      places[4] = new Place("5","five","38","-104");
      places[5] = new Place("6","six","38.5","-104");
      Distances distanceTable = new Distances(places, 3958.7613);

      int[] order = new int[]{0,1,2,3,4,5};
      NNeighbor nnObject = new NNeighbor(0, order, distanceTable, true, false);
      nnObject.call();
      order = nnObject.getPlacesArray();
      assertEquals(0, order[0]);
      assertEquals(1, order[1]);
      assertEquals(3, order[2]);
      assertEquals(5, order[3]);
      assertEquals(4, order[4]);
      assertEquals(2, order[5]);
    }
}
