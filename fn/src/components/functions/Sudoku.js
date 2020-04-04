import React from "react";

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

  state = { board: "", solution: null };

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
    e.preventDefault();
    e.stopPropagation();
    this.get();
  };

  render() {
    return (
      <div className="container">
        <Details
          path={`/fn/${Sudoku.definition.title}`}
          title={Sudoku.definition.title}
          description={Sudoku.definition.description}
          parameters={Sudoku.definition.parameters}
        />
        <form className="ui form" onSubmit={this.handleSubmit}>
          <input type="submit" style={{ display: "none" }} />
          <div className="field">
            <label>board</label>
            <input
              type="text"
              name="board"
              placeholder="board"
              value={this.state.board}
              onChange={this.changed("board")}
            />
          </div>
        </form>
        <code style={{ display: "block", whiteSpace: "pre-wrap" }}>
          {this.state.solution}
        </code>
      </div>
    );
  }
}
