# Sprint 3 - t02 - Bravo Coders

## Goal

### Shorter trips and more places to go!
### Sprint Leader: Daniel McClure

## Definition of Done

* Web application deployed on the production server (kiwis.cs.colostate.edu).
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v3.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the arhived files.
* Version in pom.xml should be `<version>3.0</version>`.
* Javadoc and unit tests for public methods.
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

* Building Trip From Scratch #180
* 2opt Optimization #185
* Clean code according to Code Climate #187
* Whitebox testing #189

*Because we finished a good amount of this sprint, last sprint, we have decided to focus first on the functionality of the page by adding the new features such as Building trip from scratch and 2opt optimization, before we focus on the smaller addons we can include in our release. This estimated should take around 23 Story Points, and then we have a remaining 49 story points in the Icebox (Roughly)*

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  15   | 15 
Story Points |  23  |  23

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
*date* | *@task only* | *@task only* | none
 2/27|Fix options.js, Fix TFFI, REST apit for searching|Cleanup code, NN for every city, 2opt, TFFI2, Build from scratch| none
 2/28|Clean Cartographer.java|Cleanup code, NN for every city, 2opt, TFFI2, Build from scratch| none
 3/2|Precompute Distances|Cleanup code, NN for every city, 2opt, TFFI2, Build from scratch| none
 3/2|NN Fixed|Cleanup code, 2opt, TFFI2, Build from scratch| none
 3/12|Updated TFFI to v2|Cleanup code, 2opt, Build from scratch| none
 3/12|Database search and selection table|Cleanup code, 2opt|none
 3/14|Touch up planning table|Cleanup code, 2opt|none
 3/18|Insert new destinations into trip|Cleanup code, 2opt|none
 3/18|Implement 2opt Optimization|Cleanup code|none
 3/19|Error Handling Client Side|none
 3/20|Cleanup code|none|none
 
 

## Review

#### Completed epics in Sprint Backlog 
* Build/Edit the trip from scratch.
* Build a trip from existing information.

#### Incomplete epics in Sprint Backlog 
* Branding
* Rate and collect information about destinations
* Authenticate Users
* Save my options as deafault for future use
* Zoom and Pan the map

#### What went well
* Implementation of loading locations from server
* Implementation of adding custome locations
* 2opt optimization
* UI Slider to choose optimization
* Code Cleanup
* Test Coverage

#### Problems encountered and resolutions
* Synergizing TFFI file loading and Database location loading 

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | Start earlier and plan with more detail by being more specific on who does which tasks | We will assign each task to a person and assign an estimated amount of story points |  This will all be done on Zenhub
What we did well | We got started early and planned feasible tasks to finish before and after spring break | We planned as far ahead as we could at the beginning of the sprint and at the same time let our plan be open to change | Using Zenhub to add all the epics and issues 
What we need to work on | We should communicate what we have tested and what needs to be tested more often so that all members are familiar with the tests written even they did not write them | We need smaller chunks when partioning work, we tend to underestimate tasks at first. We want to split the tasks into very efficient peices | Zenhub/Github
What we will change next time | Continue learning how to work together well, continually strive to increase our ZenHub velocity | We will split tasks after we have become familiar with the task and what needs to be done | Google API
