import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './App.css';




import Navigation from "./components/Navigation";
import ItemList from "./components/ItemsList";
import CreateItem from "./components/CreateItem";
import Contact from "./components/Contact";


function App() {
  return (
    
    <Router>
      <Navigation />


      <div className="container-lg p-2">
        <Route path="/" exact component={ItemList} />
        <Route path="/edit/:id" component={CreateItem} />
        <Route path="/create" component={CreateItem} />
        <Route path="/contact" component={Contact} />
      </div>

    </Router>
  );
}

export default App;
