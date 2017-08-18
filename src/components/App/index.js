import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from "../Header";
import PayButton from "../PayButton";
import ProductList from "../ProductList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="container">
          <ProductList/>
        </div>
      </div>
    );
  }
}

export default App;
