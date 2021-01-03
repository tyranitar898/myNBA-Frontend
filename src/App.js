import "./App.css";
import {
  Navbar,
  Nav,
} from "react-bootstrap";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Home from "./routes/Home"
import BoxSPP from "./routes/BoxScorePredPage"

// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe


function App() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">MyNBA</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/gmmclusters">GMM Clusters</Nav.Link>
          <Nav.Link href="/outrightwinPage">Outright Win</Nav.Link>
          <Nav.Link href="/boxscorepredPage">
            Regression Boxscore Predict
          </Nav.Link>
        </Nav>
      </Navbar>
      
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/boxscorepredPage" component={BoxSPP} />
        </Switch>
        
      </Router>
      
    </div>
    
  );
}

export default App;
