import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">

        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Wrocław Museums</h1>

            <nav id="hamburger">
              <input type="checkbox" />
              
              <span></span>
              <span></span>
              <span></span>
              
              <div id="menu">
                <h2 id="list-title">best museums</h2>
                <svg class="line" xmlns="http://www.w3.org/2000/svg" height="3px">
                  <path class="path" d="M0 0 1200 0"/>
                </svg>
                <ul>
                  <li>Show me more</li>
                  <li>Show me more</li>
                  <li>Show me more</li>
                  <li>Show me more</li>
                  <li>Show me more</li>


                </ul>
              </div>
            </nav>
        
        </header>

        <main id="maincontent">

          <section className="search-bar" aria-label="search for museums">
            <form>
              <div className="search-input">
                <input 

                  type='text' 
                  placeholder='Search for museum' 
            
                />
              </div>
            </form>
          </section>
          
          <section className="map-container">
            <div id="map" aria-label="map of museums" role="application"></div>
          </section>


        </main>


      </div>
    );
  }
}

export default App;
