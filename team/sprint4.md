# Sprint 4 - t02 - Bravo Coders

## Goal

### Worldwide!
### Sprint Leader: John Carter

## Definition of Done

* Web application deployed on the production server (kiwis.cs.colostate.edu).
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v4.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the archived files.
* Version in pom.xml should be `<version>4.0</version>`.
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

* #192 Distance units
* #274 Distance Unit Configuration
* #207 Shorter trips #2
* #202 Plan trips outside of Colorado
* #201 Zoom and Pan the map
* #275 Filtered Searches
* #276 System Testing
* #194 Branding
* #196 Improve the user experience

Considering Sprint 3 was hindered by midterms and spring break, this sprint is expected to be more productive than the last.
A majority of the epics are expected to be completed unless Google Maps implementation gives rise to a large number of problems.

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  24   | *value* 
Story Points |  42  | *value* 

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
*date* | *@task only* | *@task only* | none
 3/25 | Sprint planning completed | Begin sprint | No one is familiar with Google Maps API
 3/27 | Updated NN and 2-Opt data structures | Optimize algorithms | TFFIv3 still undefined
 3/29 | Optimized NN and 2-Opt; Added "Select All" button; Removed CO bound checks | Implement draggable list; Upgrade to TFFIv3 | Scheduling conflicts
 4/1 | Map made worldwide; Added custom distance units to client | Implement new TFFI features; Correct 2-Opt behavior | Lists do not want to be dragged
 4/3 | KML support added; Created TFFIv3 config object | Properly render map wraparounds; TFFIv3 server upgrades | Late midterms
 4/5 | Map properly renders wrapparounds; Upgraded server to TFFIv3 | Incorporate filters for mass selection; Implement Google Maps | Additional scheduling conflicts
 4/8 | Implemented TFFIv3 searching; Display & select filters | Improve UI usability; Brand the page | Group unfamiliar with CSS
 4/10 | Updated layout; Incorporated CSU branding; Google Maps functionality added | Add TFFIv3 error object | Have to start winding down to prep for demo
 

## Review

#### Completed epics in Sprint Backlog 
* Distance units
* Distance Unit Configuration
* Shorter trips #2
* Plan trips outside of Colorado
* Zoom and Pan the map
* Filtered Searches
* Branding
* Improve the user experience

#### Incomplete epics in Sprint Backlog 
* System Testing— will be given high priority in the next sprint.

#### What went well
* Entered the sprint ahead and came out ahead.

#### Problems encountered and resolutions
* Draggable lists— feature pushed to next sprint.
* Storming on page branding & styling— "compromised."
* Coding from an ancient branch caused headaches— had to manually merge piecewise.

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | Continue learning how to work together well, continually strive to increase our ZenHub velocity | We will split tasks after we have become familiar with the task and what needs to be done | Google API
What we did well | Worked well as a team; communicated frequently and responsively | Broke the epics down into tasks well | Google Maps/API
What we need to work on | Encountered some trouble with a few tasks; should have sought help sooner | Need more input regarding UI ease-of-use (both to improve quality and reduce storming) | Lists will require a different implementation to make them draggable
What we will change next time | Ask questions sooner | Add tests to insure interoperability | Make use of Jest
