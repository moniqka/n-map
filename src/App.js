import React, { Component } from 'react';
import Map from './Map';
import LocationList from './LocationList'
import Footer from './Footer';
import logo from './logo.svg';
import './App.css';
import museums from './museums.json';
import escapeRegExp from 'escape-string-regexp';

class App extends Component {
  state = {
    query: '',
    selectedMuseum: ''  
  }  
  // Set state to typed value in search input
  filterLocations = (value) => {
    this.setState({query: value})
  }

  // Set state to location selected on the list
  selectMuseum = (value) => {
    this.setState({selectedMuseum: value});
  }

  // Clears selected location on saearch input change
  updateState = (query) => {
    this.setState({selectedMuseum: ''});
  }

  render() {
    let filteredLocations
    if (this.state.query) {
      // Filter searched locations
      const match = new RegExp(escapeRegExp(this.state.query),'i')
      filteredLocations = museums.filter((location)=> match.test(location.name))
  } else {
      filteredLocations = museums
  }

    return (
      <div className="app">

        <header className="app-header">
          <img src={logo} className="app-logo" alt="museum icon - logo" tabIndex="0"/>
          <h1 className="app-title" tabIndex="0">Wrocław Museums</h1>
          <nav id="hamburger">
            <input type="checkbox" role="button" aria-label="Hamburger menu"/>
            
            <span></span>
            <span></span>
            <span></span>
            
            <div id="menu">
              <LocationList
                selectMuseum={this.selectMuseum}  
                filteredLocations={filteredLocations}
                query={this.state.query}
              />
            </div>
          </nav>
        </header>

        <main id="maincontent">

          <section className="search-bar" tabIndex="0" aria-label="search for museums">
            <form>
              <div className="search-input">
                <input 
                  type='text' 
                  placeholder='Search for museum' 
                  value={this.props.query}
                  onChange={(event)=> {this.filterLocations(event.target.value); this.updateState(event.target.value);}}
                />
              </div>
            </form>
          </section>
          
          <Map
            filteredLocations={filteredLocations}
            selectedMuseum={this.state.selectedMuseum}
          />
        </main>

        <Footer/>

      </div>
    );
  }
}

export default App;
