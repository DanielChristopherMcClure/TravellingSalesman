package com.tripco.t02.planner;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;

@RunWith(JUnit4.class)
public class TestThreeOpt {
  Place[] places;
  Distances distanceTable;
    @Before
    public void initialize() {
      places = new Place[6];
      places[0] = new Place("1","one","0","0");
      places[1] = new Place("2","two","0","10");
      places[2] = new Place("3","three","10","10");
      places[3] = new Place("4","four","20","10");
      places[4] = new Place("5","five","20","0");
      places[5] = new Place("6","six","11","0");
      distanceTable = new Distances(places, 3958.7613);
    }

    @Test
    public void TestThreeOptCase1() {
      int[] order = new int[]{0,4,3,2,1,5};
      NNeighbor nnObject = new NNeighbor(0, order, distanceTable, false, true);
      nnObject.call();
      checkOrder(nnObject.getPlacesArray());
    }

    @Test
    public void TestThreeOptCase2() {
      int[] order = new int[]{0,2,1,3,4,5};
      NNeighbor nnObject = new NNeighbor(0, order, distanceTable, false, true);
      nnObject.call();
      checkOrder(nnObject.getPlacesArray());
    }

    @Test
    public void TestThreeOptCase3() {
      int[] order = new int[]{0,1,2,4,3,5};
      NNeighbor nnObject = new NNeighbor(0, order, distanceTable, false, true);
      nnObject.call();
      checkOrder(nnObject.getPlacesArray());
    }

    @Test
    public void TestThreeOptCase4() {
      int[] order = new int[]{0,4,3,1,2,5};
      NNeighbor nnObject = new NNeighbor(0, order, distanceTable, false, true);
      nnObject.call();
      checkOrder(nnObject.getPlacesArray());
    }

    @Test
    public void TestThreeOptCase5() {
      int[] order = new int[]{0,3,4,2,1,5};
      NNeighbor nnObject = new NNeighbor(0, order, distanceTable, false, true);
      nnObject.call();
      checkOrder(nnObject.getPlacesArray());
    }

    @Test
    public void TestThreeOptCase6() {
      int[] order = new int[]{0,2,1,4,3,5};
      NNeighbor nnObject = new NNeighbor(0, order, distanceTable, false, true);
      nnObject.call();
      checkOrder(nnObject.getPlacesArray());
    }

    @Test
    public void TestThreeOptCase7() {
      int[] order = new int[]{0,3,4,1,2,5};
      NNeighbor nnObject = new NNeighbor(0, order, distanceTable, false, true);
      nnObject.call();
      checkOrder(nnObject.getPlacesArray());
    }

    private void checkOrder(int[] order) {
      assertEquals(0, order[0]);
      assertEquals(1, order[1]);
      assertEquals(2, order[2]);
      assertEquals(3, order[3]);
      assertEquals(4, order[4]);
      assertEquals(5, order[5]);
    }
}
