import logo from "./logo.svg";
import "./App.css";
import { Button, Jumbotron, Navbar, Nav, ToastHeader } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <li key={number.name.toString()} className={"GMM" + number.class}>
      {"Name: " + number.name + " | class:" + number.class}
    </li>
  ));
  return <ul>{listItems}</ul>;
}

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const proxyurl = "https://morning-wave-56117.herokuapp.com/";
    const url = "https://mynba-backend.herokuapp.com/GMMPred/18"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
      .then((response) => {
        return response.json();
      })
      .then((data) => setData(data))
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
  }, []);
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">MyNBA</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#features">GMM Clusters</Nav.Link>
          <Nav.Link href="#pricing">Outright Win</Nav.Link>
          <Nav.Link href="#pricing">Regression Boxscore Predict</Nav.Link>
        </Nav>
      </Navbar>
      <Jumbotron>
        <h1>Welcome to MyNBA!</h1>
        <p>
          Advanced analytics gets thrown around all the time in the NBA. Man,
          WTF does that even mean!<br></br> On this app I attempt to demonstrate
          and dive deep into NBA "advanced analytics" using Machine Learning.
        </p>
        <p>
          <Button href="https://ryanchang.online" variant="primary">
            Reach Me
          </Button>
        </p>
      </Jumbotron>
      <Jumbotron>
        <h4>
          Using Gaussian Mixture Modeling and career RPG, APG, SPG, BPG and FG3MPG (* per game) and  I labeled all current NBA players
          into 18&nbsp;
          <a href="https://scikit-learn.org/stable/modules/mixture.html">
            Clusters
          </a>
          .We can attach meaning to these clusters such as Forwards and Guards
          or more complex ones like high volume shooters or 3 and defence role
          players or passing bigs. Below each color represents a cluster.
        </h4>
      </Jumbotron>

      <NumberList numbers={data}></NumberList>
    </>
  );
}

export default App;
