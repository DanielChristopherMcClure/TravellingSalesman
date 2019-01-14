package com.tripco.t02.planner;

import com.tripco.t02.query.Filter;

/**
 * Config is the object containing configuration settings.
 * Is returned by a REST api call: GET /config.
 *
 * @Contains    type, version, optimizations
 **/
public class Config {
    public String type = "config";
    public int version = 4;
    public int optimization = 3;
    public String[] units =
            new String[]{"miles","kilometers","nautical miles","user defined"};
    public String[] maps = new String[]{"svg","kml"};
    public Optimizations[] optimizations;
    public Filter[] filters = new Filter[] {
            new Filter("Type"), new Filter("Region"),
            new Filter("Country"), new Filter("Continent")
    };

    /**
     * Config constructor.
     * Initializes Optimizations.
     * Initializes Filters. (dummy value currently).
     */
    public Config() {
        //These are our legal optimizations
        this.optimizations = new Optimizations[this.optimization];
        this.optimizations[0] =
                new Optimizations(
                        "Some",
                        "Nearest Neighbor starts from each starting location"
                                +" and always chooses the next closes location.");
        this.optimizations[1] =
                new Optimizations(
                        "More", "2-Opt improves nearest neighbor with local optimizations"
                        +" of 4 node swaps.");
        this.optimizations[2] =
                new Optimizations(
                        "Most", "3-Opt improves nearest neighbor with local optimizations"
                        +" of 6 node swaps.");
    }
}
