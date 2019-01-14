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
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestCoordinate {
  @Test
  public void testColoradoBorderNorth() {
    try {
      assertEquals(41.0, Coordinate.coordinateStringToDecimal("41"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }
  @Test
  public void testColoradoBorderNorth2() {
    try {
      assertEquals(41.0, Coordinate.coordinateStringToDecimal("41N"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }
  @Test
  public void testColoradoBorderSouth() {
    try {
      assertEquals(37.0, Coordinate.coordinateStringToDecimal("37°  N"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }
  @Test
  public void testColoradoBorderEast() {
    try {
      assertEquals(-102.05, Coordinate.coordinateStringToDecimal("102° 03' W"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }
  @Test
  public void testColoradoBorderWest() {
    try {
      assertEquals(-109.05, Coordinate.coordinateStringToDecimal("109° 03' 0\" W"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }
  @Test
  public void testGenericInteger() {
    try {
      assertEquals(12, Coordinate.coordinateStringToDecimal("12"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }
  @Test
  public void testGenericDecimal() {
    try {
      assertEquals(12.3, Coordinate.coordinateStringToDecimal("12.3"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }
  @Test
  public void testGenericNegative() {
    try{
      assertEquals(-12.3, Coordinate.coordinateStringToDecimal("-12.3"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }
  @Test
  public void testGenericNegativeS() {
    try{
      assertEquals(-12.3, Coordinate.coordinateStringToDecimal("12.3s"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }
  @Test
  public void testGenericDoubleNegative() {
    try{
      assertEquals(12.3, Coordinate.coordinateStringToDecimal("-12.3S"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }
  @Test
  public void testMultipleType() {
    try{
      assertEquals(43.6969388889,Coordinate.latitudeStringToDecimal("43d41’48.98\"N"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }
  @Test
  public void testAmbiguousPositiveCoords() {
    try{
      assertEquals(43.6969388889,Coordinate.latitudeStringToDecimal("43d41’48.98\"T"), 0.0001);
    } catch (IOException e) {
      assert(true == false);
    }
  }
  @Test
  public void testDenverLat() {
    try{
      assertEquals(39.7392,Coordinate.latitudeStringToDecimal("39.7392° N"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }
  @Test
  public void testDenverLong() {
    try{
      assertEquals(-104.9903,Coordinate.longitudeStringToDecimal("104.9903° W"), 0.0001);
    } catch (IOException e) {
      assert(false == true);
    }
  }


  @Test
  public void testLatOutsideBounds() {
    try{
      assertEquals(10000.0,Coordinate.latitudeStringToDecimal("91° N"), 0.0001);
    } catch (IOException e) {
      System.out.println(e);
      assert(true == true);
    }
  }
  @Test
  public void testLongOutsideBounds() {
    try{
      assertEquals(10000.0,Coordinate.longitudeStringToDecimal("-190"), 0.0001);
    } catch (IOException e) {
      System.out.println(e);
      assert(true == true);
    }
  }
}
