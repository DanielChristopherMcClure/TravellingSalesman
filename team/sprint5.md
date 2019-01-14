# Sprint 5 - *02* - *Bravo Coders*

## Goal

### Faster and Shorter Trips!
### Sprint Leader: *Joseph-Jonathan Salzano*

## Definition of Done

* Web application deployed on the production server (kiwis.cs.colostate.edu).
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v5.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the archived files.
* Version in pom.xml should be `<version>5.0</version>`.
* Javadoc and unit tests for public methods.
* Tests for database and REST APIs.
* Coverage at least 50% overall and for each class.

## Policies

* Code adheres to Google style guides for Java and JavaScript.
* Tests and Javadoc are written before/with code.  
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* Continuous integration successfully builds and tests pull requests for master branch always.
* All commits with more than 1 line of change include a task/issue number.
* All Java dependencies in pom.xml.

## Plan

Epics planned for this release.

* *#348 TFFI Updates*
* *#349 Interop*
* *#203 Shorter Trips #3*
* *#350 Staff Page*
* *#199 Save my Options as Default for Future Use*
* *#276 System Testing*
* *#200 View Trip in Other Tools*
* *#351 Improve the User Experience*
* *#204 Speed up the Computation on the Servers*
* *#98 Build a Responsive, Mobile First Web Application*

*We feel like we have had a steady velocity the last 4 sprints and have completed all of the TripCo Backlog Epics except for the error one, but that one is almost all the way finished. So we only decided to work on the Epics in the TripCo "In Progress" pipeline. We feel confident about our ability to complete all these epics this Sprint.*

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  *28*   | *43*
Story Points |  *44*  | *49*

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments
:--- | :--- | :--- | :---
*4/15* | *Sprint 5 Planning* | *Add Limit to Query TFFI, User Query TFFI to Set Limit on DB Query* | none
*4/17* | *Add Limit to Query TFFI, User Query TFFI to Set Limit on DB Query, Set Query TFFI Limit on Client* | *Interop tasks, 3-opt Design, 3-opt Implementation, 3-opt option on client, Staff page base* | Interop testing needing new headers on all servers.
*4/19* | *Interop tasks, 3-opt Design, 3-opt option on client, Staff page base, 3-opt integrate with NN, Load/Save options as cookies, Add support for cookies, Default options, overwrite cookies with file* | *Reset filters with new config, Create Server API Tests, Mock Client, 3-opt Implementation, TFFI v3 to v4, Staff Page Content* | Dan at climbing competition this weekend so we are 1 short.
*4/22* | *Reset filters with new config, Create Server API Tests, Mock Client, Tags on Optimization Slider* | *Create Client API Tests, 3-opt Implementation, TFFI v3 to v4, Staff Page Content* | Busy weekend and hard to find any good Jest examples for Reactjs.
*4/24* | *User Friendly Map Labels, Blank Search Queries Everything, Optimizations fix* | *Download kml as file, 3-opt Implementation, TFFI v3 to v4, Staff Page Content, Multiple 3-opt fixes from inspection* | Hit a wall on Jest testing, 3-opt bug.
*4/26* | *Multiple 3-opt fixes from inspection, 3-opt Implementation, Download kml as file* | *TFFI v3 to v4, Staff Page Content, Parallelize NN From Every City* | Other classes have term projects and end of semester things due.
*4/28* | *TFFI v3 to v4, Staff Page Content, Parallelize NN From Every City* | *Checkbox to Append trip on File Load, Button to quickly return to Plan from itinerary* | Team busy with other classes.
*5/1* | *Checkbox to Append trip on File Load, Button to quickly return to Plan from itinerary, Move download Map Button for smaller screens, Various layout tweaks, Various branding tweaks* | *Deploying Release* | Running out of time for this semester.

## Review

#### Completed epics in Sprint Backlog
* *#348 TFFI Updates*
* *#349 Interop*
* *#203 Shorter Trips #3*
* *#350 Staff Page*
* *#199 Save my Options as Default for Future Use*
* *#200 View Trip in Other Tools*
* *#351 Improve the User Experience*
* *#204 Speed up the Computation on the Servers*
* *#98 Build a Responsive, Mobile First Web Application*

#### Incomplete epics in Sprint Backlog
* *#276 System Testing*:  *We had already tested everything without Jest and when we got to Jest testing it felt counter productive to test against already tested functionality.*

#### What went well
* *We got a release made. We got the large epics completed and were able to give the costumers a usable product.*

#### Problems encountered and resolutions
* *We had a problem with System Testing. We had not started Jest early enough and by the time we got to it we had more pressing classes and tasks to work on.*

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | Ask questions sooner | Add tests to insure interoperability | Make use of Jest
What we did well | We spread work around better and were able to have a smoother last few days. | Burn down chart had steady decrease, we had small enough tasks and planned our work very well. | We got most our new tools learned and integrated.
What we need to work on | Working at the same time on the sprint work. | We need to keep on top of pull requests. | We need to learn about and implement Jest.
What we will change next time | Work more constantly. | Don't let pull requests go stale. | Improve our deeper knowledge of tools.
