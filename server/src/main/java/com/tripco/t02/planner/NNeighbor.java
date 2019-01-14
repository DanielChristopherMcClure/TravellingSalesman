package com.tripco.t02.planner;
import java.io.*;
import java.util.concurrent.Callable;

public final class NNeighbor implements Callable<NNeighbor>{
  int[] places;
  Distances table;
  boolean runTwoOpt;
  boolean runThreeOpt;
  int dist = 0;

  /**
   *  Constructor for NN Object.
   */
  public NNeighbor(int startindex, int[] order, Distances table, boolean runTwoOpt, boolean runThreeOpt) {
    this.table = table;
    this.runTwoOpt = runTwoOpt;
    this.runThreeOpt = runThreeOpt;
    places = new int[order.length];
    for(int i = 0; i < order.length; i++) {
      places[i] = order[(startindex + i) % order.length];
    }
  }

    public NNeighbor call() {
      int min;
      int minIndex;
      for(int i = 0; i < places.length-1; i++) {
          min = Integer.MAX_VALUE;
          minIndex = i+1;
          for(int j = i+1; j < places.length; j++) {
              if(table.getDistanceBetween(places[i],places[j]) < min){
                  minIndex = j;
                  min = table.getDistanceBetween(places[i],places[j]);
              }
          }
          swap(places, i+1, minIndex);
          dist += table.getDistanceBetween(places[i], places[i+1]);
      }
      dist += table.getDistanceBetween(places[0], places[places.length-1]);
      if(runThreeOpt) {
        dist += new ThreeOpt().threeOpt(places, table);
      }else if(runTwoOpt) {
        dist += TwoOpt.twoOpt(places, table);
      }
      return this;
    }

    /**
     * swap
     * swaps two integers in an integer array.
     *
     * @param order The integer array
     * @param one First index to swap
     * @param two Second index to swap
     */
    private void swap(int[] order, int one, int two){
        int tmp = order[two];
        order[two] = order[one];
        order[one] = tmp;
    }

    public int getDist() {
      return dist;
    }

    public int[] getPlacesArray() {
      return places;
    }
}
