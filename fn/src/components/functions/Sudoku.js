import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

import Details from "../Details";

export default class Sudoku extends React.Component {
  static definition = {
    title: "sudoku",
    description: "Solve a sudoku board.",
    parameters: [
      {
        name: "board",
        required: true,
        type: "string",
        description:
          "the numbers known on the board starting from top left. Use 0 for unknown",
      },
    ],
  };

  state = { board: "", solution: null, validated: false };

  changed(value) {
    return (e) => {
      this.setState({ [value]: e.target.value });
    };
  }

  get = async () => {
    var url = new URL("/fn/sudoku", window.location.origin);
    url.searchParams.append("board", this.state.board);

    const response = await fetch(url);
    const data = await response.json();
    this.setState({ solution: data });
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
          path={`/fn/${Sudoku.definition.title}`}
          title={Sudoku.definition.title}
          description={Sudoku.definition.description}
          parameters={Sudoku.definition.parameters}
        />
        <Row>
          <Col>
            <Form
              onSubmit={this.handleSubmit}
              noValidate
              validated={this.state.validated}
            >
              <input type="submit" style={{ display: "none" }} />

              <Form.Group controlId="board">
                <Form.Label>board</Form.Label>
                <Form.Control
                  required
                  minLength="81"
                  maxLength="81"
                  type="text"
                  placeholder="board"
                  value={this.state.board}
                  onChange={this.changed("board")}
                />
                <Form.Control.Feedback type="invalid">
                  Please input a board with 81 numbers.
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <code style={{ display: "block", whiteSpace: "pre-wrap" }}>
          {this.state.solution}
        </code>
      </Container>
    );
  }
}
