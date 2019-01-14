# Sprint 2 - t02 - Bravo Coders

## Goal

### A mobile, responsive map and itinerary!
### Sprint Leader: Sean Thunquest

## Definition of Done

* Release is demo ready.
* Sprint Review and Restrospectives completed
* Product Increment release `v2.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the arhived files.
* Version in pom.xml should be `<version>2.0.0</version>`.
* Unit tests for feature merges
* Clean continous integration build/test on master branch
* Majority of Plan completed, possiby more.

## Policies

* Code adheres to Google style guides for Java and JavaScript.
* Tests and Javadoc are written before/with code.
* All pull requests include tests for the added or modified code.
* Merges to master require 2 reviews, merges to development branches require 1
* Master is never broken.  If broken, it is fixed immediately.
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* Continuous integration successfully builds and tests pull requests for master branch always.
* All commits with more than 1 line of change include a task/issue number.
* All Java dependencies in pom.xml.

## Plan

Epics planned for this release.

* #98 Build a responsive mobile first web application 
* #99 Plan Trips in the state of Colorado
* #77 From a File (TFFI)
* #100 Show an itinerary of the round Trip
* #81 Save the Trip
* #103 Select Miles/Kilometers
* #101 Show a map of the round trip

*Include a discussion of planning decisions made based on your velocity from previous sprints.*

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  48   | 47 
Story Points |  57  | 57 

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
*date* | *@task only* | *@task only* | none
 2/1|- |Layout, Local, TFFI_Epic | none
 2/8|coords->decimal, Bound2CO|Distance list, distance calculator, client TFFI load, Server Validation|What do we do if a test is bad in list?
 2/11| mi/km, leg accumulation, TFFI load|Itinerary building, svgDraw| Intellij learning curve
 2/13|validation, itinerary|svg map calculator| We need to split up the SVG map portion into 2 tasks
 2/15|path drawing on SVG, reverseTrip| svg-COmap, calculator, dynamic itinerary|-
 2/18|Cumulative Distance, Dynamic Itinerary, reverseTrip|Validation TFFI, Flush state on Load, Starting location|Should Mi/Km update plan (delay UI/Plan)
 2/20|NearestNeighbor, Starting Location, bad TFFI Bouncer | JavaDoc, Deploy | -
 

## Review

#### Completed epics in Sprint Backlog 
* Server side calculation : #112 6 issues, 8 ep
* Show Itinerary of the round trip : #100 4 issues, 7 ep
* Show a map of the round trip : #101 2 issues, 5 ep
* Dynamic Itenerary : #86 3 issues, 6 ep
* Reverse Order of trip : #104 1 issue, 1 ep
* New Start Locations : #105 1 issue, 2 ep
* Shorter Trip : #90 3 issues, 6 ep

#### Incomplete epics in Sprint Backlog 
* Responsive Mobile First Application: #98 9/10 issues, 9/12 ep - This is still here because we kept assigning all the little love tweaks to it, so it never got a chance to close as the things grew and changed. We may need to be less vauge while still caputuring the spirit of Epics like this.


#### What went well
* We got a great head start.
* Zenhub went well as a process
* Development environments/cycles are becoming tuned and comfortable

#### Problems encountered and resolutions
* We went back and wrote documentation at the end. resolutions: be strict on code reviews, request they document or write tests to help you validate/test their code.
* Intellij on personal laptop VM, team time to power troubleshoot, fixed.

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we did change this time | Spend more time working together as a team as opposed to trying to bring all our separate parts together at the end. | Establish priorities early in the sprint and work on the common core/base first. | Work together to figure out the newer tools so we all are on a more similar level.
What we did well |  Bounce Ideas off Each other | Zenhub issue tracking  | port forwarding to run client on localhost
What we need to work on | communicating when we run into issues | Documentation as we write  | possible code linter
What we will change next time | Extra optional weekly worktime meetup (for development rather than planning) | Stop using shadow master  | Comparing our tests with other groups via Kiwi
