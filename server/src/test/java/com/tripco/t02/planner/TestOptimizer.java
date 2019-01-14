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
public class TestOptimizer {
  @Test
  public void TestThreadPoolExecutes() {
    Place[] places = new Place[4];
    places[0] = new Place("1","one","0","0");
    places[1] = new Place("2","two","0","10");
    places[2] = new Place("3","three","10","10");
    places[3] = new Place("3","three","10","0");
    Distances distanceTable = new Distances(places, 3958.7613);

    int[] order = new int[]{0,1,2,3};

    try{
      Optimizer.optimize(order, distanceTable, false, false);
      assertEquals(1, 1);
    } catch (Exception e) {
      System.out.println(e);
      assertEquals(1, 0);
    }
  }
}
