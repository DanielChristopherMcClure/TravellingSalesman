import React, {Component} from 'react';
import Header from './Header';
import Application from './Application';
import Footer from './Footer';
import { CookiesProvider } from 'react-cookie';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      number: "02",
      name: "Bravo Coders"
    }
  }

  render() {
    return(
        <div id="tripco">
            <Header number={this.state.number} name={this.state.name}/>
            <CookiesProvider><Application /></CookiesProvider>
            <Footer number={this.state.number} name={this.state.name}/>
        </div>
    );
  }
}

export default App;
