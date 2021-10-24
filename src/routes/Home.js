import "../App.css";
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
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
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

const similarPlayers = (playername,players) => {
  
  let matchingplayers = players.filter((player) => {return player.name.toLowerCase().includes(playername.toLowerCase())})
  let matchingplayercat = -1;
  let matchingplayername = "";
  if (matchingplayers.length === 1){
    matchingplayercat = matchingplayers[0].class
    matchingplayername = matchingplayers[0].name
  }
  let similarplayers = players.filter((player) => {return player.class === matchingplayercat})
  if (!similarplayers.length || similarplayers !== undefined){
    return {similarplayers,matchingplayername}
  }
  
}

function Home() {
  const [firstHalfData, setfirstHalfData] = useState([]);
  const [secondHalfData, setsecondHalfData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [query, setQuery] = useState(20);
  const [playerNameQuery, setPlayerNameQuery] = useState("Stephen Curry");
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
        setAllData(firstHalf.concat(secondHalf));
      })
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
  }, [query]);
  
  const {similarplayers,matchingplayername} = similarPlayers(playerNameQuery,allData)
  
  return (
    <>
      
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
          . We can attach meaning to these clusters such as forwards or guards
          or more complex ones like high volume shooters or 3s and defence
          players or passing big men. Below each color represents a cluster.
        </h4>
      </Jumbotron>
      <Jumbotron>
        <Container>
            <Row>
              <Col>
              <h3>Search for similar players</h3>
              <p></p>
              <Form.Control
                className="mb-3"
                vaue={playerNameQuery}
                onInput={e => setPlayerNameQuery(e.target.value)}
                placeholder={playerNameQuery ? playerNameQuery : "Enter a player name"}
                />
              <Form.Text className="text-muted">
                try your favourite player
              </Form.Text>
              
              </Col>
              <Col>
                <h4>{"Found: "+ matchingplayername}</h4>
                <NumberList numbers={similarplayers}></NumberList>
              </Col>
            </Row>
          </Container>
        
      </Jumbotron>

      <Jumbotron>
        <h3>{"Similar players grouped by color"}</h3>
        <h6 color={"grey"}>{"\"Similarity\" generated with Gaussian Mixture Modeling with " + query + " clusters."}</h6>
        <Form>
          <Form.Group
            controlId="formBasicRange"
            onInput={(event) => {
              setQuery(event.target.value);
            }}
          >
            
            <Form.Label>
              
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

export default Home;
