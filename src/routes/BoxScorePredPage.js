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
function BoxScorePred() {
    return (
    <Jumbotron>
        <h1>Box Score Prediction!</h1>
        <p className="medHeader">
          Using regression to predict player box scores.
        </p>
        <p>
          <Button href="https://ryanchang.online" variant="primary">
            Reach Me
          </Button>
        </p>
    </Jumbotron>
    );
}
export default BoxScorePred;