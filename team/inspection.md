# Inspection - Team *T02*

Inspection | Details
----- | -----
Subject | *ThreeOpt.java, entire ThreeOpt Class* master branch (uncomment final cases)
Meeting | *04/24/2018, 1530, CS314 In Class and our table after class tell 6pm
Checklist | http://users.csc.calpoly.edu/~jdalbey/301/Forms/CodeReviewChecklistJava.pdf

### Roles
Name | Role | Preparation Time
---- | ---- | ----
Sean Thunquest | Moderator | 12:30pm-1:20pm
Joseph Salzano | Tester | 10pm-11pm
Dan McClure | Tester | 4pm-5pm
John Carter | Tester | 4:30pm-6:00pm (R)

### Log
file:line | defect | h/m/l | who found | github#
--- | --- |:---:|:---:| ---
ThreeOpt.java:8 | Array allocated larger then ever needed | l | Salzano | 410
ThreeOpt.java:13 | should be less than n-1 because n is places.length+1 | h | Salzano | 410
ThreeOpt.java:14 | should be less than n because n is places.length+1 | h | Salzano | 410
ThreeOpt.java:15 | should be less than or equal to n because n is places.length+1, k+1 should be equal to places.length+1| h | Salzano | 410
ThreeOpt.java:161 | If parameters are passed correctly no need for checking which chunk is first | m | Salzano |
ThreeOpt.java:164 | This seems like it will go to far. If starting at yStart and going the length of x then we will go past the end of y. | h | Salzano |411
ThreeOpt.java:198 | It seems that this needs to allow for k+1 to be back to 0 so maybe the mod is needed here. | h | Salzano | 412
ThreeOpt.java:162,167,187,194 | These Should all have the same edge cases, but differ by 1| h | sgthun|412
ThreeOpt.java:8 | Buffer still oversized to compensate for off by one error in chunk-swap| h | sgthun |412/411
ThreeOpt.java:164 | This seems like it will go to far. If starting at yStart and going the length of x then we will go past the end of y. | h | Salzano |
ThreeOpt.java:198 | It seems that this needs to allow for k+1 to be back to 0 so maybe the mod is needed here. | h | Salzano |
ThreeOpt.java:162,167,187,194 | These Should all have the same edge cases, but differ by 1| ? | sgthun|
ThreeOpt.java:8 | Buffer still oversized to compensate for off by one error in chunk-swap| ? | sgthun |
ThreeOpt.java:152,156,162,167,176,181,194 | Confused why for loops use "<=" instead of "<", Seems indexing could be wrong | h | mcclured
ThreeOpt.java:27,28 | Case 7 should only swap, without reversals | m | jbcartercsu |
ThreeOpt.java:20 | Edit comment to reflect the change in code implementation | l | jbcartercsu 
