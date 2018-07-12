import React, { Component } from 'react';
import Map from './Map';
import Footer from './Footer';
import logo from './logo.svg';
import './App.css';
import museums from './museums.json';


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
                <svg className="line" xmlns="http://www.w3.org/2000/svg" height="3px">
                  <path class="path" d="M0 0 1200 0"/>
                </svg>
                <ul
                  aria-label = 'List of museums'>
                  {museums.map( location =>
                    <li 
                      data-key={location.id} 
                      key={location.id} 
                      role="button">
                      {location.name} 
                    </li>
                  )}

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
          
          <Map/>


        </main>

        <Footer/>
      </div>
    );
  }
}

export default App;
