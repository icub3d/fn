import React from "react";

import history from "../history";

class Main extends React.Component {
  go = (to) => {
    history.push(to);
  };

  renderCards() {
    return this.props.functions.map((f) => {
      return (
        <div
          key={f.title}
          className="ui link card"
          onClick={() => this.go(`/${f.title}`)}
        >
          <div className="content">
            <div className="header">{f.title}</div>
            <div className="description">{f.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <div className="ui huge message page">
          <h1 className="ui huge header">Fn</h1>
          <div className="ui small header">
            A simple set of online functions
          </div>
          <hr />
          <p>
            I needed a place to store some simple functions that I use
            regularly. Here they are!
          </p>
        </div>
        <div className="ui three stackable cards">{this.renderCards()}</div>
      </div>
    );
  }
}

export default Main;
