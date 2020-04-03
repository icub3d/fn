import React from "react";
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";

import Details from "../Details";

export default class Words extends React.Component {
  static definition = {
    title: "words",
    description: "Generate anagrams using subsets from a list of letters.",
    parameters: [
      {
        name: "letters",
        required: true,
        type: "string",
        description: "the set of letters (no spaces or separators)",
      },
      {
        name: "min",
        required: true,
        type: "int",
        description:
          "minimum word size (e.g. 3 will only produce 3+ letter words)",
      },
    ],
  };

  state = { min: 3, letters: "", words: null, validated: false };

  changed(value) {
    return (e) => {
      this.setState({ [value]: e.target.value });
    };
  }

  get = async () => {
    var url = new URL("/fn/words", window.location.origin);
    url.searchParams.append("letters", this.state.letters);
    url.searchParams.append("min", this.state.min);

    const response = await fetch(url);
    const data = await response.json();
    this.setState({ words: data });
  };

  renderWords = () => {
    if (this.state.words === null) return null;
    let left = [];
    let right = [];

    this.state.words.forEach((e) =>
      left.length > right.length ? right.push(e) : left.push(e)
    );

    return (
      <Row>
        <Col>
          <ListGroup>
            {left.map((v) => (
              <ListGroup.Item key={v}>{v}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <ListGroup>
            {right.map((v) => (
              <ListGroup.Item key={v}>{v}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    );
  };

  handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.setState({ validated: true });
      this.get();
    }
  };

  render() {
    return (
      <Container>
        <Details
          path={`/fn/${Words.definition.title}`}
          title={Words.definition.title}
          description={Words.definition.description}
          parameters={Words.definition.parameters}
        />
        <Row>
          <Col>
            <Form
              onSubmit={this.handleSubmit}
              noValidate
              validated={this.state.validated}
            >
              <input type="submit" style={{ display: "none" }} />

              <Form.Group controlId="letters">
                <Form.Label>letters</Form.Label>
                <Form.Control
                  required
                  minLength="3"
                  type="text"
                  placeholder="letters"
                  value={this.state.letters}
                  onChange={this.changed("letters")}
                />
                <Form.Control.Feedback type="invalid">
                  Please input at least 3 letters.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="min">
                <Form.Label>min</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.min}
                  onChange={this.changed("min")}
                >
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {this.renderWords()}
      </Container>
    );
  }
}
