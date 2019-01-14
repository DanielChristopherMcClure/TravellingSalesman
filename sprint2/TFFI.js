/*
* Takes a JSON object and checks if it is valid TFFI
* A TFFI object must have: type, title, options, places, distances and map
*/
function validateTFFI(json) {
  return json.type != null && json.title != null && json.options && json.places
  && json.distances != null && json.map != null;
}
