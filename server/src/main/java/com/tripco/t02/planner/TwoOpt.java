package com.tripco.t02.planner;

import com.google.gson.internal.bind.CollectionTypeAdapterFactory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * TwoOpt preforms swaps of locations to look for a better trip.
 */
public final class TwoOpt {
  /**
  * twoOptArray preforms 2-Opt optimization.
  * Swaps places and checks if the path is better or not, keeps swap and starts over if better.
  *
  * @param places    Array of Places to 2-Opt
  * @param table     Pre Computed Distances table
  */
  public static int twoOpt(int[] places, Distances table) {
    int[] delta = {0};
    if(places.length > 3) {
      Boolean improved;
      do {
        improved = improvePath(places, table, delta);
      }
      while(improved);
    }
    return delta[0];
  }

  /**
  * Outer loop of algorithm.
  * If a pair of legs is found that when swapped makes the trip distance shorter returns true.
  *
  * @param places    Array of Places to 2-Opt
  * @param table     Pre Computed Distances table
  * @return If the path can be improved.
  */
  private static Boolean improvePath(int[] places, Distances table, int[] delta) {
    Boolean foundImprovment = false;
    for(int i = 0; i < places.length - 1; i++) {
      foundImprovment = foundImprovment || findImprovement(places, table, i, delta);
    }
    return foundImprovment;
  }

  /**
  * Inner loop of algorithm.
  * If a pair of legs is found that when swapped makes the trip distance shorter it swaps the legs.
  *
  * @param places    Array of Places to 2-Opt
  * @param table     Pre Computed Distances table
  * @param start Where the outer loop is when the inner loop is called.
  * @return If the path can be improved.
  */
  private static Boolean findImprovement(int[] places, Distances table, int start,  int[] delta) {
    Boolean foundImprovment = false;
    for(int k = start + 2; k < places.length; k++) {
      int distanceDelta = calculateDistanceDelta(places, table, start, k);
      if(distanceDelta < 0) {
        delta[0] += distanceDelta;
        reversePath(places, start+1, k);
        foundImprovment = true;
      }
    }
    return foundImprovment;
  }

  /**
  * Inner loop of algorithm.
  * If a pair of legs is found that when swapped makes the trip distance shorter it swaps the legs.
  *
  * @param places Array of Places to 2-Opt
  * @param table  Pre Computed Distances table
  * @param ipnt   The outer loop iteration.
  * @param kpnt   The inner loop iteration.
  * @return the difference in distance.
  */
  private static int calculateDistanceDelta(int[] places, Distances table, int ipnt, int kpnt) {
    int legOne = -1 * table.getDistanceBetween(places[ipnt],places[ipnt+1]);
    int legTwo = -1 * table.getDistanceBetween(places[kpnt],places[(kpnt+1)%places.length]);
    int legThree = table.getDistanceBetween(places[ipnt],places[kpnt]);
    int legFour = table.getDistanceBetween(places[ipnt+1],places[(kpnt+1)%places.length]);
    return legOne+legTwo+legThree+legFour;
  }

  /**
  * Swaps the legs.
  */
  private static void reversePath(int[] places, int placeOne, int placeTwo) {
    for(; placeOne < placeTwo; placeOne++, placeTwo--) {
      int temp = places[placeOne];
      places[placeOne] = places[placeTwo];
      places[placeTwo] = temp;
    }
  }
}
