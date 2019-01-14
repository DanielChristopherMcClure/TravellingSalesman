package com.tripco.t02.planner;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *  This class is a static class contains the functions
 *to convert a coordinate in the form of a string to a double.
 *
 *  @author   Joseph-Jonathan Salzano & Sean Thunquest
 *  @version  1.2
 */
public final class Coordinate {
  public static final String pattern = getPattern("nNeEsSwW");
  public static final Pattern myPattern = Pattern.compile(pattern);
  
  private Coordinate(){}

/**
 * This is a call that will convert any valid coordinate
 *String to a decimal but does not check for valid latitude vs longitude
 * or for bounds on the angle.
 *
 * @param   coordinate  The string form of the coordinate that should be converted to a decimal.
 * @return              The coordinate in the form of a decimal.
 * @throws  IOException If the coordinate is invalid the IOException will be caught and rethrown.
 * @see     Coordinate
 */
  public static Double coordinateStringToDecimal(String coordinate) throws IOException {
    try {
      return coordinateStringToDecimal(coordinate, "nNeE", "sSwW");
    } catch(IOException e) {
      throw e;
    }
  }

/**
 * This is a call that will convert a latitude String to a decimal.
 * If the decimal value gotten from the generic call is
 * outside the range of valid latitude points it will throw an exception
 *
 * @param   coordinate  The string form of the coordinate that should be converted to a decimal.
 * @return              The coordinate in the form of a decimal.
 * @throws  IOException If the coordinate is invalid the IOException will be caught and rethrown.
 * @see     Coordinate
 */
  public static Double latitudeStringToDecimal(String coordinate) throws IOException {
    try {
      Double latitude = coordinateStringToDecimal(coordinate, "nN", "sS");
      if(latitude > 90.0 || latitude < -90.0) {
        throw new IOException("Coordinates outside of [-90,90]");
      }
      return latitude;
    } catch(IOException e) {
      throw e;
    }
  }

/**
 * This is a call that will convert a longitude String to a decimal.
 * If the decimal value gotten from the generic call is
 * outside the range of valid longitude points it will throw an exception
 *
 * @param   coordinate  The string form of the coordinate that should be converted to a decimal.
 * @return              The coordinate in the form of a decimal.
 * @throws  IOException If the coordinate is invalid the IOException will be caught and rethrown.
 * @see     Coordinate
 */
  public static Double longitudeStringToDecimal(String coordinate) throws IOException {
    try {
      Double longitude = coordinateStringToDecimal(coordinate, "eE", "wW");
      if(longitude > 180.0 || longitude < -180.0) {
        throw new IOException("Coordinates outside of [-180,180]");
      }
      return longitude;
    } catch(IOException e) {
      throw e;
    }
  }

/**
 * Takes a string of accepted directions  (ie: nNsS or eEwW) and
 * compiles a pattern to use for matching coordiantes.
 *
 * @param   directions  The string form of the letters that will signify directions nNsS or eEwW
 * @return              The pattern used to match coordinates.
 */
  private static String getPattern(String directions){
    String number = "[\\d]+(?:[.][\\d]+)?";
    String pattern = "-?(?:("
        +number
        +")\\s*(?:[^\\d'.\"\\s"+directions+"])?\\s*)(?:("
        +number
        +")\\s*(?:[^\\d\".\\s"+directions+"])\\s*)?(?:("
        +number
        +")\\s*(?:[^\\d'.\\s"+directions+"])\\s*)?"
        +"(["
        +directions
        +"])?";
    return pattern;
  }

/**
 * Takes a coordinate in the form of a string and Detirmines if it should be Negative.
 *
 * @param   matches  The matches, so matches.group(4) is of interest for negatives
 * @param   negativeDirections a string signifiying which letters trigger a negative inversion.
 * @param   coordinate a String that is the raw coordinate provided to find if it has a "-"
 * @return              Boolean, True if decimal coordinate should be negative, false otherwise.
 * @see     Coordinate
 */
  private static boolean isNegative(Matcher matches, String negativeDirections, String coordinate){
    boolean negative = false;
    if(coordinate.charAt(0) == '-'){
      negative = true;
    }
    if(negDirection(matches.group(4), negativeDirections)){
      negative = !negative;
    }
    return negative;
  }

/**
 * Takes a coordinate and returns true if it is a negative direction sSwW.
 *
 * @param   match  String to check for negative directions
 * @param   negativeDirections  The directions to check for.
 * @return              true or false if is in the negative Direction or not.
 */
  private static boolean negDirection(String match, String negativeDirections){
    boolean negative = false;
    String negDirPattern = ".*["+negativeDirections+"]{1}.*";
    if(match == null){
      negative = false;
    }else if(match.matches(negDirPattern)){
      negative = true;
    }
    return negative;
  }

/**
  * Takes a coordinate in the form of a string and runs validation as well as
  * parsing on it to build a decimal value that is the degrees form of a coordinate.
  *
  * @param   coordinate  The string form of the coordinate that should be converted to a decimal.
  * @param   positiveDirections string to indicate a positive latitude or longitude, such as N/E
  * @param   negativeDirections  stringto indicate a negative latitude or longitude, such as S/W
  * @return              The coordinate in the form of a decimal.
  * @throws  IOException If coordinate is not available or invalid the IOException will be thrown
  * @see     Coordinate
  */
  public static Double coordinateStringToDecimal(String coordinate, String positiveDirections, String negativeDirections) throws IOException {
    if(coordinate == null){
      throw new IOException("Coordinate is null");
    }
    Matcher matches = myPattern.matcher(coordinate);
    Double result = null;
    if(matches.find()){
      if(matches.groupCount() == 4){
        result = Double.parseDouble(matches.group(1))
        + (Double.parseDouble((matches.group(2)!=null)?matches.group(2):"0")/60.0)
        + (Double.parseDouble((matches.group(3)!=null)?matches.group(3):"0")/3600.0);
        if(isNegative(matches, negativeDirections, coordinate)){
          result *= -1.0;
        }
      }
    } else {
      throw new IOException("Could not find a coordinate in : "+coordinate);
    }
    return result;
  }
}
