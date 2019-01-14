package com.tripco.t02.planner;
import java.io.*;
import java.util.concurrent.Callable;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public final class Optimizer {
  public static void optimize(int[] order, Distances table, boolean runTwoOpt, boolean runThreeOpt) throws Exception {
    Set<Callable<NNeighbor>> nnPool = new HashSet<>();
    for(int i = 0; i < order.length; i++) {
      nnPool.add(new NNeighbor(i, order, table, runTwoOpt, runThreeOpt));
    }

    int cores = Runtime.getRuntime().availableProcessors();
    ExecutorService threadPool = Executors.newFixedThreadPool(cores);
    List<Future<NNeighbor>> results = threadPool.invokeAll(nnPool);
    threadPool.shutdown();

    int bestDistance = Integer.MAX_VALUE;
    NNeighbor bestNN = null;
    for(Future<NNeighbor> result : results) {
      if(result.get().getDist() < bestDistance) {
        bestDistance = result.get().getDist();
        bestNN = result.get();
      }
    }
    System.arraycopy(bestNN.getPlacesArray(), 0, order, 0, order.length);
  }
}
