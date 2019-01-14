function toRadians(degreeAngle) {
  return degreeAngle * Math.PI / 180;
}

  function calculateDistance(point1, point2) {
  var point1Rad = [toRadians(point1[0]),toRadians(point1[1])];
  var point2Rad = [toRadians(point2[0]),toRadians(point2[1])];

  var deltaX = Math.cos(point2Rad[0]) * Math.cos(point2Rad[1]) - Math.cos(point1Rad[0]) * Math.cos(point1Rad[1]);
  var deltaY = Math.cos(point2Rad[0]) * Math.sin(point2Rad[1]) - Math.cos(point1Rad[0]) * Math.sin(point1Rad[1]);
  var deltaZ = Math.sin(point2Rad[0]) - Math.sin(point1Rad[0]);

  var chordLength = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) + Math.pow(deltaZ, 2));

  var centralAngle = 2 * Math.asin(chordLength / 2);

  var distanceMiles = 3958.7613 * centralAngle;
  var distanceKilometers = 6371.0088 * centralAngle;

  return [Math.round(distanceMiles), Math.round(distanceKilometers)];
}
