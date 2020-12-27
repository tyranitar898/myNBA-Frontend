import "./App.css";
import {
  Button,
  Jumbotron,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <li key={number.name.toString()} className={"GMM" + number.class}>
      {/* {"Name: " + number.name + " | class:" + number.class} */}
      {number.name}
    </li>
  ));
  return <ul>{listItems}</ul>;
}

function App() {
  const [firstHalfData, setfirstHalfData] = useState([]);
  const [secondHalfData, setsecondHalfData] = useState([]);
  const [query, setQuery] = useState(20);
  document.title = "MyNBA";
  useEffect(() => {
    const proxyurl = "https://morning-wave-56117.herokuapp.com/";
    const url = "https://mynba-backend.herokuapp.com/GMMPred/" + query;
    fetch(proxyurl + url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let half = Math.ceil(data.length / 2);
        let firstHalf = data.splice(0, half);
        let secondHalf = data.splice(-half);
        setfirstHalfData(firstHalf);
        setsecondHalfData(secondHalf);
      })
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
  }, [query]);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">MyNBA</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#clustersPage">GMM Clusters</Nav.Link>
          <Nav.Link href="#outrightwinPage">Outright Win</Nav.Link>
          <Nav.Link href="#boxscorepredPage">
            Regression Boxscore Predict
          </Nav.Link>
        </Nav>
      </Navbar>
      <Jumbotron>
        <h1>Welcome to MyNBA!</h1>
        <p className="medHeader">
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
        <h4 className="medHeader">
          Positionless basketball. Rather than teaching players to excel in only
          one position, nowadays, many players are well versed on all the skills
          of all positions of the game. This creates unique players like{" "}
          <a href="https://theathletic.com/1610567/2020/02/15/even-among-all-star-peers-nikola-jokics-game-remains-a-fascination/">
            Nikola Jokic
          </a>{" "}
          who facilitate the Denver Nuggets offensivley through his elite
          passing and bigger frame. Using{" "}
          <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.12-gaussian-mixtures.html">
            Gaussian Mixture Modeling
          </a>{" "}
          and career RPG, APG, SPG, BPG and FG3MPG (* per game) as features, I
          attempt to capture these categories and label all current NBA players
          into{" "}
          <a href="https://scikit-learn.org/stable/modules/mixture.html">
            Clusters
          </a>
          . We can attach meaning to these clusters such as forwards and guards
          or more complex ones like high volume shooters or 3 and defence role
          players or passing bigs. Below each color represents a cluster.
        </h4>
      </Jumbotron>
      <Jumbotron>
        <Form>
          <Form.Group
            controlId="formBasicRange"
            onInput={(event) => {
              setQuery(event.target.value);
            }}
          >
            <Form.Label>
              <h4>{"Gaussian Mixture Modeling with " + query + " clusters."}</h4>
              <p>Slide to generate new clusters.</p>
            </Form.Label>
            <Form.Control min="2" max="30" defaultValue="20" type="range" />
          </Form.Group>
        </Form>
        <Container>
          <Row>
            <Col>
              <NumberList numbers={firstHalfData}></NumberList>
            </Col>
            <Col>
              <NumberList numbers={secondHalfData}></NumberList>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </>
  );
}

export default App;
