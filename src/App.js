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
    const url = "https://mynba-backend.herokuapp.com/GMMPred/17"; // site that doesn’t send Access-Control-*
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
          and explain NBA analysis using Machine Learning.
        </p>
        <p>
          <Button href="https://ryanchang.online" variant="primary">
            Reach Me
          </Button>
        </p>
      </Jumbotron>
      <NumberList numbers={data}></NumberList>
    </>
  );
}

export default App;
