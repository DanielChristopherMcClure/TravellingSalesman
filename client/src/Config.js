import React, {Component} from 'react';
/*
 * Makes a call to the REST api: GET /config
 * returns config object from server, containing optimization levels
 */
class Config extends Component {
  constructor(props) {
    super(props);

    this.config = this.config.bind(this);
  }

  /* Sends a request to the server to gain the config for levels
   * of optimizations available
   */
  fetchResponse(){
    return fetch('http://' + global.serverHost + '/config', {
        method: "GET",
        header: {'Access-Control-Allow-Origin':'*'}
    });
  }
  /*
   * Function that retrieves the config object via the REST api
   * Used for finding levels of optimization
  */
  async config(callback){
    try {
      let serverResponse = await this.fetchResponse();
      if (serverResponse.status == 200) {
        let results = await serverResponse.json();
        callback(results);
      } else {
        let errorText = await serverResponse.text();
        alert("Error Getting Config From Server:\n" + errorText);
      }
    } catch(err) {
      console.error(err);
    }
  }
}

export default Config;
