package com.tripco.t02.server;

import spark.Service;

@FunctionalInterface
public interface ServiceInitializer {

    void init(Service service);

}
