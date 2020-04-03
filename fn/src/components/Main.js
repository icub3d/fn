import React from "react";
import { Link } from "react-router-dom";

import { Card, Container, Jumbotron, CardColumns } from "react-bootstrap";

class Main extends React.Component {
  renderCards() {
    return this.props.functions.map((f) => {
      return (
        <Card key={f.title}>
          <Card.Body>
            <Card.Title>{f.title}</Card.Title>
            <Card.Text>{f.description}</Card.Text>
            <Link className="card-link" to={`/${f.title}`}>
              Go
            </Link>
          </Card.Body>
        </Card>
      );
    });
  }

  render() {
    return (
      <Container style={{ paddingTop: "10px" }}>
        <Jumbotron>
          <h1 className="display-4">Fn</h1>
          <p className="lead">A simple set of online functions</p>
          <hr className="my-4" />
          <p>
            I needed a place to store some simple functions that I use
            regularly. Here they are!
          </p>
        </Jumbotron>
        <CardColumns>{this.renderCards()}</CardColumns>
      </Container>
    );
  }
}

export default Main;
