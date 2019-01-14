package com.tripco.t02.planner;

public class ThreeOpt {
    int[] buffer;
    int[] places;
    Distances table;
    public int threeOpt(int[] places, Distances table){
        this.places = places;
        this.table = table;
        int n = places.length;
        boolean improved = true;
        buffer = new int[n];
        int start = 0;
        int c7,c6,c5,c4,c3,c2,c1;
        while(improved) {
            improved = false;
            for (int i = 0; i < n - 2; i++) {
                for (int j = i + 1; j < n -1 ; j++) {
                    for (int k = j + 1; k < n; k++) {
                        int current = dist( i,i+1, j,j+1,k,k+1);
                        //case 7: reverse i+1,j and reverse j+1,k  ==>> and then swap{ (i+1,j) , (j+1,k)}
                        // d(i,j+1) + d(k, i+1) + d(j,k+1)
                        c7 = dist(i,j+1,k,i+1,j,k+1);
                        if (current > c7) {
                            //this.reversePath(places, i + 1, j);
                            //this.reversePath(places, j+1, k);
                            this.swapChunks(places, i + 1, j, j + 1, k);
                            improved = true;
                            start -= current - c7;
                            //System.out.println(": 7 - " + (current - c7));
                            continue;
                        }
                        //case 6: reverse i+1, j and then swap{ (i+1,j) , (j+1,k)}
                        c6 = dist(i,j+1,k,i+1,j,k+1);
                        if (current > c6) {
                            this.reversePath(places, i + 1, j);
                            this.swapChunks(places, i + 1, j, j + 1, k);
                            improved = true;
                            start -= current - c6;
                            //System.out.println(": 6 - " + (current - c6));
                            continue;
                        }
                        //case 5: reverse j+1, k and then swap{ (i+1,j) , (j+1,k)}
                        c5 = dist(i,k,j+1,i+1,j,k+1);
                        if (current > c5) {
                            this.reversePath(places, j + 1, k);
                            this.swapChunks(places, i + 1, j, j + 1, k);
                            improved = true;
                            start -= current - c5;
                            //System.out.println(": 5 - " + (current - c5));
                            continue;
                        }
                        //case 4: reverse i,j and j+1,k
                        c4 = dist(i,j,i+1,k,j+1,k+1);
                        if (current > c4) {
                            this.reversePath(places, i + 1, j);
                            this.reversePath(places, j + 1, k);
                            improved = true;
                            start -= current - c4;
                            //System.out.println(": 4 - " + (current - c5));
                            continue;
                        }
                        //case 3: reverse i+1 to k
                        c3 = dist(i,k,j,j+1,i+1,k+1);
                        if (current > c3) {
                            this.reversePath(places, i + 1, k);
                            improved = true;
                            start -= current - c3;
                            //System.out.println(": 3 - " + (current - c3));
                            continue;
                        }
                        //case 2: reverse j+1 to k
                        c2 = dist(i,i+1,j,k,j+1,k+1);
                        if (current > c2) {
                            this.reversePath(places, j + 1, k);
                            improved = true;
                            start -= current - c2;
                            //System.out.println(": 2 - " + (current - c2));
                            continue;
                        }
                        //case 1: reverse i+1 to j
                        c1 = dist(i,j,i+1,j+1,k,k+1);
                        if (current > c1) {
                            this.reversePath(places, i + 1, j);
                            start -= current - c1;
                            improved = true;
                            //System.out.println(": 1" + (current - c1));
                            continue;
                        }
                    }
                }
            }
        }

        return start;
    }

    /**
     * Computes the 3 distance legs being considered to swap using the table and places array.
     *
     * @param one i
     * @param two i+1
     * @param three j
     * @param four j+1
     * @param five k
     * @param six k+1
     * @return d(i,i+1) + d(j,j+1) + d(k,k+1)
     */
    private int dist(int one, int two, int three, int four, int five, int six){
        return table.getDistanceBetween(places[one], places[two])
                +table.getDistanceBetween(places[three], places[four])
                +table.getDistanceBetween(places[five], places[six%this.places.length]);

    }

    /**
     * Reverses the legs.
     */
    private void reversePath(int[] places, int placeOne, int placeTwo) {
        for(; placeOne < placeTwo; placeOne++, placeTwo--) {
            int temp = places[placeOne];
            places[placeOne] = places[placeTwo];
            places[placeTwo] = temp;
        }
    }

    /**
     * Swap the legs.
     *
     * Swaps the chunks of the places array defined by xStart-xEnd and yStart-yEnd.
     */
    public void swapChunks(int[] places, int xStart, int xEnd, int yStart, int yEnd){
        //place larger portion into buffer.
        int dx = (xStart > xEnd)?xStart-xEnd : xEnd-xStart;
        int dy = (yStart > yEnd)?yStart-yEnd : yEnd-yStart;
        if(dx > dy){
            //X range larger coppied to buffer first
            for(int xi = 0; xi+xStart <= xEnd; xi++){
                this.buffer[xi] = places[xStart+xi];
            }
            //Y range coppied second
            for(int yi = 0; yi <= dy; yi++){
                places[xStart+yi] = places[yStart+yi];
            }
            //buffer swapped in
            if(xStart < yStart){ // x comes first
                for(int bi = 0; bi<= dx; bi++){
                    places[(yEnd-dx + bi)%places.length] =  this.buffer[bi];
                }
            }else{ // x comes second
                for(int bi = 0; bi<= dx; bi++){
                    places[((yEnd-dx) + bi)%places.length] =  this.buffer[bi];
                }
            }

        }else{
            //Y range longer coppied to buffer first
            for(int yi = 0; yi+yStart <= yEnd; yi++){
                this.buffer[yi] = places[yStart+yi];
            }
            //X range coppied second
            for(int xi = 0; xi+xStart <= xEnd; xi++){
                places[(yEnd-dx) + xi] = places[xStart+xi];
            }
            //buffer swapped into
            if(yStart<xStart) {// y comes first
                for(int bi = 0; bi <= dy; bi++){
                    places[((xEnd-dy) + bi)%places.length] = this.buffer[bi];
                }
            }else{//y second
                for(int bi = 0; bi <= dy; bi++){
                    places[xStart + bi] = this.buffer[bi];
                }
            }
        }
    }
}
