package com.tripco.t02.query;

public class Filter {
    public String attribute;
    public String[] values;

    /**
     * Filter Constructor builds a filter used to filter querys.
     *
     * @param attrib    Attribute.
     * @param vals      Values.
     */
    public Filter(String attrib, String[] vals) {
        this.attribute = attrib;
        this.values = vals;
    }

    /**
    * Filter Constructor that uses database to select values.
    *
    * @param attrib    Attribute.
    */
    public Filter(String attrib) {
        this.attribute = attrib;
        this.values = DataBaseSearch.buildFilterValue(findFilterColumn(attrib));
    }

    /**
    * Find the column name to filter by from the user friendly name given.
    *
    * @param name    User friendly name
    * @return the column name
    */
    public static String findFilterColumn(String name){
      String column = null;
      switch (name.toLowerCase()) {
          case "type": column = "airports.type";
              break;
          case "municipality": column = "airports.municipality";
              break;
          case "region": column = "region.name";
              break;
          case "country": column = "country.name";
              break;
          case "continent": column = "continents.name";
              break;
          default: column = null;
      }
      return column;
    }
}
